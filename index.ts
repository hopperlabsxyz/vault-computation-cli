import {Command} from 'commander';
import {parseArguments} from "./utils/parseArguments";
import {fetchVault} from "./utils/fetchVault";
import {Address, zeroAddress} from "viem";
import {PRECISION_SCALE} from "./constants";
import {convertToCSV} from "./utils/convertToCSV";
import * as fs from "node:fs";

const program = new Command();

program
    .name('fees-computation-cli')
    .description('CLI to compute fees generated from LagoonProtocol')
    .version('0.0.1');

const computeCommand = program.command('compute')
    .description('Compute fees for a given vault')
    .argument('[ChainId:VaultAddress...]', "")
    .option('-f, --firstBlock <number>', 'First block to be used in computation')
    .option('-l, --lastBlock <number>', 'Last block to be used in computation')
    .option('-r, --readable', 'File to export the CSV')
    .option('-o, --output <string>', 'File to export the CSV')
    .option('-h, --help', 'Display help for compute command')

    .action(async (args, options) => {
        if (options.help) {
            computeCommand.help();
            return;
        }

        const vaults = parseArguments(args)

        const results = []

        for (const vault of vaults) {
            console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);
            const vaultData = await fetchVault(vault);
            const ignoredAddresses = [vault.address, vaultData.silo, zeroAddress];

            const feesTransferts = vaultData.transfers.filter(x => x.args.to === vaultData.feesReceiver).map(x => ({
                ...x,
                eventName: "feeTransfer"
            }));

            const sharesHolding: Record<Address, {
                balance: bigint,
                fees: bigint
            }> = {
                [vaultData.feesReceiver]: {
                    balance: 0n,
                    fees: 0n,
                },
            };


            let events = [];
            events = [
                ...vaultData.newTotalAssetUpdateds,
                ...vaultData.depositRequests,
                ...vaultData.cancelDeposits,
                ...vaultData.redeemRequests,
                ...vaultData.deposits,
                ...vaultData.transfers.filter(x =>
                    ![...ignoredAddresses, vaultData.feesReceiver].includes(x.args.to) && ![...ignoredAddresses, vaultData.feesReceiver].includes(x.args.from)
                ),
                ...feesTransferts,
                ...vaultData.totalAssetUpdateds,
                ...vaultData.settleDeposits,
                ...vaultData.settleRedeems,
            ].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));

            console.log(`Data :
  Silo : ${vaultData.silo}
  Fees receiver : ${vaultData.feesReceiver}
  Events : ${events.length}\n\n`);

            let totalSupply = 0n;
            let totalAssets = 0n;

            let prePendingDeposits: Record<Address, bigint> = {};
            let prePendingRedeems: Record<Address, bigint> = {};

            let pendingDeposits: Record<Address, bigint> = {};
            let pendingRedeems: Record<Address, bigint> = {};

            let lastFeeComputationBlock = 0n;
            let firstFeeComputed = false;
            let lastFeeComputed = false;
            let lastFees = 0n;

            for (const event of events) {
                if (lastFeeComputed) {
                    break;
                }

                switch (event.eventName) {
                    case "TotalAssetsUpdated":
                        totalSupply += lastFees;
                        totalAssets = event.args.totalAssets;
                        break;
                    case "NewTotalAssetsUpdated":
                        for (const [address, deposited] of Object.entries(prePendingDeposits)) {
                            if (pendingDeposits[address]) {
                                pendingDeposits[address] += deposited;
                            } else {
                                pendingDeposits[address] = deposited;
                            }
                        }

                        for (const [address, deposited] of Object.entries(prePendingRedeems)) {
                            if (pendingRedeems[address]) {
                                pendingRedeems[address] += deposited;
                            } else {
                                pendingRedeems[address] = deposited;
                            }
                        }

                        prePendingDeposits = {};
                        prePendingRedeems = {};
                        break;
                    case "Deposit":
                        const {controller, receiver, shares} = event.args;
                        if (controller !== receiver) {
                            sharesHolding[receiver].balance -= shares;

                            if (sharesHolding[controller]) {
                                sharesHolding[controller] += shares;
                            } else {
                                sharesHolding[controller] = shares;
                            }
                        }
                        break;
                    case "DepositRequest":
                        const depositUser = event.args.controller;

                        if (prePendingDeposits[depositUser]) {
                            prePendingDeposits[depositUser] += event.args.assets;
                        } else {
                            prePendingDeposits[depositUser] = event.args.assets;
                        }
                        break;
                    case "DepositRequestCanceled":
                        prePendingDeposits[event.args.controller] = 0n;
                        break;
                    case "RedeemRequest":
                        const redeemUser = event.args.owner;
                        if (prePendingRedeems[redeemUser]) {
                            prePendingRedeems[redeemUser] += event.args.shares;
                        } else {
                            prePendingRedeems[redeemUser] = event.args.shares;
                        }
                        break;
                    case "SettleDeposit":
                        const {
                            sharesMinted,
                            assetsDeposited,
                            totalSupply: newTotalSupply,
                            totalAssets: newTotalAssets
                        }: {
                            sharesMinted: bigint,
                            assetsDeposited: bigint,
                            totalSupply: bigint,
                            totalAssets: bigint
                        } = event.args;

                        totalSupply = newTotalSupply;
                        totalAssets = newTotalAssets;

                        for (const [address, deposited] of Object.entries(pendingDeposits)) {
                            if (sharesHolding[address]) {
                                sharesHolding[address].balance += deposited * sharesMinted / assetsDeposited;
                            } else {
                                sharesHolding[address] = {
                                    balance: deposited * sharesMinted / assetsDeposited,
                                    fees: 0n
                                };
                            }
                        }
                        pendingDeposits = {};
                        break;
                    case "SettleRedeem":
                        totalSupply = event.args.totalSupply;
                        totalAssets = event.args.totalAssets;

                        for (const [address, redeemed] of Object.entries(pendingRedeems)) {
                            if (sharesHolding[address]) {
                                sharesHolding[address].balance -= redeemed;
                            }
                        }
                        pendingRedeems = {};
                        break;
                    case "feeTransfer":
                        const totalFees = event.args.value * PRECISION_SCALE;
                        let actualFeesDistribution: Record<Address, bigint> = {};

                        lastFees = event.args.value;

                        for (const [address, {balance}] of Object.entries(sharesHolding)) {
                            actualFeesDistribution[address] = (balance * totalFees) / totalSupply;
                        }

                        const totalActualFeesDistribution = Object.values(actualFeesDistribution)
                            .reduce((acc, curr) =>
                                    acc + curr
                                , 0n);

                        if (totalFees / PRECISION_SCALE !== totalActualFeesDistribution / PRECISION_SCALE && totalFees / PRECISION_SCALE !== (totalActualFeesDistribution / PRECISION_SCALE) + 1n) {
                            console.log(`[${event.blockNumber}] INVALID FEES`, totalFees / PRECISION_SCALE, totalActualFeesDistribution / PRECISION_SCALE, (totalActualFeesDistribution / PRECISION_SCALE) - (totalFees / PRECISION_SCALE));
                            console.log(sharesHolding, actualFeesDistribution);

                            throw new Error(`Invalid fees computed. Expected ${totalFees / PRECISION_SCALE}, Received : ${totalActualFeesDistribution / PRECISION_SCALE}`);
                        }

                        sharesHolding[vaultData.feesReceiver].balance += event.args.value;

                        lastFeeComputationBlock = event.blockNumber;
                        if (event.blockNumber < options.firstBlock || lastFeeComputed) {
                            break;
                        }

                        if (!firstFeeComputed && options.firstBlock) {
                            firstFeeComputed = true;

                            for (const [address, fees] of Object.entries(actualFeesDistribution)) {
                                sharesHolding[address].fees += (fees * (lastFeeComputationBlock / event.blockNumber) / PRECISION_SCALE);
                            }
                        } else if (event.blockNumber >= options.lastBlock) {
                            lastFeeComputed = true;

                            for (const [address, fees] of Object.entries(actualFeesDistribution)) {
                                sharesHolding[address].fees += (fees * ((event.blockNumber - lastFeeComputationBlock) / event.blockNumber) / PRECISION_SCALE);
                            }
                        } else {
                            for (const [address, fees] of Object.entries(actualFeesDistribution)) {
                                sharesHolding[address].fees += (fees / PRECISION_SCALE);
                            }
                        }
                        lastFeeComputationBlock = event.blockNumber;
                        break;
                    case "Transfer":
                        if (!sharesHolding[event.args.from]) {
                            break;
                        }
                        sharesHolding[event.args.from].balance -= event.args.value;
                        if (sharesHolding[event.args.to]) {
                            sharesHolding[event.args.to].balance += event.args.value;
                        } else {
                            sharesHolding[event.args.to] = {
                                balance: event.args.value,
                                fees: 0n
                            };
                        }
                        break;
                    default:
                        throw new Error(`Unknown event ${event.eventName} : ${event}`);
                }
            }

            const pricePerShare = (10n ** 18n) * totalAssets / totalSupply

            results.push({
                chainId: vault.chainId,
                address: vault.address,
                pricePerShare: options.readable ? Number(pricePerShare) / 10 ** vaultData.decimals : pricePerShare,
                data: options.readable ?
                    Object.fromEntries(
                        Object.entries(sharesHolding).map(([address, values]) => [
                            address,
                            {
                                balance: Number(values.balance) / 10 ** vaultData.decimals,
                                fees: Number(values.fees) / 10 ** vaultData.decimals
                            }
                        ])
                    ) :
                    sharesHolding
            });
        }

        const csv = convertToCSV(results);

        if (options.output) {
            fs.writeFile(
                options.output,
                csv,
                {
                    encoding: "utf8",
                    flag: "w",
                    mode: 0o666
                },
                (err) => {
                    if (err) console.log(err);
                }
            );
        } else {
            console.log(csv);
        }
    });

program.parse();
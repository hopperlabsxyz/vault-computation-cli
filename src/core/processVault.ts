import { fetchVault } from "utils/fetchVault";
import { zeroAddress, type Address } from "viem";
import { PRECISION_SCALE } from "../constants";
import type { Vault } from "types/Vault";
import { preprocessEvents } from "./preprocess";
import type {
  Deposit,
  DepositRequest,
  DepositRequestCanceled,
  RedeemRequest,
  Referral,
  SettleDeposit,
  SettleRedeem,
  TotalAssetsUpdated,
} from "gql/graphql";
import { State } from "./state";

export async function processVault({
  vault,
  readable,
  otcDeals,
  toBlock,
  fromBlock,
}: {
  vault: Vault;
  readable: boolean;
  otcDeals: any;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);
  const vaultData = await fetchVault({ ...vault, fromBlock, toBlock });
  const ignoredAddresses = [vault.address, vaultData.silo, zeroAddress];

  const sharesHolding: Record<
    Address,
    {
      balance: bigint;
      fees: bigint;
      cashback: bigint;
    }
  > = {
    [vaultData.feesReceiver]: {
      balance: 0n,
      fees: 0n,
      cashback: 0n,
    },
  };

  let events = preprocessEvents({
    events: vaultData.events,
    feeReceiver: vaultData.feesReceiver,
    ignoredAddresses,
  });
  const state = new State();
  if (events.length == 1000)
    throw new Error("you need to handle more than 1000 events");

  let totalSupply = 0n;
  let totalAssets = 0n;

  let prePendingDeposits: Record<Address, bigint | undefined> = {};
  let prePendingRedeems: Record<Address, bigint | undefined> = {};

  let pendingDeposits: Record<Address, bigint | undefined> = {};
  let pendingRedeems: Record<Address, bigint | undefined> = {};

  let preReferrals: Record<Address, Address | undefined> = {}; // first address is referee, second is referrer
  let referrals: Record<Address, Address | undefined> = {};

  let lastFeeComputationBlock = 0n;
  let firstFeeComputed = false;
  let lastFeeComputed = false;
  let lastFees = 0n;

  for (const event of events) {
    if (lastFeeComputed) {
      break;
    }

    switch (event.__typename) {
      case "TotalAssetsUpdated":
        totalSupply += lastFees;
        totalAssets = (event as TotalAssetsUpdated).totalAssets;
        break;
      case "NewTotalAssetsUpdated":
        for (const [address, deposited] of Object.entries(prePendingDeposits)) {
          if (pendingDeposits[address as Address]) {
            pendingDeposits[address as Address]! += deposited!;
          } else {
            pendingDeposits[address as Address] = deposited;
          }
        }

        for (const [address, deposited] of Object.entries(prePendingRedeems)) {
          if (pendingRedeems[address as Address]) {
            pendingRedeems[address as Address]! += deposited!;
          } else {
            pendingRedeems[address as Address] = deposited;
          }
        }

        prePendingDeposits = {};
        prePendingRedeems = {};
        break;
      case "Deposit":
        const { sender, owner, shares } = event as Deposit;
        const receiver = owner;
        const controller = sender;
        if (controller !== receiver) {
          sharesHolding[receiver].balance -= shares;

          if (sharesHolding[controller]) {
            sharesHolding[controller].balance += shares;
          } else {
            sharesHolding[controller] = {
              balance: shares,
              cashback: 0n,
              fees: 0n,
            };
          }
        }
        break;
      case "DepositRequest":
        const depositRequest = event as DepositRequest;
        const depositUser = depositRequest.controller;

        if (prePendingDeposits[depositUser]) {
          prePendingDeposits[depositUser] += depositRequest.assets;
        } else {
          prePendingDeposits[depositUser] = depositRequest.assets;
        }
        state.depositRequest(depositRequest);
        break;

      case "DepositRequestCanceled":
        const depositRequestCanceled = event as DepositRequestCanceled;

        prePendingDeposits[depositRequestCanceled.controller] = 0n;

        // If the deposit is cancelled we remove referrals
        preReferrals[depositRequestCanceled.controller] = undefined;
        break;
      case "RedeemRequest":
        const redeemRequest = event as RedeemRequest;
        const redeemUser = redeemRequest.owner;
        if (prePendingRedeems[redeemUser]) {
          prePendingRedeems[redeemUser] += redeemRequest.shares;
        } else {
          prePendingRedeems[redeemUser] = redeemRequest.shares;
        }
        state.redeemRequest(redeemRequest);
        break;
      case "SettleDeposit":
        const {
          sharesMinted,
          assetsDeposited,
          totalSupply: newTotalSupply,
          totalAssets: newTotalAssets,
        }: {
          sharesMinted: bigint;
          assetsDeposited: bigint;
          totalSupply: bigint;
          totalAssets: bigint;
        } = event as SettleDeposit;

        totalSupply = newTotalSupply;
        totalAssets = newTotalAssets;

        for (const [address, deposited] of Object.entries(pendingDeposits)) {
          if (sharesHolding[address as Address]) {
            sharesHolding[address as Address].balance +=
              (deposited! * sharesMinted) / assetsDeposited;
          } else {
            sharesHolding[address as Address] = {
              balance: (deposited! * sharesMinted) / assetsDeposited,
              fees: 0n,
              cashback: 0n,
            };
          }
        }
        pendingDeposits = {};

        for (const [referee, referer] of Object.entries(preReferrals) as [
          Address,
          Address
        ][]) {
          if (referrals[referee]) {
            console.log("referee already taken");
            break;
          } else {
            console.log("new referral");
            referrals[referee] = referer;
          }
        }
        preReferrals = {};
        break;
      case "SettleRedeem":
        const settleRedeem = event as SettleRedeem;
        totalSupply = settleRedeem.totalSupply;
        totalAssets = settleRedeem.totalAssets;

        for (const [address, redeemed] of Object.entries(pendingRedeems)) {
          if (sharesHolding[address as Address]) {
            sharesHolding[address as Address].balance -= redeemed!;
          }
        }
        pendingRedeems = {};
        break;
      // since we filtered we are only dealing with fee transfers normally
      case "FeeTransfer":
        const totalFees = BigInt(event.value) * PRECISION_SCALE;
        let actualFeesDistribution: Record<Address, bigint> = {};

        lastFees = BigInt(event.value);

        for (const [address, { balance }] of Object.entries(sharesHolding)) {
          actualFeesDistribution[address as Address] =
            (balance * totalFees) / totalSupply;
        }

        sharesHolding[vaultData.feesReceiver].balance += BigInt(event.value);

        lastFeeComputationBlock = BigInt(event.blockNumber);
        if (event.blockNumber < fromBlock || lastFeeComputed) {
          break;
        }

        if (!firstFeeComputed) {
          firstFeeComputed = true;

          for (const [address, fees] of Object.entries(
            actualFeesDistribution
          )) {
            sharesHolding[address as Address].fees +=
              (fees * (lastFeeComputationBlock / BigInt(event.blockNumber))) /
              PRECISION_SCALE;
          }
        } else if (event.blockNumber >= toBlock) {
          lastFeeComputed = true;

          for (const [address, fees] of Object.entries(
            actualFeesDistribution
          )) {
            sharesHolding[address as Address].fees +=
              (fees *
                ((event.blockNumber - lastFeeComputationBlock) /
                  event.blockNumber)) /
              PRECISION_SCALE;
          }
        } else {
          for (const [address, fees] of Object.entries(
            actualFeesDistribution
          )) {
            sharesHolding[address as Address].fees += fees / PRECISION_SCALE;
          }
        }
        lastFeeComputationBlock = event.blockNumber;
        break;
      case "Transfer":
        if (!sharesHolding[event.from]) {
          break;
        }
        sharesHolding[event.from].balance -= BigInt(event.value);
        if (sharesHolding[event.to]) {
          sharesHolding[event.to].balance += BigInt(event.value);
        } else {
          sharesHolding[event.to] = {
            balance: BigInt(event.value),
            fees: 0n,
            cashback: 0n,
          };
        }
        break;
      case "Referral":
        const referral = event as Referral;
        if (referral.owner === referral.referral) break;
        if (preReferrals[referral.owner]) {
          console.log("already loading a referral");
          break;
        } else {
          // we do not allow auto referral
          if (referral.owner == referral.referral) break;
          preReferrals[referral.owner] = preReferrals[referral.referral];
        }
        break;
      default:
        throw new Error(`Unknown event ${event.__typename} : ${event}`);
    }
  }

  const pricePerShare = (10n ** 18n * totalAssets) / totalSupply;

  if (otcDeals[vault.chainId] && otcDeals[vault.chainId][vault.address]) {
    for (const [address, deal] of Object.entries(
      otcDeals[vault.chainId][vault.address]
    )) {
      let cashbackRate = BigInt(vaultData.fees.performanceRate) - (deal as any); // TODO: fix
      sharesHolding[address as Address].cashback =
        (sharesHolding[address as Address].fees * cashbackRate) /
        BigInt(vaultData.fees.performanceRate);
    }
  }
  const decimals = readable ? vaultData.decimals : 0;
  return {
    chainId: vault.chainId,
    address: vault.address,
    pricePerShare: Number(pricePerShare) / 10 ** decimals,
    data: Object.fromEntries(
      Object.entries(sharesHolding).map(([address, values]) => [
        address,
        {
          balance: Number(values.balance) / 10 ** decimals,
          fees: Number(values.fees) / 10 ** decimals,
          cashback: Number(values.cashback) / 10 ** decimals,
        },
      ])
    ),
  };
}

export interface ProcessVaultReturn {
  chainId: number;
  address: Address;
  pricePerShare: number;
  data: Record<
    Address,
    {
      balance: number;
      fees: number;
      cashback: number;
    }
  >;
}

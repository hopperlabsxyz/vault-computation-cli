import { Command } from "@commander-js/extra-typings";
import { parseArguments } from "utils/parseArguments";
import { type Address } from "viem";
import { convertToCSV } from "utils/convertToCSV";
import * as fs from "node:fs";
import { processVault, type ProcessVaultReturn } from "core/processVault";

const program = new Command();

program
  .name("fees-computation-cli")
  .description("CLI to compute fees generated from LagoonProtocol")
  .version("0.0.1");

const computeCommand = program
  .command("compute")
  .description("Compute fees for a given vault")
  .argument("[chainId:VaultAddress...]", "")
  .option("--firstBlock <number>", "First block to be used in computation")
  .option("--lastBlock <number>", "Last block to be used in computation")
  .option("--readable", "File to export the CSV")
  .option("-o, --output <string>", "File to export the CSV")
  .option("--otc-deals <string>", "Config file for OTC-deals")
  .option("-h, --help", "Display help for compute command")
  .action(async (args, options) => {
    if (options.help) {
      computeCommand.help();
      return;
    }

    const vaults = parseArguments(args);

    let otcDeals: Record<number, Record<Address, Record<Address, bigint>>> = {};

    // if (options.otcDeals) {
    //   const otpData = fs
    //     .readFileSync(options.otcDeals, { encoding: "utf8", flag: "r" })
    //     .split("\n");

    //   for (const entry of otpData.slice(1)) {
    //     const [chainId, vaultAddress, otpAddress, otpDeal] = entry
    //       .replace(" ", "")
    //       .split(",");

    //     otcDeals[chainId] = {
    //       ...otcDeals?.[chainId],
    //       [vaultAddress]: {
    //         ...otcDeals?.[chainId]?.[vaultAddress],
    //         [otpAddress]: BigInt(otpDeal),
    //       },
    //     };
    //   }
    // }

    const results: ProcessVaultReturn[] = [];

    for (const vault of vaults) {
      const resultat = await processVault({
        firstBlock: BigInt(options!.firstBlock!),
        lastBlock: BigInt(options!.lastBlock!),
        otcDeals: otcDeals,
        readable: options!.readable!,
        vault,
      });
      results.push(resultat);
    }

    const csv = convertToCSV(results, { displayCashback: !!options.otcDeals });

    if (options.output) {
      fs.writeFile(
        options.output,
        csv,
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666,
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

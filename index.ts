import { Command } from "@commander-js/extra-typings";
import { setBlocksCommand } from "cli/find-blocks";
import { setComputeCommand } from "cli/compute";
import { setControllersCommand } from "cli/find-claimable-controllers";
import { setUsualFeeCommand } from "cli/usual-fee";

export const computationProgram = new Command();

computationProgram
  .name("fees-computation-cli")
  .description("CLI to compute fees generated from LagoonProtocol")
  .version("0.0.1");

setBlocksCommand(computationProgram);
setComputeCommand(computationProgram);
setControllersCommand(computationProgram);
setUsualFeeCommand(computationProgram);

computationProgram.parse();

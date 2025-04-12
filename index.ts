import { Command } from "@commander-js/extra-typings";
import { setBlocksCommand } from "cli/find-blocks";
import { setComputeCommand } from "cli/compute";
import { setControllersCommand } from "cli/find-claimable-controllers";

export const computationProgram = new Command();

computationProgram
  .name("fees-computation-cli")
  .description("CLI to compute fees generated from LagoonProtocol")
  .version("0.0.1");

setBlocksCommand(computationProgram);
setComputeCommand(computationProgram);
setControllersCommand(computationProgram)

computationProgram.parse();

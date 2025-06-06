import { Command } from "@commander-js/extra-typings";
import { setBlocksCommand } from "cli/find-blocks";
import { setUserFeeCommand } from "cli/user-fee";
import { setControllersCommand } from "cli/find-claimable-controllers";
import { setPeriodFeeCommand } from "cli/period-fee";
import { setInterpolateCommand } from "cli/interpolate";
import { setUserPointsCommand } from "cli/user-points";

export const computationProgram = new Command();

computationProgram
  .name("fees-computation-cli")
  .description("CLI to compute fees generated from LagoonProtocol")
  .version("0.0.1");

setBlocksCommand(computationProgram);
setUserFeeCommand(computationProgram);
setUserPointsCommand(computationProgram);
setControllersCommand(computationProgram);
setPeriodFeeCommand(computationProgram);
setInterpolateCommand(computationProgram);

computationProgram.parse();

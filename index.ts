import { Command } from "@commander-js/extra-typings";
import { setFindBlocksCommand } from "cli/find-blocks";
import { setUserFeeCommand } from "cli/user-fee";
import { setFindClaimableControllersCommand } from "cli/find-claimable-controllers";
import { setPeriodFeeCommand } from "cli/period-fee";
import { setInterpolateCommand } from "cli/interpolate";
import { setUserPointsCommand } from "cli/user-points";
import { setUserBalanceCommand } from "cli/user-balance";

export const computationProgram = new Command();

computationProgram
  .name("fees-computation-cli")
  .description(
    "A general purpose cli to compute data of a Lagoon vault using its events."
  )
  .version("0.0.1");

setFindBlocksCommand(computationProgram);
setUserFeeCommand(computationProgram);
setUserPointsCommand(computationProgram);
setFindClaimableControllersCommand(computationProgram);
setPeriodFeeCommand(computationProgram);
setInterpolateCommand(computationProgram);
setUserBalanceCommand(computationProgram);

computationProgram.parse();

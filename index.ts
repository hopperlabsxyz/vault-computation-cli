import { Command } from "@commander-js/extra-typings";
import { setBlocksCommand } from "cli/find-blocks";
import { setUserFeeCommand } from "cli/user-fee";
import { setControllersCommand } from "cli/find-claimable-controllers";
import { setPeriodFeeCommand } from "cli/period-fee";
import { setInterpolateCommand } from "cli/interpolate";
import { setUserPointsCommand } from "cli/user-points";
import { setRefundHwmCommand } from "cli/refund-hwm";

export const computationProgram = new Command();

computationProgram
  .name("fees-computation-cli")
  .description(
    "A general purpose cli to compute data of a Lagoon vault via the Lagoon computation API."
  )
  .version("0.0.1");

setBlocksCommand(computationProgram);
setUserFeeCommand(computationProgram);
setUserPointsCommand(computationProgram);
setRefundHwmCommand(computationProgram);
setControllersCommand(computationProgram);
setPeriodFeeCommand(computationProgram);
setInterpolateCommand(computationProgram);

computationProgram.parse();

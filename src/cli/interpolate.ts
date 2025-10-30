import type { Command } from "@commander-js/extra-typings";
import { DAY_IN_SECONDS } from "../utils/constants";
import type { Dot } from "core/pointTracker";

export function setInterpolateCommand(command: Command) {
  command
    .command("interpolate")
    .alias("ip")
    .argument("csv file")
    .description("Interpolate data between two points.\n")
    .option(
      "-o, --output",
      "Will save the result next to origin file with interpolate at the end of the name of the file\n"
    )
    .requiredOption(
      "-f, --from-timestamp <number>",
      "Perform the interpolation from this timestamp\n"
    )
    .requiredOption(
      "-t, --to-timestamp <number>",
      "Stop interpolation at this timestamp\n"
    )
    .option(
      "-p, --precision <number>",
      "Number of decimals to use for the interpolated points. Default is 2",
      "2"
    )
    .option(
      "--frequency <number>",
      "Time between each points added, in second. Default is one day",
      DAY_IN_SECONDS.toString()
    )
    .addHelpText(
      "after",
      `
Examples:
  $ interpolate find-claimable-controllers 1:0x123...                    # Find all claimable controllers 
    `
    )
    .action(async (args, options) => {
      const fileName = args.split("/").slice(-1)[0].slice(0, -4);
      const pointsRaw = (await Bun.file(args).text()).split("\n").slice(1);
      const toTime = Number(options.toTimestamp);
      const fromTime = Number(options.fromTimestamp);

      let points: Dot[] = [];
      let fromDot: Dot | undefined = undefined;
      let toDot: Dot | undefined = undefined;
      for (const entry of pointsRaw) {
        const line = entry.split(",");
        if (!line) continue;
        const dot: Dot = {
          timestamp: Number(line[0]),
          amount: Number(line[1]),
        };

        if (fromTime == dot.timestamp) {
          fromDot = dot;
        } else if (toTime == dot.timestamp) {
          toDot = dot;
          if (fromDot! == undefined)
            throw new Error(
              'From timestamp doesn\'t exist or is higher than "to" timestamp'
            );
          const interpolatedPoints = interpolateEveryX(
           { start:fromDot,
            end:toDot,
            seconds: Number(options.frequency),
            precision: Number(options.precision)
          }
          );
          points.push(...interpolatedPoints);
        } else if (dot.timestamp < fromTime || dot.timestamp > toTime) {
          points.push(dot);
        }
      }
      if (fromDot == undefined) throw new Error("From timestamp not valid");
      if (toDot == undefined) throw new Error("To timestamp not valid");
      const csv = convertToCSVPoints(points, fileName);
      if (options.output) {
        try {
          const path = `output/interpolate/${fileName}.csv`;
          const file = Bun.file(path);
          await file.write(csv);
          console.log(`CSV report written to: ${file.name}`);
        } catch (error: any) {
          console.error("Error writing CSV file:", error.message);
          console.log("CSV content:");
          console.log(csv);
        }
      }
    });
}

/**
 * Linearly interpolates between two points, generating a point every second.
 * Includes the original points in the output.
 *
 * @param start The starting point [x, y]
 * @param end The ending point [x, y]
 * @param seconds Number of seconds between points
 * @param precision Number of decimals to use for the interpolated points
 * @returns An array of interpolated points, including originals
 */
function interpolateEveryX({start, end, seconds, precision}:{start: Dot, end: Dot, seconds: number, precision: number}): Dot[] {
  const { timestamp: timestamp0, amount: amount0 } = start;
  const { timestamp: timestamp1, amount: amount1 } = end;
  if (timestamp0 >= timestamp1) {
    throw new Error("Start x must be less than end x");
  }

  const slope = (amount1 - amount0) / (timestamp1 - timestamp0);
  const points: Dot[] = new Array();

  for (let x = timestamp0; x <= timestamp1; x += seconds) {
    const amount = amount0 + slope * (x - timestamp0);
    points.push({
      timestamp: x,
      amount: Number(amount.toFixed(precision)),
    });

    if (x + seconds > timestamp1) {
      points.push(end);
      break;
    }
  }
  return points;
}

export function convertToCSVPoints(points: Dot[], name: string) {
  const header = `timestamp, amount, name`; // CSV header
  const csvRows = points.map((p) => `${p.timestamp},${p.amount},${name}`);

  return [header, ...csvRows].join("\n");
}

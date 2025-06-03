import type { Command } from "@commander-js/extra-typings";
import type { Point } from "core/types";

export function setInterpolateCommand(command: Command) {
  command
    .command("interpolate")
    .argument("csv file")
    .description("Interpolate a csv of points into a ")
    .option(
      "-o, --output",
      "Will save the result next to origin file with interpolate at the end of the name of the file"
    )
    // .option(
    //   "--from-block <number>",
    //   "Starting at block number. Default to the vault inception block "
    // )
    .addHelpText(
      "after",
      `
Examples:
  $ interpolate find-claimable-controllers 1:0x123...                    # Find all claimable controllers 
    `
    )
    .action(async (args, options) => {
      console.log(args);
      const fileName = args.split("/").slice(-1)[0].slice(0, -4);
      const pointsRaw = (await Bun.file(args).text()).split("\n").slice(1);
      //   const deals: Record<
      //     number,
      //     Record<Address, Record<Address, number>>
      //   > = {};
      let points: Point[] = [];
      let tempPoints: Point[] = [];
      for (const entry of pointsRaw) {
        const line = entry.split(",");
        if (!line) continue;
        tempPoints.push({
          timestamp: Number(line[0]),

          amount: Number(line[1]),
          name: fileName,
        });
        if (tempPoints.length == 2) {
          points = interpolateEveryX(
            tempPoints[0],
            tempPoints[1],
            2592000,
            fileName
          );
        }
      }
      const csv = convertToCSVPoints(points);
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
 * @returns An array of interpolated points, including originals
 */
function interpolateEveryX(
  start: Point,
  end: Point,
  seconds: number,
  name: string
): Point[] {
  const { timestamp: timestamp0, amount: amount0 } = start;
  const { timestamp: timestamp1, amount: amount1 } = end;
  if (timestamp0 >= timestamp1) {
    throw new Error("Start x must be less than end x");
  }

  const slope = (amount1 - amount0) / (timestamp1 - timestamp0);
  const points: Point[] = new Array();

  for (let x = timestamp0; x <= timestamp1; x += seconds) {
    // x = points.length - 1;
    const amount = amount0 + slope * (x - timestamp0);
    points.push({
      timestamp: x,
      amount,
      name,
    });

    if (x + seconds > timestamp1) {
      points.push(end);
      break;
    }
  }
  return points;
}

export function convertToCSVPoints(points: Point[]) {
  const header = `timestamp, amount, name`; // CSV header
  const csvRows = points.map((p) => `${p.timestamp},${p.amount},${p.name}`);

  return [header, ...csvRows].join("\n");
}

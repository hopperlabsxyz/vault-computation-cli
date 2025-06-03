import type { Point } from "core/types";

export async function parsePoints(filePath: string): Promise<Point[]> {
  const pointsFile = (await Bun.file(filePath).text()).split("\n");
  const points: Point[] = [];
  for (const entry of pointsFile.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;
    const [timestamp, amount, name] = line;
    points.push({
      amount,
      name,
      timestamp,
    });
  }
  return points;
}

function parseLine(line: string): [number, number, string] | undefined {
  if (line === "") return [0, 0, "empty"];
  const [timestamp, amount, name] = line.replace(" ", "").split(",") as [
    number,
    number,
    string
  ];
  if (amount < 0) {
    throw new Error(
      `Invalid point value in point file: ${amount}. Amount cannot be negative`
    );
  }
  if (timestamp < 0) {
    throw new Error(
      `Invalid point value in point file: ${amount}. Amount cannot be negative`
    );
  }

  return [timestamp, amount, name];
}

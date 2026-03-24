export const DAY_IN_SECONDS = 86400;

export interface Dot {
  timestamp: number;
  amount: number;
}

/**
 * Linearly interpolate between two data points at regular intervals.
 * Matches the SDK's interpolateEveryX signature exactly.
 */
export function interpolateEveryX({
  start,
  end,
  seconds,
  precision,
}: {
  start: Dot;
  end: Dot;
  seconds: number;
  precision: number;
}): Dot[] {
  const { timestamp: t0, amount: a0 } = start;
  const { timestamp: t1, amount: a1 } = end;

  if (t0 >= t1) {
    throw new Error("Start timestamp must be less than end timestamp");
  }

  const result: Dot[] = [];
  let ts = t0;

  while (ts <= t1) {
    const ratio = (ts - t0) / (t1 - t0);
    const amount = a0 + (a1 - a0) * ratio;
    result.push({
      timestamp: ts,
      amount: parseFloat(amount.toFixed(precision)),
    });
    ts += seconds;
  }

  return result;
}

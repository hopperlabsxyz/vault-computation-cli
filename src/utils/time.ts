
/**
 * Returns all UTC end-of-month timestamps (in seconds) strictly between t1 and t2.
 *
 * @param t1 - Start timestamp in seconds (Unix epoch, UTC). End-of-month values must be > t1 to be included.
 * @param t2 - End timestamp in seconds (Unix epoch, UTC). Iteration stops once an end-of-month >= t2 is reached.
 * @returns Array of Unix timestamps (seconds, UTC) for the last second (23:59:59) of each month in (t1, t2).
 */
export function getEndOfMonthTimestamps(t1: number, t2: number): number[] {
  const eoms: number[] = [];
  const d = new Date(t1 * 1000);
  // move to end of current month
  let year = d.getUTCFullYear();
  let month = d.getUTCMonth();
  while (true) {
    // last second of this month: next month day 0 = last day of current month
    const eom = Date.UTC(year, month + 1, 0, 23, 59, 59) / 1000;
    if (eom >= t2) break;
    if (eom > t1) eoms.push(eom);
    month++;
    if (month > 11) { month = 0; year++; }
  }
  return eoms;
}
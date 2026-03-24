/**
 * Get end-of-month timestamps that fall between two timestamps.
 * Returns timestamps at 23:59:59 UTC on the last day of each month.
 */
export function getEndOfMonthTimestamps(t1: number, t2: number): number[] {
  const result: number[] = [];
  const d1 = new Date(t1 * 1000);
  let month = d1.getUTCMonth();
  let year = d1.getUTCFullYear();

  while (true) {
    // Last second of the current month
    const eom = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
    const eomTs = Math.floor(eom.getTime() / 1000);

    if (eomTs > t1 && eomTs < t2) {
      result.push(eomTs);
    }

    // Advance to next month
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }

    if (eomTs >= t2) break;
  }

  return result;
}

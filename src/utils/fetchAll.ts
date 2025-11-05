import { maxUint256, type Address } from "viem";

/**
 * Fetch all events from a subgrapg query.
 * @param chainId - The chain ID
 * @param vaultAddress - The vault address
 * @param toBlock - The block number to fetch events up to
 * @param fetchEvents - The function to fetch events
 * @returns The events as a record of arrays of events, indexed by the event type.
 */
export async function fetchAll<T extends Query>({
  chainId,
  vaultAddress,
  toBlock = BigInt(maxUint256),
  fetchEvents,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
  fetchEvents: (args: {chainId: number, vaultAddress: Address, toBlock: bigint, skip: number, first: number}) => Promise<T>;
}): Promise<T> {
  let events: T | undefined;
  let hasMore = true;
  let skip = 0;
  const first = 1000;
  while (hasMore) {
    const newEvents: T = await fetchEvents({ chainId, vaultAddress, toBlock, skip, first });
    if (events == undefined) {
      events = newEvents;
    } else {
      const keys = Object.keys(newEvents) as (keyof T)[];
      for (const key of keys) {
        if (key != "__typename") {
          (events[key] as any[]).push(...(newEvents[key] as any[]));
        }
      }
    }

    hasMore = vaultEventsHasMore(newEvents as Query, first);
    const total = countEvents(events as Query);
    if (hasMore) {
      console.log("Fetching more events. Total: ", total);
    }
    skip += first;
  }
  return events!;
}

/**
 * Check if there are more events to fetch.
 * @param query - The query result
 * @param first - The number of events to fetch
 * @returns True if there are more events to fetch, false otherwise
 */
function vaultEventsHasMore(query: Query, first: number): boolean {
  
  const keys = Object.keys(query);
  for (const key of keys) {
    if (key != "__typename") {
      const length = query[key as keyof Query]!.length;
      if (length == first) return true;
    }
  }
  return false;
}

/**
 * Count the number of events in a query.
 * @param query - The query result
 * @returns The number of events
 */
function countEvents(query: Query): number {
  const keys = Object.keys(query);
  let count = 0;
  for (const key of keys) {
    if (key === "__typename") continue;

    count += query[key as keyof Query]!.length;
  }
  return count;
}

/**
 * Generic type for the query result.
 * @param query - The query result
 * @returns The type of the query result
 */
type Query = Record<string, any[] | string>;

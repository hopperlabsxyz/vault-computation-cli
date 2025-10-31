import { maxUint256, type Address } from "viem";

export async function fetchAll<T extends Query>({
  chainId,
  vaultAddress,
  toBlock = BigInt(maxUint256),
  skip = 0,
  fetchEvents,
  first = 1000,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
  skip?: number;
  first?: number;
  fetchEvents: (args: {chainId: number, vaultAddress: Address, toBlock: bigint, skip: number, first: number}) => Promise<T>;
}): Promise<T> {
  let events: T | undefined;
  let hasMore = true;
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

type Query = Record<string, any[] | string>;
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

function countEvents(query: Query): number {
  
  const keys = Object.keys(query);
  let count = 0;
  for (const key of keys) {
    if (key != "__typename") {
      count += query[key as keyof Query]!.length;
    }
  }
  return count;
}
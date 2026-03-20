import type { preprocessEvents } from "core/preprocessEvents";
import { generateVault } from "core/vault";
import { totalBalanceOf } from "utils/onchain-calls";
import { maxUint256, type Address, type PublicClient } from "viem";
import type { VaultEvent } from "@hopperlabsxyz/internal-computation";

export type EventsArray = ReturnType<typeof preprocessEvents>;

export async function getHistoricBalances({
  events,
  address,
  client,
}: {
  events: EventsArray;
  address: Address;
  client: PublicClient;
}) {
  const uniqueBlocks: bigint[] = [];

  for (let i = 0; i < events.length; i++) {
    const currentBlock = events[i].blockNumber;
    const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;

    if (currentBlock != nextBlock) {
      uniqueBlocks.push(BigInt(currentBlock));
    }
  }

  const finalState = await getFinalState({
    events,
    address,
    chainId: client.chain!.id,
  });

  const uniqueUsers = finalState.users();
  //     blocknumber -> address --> balance
  const result: Record<string, Record<string, bigint>> = {};

  await Promise.all(
    uniqueBlocks.map(async (b) => {
      const userBalances: Record<string, bigint> = {};

      await Promise.all(
        uniqueUsers.map(async (user) => {
          const balance = await totalBalanceOf({
            user,
            address,
            blockNumber: b,
            client,
          });
          userBalances[user] = balance;
        })
      );

      result[b.toString()] = userBalances;
    })
  );

  return result;
}

async function getFinalState({
  events,
  address,
  chainId,
}: {
  events: EventsArray;
  address: Address;
  chainId: number;
}): Promise<Awaited<ReturnType<typeof generateVault>>> {
  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  await vault.processEvents({
    events: events as VaultEvent[],
    distributeFeesFromBlock: maxUint256,
  });

  return vault;
}

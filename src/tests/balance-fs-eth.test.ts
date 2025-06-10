import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { sanityChecks } from "core/sanityChecks";
import { generateVault } from "core/vault";
import { totalBalanceOf } from "utils/onchain-calls";
import { publicClient } from "lib/publicClient";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { formatUnits, maxUint256, type Address, type PublicClient } from "viem";

export type EventsArray = ReturnType<typeof preprocessEvents>;

test(
  "check balance match real data after each block",
  async () => {
    const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
    const chainId = 1;
    const fromBlock = 21142252n;
    const toBlock = 22624283n;
    const vaultEvents = await fetchVaultEvents({
      chainId,
      vaultAddress: address,
      toBlock,
    });
    sanityChecks({ events: vaultEvents, fromBlock, toBlock });
    const client = publicClient[chainId];
    const vault = await generateVault({
      vault: {
        address,
        chainId,
      },
    });
    let events = preprocessEvents({
      events: vaultEvents,
      addresses: {
        silo: vault.silo,
        vault: address,
      },
      referralRates: {
        feeRewardRate: 15,
        feeRebateRate: 5,
      },
    });

    const historicBalance = await getHistoricBalances({
      events,
      address,
      client,
      fromBlock,
    });

    vault.processEvents({
      events: events as { __typename: string; blockNumber: bigint }[],
      distributeFeesFromBlock: fromBlock,
      blockEndHook: async (blockNumber: bigint) => {
        for (const [user, account] of Object.entries(vault.getAccounts())) {
          if (user.toLowerCase() == vault.feeReceiver.toLowerCase()) continue;
          const balance = account.getBalance();

          const realTotal = historicBalance[blockNumber.toString()][user];
          expect(Number(formatUnits(balance, vault.decimals))).toBeCloseTo(
            Number(formatUnits(realTotal, vault.decimals)),
            vault.decimals - 1
          );
        }
      },
    });
  },
  120 * 1000 // this test can be a bit long
);

async function getHistoricBalances({
  events,
  fromBlock,
  address,
  client,
}: {
  events: EventsArray;
  fromBlock: bigint;
  address: Address;
  client: PublicClient;
}) {
  const uniqueBlocks: bigint[] = [];

  for (let i = 0; i < events.length; i++) {
    const currentBlock = events[i].blockNumber;
    const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;

    if (currentBlock != nextBlock) {
      uniqueBlocks.push(currentBlock);
    }
  }

  const finalState = await getFinalState({
    events,
    fromBlock,
    address,
    chainId: client.chain!.id,
  });

  const uniqueUsers = finalState.users();
  //     blocknumber -> address --> balance
  const result: Record<string, Record<string, bigint>> = {};

  await Promise.all(
    uniqueBlocks.map(async (b) => {
      const blockNumber = b.toString();
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

      result[blockNumber] = userBalances;
    })
  );

  return result;
}

async function getFinalState({
  events,
  fromBlock,
  address,
  chainId,
}: {
  events: EventsArray;
  fromBlock: bigint;
  address: Address;
  chainId: number;
}): Promise<ReturnType<typeof generateVault>> {
  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
  });

  return vault;
}

import { expect, test } from "bun:test";
import { preprocessEvents, type EventsArray } from "core/preProcess";
import { processEvent } from "core/processVault";
import { sanityChecks } from "core/sanityChecks";
import { State } from "core/state";
import { totalBalanceOf } from "core/vault";
import { publicClient } from "lib/publicClient";
import { fetchVault, type FetchVaultReturn } from "utils/fetchVault";
import { formatUnits, maxUint256, type Address, type PublicClient } from "viem";

test(
  "check balance match real data after each block",
  async () => {
    const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
    const chainId = 1;
    const fromBlock = 21142252;
    const toBlock = 22011758;
    const vaultData = await fetchVault({ address, chainId, toBlock });
    sanityChecks({ events: vaultData.events, fromBlock, toBlock });
    const client = publicClient[chainId];
    let events = preprocessEvents({
      events: vaultData.events,
      addresses: {
        feeReceiver: vaultData.feesReceiver,
        silo: vaultData.silo,
        vault: address,
      },
      referral: {
        feeRewardRate: 15,
        feeRebateRate: 5,
      },
      deals: {},
    });
    const state = new State({
      feeReceiver: vaultData.feesReceiver,
      decimals: BigInt(vaultData.decimals),
    });
    if (events.length == 1000)
      throw new Error("you need to handle more than 1000 events");

    const historicBalance = await getHistoricBalances({
      events,
      address,
      client,
      fromBlock,
      vaultData,
    });

    for (let i = 0; i < events.length; i++) {
      const currentBlock: BigInt = events[i].blockNumber;
      const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;
      processEvent({
        state,
        event: events[i] as { __typename: string; blockNumber: bigint },
        fromBlock,
      });

      // if we are done with the block, we can check the state
      if (currentBlock != nextBlock) {
        for (const [user, account] of Object.entries(
          state.getAccountsDeepCopy()
        )) {
          const balance = account.balance;

          const realTotal = historicBalance[currentBlock.toString()][user];

          expect(Number(formatUnits(balance, vaultData.decimals))).toBeCloseTo(
            Number(formatUnits(realTotal, vaultData.decimals)),
            vaultData.decimals - 1
          );
        }
      }
    }
  },
  120 * 1000 // this test can be a bit long
);

function getFinalState({
  events,
  feeReceiver,
  decimals,
  fromBlock,
}: {
  events: EventsArray;
  feeReceiver: Address;
  decimals: number;
  fromBlock: number;
}): State {
  const state = new State({
    feeReceiver: feeReceiver,
    decimals: BigInt(decimals),
  });

  for (let i = 0; i < events.length; i++) {
    processEvent({
      state,
      event: events[i] as { __typename: string; blockNumber: bigint },
      fromBlock,
    });
  }
  return state;
}

async function getHistoricBalances({
  events,
  vaultData,
  fromBlock,
  address,
  client,
}: {
  events: EventsArray;
  vaultData: FetchVaultReturn;
  fromBlock: number;
  address: Address;
  client: PublicClient;
}) {
  const uniqueBlocks: bigint[] = [];

  for (let i = 0; i < events.length; i++) {
    const currentBlock = events[i].blockNumber;
    const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;

    // if we are done with the block, we can check the state
    if (currentBlock != nextBlock) {
      uniqueBlocks.push(currentBlock);
    }
  }

  const finalState = getFinalState({
    decimals: vaultData.decimals,
    events,
    feeReceiver: vaultData.feesReceiver,
    fromBlock,
  });

  const uniqueUsers = finalState.users();

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

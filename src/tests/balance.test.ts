import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocess";
import { sanityChecks } from "core/sanityChecks";
import { Vault } from "core/vault";
import type { Rates } from "core/types";
import { totalBalanceOf } from "core/onchain-calls";
import { publicClient } from "lib/publicClient";
import { fetchVault, type FetchVaultReturn } from "utils/fetchVault";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { formatUnits, maxUint256, type Address, type PublicClient } from "viem";

export type EventsArray = ReturnType<typeof preprocessEvents>;

test(
  "check balance match real data after each block",
  async () => {
    const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
    const chainId = 1;
    const fromBlock = 21142252n;
    const toBlock = 22011758n;
    const vaultData = await fetchVault({
      address,
      chainId,
      block: fromBlock,
    });
    const vaultEvents = await fetchVaultEvents({
      chainId,
      vaultAddress: address,
      toBlock,
    });
    sanityChecks({ events: vaultEvents, fromBlock, toBlock });
    const client = publicClient[chainId];
    let events = preprocessEvents({
      events: vaultEvents,
      addresses: {
        silo: vaultData.silo,
        vault: address,
      },
      referral: {
        feeRewardRate: 15,
        feeRebateRate: 5,
      },
      deals: {},
    });
    const vault = new Vault({
      feeReceiver: vaultData.feesReceiver,
      decimals: BigInt(vaultData.decimals),
      asset: vaultData.asset,
      cooldown: Number(vaultData.cooldown),
      rates: vaultData.rates.rates,
    });

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
      vault.processEvent({
        event: events[i] as { __typename: string; blockNumber: bigint },
        fromBlock,
      });

      // if we are done with the block, we can check the state
      if (currentBlock != nextBlock) {
        for (const [user, account] of Object.entries(
          vault.getAccountsDeepCopy()
        )) {
          if (user.toLowerCase() == vault.feeReceiver.toLowerCase()) continue;
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
  cooldown,
  rates,
  vaultData,
}: {
  events: EventsArray;
  feeReceiver: Address;
  decimals: number;
  fromBlock: bigint;
  cooldown: number;
  rates: Rates;
  vaultData: FetchVaultReturn;
}): Vault {
  const state = new Vault({
    feeReceiver: feeReceiver,
    decimals: BigInt(decimals),
    asset: vaultData.asset,
    cooldown,
    rates,
  });

  for (let i = 0; i < events.length; i++) {
    state.processEvent({
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
  fromBlock: bigint;
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
    cooldown: vaultData.cooldown,
    rates: vaultData.rates.rates,
    vaultData,
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

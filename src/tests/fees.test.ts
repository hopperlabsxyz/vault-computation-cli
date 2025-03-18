import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocess";
import { eventBranching } from "core/processVault";
import { sanityChecks } from "core/sanityChecks";
import { State } from "core/state";
import { publicClient } from "lib/publicClient";
import { fetchVault } from "utils/fetchVault";
import { formatUnits, maxUint256 } from "viem";

test("check total fees are consistent all attributed fees", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252;
  const toBlock = 22011758;
  const vaultData = await fetchVault({ address, chainId, toBlock });
  sanityChecks({ events: vaultData.events, fromBlock, toBlock });
  let events = preprocessEvents({
    events: vaultData.events,
    addresses: {
      feeReceiver: vaultData.feesReceiver,
      silo: vaultData.silo,
      vault: address,
    },
    referral: {
      feeBonus: 15,
      feeRebate: 5,
    },
    deals: {},
  });
  const state = new State({
    feeReceiver: vaultData.feesReceiver,
    decimals: BigInt(vaultData.decimals),
  });
  if (events.length == 1000)
    throw new Error("you need to handle more than 1000 events");

  for (let i = 0; i < events.length; i++) {
    const currentBlock: BigInt = events[i].blockNumber;
    const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;
    eventBranching({
      state,
      event: events[i] as { __typename: string; blockNumber: bigint },
      fromBlock,
    });

    // if we are done with the block, we can check the state
    if (currentBlock != nextBlock) {
      const accumulatedFeesAmongUsers = state.accumulatedFeesSinceFromBlock();
      const totalFees = state.accumulatedFees;
      const diff = accumulatedFeesAmongUsers - totalFees;
      expect(diff).toBeLessThan(100);
      expect(diff).toBeGreaterThan(-100);
    }
  }
});

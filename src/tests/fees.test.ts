import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { checkStrictBlockNumberMatching } from "core/strictBlockNumberMatching";
import { generateVault } from "core/vault";
import { fetchTestVaultEvents } from "./common/subgraph";

test("check total fees are consistent all attributed fees", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchTestVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
  });

  await vault.processEvents({
    events,
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: string) => {
      const accumulatedFeesAmongUsers = vault.accumulatedFeesSinceFromBlock();
      const totalFees = vault.accumulatedFees;
      const diff = accumulatedFeesAmongUsers - totalFees;
      expect(diff).toBeLessThan(50);
      expect(diff).toBeGreaterThan(-50);
    },
  });
});

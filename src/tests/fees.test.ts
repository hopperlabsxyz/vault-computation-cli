import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { sanityChecks } from "core/sanityChecks";
import { generateVault } from "core/vault";
import { fetchVault } from "utils/fetchVault";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

test("check total fees are consistent all attributed fees", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  const vaultData = await fetchVault({ address, chainId, block: fromBlock });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vaultData.silo,
      vault: address,
    },
    referralRates: {
      feeRewardRate: 15,
      feeRebateRate: 5,
    },
    deals: {},
  });
  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });

  vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    fromBlock,
    blockEndHook: async (_: bigint) => {
      const accumulatedFeesAmongUsers = vault.accumulatedFeesSinceFromBlock();
      const totalFees = vault.accumulatedFees;
      const diff = accumulatedFeesAmongUsers - totalFees;
      expect(diff).toBeLessThan(100);
      expect(diff).toBeGreaterThan(-100);
    },
  });
});

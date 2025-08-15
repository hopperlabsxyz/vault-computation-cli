import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { mock_points } from "./mock/points";
import { generateVault } from "core/vault";

export type EventsArray = ReturnType<typeof preprocessEvents>;

test("check balance match real data after each block", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
  });

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
    points: mock_points,
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
  });

  vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: 0n,
    blockEndHook: async (_: bigint) => {
      const accumulatedPoints = vault.totalPointsAmongUsers(
        mock_points[0].name
      );
      const lastPointEvent = vault.lastPointEventValue(mock_points[0].name);
      const diff = Number(accumulatedPoints) - lastPointEvent;

      expect(diff).toBeGreaterThan(-100);
      expect(diff).toBeLessThan(100);
    },
  });
});

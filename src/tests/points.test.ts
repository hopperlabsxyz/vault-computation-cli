import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocess";
import { sanityChecks } from "core/sanityChecks";
import { Vault } from "core/vault";
import { fetchVault } from "utils/fetchVault";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { mock_points } from "./mock/points";

export type EventsArray = ReturnType<typeof preprocessEvents>;

test("check balance match real data after each block", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22624283n;
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
    points: mock_points,
  });
  const vault = new Vault({
    feeReceiver: vaultData.feesReceiver,
    decimals: BigInt(vaultData.decimals),
    asset: vaultData.asset,
    cooldown: Number(vaultData.cooldown),
    rates: vaultData.rates.rates,
  });

  vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    fromBlock,
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

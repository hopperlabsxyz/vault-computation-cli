import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { checkStrictBlockNumberMatching } from "core/strictBlockNumberMatching";
import { generateVault } from "core/vault";
import { fetchAllVaultEvents } from "utils/fetchVaultEvents";

test("events of same blocknumber must have growing logIndex", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const vaultEvents = await fetchAllVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
  });
  const eventsByBlockNumber: Record<number, number[]> = {};
  for (let i = 0; i < events.length; i++) {
    if (!eventsByBlockNumber[Number(events[i].blockNumber)])
      eventsByBlockNumber[Number(events[i].blockNumber)] = [];

    eventsByBlockNumber[Number(events[i].blockNumber)].push(events[i].logIndex);
  }
  const blockNumbers = Object.keys(eventsByBlockNumber);
  // Some general rules
  blockNumbers.forEach((b) => {
    const events = eventsByBlockNumber[Number(b)];
    for (let i = 0; i < events.length; i++) {
      if (i > 0) {
        expect(events[i]).toBeGreaterThan(events[i - 1]);
      }
      if (i < events.length - 1) {
        expect(events[i]).toBeLessThan(events[i + 1]);
      }
    }
  });
});

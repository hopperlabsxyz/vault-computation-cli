import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { checkStrictBlockNumberMatching } from "core/strictBlockNumberMatching";
import { generateVault } from "core/vault";
import { fetchTestVaultEvents } from "./common/subgraph";

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
  const vaultEvents = await fetchTestVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const events = preprocessEvents({
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
    const blockEvents = eventsByBlockNumber[Number(b)];
    for (let i = 0; i < blockEvents.length; i++) {
      if (i > 0) {
        expect(blockEvents[i]).toBeGreaterThan(blockEvents[i - 1]);
      }
      if (i < blockEvents.length - 1) {
        expect(blockEvents[i]).toBeLessThan(blockEvents[i + 1]);
      }
    }
  });
});

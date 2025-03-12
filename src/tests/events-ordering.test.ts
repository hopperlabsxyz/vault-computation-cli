import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocess";
import { sanityChecks } from "core/sanityChecks";
import { fetchVault } from "utils/fetchVault";
import { zeroAddress, type Address } from "viem";

test("events of same blocknumber must follow specific order", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252;
  const toBlock = 22011758;
  const vault = await fetchVault({
    address,
    chainId,
    toBlock,
  });
  sanityChecks({ events: vault.events, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vault.events,
    addresses: {
      feeReceiver: vault.feesReceiver,
      silo: vault.silo,
      vault: address,
    },
    referral: {
      feeBonus: 0,
      feeRebate: 0,
    },
    deals: {},
  });
  const eventsByBlockNumber: Record<number, string[]> = {};
  for (let i = 0; i < events.length; i++) {
    if (!eventsByBlockNumber[events[i].blockNumber])
      eventsByBlockNumber[events[i].blockNumber] = [];

    eventsByBlockNumber[events[i].blockNumber].push(events[i].__typename!);
  }
  const blockNumbers = Object.keys(eventsByBlockNumber);
  blockNumbers.forEach((b) => {
    // a fee tranfer can only happen after a TotalAssetsUpdate
    expect(b[0]).not.toBe("FeeTransfer");
  });
  console.log(eventsByBlockNumber);
});

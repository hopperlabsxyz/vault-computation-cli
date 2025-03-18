import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocess";
import { sanityChecks } from "core/sanityChecks";
import { fetchVault } from "utils/fetchVault";

const possibleOrdering = [
  ["DepositRequest"],
  ["DepositRequest", "Referral"],
  ["NewTotalAssetsUpdated"],
  ["TotalAssetsUpdated", "SettleDeposit"],
  ["TotalAssetsUpdated", "SettleRedeem"],
  ["TotalAssetsUpdated"],
  ["Deposit"],
  ["RedeemRequest"],
  ["TotalAssetsUpdated", "FeeTransfer"],
  ["TotalAssetsUpdated", "FeeTransfer", "SettleDeposit"],
  ["DepositRequest", "Deposit"],
  ["DepositRequest", "Deposit", "Referral"],
  ["TotalAssetsUpdated", "FeeTransfer", "SettleDeposit", "SettleRedeem"],
  ["Transfer"],
  ["DepositRequestCanceled"],
  ["TotalAssetsUpdated", "SettleDeposit", "SettleRedeem"],
  ["TotalAssetsUpdated", "FeeTransfer", "SettleRedeem"],
];

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
  // Some general rules
  blockNumbers.forEach((b) => {
    // a fee tranfer can only happen after a TotalAssetsUpdate
    const events = eventsByBlockNumber[Number(b)];
    expect(matchesPossibleOrdering(possibleOrdering, events)).toBeTrue();
    expect(b).not.toBe("FeeTransfer");
  });

  // Some specific checks
  // "21137743": [ "DepositRequest", "Referral" ],
  const block21137743 = eventsByBlockNumber[21137743];
  expect(block21137743[0]).toBe("DepositRequest");
  expect(block21137743[1]).toBe("Referral");

  // "21872068": [ "TotalAssetsUpdated", "FeeTransfer", "SettleDeposit", "SettleRedeem" ],
  const block21872068 = eventsByBlockNumber[21872068];
  expect(block21872068[0]).toBe("TotalAssetsUpdated");
  expect(block21872068[1]).toBe("FeeTransfer");
  expect(block21872068[2]).toBe("SettleDeposit");
  expect(block21872068[3]).toBe("SettleRedeem");
});

test("test matches possible ordering function", () => {
  expect(
    matchesPossibleOrdering(possibleOrdering, ["DepositRequest", "Referral"])
  ).toBe(true);
  expect(
    matchesPossibleOrdering(possibleOrdering, ["DepositRequest", "Deposit"])
  ).toBe(true);
  expect(matchesPossibleOrdering(possibleOrdering, ["InvalidEvent"])).toBe(
    false
  );
  expect(
    matchesPossibleOrdering(possibleOrdering, [
      "DepositRequest",
      "Referral",
      "ExtraEvent",
    ])
  ).toBe(false);
});

function matchesPossibleOrdering(
  possibleOrdering: string[][],
  inputArray: string[]
): boolean {
  // Iterate through each combination in possibleOrdering
  for (const ordering of possibleOrdering) {
    // If lengths don't match, skip to the next combination
    if (ordering.length !== inputArray.length) {
      continue;
    }

    // Assume the combination matches until proven otherwise
    let isMatch = true;

    // Compare each element in the ordering and inputArray
    for (let i = 0; i < ordering.length; i++) {
      if (ordering[i] !== inputArray[i]) {
        isMatch = false; // If any element doesn't match, mark as false
        break; // Exit the inner loop early
      }
    }

    // If all elements match, return true
    if (isMatch) {
      return true;
    }
  }

  // If no combination matches, return false
  return false;
}

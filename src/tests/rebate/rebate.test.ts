import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { sanityChecks } from "core/sanityChecks";
import { generateVault } from "core/vault";
import { parseRebateDeals } from "parsing/parseRebateDeals";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

test("check 0-0x0 works as a wildcard", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    rebateDeals: [
      {
        chainId: 0,
        feeRebateRate: 50,
        owner: user,
        vault: "0x0",
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      const userAccount = vault.getAccount(user);
      expect(userAccount.getRebateRateBps()).toBe(50);
    },
  });
});

test("check matching chainId-address works", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    rebateDeals: [
      {
        chainId: 1,
        feeRebateRate: 26,
        owner: user,
        vault: "0x07ed467acD4ffd13023046968b0859781cb90D9B",
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      const userAccount = vault.getAccount(user);
      expect(userAccount.getRebateRateBps()).toBe(26);
    },
  });
});

test("check matching chainId-address overrides a wildcard deal", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  const rebateDeals = await parseRebateDeals("./src/tests/rebate/rebate.csv");
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    rebateDeals,
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      const userAccount = vault.getAccount(user);
      // expect(userAccount.getReferral()).toBeUndefined();
      expect(userAccount.getRebateRateBps()).toBe(26);
    },
  });
});

test("check that an offchain rebate doesn't get overriden by a referral", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  vaultEvents.referrals.push({
    __typename: "Referral",
    blockNumber: 1,
    blockTimestamp: 1n,
    id: "0x0",
    owner: user,
    referral: "0x0123456789012345678901234567890123456789",
    requestId: 0n,
    transactionHash: "0x0",
    logIndex: 0,
    assets: 0n,
  });
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    rebateDeals: [
      {
        chainId: 0,
        feeRebateRate: 50,
        owner: user,
        vault: "0x0",
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      const userAccount = vault.getAccount(user);
      expect(userAccount.getRebateRateBps()).toBe(50);
    },
  });
});

test("check that a user reabte doens't get overriden by the rebate of a referral", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    rebateDeals: [
      {
        chainId: 0,
        feeRebateRate: 50,
        owner: user,
        vault: "0x0",
      },
    ],
  });

  const userHasARefferal = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === user.toLowerCase()
  );
  expect(userHasARefferal).not.toBe(undefined);

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      const userAccount = vault.getAccount(user);
      // expect(userAccount.getReferral()).toBeUndefined();
      expect(userAccount.getRebateRateBps()).toBe(50);
    },
  });
});

test("check that a user referred has a rebate of defaultRebateRate", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 22011758n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 1500,
    defaultRebateRateBps: 500,
    rebateDeals: [],
  });

  const refferalEvent = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === user.toLowerCase()
  );
  expect(refferalEvent).not.toBe(undefined);

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (blockNumber: bigint) => {
      const userAccount = vault.getAccount(user);
      if (blockNumber >= refferalEvent?.blockNumber)
        expect(userAccount.getRebateRateBps()).toBe(500);
    },
  });
});

test("check that a a user.referral.rewardRate + user.rebateRate < 100%", async () => {
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const user = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  const refferalEvent = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === user.toLowerCase()
  );
  expect(refferalEvent).not.toBe(undefined);
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 1500,
    defaultRebateRateBps: 500,
    rebateDeals: [
      {
        chainId: 0,
        feeRebateRate: 10000,
        owner: refferalEvent?.owner!,
        vault: "0x0",
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (blockNumber: bigint) => {
      const userAccount = vault.getAccount(user);
      if (blockNumber >= refferalEvent?.blockNumber)
        expect(userAccount.getRebateRateBps()).toBe(10000);
    },
  });
  expect(() => vault.distributeRebatesAndRewards()).toThrow();
  // Why should it throw?
  // In rebate deals we can see that the user with address 0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5 has a rebate of 10000
  // which is 100% of the fee.
  // At the same time, this use got a  referral from 0xac2eea2e32af733c4e7e3564422447dc7c5c938d. This means that the referral
  // should have a reward of 15% of the fee generated by the referre. 100 + 15 = 115% > 100%
});

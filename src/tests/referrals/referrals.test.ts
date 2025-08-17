import { expect, test } from "bun:test";
import { BPS_DIVIDER } from "../../utils/constants";
import { preprocessEvents } from "core/preprocessEvents";
import { checkStrictBlockNumberMatching } from "core/strictBlockNumberMatching";
import { generateVault } from "core/vault";
import { parseOffchainReferrals } from "parsing/parseOffchainReferrals";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

test("check 0-0x0 works as a wildcard", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const referee = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 1500,
    defaultRebateRateBps: 50,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 1600,
        rebateRateBps: 60,
        assets: 0,
        referrer: referral,
        referred: referee,
        vault: "0x0",
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      // we need to be sure that at least one deposit has been made

      if (vault.totalAssets == 0n) return;
      const refereeAccount = vault.getAccount(referee);
      expect(refereeAccount.getRebateRateBps()).toBe(60);
      const referralConfig = refereeAccount.getReferral();
      expect(referralConfig?.rewardRateBps).toBe(1600);
      expect(referralConfig?.referral).toBe(referral);
    },
  });
});

test("check matching chainId-address works", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 1,
        rewardRateBps: 26,
        rebateRateBps: 26,
        referrer: referral,
        referred: user,
        vault: "0x07ed467acD4ffd13023046968b0859781cb90D9B",
        assets: 0,
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      // we need to be sure that at least one deposit has been made
      if (vault.totalAssets == 0n) return;
      const userAccount = vault.getAccount(user);
      expect(userAccount.getRebateRateBps()).toBe(26);
      const referralConfig = userAccount.getReferral();
      expect(referralConfig?.rewardRateBps).toBe(26);
      expect(referralConfig?.referral).toBe(referral);
    },
  });
});

test("check matching chainId-address overrides a wildcard deal", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  const offChainReferrals = await parseOffchainReferrals(
    "./src/tests/referrals/referral.csv"
  );
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const referree = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals,
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      if (vault.totalAssets == 0n) return;
      const referreeAccount = vault.getAccount(referree);
      expect(referreeAccount.getRebateRateBps()).toBe(26);
      const referralConfig = referreeAccount.getReferral();
      expect(referralConfig?.rewardRateBps).toBe(26);
      expect(referralConfig?.referral).toBe(referral);
    },
  });
});

test("check that an offchain referral doesn't get overriden by another onchain referral", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const user = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  const virginReferral = "0x1000000000000000000000000000000000000000"; // a user that has nether interacted with the vault ever

  const referral = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === user.toLowerCase()
  );
  expect(referral).not.toBe(undefined);

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 36,
        rebateRateBps: 28,
        referrer: virginReferral,
        referred: user,
        vault: "0x0",
        assets: 0,
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      if (vault.totalAssets == 0n) return;
      const userAccount = vault.getAccount(user);
      expect(userAccount.getRebateRateBps()).toBe(28);
      const referralConfig = userAccount.getReferral();
      expect(referralConfig?.referral).toBe(virginReferral);
      expect(referralConfig?.rewardRateBps).toBe(36);
    },
  });
});

test("check that an offchain referral generates a cashback for the referral and the referree", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const userWithoutOnChainReferral =
    "0xD408c5DdcBf297dcAa745009277007429719E205";
  const virginReferral = "0x1000000000000000000000000000000000000000"; // a user that has nether interacted with the vault ever
  // console.log();
  const referral = vaultEvents.referrals.find(
    (ref) =>
      ref.owner.toLowerCase() === userWithoutOnChainReferral.toLowerCase()
  );
  expect(referral === undefined).toBe(true);

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 1000, // 10%
        rebateRateBps: 100, // 1%
        referrer: virginReferral, // a user that has nether interacted with the vault ever
        referred: userWithoutOnChainReferral,
        vault: "0x0",
        assets: 0,
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      if (vault.totalAssets == 0n) return;
      const referreeAcc = vault.getAccount(userWithoutOnChainReferral);
      expect(referreeAcc.getRebateRateBps()).toBe(100);
      const referralConfig = referreeAcc.getReferral();
      expect(referralConfig?.rewardRateBps).toBe(1000);
      expect(referralConfig?.referral).toBe(virginReferral); // a user that has nether interacted with the vault ever
    },
  });

  // now we can get the amount of fees generated by the referee
  const referreeAcc = vault.getAccount(userWithoutOnChainReferral);
  const fees = referreeAcc.getFees();

  // we can compute the expected amount of cashback for the referree:
  const referreeCashback = (fees * 100n) / BPS_DIVIDER;
  const referrerCashback = (fees * 1000n) / BPS_DIVIDER;

  // we can now check that the cashback distribution is consistent

  vault.distributeRebatesAndRewards();
  expect(referreeAcc.getCashback()).toBe(referreeCashback);
  expect(vault.getAccount(virginReferral).getCashback()).toBe(referrerCashback); // a user that has nether interacted with the vault ever
});

test("check that an offchain referral does generate a cashback for the referral and the referree event with an onchain referral", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const userWithOnchainReferral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  const virginReferral = "0x1000000000000000000000000000000000000000"; // a user that has nether interacted with the vault ever

  const referral = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === userWithOnchainReferral.toLowerCase()
  );
  expect(referral).not.toBe(undefined);

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 1000, // 10%
        rebateRateBps: 100, // 1%
        referrer: virginReferral, // a user that has nether interacted with the vault ever
        referred: userWithOnchainReferral,
        vault: "0x0",
        assets: 0,
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
    blockEndHook: async (_: bigint) => {
      if (vault.totalAssets == 0n) return;
      const referreeAcc = vault.getAccount(userWithOnchainReferral);
      expect(referreeAcc.getRebateRateBps()).toBe(100);
      const referralConfig = referreeAcc.getReferral();
      expect(referralConfig?.rewardRateBps).toBe(1000);
      expect(referralConfig?.referral).toBe(virginReferral); // a user that has nether interacted with the vault ever
    },
  });

  // now we can get the amount of fees generated by the referee
  const referreeAcc = vault.getAccount(userWithOnchainReferral);
  const fees = referreeAcc.getFees();

  // we can compute the expected amount of cashback for the referree:
  const referreeCashback = (fees * 100n) / BPS_DIVIDER;
  const referrerCashback = (fees * 1000n) / BPS_DIVIDER;

  // we can now check that the cashback distribution is consistent

  vault.distributeRebatesAndRewards();
  expect(referreeAcc.getCashback()).toBe(referreeCashback);
  expect(vault.getAccount(virginReferral).getCashback()).toBe(referrerCashback); // a user that has nether interacted with the vault ever
});

test("check that the total % of redistribution cannot be > 100% via an offchain referral", async () => {
  const vaultAddress = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress,
    toBlock,
  });
  checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address: vaultAddress,
      chainId,
    },
  });
  const userWithOnchainReferral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  const virginReferral = "0x1000000000000000000000000000000000000000"; // a user that has nether interacted with the vault ever

  const referral = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === userWithOnchainReferral.toLowerCase()
  );
  expect(referral).not.toBe(undefined);

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: vaultAddress,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 10000, // 100%
        rebateRateBps: 100, // 1%
        referrer: virginReferral, // a user that has nether interacted with the vault ever
        referred: userWithOnchainReferral,
        vault: "0x0",
        assets: 0,
      },
    ],
  });

  await vault.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock,
  });

  expect(() => vault.distributeRebatesAndRewards()).toThrow();
});

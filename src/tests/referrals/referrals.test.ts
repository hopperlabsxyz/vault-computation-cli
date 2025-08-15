import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { sanityChecks } from "core/sanityChecks";
import { generateVault } from "core/vault";
import { parseOffchainReferrals } from "parsing/parseOffchainReferrals";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

test("check 0-0x0 works as a wildcard", async () => {
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
  const referee = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
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
  const user = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
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
  const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";
  const chainId = 1;
  const fromBlock = 21142252n;
  const toBlock = 23105892n;
  const vaultEvents = await fetchVaultEvents({
    chainId,
    vaultAddress: address,
    toBlock,
  });
  const offChainReferrals = await parseOffchainReferrals(
    "./src/tests/referrals/referral.csv"
  );
  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  const vault = await generateVault({
    vault: {
      address,
      chainId,
    },
  });
  const referree = "0x924359B91Eae607ba539fF6daB5bB914956ae624";
  const referral = "0x8fa4f2d62457bade5eee9206c5fb1c20471b0ea5";
  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
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

  const referral = vaultEvents.referrals.find(
    (ref) => ref.owner.toLowerCase() === user.toLowerCase()
  );
  expect(referral).not.toBe(undefined);

  let events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vault.silo,
      vault: address,
    },
    defaultReferralRateBps: 500,
    defaultRebateRateBps: 1500,
    offChainReferrals: [
      {
        chainId: 0,
        rewardRateBps: 36,
        rebateRateBps: 28,
        referrer: referral?.referral!,
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
      expect(referralConfig?.rewardRateBps).toBe(36);
      expect(referralConfig?.referral).toBe(referral!.referral);
    },
  });
});

import { expect, test } from "bun:test";
import { preprocessEvents } from "core/preprocessEvents";
import { checkStrictBlockNumberMatching } from "core/strictBlockNumberMatching";
import { generateVault } from "core/vault";
import { publicClient } from "lib/publicClient";
import { fetchAllVaultEvents } from "utils/fetchVaultEvents";
import { formatUnits } from "viem";
import { getHistoricBalances } from "./common/historic-balances";

test(
  "check balance match real data after each block",
  async () => {
    const address = "0x07ed467acD4ffd13023046968b0859781cb90D9B";

    const chainId = 1;
    const fromBlock = 21142252n;
    const toBlock = 22624283n;

    const vaultEvents = await fetchAllVaultEvents({
      chainId,
      vaultAddress: address,
      toBlock,
    });
    checkStrictBlockNumberMatching({ events: vaultEvents, fromBlock, toBlock });
    const client = publicClient[chainId];
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
      defaultReferralRateBps: 500,
      defaultRebateRateBps: 1500,
    });

    const historicBalance = await getHistoricBalances({
      events,
      address,
      client,
    });

    vault.processEvents({
      events: events as { __typename: string; blockNumber: bigint }[],
      distributeFeesFromBlock: fromBlock,
      blockEndHook: async (blockNumber: string) => {
        for (const user of vault.getAccountsAddresses()) {
          const account = vault.getAccount(user);
          if (user.toLowerCase() == vault.feeReceiver.toLowerCase()) continue;
          const balance = account.getBalance();

          const realTotal = historicBalance[blockNumber.toString()][user];

          expect(Number(formatUnits(balance, vault.decimals))).toBeCloseTo(
            Number(formatUnits(realTotal, vault.decimals)),
            vault.decimals - 1
          );
        }
      },
    });
  },
  120 * 1000 // this test can be a bit long
);

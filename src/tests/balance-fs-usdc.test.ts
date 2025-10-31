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
    const address = "0x03D1eC0D01b659b89a87eAbb56e4AF5Cb6e14BFc";
    const chainId = 1;
    const fromBlock = 21435682n;
    const toBlock = 22244981n;
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
    });

    const historicBalance = await getHistoricBalances({
      events,
      address,
      client,
    });
    await vault.processEvents({
      events: events as { __typename: string; blockNumber: bigint }[],
      distributeFeesFromBlock: fromBlock,
      blockEndHook: async (blockNumber: string) => {
        for (const user of vault.getAccountsAddresses()) {
          const account = vault.getAccount(user);
          if (user.toLowerCase() == vault.feeReceiver.toLowerCase()) continue;
          const balance = account.getBalance();
          const realTotal = historicBalance[blockNumber][user];

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

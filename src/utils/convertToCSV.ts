export const convertToCSV = (
  vaults: {
    chainId: number;
    address: string;
    pricePerShare: number;
    data: Record<string, { balance: number; fees: number; cashback: number }>;
  }[],
  options: { displayCashback: boolean }
) => {
  const csvRows = [
    `chainId,vault,wallet,balance,fees,pricePerShare${
      options.displayCashback ? ",cashback" : ""
    }`, // CSV header
    ...vaults.flatMap((vault) =>
      Object.entries(vault.data).map(
        ([address, { balance, fees, cashback }]) =>
          `${vault.chainId},${vault.address},${address},${balance},${fees},${
            vault.pricePerShare
          }${options.displayCashback ? `, ${cashback}` : ""}`
      )
    ),
  ];

  return csvRows.join("\n");
};

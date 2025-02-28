export const convertToCSV = (vaults: {
    chainId: bigint,
    address: string,
    pricePerShare: bigint,
    data: Record<string, { balance: bigint, fees: bigint, cashback: bigint }>
}[], options: {displayCashback: boolean}) => {
    const csvRows = [
        `chainId,vault,wallet,balance,fees,pricePerShare${options.displayCashback ? ",cashback" : ''}`, // CSV header
        ...vaults.flatMap((vault) =>
            Object.entries(vault.data).map(([address, { balance, fees, cashback }]) =>
                `${vault.chainId.toString()},${vault.address},${address},${balance.toString()},${fees.toString()},${vault.pricePerShare.toString()}${options.displayCashback ? `, ${cashback}` : ''}`
            )
        )
    ];

    return csvRows.join("\n");
};

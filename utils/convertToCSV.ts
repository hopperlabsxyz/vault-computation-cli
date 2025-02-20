export const convertToCSV = (vaults: {
    chainId: bigint,
    address: string,
    pricePerShare: bigint,
    data: Record<string, { balance: bigint, fees: bigint }>
}[]) => {
    const csvRows = [
        "chainId,vault,wallet,balance,fees,pricePerShare", // CSV header
        ...vaults.flatMap((vault) =>
            Object.entries(vault.data).map(([address, { balance, fees }]) =>
                `${vault.chainId.toString()},${vault.address},${address},${balance.toString()},${fees.toString()},${vault.pricePerShare.toString()}`
            )
        )
    ];

    return csvRows.join("\n");
};

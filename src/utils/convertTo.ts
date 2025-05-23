/**
 * Calculates assets from shares using 4626 vault formula
 * @param shares - Amount of shares to convert
 * @param totalAssets - Total assets in the vault
 * @param totalSupply - Total supply of shares
 * @returns Equivalent amount of assets
 * @dev assets = (shares * (totalAssets + 1)) / (totalSupply + 1)
 * @dev Dividing by 0 is impossible due to +1 in denominator
 */
export function convertToAssets({
  shares,
  totalAssets,
  totalSupply,
}: {
  shares: bigint;
  totalAssets: bigint;
  totalSupply: bigint;
}): bigint {
  return (shares * (totalAssets + 1n)) / (totalSupply + 1n);
}

/**
 * Calculates shares from assets using 4626 vault formula
 * @param assets - Amount of assets to convert
 * @param totalAssets - Total assets in the vault
 * @param totalSupply - Total supply of shares
 * @returns Equivalent amount of shares
 * @dev shares = (assets * (totalSupply + 1)) / (totalAssets + 1)
 * @dev Dividing by 0 is impossible due to +1 in denominator
 */
export function convertToShares({
  assets,
  totalAssets,
  totalSupply,
}: {
  assets: bigint;
  totalAssets: bigint;
  totalSupply: bigint;
}): bigint {
  return (assets * (totalSupply + 1n)) / (totalAssets + 1n);
}

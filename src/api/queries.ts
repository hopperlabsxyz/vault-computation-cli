import { gql } from "graphql-request";

export const PERIOD_FEES_QUERY = gql`
  query PeriodFees(
    $address: Address!
    $chainId: Int!
    $fromBlock: String
    $toBlock: String
  ) {
    periodFees(
      address: $address
      chainId: $chainId
      fromBlock: $fromBlock
      toBlock: $toBlock
    ) {
      chainId
      address
      decimals
      assetDecimals
      entries {
        period
        blockNumber
        managementFees
        performanceFees
        protocolFees
        timestamp
        managementRate
        performanceRate
        pricePerShare
        totalAssets
        totalSupply
      }
      airdrops {
        name
        ppsIncrease
        distributionTimestamp
      }
    }
  }
`;

export const USER_FEES_QUERY = gql`
  query UserFees(
    $address: Address!
    $chainId: Int!
    $fromBlock: String
    $toBlock: String
  ) {
    userFees(
      address: $address
      chainId: $chainId
      fromBlock: $fromBlock
      toBlock: $toBlock
    ) {
      chainId
      address
      pricePerShare
      entries {
        account
        referrer
        balance
        fees
        cashback
      }
    }
  }
`;

export const USER_BALANCES_QUERY = gql`
  query UserBalances($address: Address!, $chainId: Int!, $block: String) {
    userBalances(address: $address, chainId: $chainId, block: $block) {
      chainId
      address
      entries {
        account
        balance
      }
    }
  }
`;

export const USER_POINTS_QUERY = gql`
  query UserPoints($address: Address!, $chainId: Int!) {
    userPoints(address: $address, chainId: $chainId) {
      chainId
      address
      pointNames
      entries {
        account
        points
      }
    }
  }
`;

export const VAULT_EVENTS_SUMMARY_QUERY = gql`
  query VaultEventsSummary(
    $address: Address!
    $chainId: Int!
    $fromBlock: String
    $toBlock: String
  ) {
    vaultEventsSummary(
      address: $address
      chainId: $chainId
      fromBlock: $fromBlock
      toBlock: $toBlock
    ) {
      events {
        blockNumber
        type
        blockTimestamp
      }
    }
  }
`;

export const CLAIMABLE_CONTROLLERS_QUERY = gql`
  query ClaimableControllers($address: Address!, $chainId: Int!) {
    claimableControllers(address: $address, chainId: $chainId)
  }
`;

export const VAULT_BY_ADDRESS_QUERY = gql`
  query VaultByAddress($address: Address!, $chainId: Int!) {
    vaultByAddress(address: $address, chainId: $chainId) {
      address
      airdrops {
        name
        ppsIncrease
        distributionTimestamp
      }
    }
  }
`;

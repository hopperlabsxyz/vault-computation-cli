/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: BigIntish; output: BigIntish; }
  Bytes: { input: `0x${string}`; output: `0x${string}`; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type Approval = {
  __typename?: 'Approval';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  spender: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Approval_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Approval_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Approval_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  spender: InputMaybe<Scalars['Bytes']['input']>;
  spender_contains: InputMaybe<Scalars['Bytes']['input']>;
  spender_gt: InputMaybe<Scalars['Bytes']['input']>;
  spender_gte: InputMaybe<Scalars['Bytes']['input']>;
  spender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  spender_lt: InputMaybe<Scalars['Bytes']['input']>;
  spender_lte: InputMaybe<Scalars['Bytes']['input']>;
  spender_not: InputMaybe<Scalars['Bytes']['input']>;
  spender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  spender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value: InputMaybe<Scalars['BigInt']['input']>;
  value_gt: InputMaybe<Scalars['BigInt']['input']>;
  value_gte: InputMaybe<Scalars['BigInt']['input']>;
  value_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt: InputMaybe<Scalars['BigInt']['input']>;
  value_lte: InputMaybe<Scalars['BigInt']['input']>;
  value_not: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Approval_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  Spender = 'spender',
  TransactionHash = 'transactionHash',
  Value = 'value',
  Vault = 'vault'
}

export type BeaconProxyDeployed = {
  __typename?: 'BeaconProxyDeployed';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deployer: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  proxy: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BeaconProxyDeployed_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<BeaconProxyDeployed_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deployer: InputMaybe<Scalars['Bytes']['input']>;
  deployer_contains: InputMaybe<Scalars['Bytes']['input']>;
  deployer_gt: InputMaybe<Scalars['Bytes']['input']>;
  deployer_gte: InputMaybe<Scalars['Bytes']['input']>;
  deployer_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  deployer_lt: InputMaybe<Scalars['Bytes']['input']>;
  deployer_lte: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<BeaconProxyDeployed_Filter>>>;
  proxy: InputMaybe<Scalars['Bytes']['input']>;
  proxy_contains: InputMaybe<Scalars['Bytes']['input']>;
  proxy_gt: InputMaybe<Scalars['Bytes']['input']>;
  proxy_gte: InputMaybe<Scalars['Bytes']['input']>;
  proxy_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proxy_lt: InputMaybe<Scalars['Bytes']['input']>;
  proxy_lte: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum BeaconProxyDeployed_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Deployer = 'deployer',
  Id = 'id',
  Proxy = 'proxy',
  TransactionHash = 'transactionHash'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']['input']>;
  number: InputMaybe<Scalars['Int']['input']>;
  number_gte: InputMaybe<Scalars['Int']['input']>;
};

export type CustomRateUpdated = {
  __typename?: 'CustomRateUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  isActivated: Scalars['Boolean']['output'];
  logIndex: Scalars['Int']['output'];
  rate: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type CustomRateUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CustomRateUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  isActivated: InputMaybe<Scalars['Boolean']['input']>;
  isActivated_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isActivated_not: InputMaybe<Scalars['Boolean']['input']>;
  isActivated_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<CustomRateUpdated_Filter>>>;
  rate: InputMaybe<Scalars['Int']['input']>;
  rate_gt: InputMaybe<Scalars['Int']['input']>;
  rate_gte: InputMaybe<Scalars['Int']['input']>;
  rate_in: InputMaybe<Array<Scalars['Int']['input']>>;
  rate_lt: InputMaybe<Scalars['Int']['input']>;
  rate_lte: InputMaybe<Scalars['Int']['input']>;
  rate_not: InputMaybe<Scalars['Int']['input']>;
  rate_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum CustomRateUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  IsActivated = 'isActivated',
  LogIndex = 'logIndex',
  Rate = 'rate',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type DefaultLogicUpdated = {
  __typename?: 'DefaultLogicUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newImpl: Scalars['Bytes']['output'];
  previous: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type DefaultLogicUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DefaultLogicUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newImpl: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_contains: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_gt: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_gte: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newImpl_lt: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_lte: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_not: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newImpl_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<DefaultLogicUpdated_Filter>>>;
  previous: InputMaybe<Scalars['Bytes']['input']>;
  previous_contains: InputMaybe<Scalars['Bytes']['input']>;
  previous_gt: InputMaybe<Scalars['Bytes']['input']>;
  previous_gte: InputMaybe<Scalars['Bytes']['input']>;
  previous_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previous_lt: InputMaybe<Scalars['Bytes']['input']>;
  previous_lte: InputMaybe<Scalars['Bytes']['input']>;
  previous_not: InputMaybe<Scalars['Bytes']['input']>;
  previous_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previous_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DefaultLogicUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewImpl = 'newImpl',
  Previous = 'previous',
  TransactionHash = 'transactionHash'
}

export type DefaultRateUpdated = {
  __typename?: 'DefaultRateUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newRate: Scalars['BigInt']['output'];
  oldRate: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type DefaultRateUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DefaultRateUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newRate: InputMaybe<Scalars['BigInt']['input']>;
  newRate_gt: InputMaybe<Scalars['BigInt']['input']>;
  newRate_gte: InputMaybe<Scalars['BigInt']['input']>;
  newRate_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newRate_lt: InputMaybe<Scalars['BigInt']['input']>;
  newRate_lte: InputMaybe<Scalars['BigInt']['input']>;
  newRate_not: InputMaybe<Scalars['BigInt']['input']>;
  newRate_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldRate: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_gt: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_gte: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldRate_lt: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_lte: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_not: InputMaybe<Scalars['BigInt']['input']>;
  oldRate_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or: InputMaybe<Array<InputMaybe<DefaultRateUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DefaultRateUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewRate = 'newRate',
  OldRate = 'oldRate',
  TransactionHash = 'transactionHash'
}

export type Deposit = {
  __typename?: 'Deposit';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  shares: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type DepositRequest = {
  __typename?: 'DepositRequest';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  controller: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  requestId: Scalars['BigInt']['output'];
  sender: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type DepositRequestCanceled = {
  __typename?: 'DepositRequestCanceled';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  controller: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  requestId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type DepositRequestCanceled_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DepositRequestCanceled_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  controller: InputMaybe<Scalars['Bytes']['input']>;
  controller_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_gt: InputMaybe<Scalars['Bytes']['input']>;
  controller_gte: InputMaybe<Scalars['Bytes']['input']>;
  controller_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_lt: InputMaybe<Scalars['Bytes']['input']>;
  controller_lte: InputMaybe<Scalars['Bytes']['input']>;
  controller_not: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<DepositRequestCanceled_Filter>>>;
  requestId: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_lt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DepositRequestCanceled_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Controller = 'controller',
  Id = 'id',
  LogIndex = 'logIndex',
  RequestId = 'requestId',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type DepositRequest_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DepositRequest_Filter>>>;
  assets: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte: InputMaybe<Scalars['BigInt']['input']>;
  assets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte: InputMaybe<Scalars['BigInt']['input']>;
  assets_not: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  controller: InputMaybe<Scalars['Bytes']['input']>;
  controller_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_gt: InputMaybe<Scalars['Bytes']['input']>;
  controller_gte: InputMaybe<Scalars['Bytes']['input']>;
  controller_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_lt: InputMaybe<Scalars['Bytes']['input']>;
  controller_lte: InputMaybe<Scalars['Bytes']['input']>;
  controller_not: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<DepositRequest_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  requestId: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_lt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sender: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte: InputMaybe<Scalars['Bytes']['input']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte: InputMaybe<Scalars['Bytes']['input']>;
  sender_not: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DepositRequest_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Controller = 'controller',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  RequestId = 'requestId',
  Sender = 'sender',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type DepositSync = {
  __typename?: 'DepositSync';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  shares: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type DepositSync_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DepositSync_Filter>>>;
  assets: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte: InputMaybe<Scalars['BigInt']['input']>;
  assets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte: InputMaybe<Scalars['BigInt']['input']>;
  assets_not: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<DepositSync_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte: InputMaybe<Scalars['Bytes']['input']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte: InputMaybe<Scalars['Bytes']['input']>;
  sender_not: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  shares: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte: InputMaybe<Scalars['BigInt']['input']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte: InputMaybe<Scalars['BigInt']['input']>;
  shares_not: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DepositSync_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  Sender = 'sender',
  Shares = 'shares',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Deposit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  assets: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte: InputMaybe<Scalars['BigInt']['input']>;
  assets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte: InputMaybe<Scalars['BigInt']['input']>;
  assets_not: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte: InputMaybe<Scalars['Bytes']['input']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte: InputMaybe<Scalars['Bytes']['input']>;
  sender_not: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  shares: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte: InputMaybe<Scalars['BigInt']['input']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte: InputMaybe<Scalars['BigInt']['input']>;
  shares_not: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Deposit_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  Sender = 'sender',
  Shares = 'shares',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type FactoryOwnershipTransferred = {
  __typename?: 'FactoryOwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FactoryOwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<FactoryOwnershipTransferred_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<FactoryOwnershipTransferred_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FactoryOwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

export type FeeReceiverUpdated = {
  __typename?: 'FeeReceiverUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newReceiver: Scalars['Bytes']['output'];
  oldReceiver: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type FeeReceiverUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<FeeReceiverUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newReceiver: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_contains: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_gt: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_gte: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newReceiver_lt: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_lte: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldReceiver: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_gt: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_gte: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldReceiver_lt: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_lte: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<FeeReceiverUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FeeReceiverUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewReceiver = 'newReceiver',
  OldReceiver = 'oldReceiver',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type HighWaterMarkUpdated = {
  __typename?: 'HighWaterMarkUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newHighWaterMark: Scalars['BigInt']['output'];
  oldHighWaterMark: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type HighWaterMarkUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<HighWaterMarkUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newHighWaterMark: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_gt: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_gte: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newHighWaterMark_lt: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_lte: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_not: InputMaybe<Scalars['BigInt']['input']>;
  newHighWaterMark_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldHighWaterMark: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_gt: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_gte: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldHighWaterMark_lt: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_lte: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_not: InputMaybe<Scalars['BigInt']['input']>;
  oldHighWaterMark_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or: InputMaybe<Array<InputMaybe<HighWaterMarkUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum HighWaterMarkUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewHighWaterMark = 'newHighWaterMark',
  OldHighWaterMark = 'oldHighWaterMark',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Initialized = {
  __typename?: 'Initialized';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
  version: Scalars['BigInt']['output'];
};

export type Initialized_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Initialized_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Initialized_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  version: InputMaybe<Scalars['BigInt']['input']>;
  version_gt: InputMaybe<Scalars['BigInt']['input']>;
  version_gte: InputMaybe<Scalars['BigInt']['input']>;
  version_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_lt: InputMaybe<Scalars['BigInt']['input']>;
  version_lte: InputMaybe<Scalars['BigInt']['input']>;
  version_not: InputMaybe<Scalars['BigInt']['input']>;
  version_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Initialized_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Vault = 'vault',
  Version = 'version'
}

export type LogicAdded = {
  __typename?: 'LogicAdded';
  Logic: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type LogicAdded_Filter = {
  Logic: InputMaybe<Scalars['Bytes']['input']>;
  Logic_contains: InputMaybe<Scalars['Bytes']['input']>;
  Logic_gt: InputMaybe<Scalars['Bytes']['input']>;
  Logic_gte: InputMaybe<Scalars['Bytes']['input']>;
  Logic_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  Logic_lt: InputMaybe<Scalars['Bytes']['input']>;
  Logic_lte: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<LogicAdded_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<LogicAdded_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum LogicAdded_OrderBy {
  Logic = 'Logic',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash'
}

export type LogicRemoved = {
  __typename?: 'LogicRemoved';
  Logic: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type LogicRemoved_Filter = {
  Logic: InputMaybe<Scalars['Bytes']['input']>;
  Logic_contains: InputMaybe<Scalars['Bytes']['input']>;
  Logic_gt: InputMaybe<Scalars['Bytes']['input']>;
  Logic_gte: InputMaybe<Scalars['Bytes']['input']>;
  Logic_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  Logic_lt: InputMaybe<Scalars['Bytes']['input']>;
  Logic_lte: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  Logic_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<LogicRemoved_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<LogicRemoved_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum LogicRemoved_OrderBy {
  Logic = 'Logic',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash'
}

export type NewTotalAssetsUpdated = {
  __typename?: 'NewTotalAssetsUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  totalAssets: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type NewTotalAssetsUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<NewTotalAssetsUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<NewTotalAssetsUpdated_Filter>>>;
  totalAssets: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum NewTotalAssetsUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type OperatorSet = {
  __typename?: 'OperatorSet';
  approved: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  controller: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  operator: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type OperatorSet_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<OperatorSet_Filter>>>;
  approved: InputMaybe<Scalars['Boolean']['input']>;
  approved_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approved_not: InputMaybe<Scalars['Boolean']['input']>;
  approved_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  controller: InputMaybe<Scalars['Bytes']['input']>;
  controller_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_gt: InputMaybe<Scalars['Bytes']['input']>;
  controller_gte: InputMaybe<Scalars['Bytes']['input']>;
  controller_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_lt: InputMaybe<Scalars['Bytes']['input']>;
  controller_lte: InputMaybe<Scalars['Bytes']['input']>;
  controller_not: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  operator: InputMaybe<Scalars['Bytes']['input']>;
  operator_contains: InputMaybe<Scalars['Bytes']['input']>;
  operator_gt: InputMaybe<Scalars['Bytes']['input']>;
  operator_gte: InputMaybe<Scalars['Bytes']['input']>;
  operator_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_lt: InputMaybe<Scalars['Bytes']['input']>;
  operator_lte: InputMaybe<Scalars['Bytes']['input']>;
  operator_not: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<OperatorSet_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OperatorSet_OrderBy {
  Approved = 'approved',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Controller = 'controller',
  Id = 'id',
  LogIndex = 'logIndex',
  Operator = 'operator',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type OptinProxyFactoryInitialized = {
  __typename?: 'OptinProxyFactoryInitialized';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  version: Scalars['BigInt']['output'];
};

export type OptinProxyFactoryInitialized_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<OptinProxyFactoryInitialized_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<OptinProxyFactoryInitialized_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  version: InputMaybe<Scalars['BigInt']['input']>;
  version_gt: InputMaybe<Scalars['BigInt']['input']>;
  version_gte: InputMaybe<Scalars['BigInt']['input']>;
  version_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_lt: InputMaybe<Scalars['BigInt']['input']>;
  version_lte: InputMaybe<Scalars['BigInt']['input']>;
  version_not: InputMaybe<Scalars['BigInt']['input']>;
  version_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum OptinProxyFactoryInitialized_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Version = 'version'
}

export type OptinProxyFactoryOwnershipTransferred = {
  __typename?: 'OptinProxyFactoryOwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type OptinProxyFactoryOwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<OptinProxyFactoryOwnershipTransferred_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<OptinProxyFactoryOwnershipTransferred_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OptinProxyFactoryOwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OwnershipTransferStarted = {
  __typename?: 'OwnershipTransferStarted';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type OwnershipTransferStarted_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<OwnershipTransferStarted_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<OwnershipTransferStarted_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OwnershipTransferStarted_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type OwnershipTransferred = {
  __typename?: 'OwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type OwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Paused = {
  __typename?: 'Paused';
  account: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Paused_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['Bytes']['input']>;
  account_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_gt: InputMaybe<Scalars['Bytes']['input']>;
  account_gte: InputMaybe<Scalars['Bytes']['input']>;
  account_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_lt: InputMaybe<Scalars['Bytes']['input']>;
  account_lte: InputMaybe<Scalars['Bytes']['input']>;
  account_not: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and: InputMaybe<Array<InputMaybe<Paused_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Paused_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Paused_OrderBy {
  Account = 'account',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type PeriodCount = {
  __typename?: 'PeriodCount';
  id: Scalars['Bytes']['output'];
  periodCount: Scalars['BigInt']['output'];
};

export type PeriodCount_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<PeriodCount_Filter>>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<PeriodCount_Filter>>>;
  periodCount: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periodCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_not: InputMaybe<Scalars['BigInt']['input']>;
  periodCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum PeriodCount_OrderBy {
  Id = 'id',
  PeriodCount = 'periodCount'
}

export type PeriodSummary = {
  __typename?: 'PeriodSummary';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  duration: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  netTotalSupplyAtEnd: Scalars['BigInt']['output'];
  totalAssetsAtEnd: Scalars['BigInt']['output'];
  totalAssetsAtStart: Scalars['BigInt']['output'];
  totalSupplyAtEnd: Scalars['BigInt']['output'];
  totalSupplyAtStart: Scalars['BigInt']['output'];
  vault: Scalars['Bytes']['output'];
};

export type PeriodSummary_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<PeriodSummary_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte: InputMaybe<Scalars['BigInt']['input']>;
  duration_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_lt: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte: InputMaybe<Scalars['BigInt']['input']>;
  duration_not: InputMaybe<Scalars['BigInt']['input']>;
  duration_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  netTotalSupplyAtEnd: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_gt: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_gte: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  netTotalSupplyAtEnd_lt: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_lte: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_not: InputMaybe<Scalars['BigInt']['input']>;
  netTotalSupplyAtEnd_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or: InputMaybe<Array<InputMaybe<PeriodSummary_Filter>>>;
  totalAssetsAtEnd: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssetsAtEnd_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtEnd_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssetsAtStart: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssetsAtStart_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsAtStart_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyAtEnd: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyAtEnd_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtEnd_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyAtStart: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyAtStart_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyAtStart_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum PeriodSummary_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Duration = 'duration',
  Id = 'id',
  NetTotalSupplyAtEnd = 'netTotalSupplyAtEnd',
  TotalAssetsAtEnd = 'totalAssetsAtEnd',
  TotalAssetsAtStart = 'totalAssetsAtStart',
  TotalSupplyAtEnd = 'totalSupplyAtEnd',
  TotalSupplyAtStart = 'totalSupplyAtStart',
  Vault = 'vault'
}

export type ProtocolFeeReceiverUpdated = {
  __typename?: 'ProtocolFeeReceiverUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newReceiver: Scalars['Bytes']['output'];
  oldReceiver: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProtocolFeeReceiverUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProtocolFeeReceiverUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newReceiver: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_contains: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_gt: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_gte: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newReceiver_lt: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_lte: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newReceiver_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldReceiver: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_gt: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_gte: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldReceiver_lt: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_lte: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldReceiver_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProtocolFeeReceiverUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProtocolFeeReceiverUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewReceiver = 'newReceiver',
  OldReceiver = 'oldReceiver',
  TransactionHash = 'transactionHash'
}

export type ProtocolRegistryInitialized = {
  __typename?: 'ProtocolRegistryInitialized';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  version: Scalars['BigInt']['output'];
};

export type ProtocolRegistryInitialized_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProtocolRegistryInitialized_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProtocolRegistryInitialized_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  version: InputMaybe<Scalars['BigInt']['input']>;
  version_gt: InputMaybe<Scalars['BigInt']['input']>;
  version_gte: InputMaybe<Scalars['BigInt']['input']>;
  version_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_lt: InputMaybe<Scalars['BigInt']['input']>;
  version_lte: InputMaybe<Scalars['BigInt']['input']>;
  version_not: InputMaybe<Scalars['BigInt']['input']>;
  version_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ProtocolRegistryInitialized_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Version = 'version'
}

export type ProtocolRegistryOwnershipTransferStarted = {
  __typename?: 'ProtocolRegistryOwnershipTransferStarted';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProtocolRegistryOwnershipTransferStarted_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProtocolRegistryOwnershipTransferStarted_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProtocolRegistryOwnershipTransferStarted_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProtocolRegistryOwnershipTransferStarted_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

export type ProtocolRegistryOwnershipTransferred = {
  __typename?: 'ProtocolRegistryOwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProtocolRegistryOwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProtocolRegistryOwnershipTransferred_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newOwner: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProtocolRegistryOwnershipTransferred_Filter>>>;
  previousOwner: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProtocolRegistryOwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

export type ProxyDeployed = {
  __typename?: 'ProxyDeployed';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deployer: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  proxy: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProxyDeployed_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProxyDeployed_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deployer: InputMaybe<Scalars['Bytes']['input']>;
  deployer_contains: InputMaybe<Scalars['Bytes']['input']>;
  deployer_gt: InputMaybe<Scalars['Bytes']['input']>;
  deployer_gte: InputMaybe<Scalars['Bytes']['input']>;
  deployer_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  deployer_lt: InputMaybe<Scalars['Bytes']['input']>;
  deployer_lte: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  deployer_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProxyDeployed_Filter>>>;
  proxy: InputMaybe<Scalars['Bytes']['input']>;
  proxy_contains: InputMaybe<Scalars['Bytes']['input']>;
  proxy_gt: InputMaybe<Scalars['Bytes']['input']>;
  proxy_gte: InputMaybe<Scalars['Bytes']['input']>;
  proxy_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proxy_lt: InputMaybe<Scalars['Bytes']['input']>;
  proxy_lte: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  proxy_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProxyDeployed_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Deployer = 'deployer',
  Id = 'id',
  Proxy = 'proxy',
  TransactionHash = 'transactionHash'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  approval: Maybe<Approval>;
  approvals: Array<Approval>;
  beaconProxyDeployed: Maybe<BeaconProxyDeployed>;
  beaconProxyDeployeds: Array<BeaconProxyDeployed>;
  customRateUpdated: Maybe<CustomRateUpdated>;
  customRateUpdateds: Array<CustomRateUpdated>;
  defaultLogicUpdated: Maybe<DefaultLogicUpdated>;
  defaultLogicUpdateds: Array<DefaultLogicUpdated>;
  defaultRateUpdated: Maybe<DefaultRateUpdated>;
  defaultRateUpdateds: Array<DefaultRateUpdated>;
  deposit: Maybe<Deposit>;
  depositRequest: Maybe<DepositRequest>;
  depositRequestCanceled: Maybe<DepositRequestCanceled>;
  depositRequestCanceleds: Array<DepositRequestCanceled>;
  depositRequests: Array<DepositRequest>;
  depositSync: Maybe<DepositSync>;
  depositSyncs: Array<DepositSync>;
  deposits: Array<Deposit>;
  factoryOwnershipTransferred: Maybe<FactoryOwnershipTransferred>;
  factoryOwnershipTransferreds: Array<FactoryOwnershipTransferred>;
  feeReceiverUpdated: Maybe<FeeReceiverUpdated>;
  feeReceiverUpdateds: Array<FeeReceiverUpdated>;
  highWaterMarkUpdated: Maybe<HighWaterMarkUpdated>;
  highWaterMarkUpdateds: Array<HighWaterMarkUpdated>;
  initialized: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  logicAdded: Maybe<LogicAdded>;
  logicAddeds: Array<LogicAdded>;
  logicRemoved: Maybe<LogicRemoved>;
  logicRemoveds: Array<LogicRemoved>;
  newTotalAssetsUpdated: Maybe<NewTotalAssetsUpdated>;
  newTotalAssetsUpdateds: Array<NewTotalAssetsUpdated>;
  operatorSet: Maybe<OperatorSet>;
  operatorSets: Array<OperatorSet>;
  optinProxyFactoryInitialized: Maybe<OptinProxyFactoryInitialized>;
  optinProxyFactoryInitializeds: Array<OptinProxyFactoryInitialized>;
  optinProxyFactoryOwnershipTransferred: Maybe<OptinProxyFactoryOwnershipTransferred>;
  optinProxyFactoryOwnershipTransferreds: Array<OptinProxyFactoryOwnershipTransferred>;
  ownershipTransferStarted: Maybe<OwnershipTransferStarted>;
  ownershipTransferStarteds: Array<OwnershipTransferStarted>;
  ownershipTransferred: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  paused: Maybe<Paused>;
  pauseds: Array<Paused>;
  periodCount: Maybe<PeriodCount>;
  periodCounts: Array<PeriodCount>;
  periodSummaries: Array<PeriodSummary>;
  periodSummary: Maybe<PeriodSummary>;
  protocolFeeReceiverUpdated: Maybe<ProtocolFeeReceiverUpdated>;
  protocolFeeReceiverUpdateds: Array<ProtocolFeeReceiverUpdated>;
  protocolRegistryInitialized: Maybe<ProtocolRegistryInitialized>;
  protocolRegistryInitializeds: Array<ProtocolRegistryInitialized>;
  protocolRegistryOwnershipTransferStarted: Maybe<ProtocolRegistryOwnershipTransferStarted>;
  protocolRegistryOwnershipTransferStarteds: Array<ProtocolRegistryOwnershipTransferStarted>;
  protocolRegistryOwnershipTransferred: Maybe<ProtocolRegistryOwnershipTransferred>;
  protocolRegistryOwnershipTransferreds: Array<ProtocolRegistryOwnershipTransferred>;
  proxyDeployed: Maybe<ProxyDeployed>;
  proxyDeployeds: Array<ProxyDeployed>;
  ratesUpdated: Maybe<RatesUpdated>;
  ratesUpdateds: Array<RatesUpdated>;
  redeemRequest: Maybe<RedeemRequest>;
  redeemRequests: Array<RedeemRequest>;
  referral: Maybe<Referral>;
  referrals: Array<Referral>;
  settleDeposit: Maybe<SettleDeposit>;
  settleDeposits: Array<SettleDeposit>;
  settleRedeem: Maybe<SettleRedeem>;
  settleRedeems: Array<SettleRedeem>;
  stateUpdated: Maybe<StateUpdated>;
  stateUpdateds: Array<StateUpdated>;
  totalAssetsUpdated: Maybe<TotalAssetsUpdated>;
  totalAssetsUpdateds: Array<TotalAssetsUpdated>;
  totalSupplies: Array<TotalSupply>;
  totalSupply: Maybe<TotalSupply>;
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  unpaused: Maybe<Unpaused>;
  unpauseds: Array<Unpaused>;
  upgraded: Maybe<Upgraded>;
  upgradeds: Array<Upgraded>;
  valuationManagerUpdated: Maybe<ValuationManagerUpdated>;
  valuationManagerUpdateds: Array<ValuationManagerUpdated>;
  vaultState: Maybe<VaultState>;
  vaultStates: Array<VaultState>;
  whitelistDisabled: Maybe<WhitelistDisabled>;
  whitelistDisableds: Array<WhitelistDisabled>;
  whitelistManagerUpdated: Maybe<WhitelistManagerUpdated>;
  whitelistManagerUpdateds: Array<WhitelistManagerUpdated>;
  whitelistUpdated: Maybe<WhitelistUpdated>;
  whitelistUpdateds: Array<WhitelistUpdated>;
  withdraw: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryApprovalArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryApprovalsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Approval_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Approval_Filter>;
};


export type QueryBeaconProxyDeployedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBeaconProxyDeployedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<BeaconProxyDeployed_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<BeaconProxyDeployed_Filter>;
};


export type QueryCustomRateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCustomRateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<CustomRateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CustomRateUpdated_Filter>;
};


export type QueryDefaultLogicUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDefaultLogicUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DefaultLogicUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DefaultLogicUpdated_Filter>;
};


export type QueryDefaultRateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDefaultRateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DefaultRateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DefaultRateUpdated_Filter>;
};


export type QueryDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositRequestArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositRequestCanceledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositRequestCanceledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositRequestCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositRequestCanceled_Filter>;
};


export type QueryDepositRequestsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositRequest_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositRequest_Filter>;
};


export type QueryDepositSyncArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositSyncsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositSync_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositSync_Filter>;
};


export type QueryDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
};


export type QueryFactoryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFactoryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<FactoryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<FactoryOwnershipTransferred_Filter>;
};


export type QueryFeeReceiverUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeReceiverUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<FeeReceiverUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<FeeReceiverUpdated_Filter>;
};


export type QueryHighWaterMarkUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHighWaterMarkUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<HighWaterMarkUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<HighWaterMarkUpdated_Filter>;
};


export type QueryInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Initialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Initialized_Filter>;
};


export type QueryLogicAddedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLogicAddedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LogicAdded_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LogicAdded_Filter>;
};


export type QueryLogicRemovedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLogicRemovedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LogicRemoved_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LogicRemoved_Filter>;
};


export type QueryNewTotalAssetsUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNewTotalAssetsUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<NewTotalAssetsUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<NewTotalAssetsUpdated_Filter>;
};


export type QueryOperatorSetArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOperatorSetsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OperatorSet_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OperatorSet_Filter>;
};


export type QueryOptinProxyFactoryInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOptinProxyFactoryInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OptinProxyFactoryInitialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OptinProxyFactoryInitialized_Filter>;
};


export type QueryOptinProxyFactoryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOptinProxyFactoryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OptinProxyFactoryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OptinProxyFactoryOwnershipTransferred_Filter>;
};


export type QueryOwnershipTransferStartedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOwnershipTransferStartedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OwnershipTransferStarted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OwnershipTransferStarted_Filter>;
};


export type QueryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OwnershipTransferred_Filter>;
};


export type QueryPausedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPausedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Paused_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Paused_Filter>;
};


export type QueryPeriodCountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPeriodCountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<PeriodCount_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PeriodCount_Filter>;
};


export type QueryPeriodSummariesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<PeriodSummary_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PeriodSummary_Filter>;
};


export type QueryPeriodSummaryArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolFeeReceiverUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolFeeReceiverUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolFeeReceiverUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolFeeReceiverUpdated_Filter>;
};


export type QueryProtocolRegistryInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolRegistryInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryInitialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryInitialized_Filter>;
};


export type QueryProtocolRegistryOwnershipTransferStartedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolRegistryOwnershipTransferStartedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryOwnershipTransferStarted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryOwnershipTransferStarted_Filter>;
};


export type QueryProtocolRegistryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolRegistryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryOwnershipTransferred_Filter>;
};


export type QueryProxyDeployedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProxyDeployedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProxyDeployed_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProxyDeployed_Filter>;
};


export type QueryRatesUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRatesUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RatesUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RatesUpdated_Filter>;
};


export type QueryRedeemRequestArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRedeemRequestsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RedeemRequest_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RedeemRequest_Filter>;
};


export type QueryReferralArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryReferralsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Referral_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Referral_Filter>;
};


export type QuerySettleDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySettleDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<SettleDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SettleDeposit_Filter>;
};


export type QuerySettleRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySettleRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<SettleRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SettleRedeem_Filter>;
};


export type QueryStateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<StateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<StateUpdated_Filter>;
};


export type QueryTotalAssetsUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTotalAssetsUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TotalAssetsUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TotalAssetsUpdated_Filter>;
};


export type QueryTotalSuppliesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TotalSupply_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TotalSupply_Filter>;
};


export type QueryTotalSupplyArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransferArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transfer_Filter>;
};


export type QueryUnpausedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnpausedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Unpaused_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Unpaused_Filter>;
};


export type QueryUpgradedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUpgradedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Upgraded_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Upgraded_Filter>;
};


export type QueryValuationManagerUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryValuationManagerUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ValuationManagerUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ValuationManagerUpdated_Filter>;
};


export type QueryVaultStateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultStatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VaultState_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VaultState_Filter>;
};


export type QueryWhitelistDisabledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWhitelistDisabledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistDisabled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistDisabled_Filter>;
};


export type QueryWhitelistManagerUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWhitelistManagerUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistManagerUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistManagerUpdated_Filter>;
};


export type QueryWhitelistUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWhitelistUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistUpdated_Filter>;
};


export type QueryWithdrawArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Withdraw_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Withdraw_Filter>;
};

export type RatesUpdated = {
  __typename?: 'RatesUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newRate_managementRate: Scalars['Int']['output'];
  newRate_performanceRate: Scalars['Int']['output'];
  oldRates_managementRate: Scalars['Int']['output'];
  oldRates_performanceRate: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type RatesUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<RatesUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newRate_managementRate: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_gt: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_gte: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newRate_managementRate_lt: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_lte: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_not: InputMaybe<Scalars['Int']['input']>;
  newRate_managementRate_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newRate_performanceRate: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_gt: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_gte: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newRate_performanceRate_lt: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_lte: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_not: InputMaybe<Scalars['Int']['input']>;
  newRate_performanceRate_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  oldRates_managementRate: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_gt: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_gte: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_in: InputMaybe<Array<Scalars['Int']['input']>>;
  oldRates_managementRate_lt: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_lte: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_not: InputMaybe<Scalars['Int']['input']>;
  oldRates_managementRate_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  oldRates_performanceRate: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_gt: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_gte: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_in: InputMaybe<Array<Scalars['Int']['input']>>;
  oldRates_performanceRate_lt: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_lte: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_not: InputMaybe<Scalars['Int']['input']>;
  oldRates_performanceRate_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<RatesUpdated_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum RatesUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewRateManagementRate = 'newRate_managementRate',
  NewRatePerformanceRate = 'newRate_performanceRate',
  OldRatesManagementRate = 'oldRates_managementRate',
  OldRatesPerformanceRate = 'oldRates_performanceRate',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type RedeemRequest = {
  __typename?: 'RedeemRequest';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  controller: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  requestId: Scalars['BigInt']['output'];
  sender: Scalars['Bytes']['output'];
  shares: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type RedeemRequest_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<RedeemRequest_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  controller: InputMaybe<Scalars['Bytes']['input']>;
  controller_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_gt: InputMaybe<Scalars['Bytes']['input']>;
  controller_gte: InputMaybe<Scalars['Bytes']['input']>;
  controller_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_lt: InputMaybe<Scalars['Bytes']['input']>;
  controller_lte: InputMaybe<Scalars['Bytes']['input']>;
  controller_not: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<RedeemRequest_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  requestId: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_lt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sender: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte: InputMaybe<Scalars['Bytes']['input']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte: InputMaybe<Scalars['Bytes']['input']>;
  sender_not: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  shares: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte: InputMaybe<Scalars['BigInt']['input']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte: InputMaybe<Scalars['BigInt']['input']>;
  shares_not: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum RedeemRequest_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Controller = 'controller',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  RequestId = 'requestId',
  Sender = 'sender',
  Shares = 'shares',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Referral = {
  __typename?: 'Referral';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  referral: Scalars['Bytes']['output'];
  requestId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Referral_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Referral_Filter>>>;
  assets: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte: InputMaybe<Scalars['BigInt']['input']>;
  assets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte: InputMaybe<Scalars['BigInt']['input']>;
  assets_not: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Referral_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  referral: InputMaybe<Scalars['Bytes']['input']>;
  referral_contains: InputMaybe<Scalars['Bytes']['input']>;
  referral_gt: InputMaybe<Scalars['Bytes']['input']>;
  referral_gte: InputMaybe<Scalars['Bytes']['input']>;
  referral_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  referral_lt: InputMaybe<Scalars['Bytes']['input']>;
  referral_lte: InputMaybe<Scalars['Bytes']['input']>;
  referral_not: InputMaybe<Scalars['Bytes']['input']>;
  referral_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  referral_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  requestId: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_lt: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Referral_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  Referral = 'referral',
  RequestId = 'requestId',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type SettleDeposit = {
  __typename?: 'SettleDeposit';
  assetsDeposited: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  epochId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  settledId: Scalars['BigInt']['output'];
  sharesMinted: Scalars['BigInt']['output'];
  totalAssets: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type SettleDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<SettleDeposit_Filter>>>;
  assetsDeposited: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_gt: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_gte: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetsDeposited_lt: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_lte: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_not: InputMaybe<Scalars['BigInt']['input']>;
  assetsDeposited_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  epochId: InputMaybe<Scalars['BigInt']['input']>;
  epochId_gt: InputMaybe<Scalars['BigInt']['input']>;
  epochId_gte: InputMaybe<Scalars['BigInt']['input']>;
  epochId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  epochId_lt: InputMaybe<Scalars['BigInt']['input']>;
  epochId_lte: InputMaybe<Scalars['BigInt']['input']>;
  epochId_not: InputMaybe<Scalars['BigInt']['input']>;
  epochId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<SettleDeposit_Filter>>>;
  settledId: InputMaybe<Scalars['BigInt']['input']>;
  settledId_gt: InputMaybe<Scalars['BigInt']['input']>;
  settledId_gte: InputMaybe<Scalars['BigInt']['input']>;
  settledId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledId_lt: InputMaybe<Scalars['BigInt']['input']>;
  settledId_lte: InputMaybe<Scalars['BigInt']['input']>;
  settledId_not: InputMaybe<Scalars['BigInt']['input']>;
  settledId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesMinted: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_gt: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_gte: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesMinted_lt: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_lte: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_not: InputMaybe<Scalars['BigInt']['input']>;
  sharesMinted_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum SettleDeposit_OrderBy {
  AssetsDeposited = 'assetsDeposited',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  EpochId = 'epochId',
  Id = 'id',
  LogIndex = 'logIndex',
  SettledId = 'settledId',
  SharesMinted = 'sharesMinted',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type SettleRedeem = {
  __typename?: 'SettleRedeem';
  assetsWithdrawed: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  epochId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  settledId: Scalars['BigInt']['output'];
  sharesBurned: Scalars['BigInt']['output'];
  totalAssets: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type SettleRedeem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<SettleRedeem_Filter>>>;
  assetsWithdrawed: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_gt: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_gte: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetsWithdrawed_lt: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_lte: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_not: InputMaybe<Scalars['BigInt']['input']>;
  assetsWithdrawed_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  epochId: InputMaybe<Scalars['BigInt']['input']>;
  epochId_gt: InputMaybe<Scalars['BigInt']['input']>;
  epochId_gte: InputMaybe<Scalars['BigInt']['input']>;
  epochId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  epochId_lt: InputMaybe<Scalars['BigInt']['input']>;
  epochId_lte: InputMaybe<Scalars['BigInt']['input']>;
  epochId_not: InputMaybe<Scalars['BigInt']['input']>;
  epochId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<SettleRedeem_Filter>>>;
  settledId: InputMaybe<Scalars['BigInt']['input']>;
  settledId_gt: InputMaybe<Scalars['BigInt']['input']>;
  settledId_gte: InputMaybe<Scalars['BigInt']['input']>;
  settledId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledId_lt: InputMaybe<Scalars['BigInt']['input']>;
  settledId_lte: InputMaybe<Scalars['BigInt']['input']>;
  settledId_not: InputMaybe<Scalars['BigInt']['input']>;
  settledId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesBurned: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_gt: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_gte: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesBurned_lt: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_lte: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_not: InputMaybe<Scalars['BigInt']['input']>;
  sharesBurned_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum SettleRedeem_OrderBy {
  AssetsWithdrawed = 'assetsWithdrawed',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  EpochId = 'epochId',
  Id = 'id',
  LogIndex = 'logIndex',
  SettledId = 'settledId',
  SharesBurned = 'sharesBurned',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type StateUpdated = {
  __typename?: 'StateUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  state: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type StateUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<StateUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<StateUpdated_Filter>>>;
  state: InputMaybe<Scalars['Int']['input']>;
  state_gt: InputMaybe<Scalars['Int']['input']>;
  state_gte: InputMaybe<Scalars['Int']['input']>;
  state_in: InputMaybe<Array<Scalars['Int']['input']>>;
  state_lt: InputMaybe<Scalars['Int']['input']>;
  state_lte: InputMaybe<Scalars['Int']['input']>;
  state_not: InputMaybe<Scalars['Int']['input']>;
  state_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum StateUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  State = 'state',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  approval: Maybe<Approval>;
  approvals: Array<Approval>;
  beaconProxyDeployed: Maybe<BeaconProxyDeployed>;
  beaconProxyDeployeds: Array<BeaconProxyDeployed>;
  customRateUpdated: Maybe<CustomRateUpdated>;
  customRateUpdateds: Array<CustomRateUpdated>;
  defaultLogicUpdated: Maybe<DefaultLogicUpdated>;
  defaultLogicUpdateds: Array<DefaultLogicUpdated>;
  defaultRateUpdated: Maybe<DefaultRateUpdated>;
  defaultRateUpdateds: Array<DefaultRateUpdated>;
  deposit: Maybe<Deposit>;
  depositRequest: Maybe<DepositRequest>;
  depositRequestCanceled: Maybe<DepositRequestCanceled>;
  depositRequestCanceleds: Array<DepositRequestCanceled>;
  depositRequests: Array<DepositRequest>;
  depositSync: Maybe<DepositSync>;
  depositSyncs: Array<DepositSync>;
  deposits: Array<Deposit>;
  factoryOwnershipTransferred: Maybe<FactoryOwnershipTransferred>;
  factoryOwnershipTransferreds: Array<FactoryOwnershipTransferred>;
  feeReceiverUpdated: Maybe<FeeReceiverUpdated>;
  feeReceiverUpdateds: Array<FeeReceiverUpdated>;
  highWaterMarkUpdated: Maybe<HighWaterMarkUpdated>;
  highWaterMarkUpdateds: Array<HighWaterMarkUpdated>;
  initialized: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  logicAdded: Maybe<LogicAdded>;
  logicAddeds: Array<LogicAdded>;
  logicRemoved: Maybe<LogicRemoved>;
  logicRemoveds: Array<LogicRemoved>;
  newTotalAssetsUpdated: Maybe<NewTotalAssetsUpdated>;
  newTotalAssetsUpdateds: Array<NewTotalAssetsUpdated>;
  operatorSet: Maybe<OperatorSet>;
  operatorSets: Array<OperatorSet>;
  optinProxyFactoryInitialized: Maybe<OptinProxyFactoryInitialized>;
  optinProxyFactoryInitializeds: Array<OptinProxyFactoryInitialized>;
  optinProxyFactoryOwnershipTransferred: Maybe<OptinProxyFactoryOwnershipTransferred>;
  optinProxyFactoryOwnershipTransferreds: Array<OptinProxyFactoryOwnershipTransferred>;
  ownershipTransferStarted: Maybe<OwnershipTransferStarted>;
  ownershipTransferStarteds: Array<OwnershipTransferStarted>;
  ownershipTransferred: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  paused: Maybe<Paused>;
  pauseds: Array<Paused>;
  periodCount: Maybe<PeriodCount>;
  periodCounts: Array<PeriodCount>;
  periodSummaries: Array<PeriodSummary>;
  periodSummary: Maybe<PeriodSummary>;
  protocolFeeReceiverUpdated: Maybe<ProtocolFeeReceiverUpdated>;
  protocolFeeReceiverUpdateds: Array<ProtocolFeeReceiverUpdated>;
  protocolRegistryInitialized: Maybe<ProtocolRegistryInitialized>;
  protocolRegistryInitializeds: Array<ProtocolRegistryInitialized>;
  protocolRegistryOwnershipTransferStarted: Maybe<ProtocolRegistryOwnershipTransferStarted>;
  protocolRegistryOwnershipTransferStarteds: Array<ProtocolRegistryOwnershipTransferStarted>;
  protocolRegistryOwnershipTransferred: Maybe<ProtocolRegistryOwnershipTransferred>;
  protocolRegistryOwnershipTransferreds: Array<ProtocolRegistryOwnershipTransferred>;
  proxyDeployed: Maybe<ProxyDeployed>;
  proxyDeployeds: Array<ProxyDeployed>;
  ratesUpdated: Maybe<RatesUpdated>;
  ratesUpdateds: Array<RatesUpdated>;
  redeemRequest: Maybe<RedeemRequest>;
  redeemRequests: Array<RedeemRequest>;
  referral: Maybe<Referral>;
  referrals: Array<Referral>;
  settleDeposit: Maybe<SettleDeposit>;
  settleDeposits: Array<SettleDeposit>;
  settleRedeem: Maybe<SettleRedeem>;
  settleRedeems: Array<SettleRedeem>;
  stateUpdated: Maybe<StateUpdated>;
  stateUpdateds: Array<StateUpdated>;
  totalAssetsUpdated: Maybe<TotalAssetsUpdated>;
  totalAssetsUpdateds: Array<TotalAssetsUpdated>;
  totalSupplies: Array<TotalSupply>;
  totalSupply: Maybe<TotalSupply>;
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  unpaused: Maybe<Unpaused>;
  unpauseds: Array<Unpaused>;
  upgraded: Maybe<Upgraded>;
  upgradeds: Array<Upgraded>;
  valuationManagerUpdated: Maybe<ValuationManagerUpdated>;
  valuationManagerUpdateds: Array<ValuationManagerUpdated>;
  vaultState: Maybe<VaultState>;
  vaultStates: Array<VaultState>;
  whitelistDisabled: Maybe<WhitelistDisabled>;
  whitelistDisableds: Array<WhitelistDisabled>;
  whitelistManagerUpdated: Maybe<WhitelistManagerUpdated>;
  whitelistManagerUpdateds: Array<WhitelistManagerUpdated>;
  whitelistUpdated: Maybe<WhitelistUpdated>;
  whitelistUpdateds: Array<WhitelistUpdated>;
  withdraw: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionApprovalArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionApprovalsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Approval_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Approval_Filter>;
};


export type SubscriptionBeaconProxyDeployedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBeaconProxyDeployedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<BeaconProxyDeployed_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<BeaconProxyDeployed_Filter>;
};


export type SubscriptionCustomRateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCustomRateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<CustomRateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CustomRateUpdated_Filter>;
};


export type SubscriptionDefaultLogicUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDefaultLogicUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DefaultLogicUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DefaultLogicUpdated_Filter>;
};


export type SubscriptionDefaultRateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDefaultRateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DefaultRateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DefaultRateUpdated_Filter>;
};


export type SubscriptionDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositRequestArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositRequestCanceledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositRequestCanceledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositRequestCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositRequestCanceled_Filter>;
};


export type SubscriptionDepositRequestsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositRequest_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositRequest_Filter>;
};


export type SubscriptionDepositSyncArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositSyncsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DepositSync_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DepositSync_Filter>;
};


export type SubscriptionDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
};


export type SubscriptionFactoryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFactoryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<FactoryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<FactoryOwnershipTransferred_Filter>;
};


export type SubscriptionFeeReceiverUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeReceiverUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<FeeReceiverUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<FeeReceiverUpdated_Filter>;
};


export type SubscriptionHighWaterMarkUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHighWaterMarkUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<HighWaterMarkUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<HighWaterMarkUpdated_Filter>;
};


export type SubscriptionInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Initialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Initialized_Filter>;
};


export type SubscriptionLogicAddedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLogicAddedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LogicAdded_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LogicAdded_Filter>;
};


export type SubscriptionLogicRemovedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLogicRemovedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LogicRemoved_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LogicRemoved_Filter>;
};


export type SubscriptionNewTotalAssetsUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNewTotalAssetsUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<NewTotalAssetsUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<NewTotalAssetsUpdated_Filter>;
};


export type SubscriptionOperatorSetArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOperatorSetsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OperatorSet_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OperatorSet_Filter>;
};


export type SubscriptionOptinProxyFactoryInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOptinProxyFactoryInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OptinProxyFactoryInitialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OptinProxyFactoryInitialized_Filter>;
};


export type SubscriptionOptinProxyFactoryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOptinProxyFactoryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OptinProxyFactoryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OptinProxyFactoryOwnershipTransferred_Filter>;
};


export type SubscriptionOwnershipTransferStartedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOwnershipTransferStartedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OwnershipTransferStarted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OwnershipTransferStarted_Filter>;
};


export type SubscriptionOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<OwnershipTransferred_Filter>;
};


export type SubscriptionPausedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPausedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Paused_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Paused_Filter>;
};


export type SubscriptionPeriodCountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPeriodCountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<PeriodCount_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PeriodCount_Filter>;
};


export type SubscriptionPeriodSummariesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<PeriodSummary_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PeriodSummary_Filter>;
};


export type SubscriptionPeriodSummaryArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolFeeReceiverUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolFeeReceiverUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolFeeReceiverUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolFeeReceiverUpdated_Filter>;
};


export type SubscriptionProtocolRegistryInitializedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolRegistryInitializedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryInitialized_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryInitialized_Filter>;
};


export type SubscriptionProtocolRegistryOwnershipTransferStartedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolRegistryOwnershipTransferStartedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryOwnershipTransferStarted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryOwnershipTransferStarted_Filter>;
};


export type SubscriptionProtocolRegistryOwnershipTransferredArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolRegistryOwnershipTransferredsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProtocolRegistryOwnershipTransferred_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolRegistryOwnershipTransferred_Filter>;
};


export type SubscriptionProxyDeployedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProxyDeployedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProxyDeployed_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProxyDeployed_Filter>;
};


export type SubscriptionRatesUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRatesUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RatesUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RatesUpdated_Filter>;
};


export type SubscriptionRedeemRequestArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRedeemRequestsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RedeemRequest_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RedeemRequest_Filter>;
};


export type SubscriptionReferralArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionReferralsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Referral_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Referral_Filter>;
};


export type SubscriptionSettleDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSettleDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<SettleDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SettleDeposit_Filter>;
};


export type SubscriptionSettleRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSettleRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<SettleRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SettleRedeem_Filter>;
};


export type SubscriptionStateUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStateUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<StateUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<StateUpdated_Filter>;
};


export type SubscriptionTotalAssetsUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTotalAssetsUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TotalAssetsUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TotalAssetsUpdated_Filter>;
};


export type SubscriptionTotalSuppliesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TotalSupply_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TotalSupply_Filter>;
};


export type SubscriptionTotalSupplyArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransferArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transfer_Filter>;
};


export type SubscriptionUnpausedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnpausedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Unpaused_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Unpaused_Filter>;
};


export type SubscriptionUpgradedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUpgradedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Upgraded_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Upgraded_Filter>;
};


export type SubscriptionValuationManagerUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionValuationManagerUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ValuationManagerUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ValuationManagerUpdated_Filter>;
};


export type SubscriptionVaultStateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultStatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VaultState_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VaultState_Filter>;
};


export type SubscriptionWhitelistDisabledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWhitelistDisabledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistDisabled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistDisabled_Filter>;
};


export type SubscriptionWhitelistManagerUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWhitelistManagerUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistManagerUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistManagerUpdated_Filter>;
};


export type SubscriptionWhitelistUpdatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWhitelistUpdatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<WhitelistUpdated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<WhitelistUpdated_Filter>;
};


export type SubscriptionWithdrawArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Withdraw_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Withdraw_Filter>;
};

export type TotalAssetsUpdated = {
  __typename?: 'TotalAssetsUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  totalAssets: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type TotalAssetsUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TotalAssetsUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<TotalAssetsUpdated_Filter>>>;
  totalAssets: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TotalAssetsUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type TotalSupply = {
  __typename?: 'TotalSupply';
  id: Scalars['Bytes']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type TotalSupply_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TotalSupply_Filter>>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<TotalSupply_Filter>>>;
  totalSupply: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum TotalSupply_OrderBy {
  Id = 'id',
  TotalSupply = 'totalSupply'
}

export type Transfer = {
  __typename?: 'Transfer';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  from: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  to: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from: InputMaybe<Scalars['Bytes']['input']>;
  from_contains: InputMaybe<Scalars['Bytes']['input']>;
  from_gt: InputMaybe<Scalars['Bytes']['input']>;
  from_gte: InputMaybe<Scalars['Bytes']['input']>;
  from_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt: InputMaybe<Scalars['Bytes']['input']>;
  from_lte: InputMaybe<Scalars['Bytes']['input']>;
  from_not: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  to: InputMaybe<Scalars['Bytes']['input']>;
  to_contains: InputMaybe<Scalars['Bytes']['input']>;
  to_gt: InputMaybe<Scalars['Bytes']['input']>;
  to_gte: InputMaybe<Scalars['Bytes']['input']>;
  to_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt: InputMaybe<Scalars['Bytes']['input']>;
  to_lte: InputMaybe<Scalars['Bytes']['input']>;
  to_not: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value: InputMaybe<Scalars['BigInt']['input']>;
  value_gt: InputMaybe<Scalars['BigInt']['input']>;
  value_gte: InputMaybe<Scalars['BigInt']['input']>;
  value_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt: InputMaybe<Scalars['BigInt']['input']>;
  value_lte: InputMaybe<Scalars['BigInt']['input']>;
  value_not: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Transfer_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  From = 'from',
  Id = 'id',
  LogIndex = 'logIndex',
  To = 'to',
  TransactionHash = 'transactionHash',
  Value = 'value',
  Vault = 'vault'
}

export type Unpaused = {
  __typename?: 'Unpaused';
  account: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Unpaused_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['Bytes']['input']>;
  account_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_gt: InputMaybe<Scalars['Bytes']['input']>;
  account_gte: InputMaybe<Scalars['Bytes']['input']>;
  account_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_lt: InputMaybe<Scalars['Bytes']['input']>;
  account_lte: InputMaybe<Scalars['Bytes']['input']>;
  account_not: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and: InputMaybe<Array<InputMaybe<Unpaused_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Unpaused_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Unpaused_OrderBy {
  Account = 'account',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Upgraded = {
  __typename?: 'Upgraded';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  implementation: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Upgraded_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Upgraded_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation: InputMaybe<Scalars['Bytes']['input']>;
  implementation_contains: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_lt: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<Upgraded_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Upgraded_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Implementation = 'implementation',
  TransactionHash = 'transactionHash'
}

export type ValuationManagerUpdated = {
  __typename?: 'ValuationManagerUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newManager: Scalars['Bytes']['output'];
  oldManager: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type ValuationManagerUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ValuationManagerUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newManager: InputMaybe<Scalars['Bytes']['input']>;
  newManager_contains: InputMaybe<Scalars['Bytes']['input']>;
  newManager_gt: InputMaybe<Scalars['Bytes']['input']>;
  newManager_gte: InputMaybe<Scalars['Bytes']['input']>;
  newManager_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newManager_lt: InputMaybe<Scalars['Bytes']['input']>;
  newManager_lte: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldManager: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_gt: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_gte: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldManager_lt: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_lte: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<ValuationManagerUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ValuationManagerUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewManager = 'newManager',
  OldManager = 'oldManager',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type VaultState = {
  __typename?: 'VaultState';
  approvalCount: Scalars['BigInt']['output'];
  depositCount: Scalars['BigInt']['output'];
  depositRequestCanceledCount: Scalars['BigInt']['output'];
  depositRequestCount: Scalars['BigInt']['output'];
  depositSyncCount: Scalars['BigInt']['output'];
  feeReceiverUpdatedCount: Scalars['BigInt']['output'];
  highWaterMarkUpdatedCount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  initializedCount: Scalars['BigInt']['output'];
  newTotalAssetsUpdatedCount: Scalars['BigInt']['output'];
  operatorSetCount: Scalars['BigInt']['output'];
  ownershipTransferStartedCount: Scalars['BigInt']['output'];
  ownershipTransferredCount: Scalars['BigInt']['output'];
  pausedCount: Scalars['BigInt']['output'];
  ratesUpdatedCount: Scalars['BigInt']['output'];
  redeemRequestCount: Scalars['BigInt']['output'];
  referralCount: Scalars['BigInt']['output'];
  settleDepositCount: Scalars['BigInt']['output'];
  settleRedeemCount: Scalars['BigInt']['output'];
  stateUpdatedCount: Scalars['BigInt']['output'];
  totalAssetsUpdatedCount: Scalars['BigInt']['output'];
  transferCount: Scalars['BigInt']['output'];
  unpausedCount: Scalars['BigInt']['output'];
  valuationManagerUpdatedCount: Scalars['BigInt']['output'];
  vault: Scalars['Bytes']['output'];
  whitelistDisabledCount: Scalars['BigInt']['output'];
  whitelistManagerUpdatedCount: Scalars['BigInt']['output'];
  whitelistUpdatedCount: Scalars['BigInt']['output'];
  withdrawCount: Scalars['BigInt']['output'];
};

export type VaultState_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<VaultState_Filter>>>;
  approvalCount: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  approvalCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_not: InputMaybe<Scalars['BigInt']['input']>;
  approvalCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositCount: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_not: InputMaybe<Scalars['BigInt']['input']>;
  depositCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositRequestCanceledCount: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositRequestCanceledCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_not: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCanceledCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositRequestCount: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositRequestCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_not: InputMaybe<Scalars['BigInt']['input']>;
  depositRequestCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositSyncCount: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositSyncCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_not: InputMaybe<Scalars['BigInt']['input']>;
  depositSyncCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeReceiverUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeReceiverUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  feeReceiverUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  highWaterMarkUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  highWaterMarkUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  highWaterMarkUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  initializedCount: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initializedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  initializedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newTotalAssetsUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newTotalAssetsUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  newTotalAssetsUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operatorSetCount: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operatorSetCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_not: InputMaybe<Scalars['BigInt']['input']>;
  operatorSetCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or: InputMaybe<Array<InputMaybe<VaultState_Filter>>>;
  ownershipTransferStartedCount: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ownershipTransferStartedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferStartedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ownershipTransferredCount: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ownershipTransferredCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_not: InputMaybe<Scalars['BigInt']['input']>;
  ownershipTransferredCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pausedCount: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pausedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  pausedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ratesUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ratesUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  ratesUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  redeemRequestCount: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  redeemRequestCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_not: InputMaybe<Scalars['BigInt']['input']>;
  redeemRequestCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralCount: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_not: InputMaybe<Scalars['BigInt']['input']>;
  referralCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settleDepositCount: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settleDepositCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_not: InputMaybe<Scalars['BigInt']['input']>;
  settleDepositCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settleRedeemCount: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settleRedeemCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_not: InputMaybe<Scalars['BigInt']['input']>;
  settleRedeemCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stateUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stateUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  stateUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssetsUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssetsUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  totalAssetsUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferCount: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_not: InputMaybe<Scalars['BigInt']['input']>;
  transferCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unpausedCount: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unpausedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  unpausedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valuationManagerUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valuationManagerUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  valuationManagerUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  whitelistDisabledCount: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistDisabledCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_not: InputMaybe<Scalars['BigInt']['input']>;
  whitelistDisabledCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistManagerUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistManagerUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  whitelistManagerUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistUpdatedCount: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistUpdatedCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_not: InputMaybe<Scalars['BigInt']['input']>;
  whitelistUpdatedCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawCount: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_gt: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_gte: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawCount_lt: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_lte: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_not: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum VaultState_OrderBy {
  ApprovalCount = 'approvalCount',
  DepositCount = 'depositCount',
  DepositRequestCanceledCount = 'depositRequestCanceledCount',
  DepositRequestCount = 'depositRequestCount',
  DepositSyncCount = 'depositSyncCount',
  FeeReceiverUpdatedCount = 'feeReceiverUpdatedCount',
  HighWaterMarkUpdatedCount = 'highWaterMarkUpdatedCount',
  Id = 'id',
  InitializedCount = 'initializedCount',
  NewTotalAssetsUpdatedCount = 'newTotalAssetsUpdatedCount',
  OperatorSetCount = 'operatorSetCount',
  OwnershipTransferStartedCount = 'ownershipTransferStartedCount',
  OwnershipTransferredCount = 'ownershipTransferredCount',
  PausedCount = 'pausedCount',
  RatesUpdatedCount = 'ratesUpdatedCount',
  RedeemRequestCount = 'redeemRequestCount',
  ReferralCount = 'referralCount',
  SettleDepositCount = 'settleDepositCount',
  SettleRedeemCount = 'settleRedeemCount',
  StateUpdatedCount = 'stateUpdatedCount',
  TotalAssetsUpdatedCount = 'totalAssetsUpdatedCount',
  TransferCount = 'transferCount',
  UnpausedCount = 'unpausedCount',
  ValuationManagerUpdatedCount = 'valuationManagerUpdatedCount',
  Vault = 'vault',
  WhitelistDisabledCount = 'whitelistDisabledCount',
  WhitelistManagerUpdatedCount = 'whitelistManagerUpdatedCount',
  WhitelistUpdatedCount = 'whitelistUpdatedCount',
  WithdrawCount = 'withdrawCount'
}

export type WhitelistDisabled = {
  __typename?: 'WhitelistDisabled';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type WhitelistDisabled_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<WhitelistDisabled_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<WhitelistDisabled_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum WhitelistDisabled_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type WhitelistManagerUpdated = {
  __typename?: 'WhitelistManagerUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  newManager: Scalars['Bytes']['output'];
  oldManager: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type WhitelistManagerUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<WhitelistManagerUpdated_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  newManager: InputMaybe<Scalars['Bytes']['input']>;
  newManager_contains: InputMaybe<Scalars['Bytes']['input']>;
  newManager_gt: InputMaybe<Scalars['Bytes']['input']>;
  newManager_gte: InputMaybe<Scalars['Bytes']['input']>;
  newManager_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newManager_lt: InputMaybe<Scalars['Bytes']['input']>;
  newManager_lte: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  newManager_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldManager: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_gt: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_gte: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldManager_lt: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_lte: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  oldManager_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<WhitelistManagerUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum WhitelistManagerUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  NewManager = 'newManager',
  OldManager = 'oldManager',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type WhitelistUpdated = {
  __typename?: 'WhitelistUpdated';
  account: Scalars['Bytes']['output'];
  authorized: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type WhitelistUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['Bytes']['input']>;
  account_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_gt: InputMaybe<Scalars['Bytes']['input']>;
  account_gte: InputMaybe<Scalars['Bytes']['input']>;
  account_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_lt: InputMaybe<Scalars['Bytes']['input']>;
  account_lte: InputMaybe<Scalars['Bytes']['input']>;
  account_not: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  account_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and: InputMaybe<Array<InputMaybe<WhitelistUpdated_Filter>>>;
  authorized: InputMaybe<Scalars['Boolean']['input']>;
  authorized_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  authorized_not: InputMaybe<Scalars['Boolean']['input']>;
  authorized_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<WhitelistUpdated_Filter>>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum WhitelistUpdated_OrderBy {
  Account = 'account',
  Authorized = 'authorized',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Withdraw = {
  __typename?: 'Withdraw';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  logIndex: Scalars['Int']['output'];
  owner: Scalars['Bytes']['output'];
  receiver: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  shares: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  vault: Scalars['Bytes']['output'];
};

export type Withdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  assets: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte: InputMaybe<Scalars['BigInt']['input']>;
  assets_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte: InputMaybe<Scalars['BigInt']['input']>;
  assets_not: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  logIndex: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte: InputMaybe<Scalars['Int']['input']>;
  logIndex_in: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_lt: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte: InputMaybe<Scalars['Int']['input']>;
  logIndex_not: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  owner: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte: InputMaybe<Scalars['Bytes']['input']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte: InputMaybe<Scalars['Bytes']['input']>;
  owner_not: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver: InputMaybe<Scalars['Bytes']['input']>;
  receiver_contains: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gt: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gte: InputMaybe<Scalars['Bytes']['input']>;
  receiver_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver_lt: InputMaybe<Scalars['Bytes']['input']>;
  receiver_lte: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte: InputMaybe<Scalars['Bytes']['input']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte: InputMaybe<Scalars['Bytes']['input']>;
  sender_not: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  shares: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte: InputMaybe<Scalars['BigInt']['input']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte: InputMaybe<Scalars['BigInt']['input']>;
  shares_not: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault: InputMaybe<Scalars['Bytes']['input']>;
  vault_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_gt: InputMaybe<Scalars['Bytes']['input']>;
  vault_gte: InputMaybe<Scalars['Bytes']['input']>;
  vault_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  vault_lt: InputMaybe<Scalars['Bytes']['input']>;
  vault_lte: InputMaybe<Scalars['Bytes']['input']>;
  vault_not: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  vault_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Withdraw_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  Receiver = 'receiver',
  Sender = 'sender',
  Shares = 'shares',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type VaultTransfersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  vaultAddress: Scalars['Bytes']['input'];
  toBlock: Scalars['BigInt']['input'];
  skip: Scalars['Int']['input'];
}>;


export type VaultTransfersQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', blockNumber: BigIntish, blockTimestamp: BigIntish, from: `0x${string}`, id: `0x${string}`, to: `0x${string}`, logIndex: number, transactionHash: `0x${string}`, value: BigIntish, vault: `0x${string}` }> };

export type VaultEventsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  vaultAddress: Scalars['Bytes']['input'];
  toBlock: Scalars['BigInt']['input'];
  skip: Scalars['Int']['input'];
}>;


export type VaultEventsQuery = { __typename?: 'Query', depositRequests: Array<{ __typename?: 'DepositRequest', assets: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, id: `0x${string}`, owner: `0x${string}`, sender: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, controller: `0x${string}`, requestId: BigIntish, vault: `0x${string}` }>, redeemRequests: Array<{ __typename?: 'RedeemRequest', blockNumber: BigIntish, blockTimestamp: BigIntish, id: `0x${string}`, owner: `0x${string}`, sender: `0x${string}`, shares: BigIntish, transactionHash: `0x${string}`, logIndex: number, controller: `0x${string}`, requestId: BigIntish, vault: `0x${string}` }>, settleRedeems: Array<{ __typename?: 'SettleRedeem', assetsWithdrawed: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, epochId: BigIntish, id: `0x${string}`, settledId: BigIntish, sharesBurned: BigIntish, totalAssets: BigIntish, totalSupply: BigIntish, transactionHash: `0x${string}`, logIndex: number, vault: `0x${string}` }>, settleDeposits: Array<{ __typename?: 'SettleDeposit', assetsDeposited: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, epochId: BigIntish, id: `0x${string}`, settledId: BigIntish, sharesMinted: BigIntish, totalSupply: BigIntish, totalAssets: BigIntish, transactionHash: `0x${string}`, logIndex: number, vault: `0x${string}` }>, totalAssetsUpdateds: Array<{ __typename?: 'TotalAssetsUpdated', transactionHash: `0x${string}`, logIndex: number, totalAssets: BigIntish, id: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish, vault: `0x${string}` }>, newTotalAssetsUpdateds: Array<{ __typename?: 'NewTotalAssetsUpdated', transactionHash: `0x${string}`, logIndex: number, totalAssets: BigIntish, id: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish, vault: `0x${string}` }>, transfers: Array<{ __typename?: 'Transfer', blockNumber: BigIntish, blockTimestamp: BigIntish, from: `0x${string}`, id: `0x${string}`, to: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, value: BigIntish, vault: `0x${string}` }>, depositRequestCanceleds: Array<{ __typename?: 'DepositRequestCanceled', blockNumber: BigIntish, blockTimestamp: BigIntish, controller: `0x${string}`, id: `0x${string}`, requestId: BigIntish, transactionHash: `0x${string}`, logIndex: number, vault: `0x${string}` }>, deposits: Array<{ __typename?: 'Deposit', id: `0x${string}`, sender: `0x${string}`, owner: `0x${string}`, assets: BigIntish, vault: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, shares: BigIntish, blockTimestamp: BigIntish, blockNumber: BigIntish }>, referrals: Array<{ __typename?: 'Referral', id: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, assets: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, owner: `0x${string}`, referral: `0x${string}`, requestId: BigIntish }>, feeReceiverUpdateds: Array<{ __typename?: 'FeeReceiverUpdated', id: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, blockNumber: BigIntish, blockTimestamp: BigIntish, oldReceiver: `0x${string}`, newReceiver: `0x${string}` }>, ratesUpdateds: Array<{ __typename?: 'RatesUpdated', id: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, blockNumber: BigIntish, blockTimestamp: BigIntish, newRate_managementRate: number, newRate_performanceRate: number, timestamp: BigIntish }>, defaultRateUpdateds: Array<{ __typename?: 'DefaultRateUpdated', newRate: BigIntish, oldRate: BigIntish, transactionHash: `0x${string}`, logIndex: number, blockNumber: BigIntish, blockTimestamp: BigIntish }>, customRateUpdateds: Array<{ __typename?: 'CustomRateUpdated', id: `0x${string}`, vault: `0x${string}`, isActivated: boolean, logIndex: number, rate: number, transactionHash: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish }> };

export type VaultStateUpdatedEventsQueryVariables = Exact<{
  vaultAddress: Scalars['Bytes']['input'];
}>;


export type VaultStateUpdatedEventsQuery = { __typename?: 'Query', stateUpdateds: Array<{ __typename?: 'StateUpdated', blockNumber: BigIntish, blockTimestamp: BigIntish, id: `0x${string}`, transactionHash: `0x${string}`, logIndex: number, vault: `0x${string}`, state: number }> };

export type VaultTotalAssetsUpdatedQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  vaultAddress: Scalars['Bytes']['input'];
  toBlock: Scalars['BigInt']['input'];
  skip: Scalars['Int']['input'];
}>;


export type VaultTotalAssetsUpdatedQuery = { __typename?: 'Query', totalAssetsUpdateds: Array<{ __typename?: 'TotalAssetsUpdated', transactionHash: `0x${string}`, totalAssets: BigIntish, id: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish, vault: `0x${string}` }> };


export const VaultTransfersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaultTransfers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}}]}}]} as unknown as DocumentNode<VaultTransfersQuery, VaultTransfersQueryVariables>;
export const VaultEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaultEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depositRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"redeemRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settleRedeems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetsWithdrawed"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"epochId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"settledId"}},{"kind":"Field","name":{"kind":"Name","value":"sharesBurned"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settleDeposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetsDeposited"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"epochId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"settledId"}},{"kind":"Field","name":{"kind":"Name","value":"sharesMinted"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAssetsUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTotalAssetsUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"depositRequestCanceleds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referrals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"referral"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feeReceiverUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"oldReceiver"}},{"kind":"Field","name":{"kind":"Name","value":"newReceiver"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratesUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"newRate_managementRate"}},{"kind":"Field","name":{"kind":"Name","value":"newRate_performanceRate"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultRateUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newRate"}},{"kind":"Field","name":{"kind":"Name","value":"oldRate"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customRateUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}}]}}]}}]} as unknown as DocumentNode<VaultEventsQuery, VaultEventsQueryVariables>;
export const VaultStateUpdatedEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaultStateUpdatedEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stateUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<VaultStateUpdatedEventsQuery, VaultStateUpdatedEventsQueryVariables>;
export const VaultTotalAssetsUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaultTotalAssetsUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAssetsUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}}]}}]} as unknown as DocumentNode<VaultTotalAssetsUpdatedQuery, VaultTotalAssetsUpdatedQueryVariables>;
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
  Owner = 'owner',
  Spender = 'spender',
  TransactionHash = 'transactionHash',
  Value = 'value',
  Vault = 'vault'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']['input']>;
  number: InputMaybe<Scalars['Int']['input']>;
  number_gte: InputMaybe<Scalars['Int']['input']>;
};

export type Deposit = {
  __typename?: 'Deposit';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  Owner = 'owner',
  RequestId = 'requestId',
  Sender = 'sender',
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
  Owner = 'owner',
  Sender = 'sender',
  Shares = 'shares',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type FeeReceiverUpdated = {
  __typename?: 'FeeReceiverUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  TransactionHash = 'transactionHash',
  Vault = 'vault',
  Version = 'version'
}

export type NewTotalAssetsUpdated = {
  __typename?: 'NewTotalAssetsUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  Operator = 'operator',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
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
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  approval: Maybe<Approval>;
  approvals: Array<Approval>;
  deposit: Maybe<Deposit>;
  depositRequest: Maybe<DepositRequest>;
  depositRequestCanceled: Maybe<DepositRequestCanceled>;
  depositRequestCanceleds: Array<DepositRequestCanceled>;
  depositRequests: Array<DepositRequest>;
  deposits: Array<Deposit>;
  feeReceiverUpdated: Maybe<FeeReceiverUpdated>;
  feeReceiverUpdateds: Array<FeeReceiverUpdated>;
  highWaterMarkUpdated: Maybe<HighWaterMarkUpdated>;
  highWaterMarkUpdateds: Array<HighWaterMarkUpdated>;
  initialized: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  newTotalAssetsUpdated: Maybe<NewTotalAssetsUpdated>;
  newTotalAssetsUpdateds: Array<NewTotalAssetsUpdated>;
  operatorSet: Maybe<OperatorSet>;
  operatorSets: Array<OperatorSet>;
  ownershipTransferStarted: Maybe<OwnershipTransferStarted>;
  ownershipTransferStarteds: Array<OwnershipTransferStarted>;
  ownershipTransferred: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  paused: Maybe<Paused>;
  pauseds: Array<Paused>;
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
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  unpaused: Maybe<Unpaused>;
  unpauseds: Array<Unpaused>;
  valuationManagerUpdated: Maybe<ValuationManagerUpdated>;
  valuationManagerUpdateds: Array<ValuationManagerUpdated>;
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


export type QueryDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
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
  deposit: Maybe<Deposit>;
  depositRequest: Maybe<DepositRequest>;
  depositRequestCanceled: Maybe<DepositRequestCanceled>;
  depositRequestCanceleds: Array<DepositRequestCanceled>;
  depositRequests: Array<DepositRequest>;
  deposits: Array<Deposit>;
  feeReceiverUpdated: Maybe<FeeReceiverUpdated>;
  feeReceiverUpdateds: Array<FeeReceiverUpdated>;
  highWaterMarkUpdated: Maybe<HighWaterMarkUpdated>;
  highWaterMarkUpdateds: Array<HighWaterMarkUpdated>;
  initialized: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  newTotalAssetsUpdated: Maybe<NewTotalAssetsUpdated>;
  newTotalAssetsUpdateds: Array<NewTotalAssetsUpdated>;
  operatorSet: Maybe<OperatorSet>;
  operatorSets: Array<OperatorSet>;
  ownershipTransferStarted: Maybe<OwnershipTransferStarted>;
  ownershipTransferStarteds: Array<OwnershipTransferStarted>;
  ownershipTransferred: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  paused: Maybe<Paused>;
  pauseds: Array<Paused>;
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
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  unpaused: Maybe<Unpaused>;
  unpauseds: Array<Unpaused>;
  valuationManagerUpdated: Maybe<ValuationManagerUpdated>;
  valuationManagerUpdateds: Array<ValuationManagerUpdated>;
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


export type SubscriptionDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
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
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Transfer = {
  __typename?: 'Transfer';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  from: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
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
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type ValuationManagerUpdated = {
  __typename?: 'ValuationManagerUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  NewManager = 'newManager',
  OldManager = 'oldManager',
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type WhitelistDisabled = {
  __typename?: 'WhitelistDisabled';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type WhitelistManagerUpdated = {
  __typename?: 'WhitelistManagerUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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
  TransactionHash = 'transactionHash',
  Vault = 'vault'
}

export type Withdraw = {
  __typename?: 'Withdraw';
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
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

export type VaultEventsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  vaultAddress: Scalars['Bytes']['input'];
  fromBlock: Scalars['BigInt']['input'];
  toBlock: Scalars['BigInt']['input'];
  skip: Scalars['Int']['input'];
}>;


export type VaultEventsQuery = { __typename?: 'Query', depositRequests: Array<{ __typename?: 'DepositRequest', assets: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, id: `0x${string}`, owner: `0x${string}`, sender: `0x${string}`, transactionHash: `0x${string}`, controller: `0x${string}`, requestId: BigIntish, vault: `0x${string}` }>, redeemRequests: Array<{ __typename?: 'RedeemRequest', blockNumber: BigIntish, blockTimestamp: BigIntish, id: `0x${string}`, owner: `0x${string}`, sender: `0x${string}`, shares: BigIntish, transactionHash: `0x${string}`, controller: `0x${string}`, requestId: BigIntish, vault: `0x${string}` }>, settleRedeems: Array<{ __typename?: 'SettleRedeem', assetsWithdrawed: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, epochId: BigIntish, id: `0x${string}`, settledId: BigIntish, sharesBurned: BigIntish, totalAssets: BigIntish, totalSupply: BigIntish, transactionHash: `0x${string}`, vault: `0x${string}` }>, settleDeposits: Array<{ __typename?: 'SettleDeposit', assetsDeposited: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, epochId: BigIntish, id: `0x${string}`, settledId: BigIntish, sharesMinted: BigIntish, totalSupply: BigIntish, totalAssets: BigIntish, transactionHash: `0x${string}`, vault: `0x${string}` }>, totalAssetsUpdateds: Array<{ __typename?: 'TotalAssetsUpdated', transactionHash: `0x${string}`, totalAssets: BigIntish, id: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish, vault: `0x${string}` }>, newTotalAssetsUpdateds: Array<{ __typename?: 'NewTotalAssetsUpdated', transactionHash: `0x${string}`, totalAssets: BigIntish, id: `0x${string}`, blockNumber: BigIntish, blockTimestamp: BigIntish, vault: `0x${string}` }>, transfers: Array<{ __typename?: 'Transfer', blockNumber: BigIntish, blockTimestamp: BigIntish, from: `0x${string}`, id: `0x${string}`, to: `0x${string}`, transactionHash: `0x${string}`, value: BigIntish, vault: `0x${string}` }>, depositRequestCanceleds: Array<{ __typename?: 'DepositRequestCanceled', blockNumber: BigIntish, blockTimestamp: BigIntish, controller: `0x${string}`, id: `0x${string}`, requestId: BigIntish, transactionHash: `0x${string}`, vault: `0x${string}` }>, deposits: Array<{ __typename?: 'Deposit', id: `0x${string}`, sender: `0x${string}`, owner: `0x${string}`, assets: BigIntish, vault: `0x${string}`, transactionHash: `0x${string}`, shares: BigIntish, blockTimestamp: BigIntish, blockNumber: BigIntish }>, referrals: Array<{ __typename?: 'Referral', assets: BigIntish, blockNumber: BigIntish, blockTimestamp: BigIntish, owner: `0x${string}`, referral: `0x${string}`, requestId: BigIntish }> };


export const VaultEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VaultEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depositRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"redeemRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settleRedeems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetsWithdrawed"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"epochId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"settledId"}},{"kind":"Field","name":{"kind":"Name","value":"sharesBurned"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settleDeposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetsDeposited"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"epochId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"settledId"}},{"kind":"Field","name":{"kind":"Name","value":"sharesMinted"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAssetsUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTotalAssetsUpdateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"depositRequestCanceleds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referrals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"blockTimestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"referral"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}}]}}]}}]} as unknown as DocumentNode<VaultEventsQuery, VaultEventsQueryVariables>;
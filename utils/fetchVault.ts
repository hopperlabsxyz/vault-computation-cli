import {publicClient} from "../lib/publicClient";
import {Address, parseAbiItem} from "viem";
import {VAULT_ABI} from "../VaultABI";

const events = {
    DepositRequest: 'event DepositRequest(address indexed controller, address indexed owner, uint256 indexed requestId, address sender, uint256 assets)',
    RedeemRequest: 'event RedeemRequest(address indexed controller, address indexed owner, uint256 indexed requestId, address sender, uint256 shares)',
    Deposit: 'event Deposit(address indexed controller, address indexed receiver, uint256 assets, uint256 shares)',
    CancelDeposit: 'event DepositRequestCanceled(uint256 indexed requestId, address indexed controller)',
    HighWaterMarkUpdated: 'event HighWaterMarkUpdated(uint256 oldHighWaterMark, uint256 newHighWaterMark)',
    NewTotalAssetsUpdated: 'event NewTotalAssetsUpdated(uint256 totalAssets)',
    Referral: 'event Referral(address indexed referral, address indexed owner, uint256 indexed requestId, uint256 assets)',
    SettleDeposit: 'event SettleDeposit(uint40 indexed epochId, uint40 indexed settledId, uint256 totalAssets, uint256 totalSupply, uint256 assetsDeposited, uint256 sharesMinted)',
    SettleRedeem: 'event SettleRedeem(uint40 indexed epochId, uint40 indexed settledId, uint256 totalAssets, uint256 totalSupply, uint256 assetsWithdrawed, uint256 sharesBurned)',
    TotalAssetsUpdated: 'event TotalAssetsUpdated(uint256 totalAssets)',
    Transfer: 'event Transfer(address indexed from, address indexed to, uint256 value)',
    Withdraw: 'event Withdraw(address indexed sender, address indexed receiver, address indexed controller, uint256 assets, uint256 shares)'
}

export const fetchVault = async ({
                                     chainId,
                                     address,
                                 }: { chainId: number, address: Address
}) => {

    const client = publicClient[chainId];

    if (!client) {
        throw new Error(`Missing client for chaindId : ${chainId}`)
    }

    const [
        roles,
        silo,
        transfers,
        depositRequests,
        cancelDeposits,
        settleDeposits,
        redeemRequests,
        settleRedeems,
        deposits,
        withdraws,
        newTotalAssetUpdateds,
    ] = await Promise.all([
        client.readContract({
            address,
            abi: VAULT_ABI,
            functionName: 'getRolesStorage',
            
        }),
        client.readContract({
            address,
            abi: VAULT_ABI,
            functionName: 'pendingSilo',
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.Transfer),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.DepositRequest),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.CancelDeposit),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.SettleDeposit),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.RedeemRequest),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.SettleRedeem),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.Deposit),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.Withdraw),
            fromBlock: 0,
            
        }),
        client.getLogs({
            address: address,
            event: parseAbiItem(events.NewTotalAssetsUpdated),
            fromBlock: 0,
            
        }),
    ])

    return {
        feesReceiver: roles.feeReceiver,
        silo,
        transfers,
        depositRequests,
        redeemRequests,
        cancelDeposits,
        settleDeposits,
        settleRedeems,
        deposits,
        withdraws,
        newTotalAssetUpdateds
    }
}
import {
  Network,
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersOrder,
  AssetTransfersResult,
} from 'alchemy-sdk';
import { ethers } from 'ethers';
import { AlchemyAPIAssetOptions } from 'src/types/alchemy';
import { publicEnv } from '@env';

const getSettingsForAlchemy = (chainId: string) => {
  return {
    apiKey: publicEnv.alchemy[chainId === '1' ? 'mainnet' : chainId === '5' ? 'goerli' : 'goerli'],
    network:
      chainId === '1'
        ? Network.ETH_MAINNET
        : chainId === '5'
        ? Network.ETH_GOERLI
        : Network.ETH_GOERLI,
    maxRetries: 10,
  };
};

const getInitializeForAlchemy = (chainId: string) => {
  const settings = getSettingsForAlchemy(chainId);
  return new Alchemy(settings);
};

const roughScale = (x: string, base: number) => {
  const parsed = parseInt(x, base);
  if (!Number.isSafeInteger(parsed)) return BigInt(x).toString(10);
  return String(parsed);
};

export const getMintedNFTsForAlchemy = async (
  chainId: string,
  account: string,
  options?: AlchemyAPIAssetOptions
) => {
  const alchemy = getInitializeForAlchemy(chainId);
  const response = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x0000000000000000000000000000000000000000',
    toAddress: account,
    excludeZeroValue: true,
    category:
      options && options.category
        ? options.category
        : [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
    contractAddresses: options && options.tokenAddress ? [options.tokenAddress] : undefined,
    order: options && options.order ? options.order : AssetTransfersOrder.DESCENDING,
    maxCount: options && options.limit ? options.limit : 1,
    pageKey: options && options.pageKey ? options.pageKey : undefined,
  });
  const transfers = response.transfers
    .map(transfer => {
      if (!transfer.asset) {
        return;
      } else if (transfer.erc1155Metadata) {
        return {
          ...transfer,
          tokenId: transfer.erc1155Metadata[0].tokenId
            ? roughScale(ethers.utils.hexStripZeros(transfer.erc1155Metadata[0].tokenId), 16)
            : '',
          value: roughScale(ethers.utils.hexStripZeros(transfer.erc1155Metadata[0].value), 16),
        };
      } else {
        return {
          ...transfer,
          tokenId: transfer.tokenId
            ? roughScale(ethers.utils.hexStripZeros(transfer.tokenId), 16)
            : '',
        };
      }
    })
    .filter(x => x) as AssetTransfersResult[];

  return {
    pageKey: response.pageKey,
    transfers,
  };
};

export const getContractOwnersForAlchemy = async (chainId: string, tokenAddresses: string) => {
  const alchemy = getInitializeForAlchemy(chainId);
  const response = await alchemy.nft.getOwnersForContract(tokenAddresses);

  return {
    owners: response.owners,
  };
};

import { ethers } from 'ethers';
import { convertUrlType } from '@lib/url';

import { SupportChainId } from 'src/types/ethereum';
import { serverEnv } from '@env';
import { QuickNodeAPIAssetOptions } from 'src/types/quicknode';
import { NFTAssetModel } from 'src/types';

export const getRPCForQN = (chainId: SupportChainId | number) => {
  if (chainId === '1' || chainId === 1)
    return 'https://cosmopolitan-evocative-sanctuary.discover.quiknode.pro';
  else if (chainId === '137' || chainId === 137)
    return 'https://prettiest-special-forest.matic.discover.quiknode.pro';
  else if (chainId === '80001' || chainId === 80001)
    return 'https://prettiest-special-forest.matic-test.discover.quiknode.pro';
};

export const getProviderForQN = (chainId: SupportChainId | number) => {
  const provider = new ethers.providers.JsonRpcProvider(
    `${getRPCForQN(chainId)}/90d637cfcbca1cca33dbf2018df4ebac94aab6df/`
  ) as any;
  // provider.connection.headers = { 'x-qn-api-version': 1 };
  return provider;
};

export const convertQNtoNFTAsset = (asset: {
  chain: string;
  collectionAddress: string;
  collectionName: string;
  collectionTokenId: string;
  currentOwner: string;
  description: string;
  imageUrl: string;
  name: string;
  network: string;
}) => {
  const image = convertUrlType(asset.imageUrl);
  return {
    blockchain: 'ethereum',
    network: {
      chainId: '1',
      name: 'mainnet',
    },
    tokenType: 'ERC721',
    tokenAddress: asset.collectionAddress,
    tokenId: asset.collectionTokenId,
    name: asset.name,
    description: asset.description,
    image: convertUrlType(asset.imageUrl),
    thumbnailUrl: image.httpUrl,
  } as NFTAssetModel;
};

export const getAssetsForQN = async (
  chainId: SupportChainId | number,
  options?: QuickNodeAPIAssetOptions
) => {
  const provider = getProviderForQN(chainId);
  const heads = await provider.send('qn_fetchNFTs', {
    wallet: options && options.owner ? options.owner : '',
    omitFields: options && options.omitFields ? options.omitFields : ['provenance', 'traits'],
    page: options && options.page ? options.page : 1,
    perPage: options && options.limit ? options.limit : 10,
    contracts: options && options.tokenAddresses ? options.tokenAddresses : [],
  } as any);
  console.log('heads', heads);
  return { assets: heads.assets.map(asset => convertQNtoNFTAsset(asset)) };
};

import { ethers } from 'ethers';
import { sendRestApi } from '@lib';
import { convertUrlType, convertUrlToHttp } from '@lib/url';
import { getTokenInterface } from '@lib/ethereum/contracts/token';
import {
  getERC721TokenURI,
  getERC721RoyaltyInfo,
} from '@lib/ethereum/contracts/token/erc721/original';
import { getERC1155TokenURI } from '@lib/ethereum/contracts/token/erc1155/original';
import chainIdJson from '@configs/ethereum/chainId.json';
import networkJson from '@configs/ethereum/network.json';
import {
  PartModel,
  NFTAssetModel,
  NFTMetadataModel,
  NFTAttributeModel,
  NFTCollectionModel,
} from 'src/types';
import { SupportChainId, SupportNetwork } from 'src/types/ethereum';
import { publicEnv } from '@env';

export const getTokenData = async (
  senderOrProvider: ethers.Signer | ethers.providers.Provider,
  chainId: SupportChainId,
  tokenAddress: string,
  tokenId: string,
  options?: {
    metadateUrl?: string;
    thumbnailUrl?: string;
    imageUrl?: string;
    animationUrl?: string;
    name?: string;
    description?: string;
    royalty?: PartModel;
    attributes?: NFTAttributeModel[];
    collection?: NFTCollectionModel;
    externalUrl?: string;
    isOriginal?: boolean;
  }
): Promise<NFTAssetModel> => {
  const networkName = chainIdJson[chainId] as SupportNetwork;
  const provider = new ethers.providers.JsonRpcProvider(
    `${networkJson[networkName].rpc}${publicEnv.alchemy[networkName]}`
  );
  const tokenInterface = await getTokenInterface(provider, tokenAddress);
  const tokenType =
    tokenInterface === 'ERC721' ? 'ERC721' : tokenInterface === 'ERC1155' ? 'ERC1155' : 'ERC721';
  const metadateUrl =
    options && options.metadateUrl
      ? options.metadateUrl
      : tokenInterface === 'ERC721'
      ? await getERC721TokenURI(senderOrProvider, tokenAddress, tokenId)
      : tokenInterface === 'ERC1155'
      ? await getERC1155TokenURI(senderOrProvider, tokenAddress, tokenId)
      : '';
  const royalty =
    options && options.royalty
      ? options.royalty
      : await getERC721RoyaltyInfo(senderOrProvider, tokenAddress, tokenId);
  const resMetadate =
    options && options.name && options.description && options.imageUrl
      ? {
          name: options.name,
          description: options.description,
          image: options.imageUrl,
          animation_url: options.animationUrl ? options.animationUrl : undefined,
        }
      : metadateUrl
      ? ((await sendRestApi(convertUrlToHttp(metadateUrl), 'GET')) as NFTMetadataModel)
      : undefined;
  const thumbnailUrl = options && options.thumbnailUrl ? options.thumbnailUrl : '';
  const imageUrl =
    options && options.imageUrl
      ? options.imageUrl
      : resMetadate && resMetadate.image
      ? resMetadate.image
      : '';
  const animationUrl =
    options && options.animationUrl
      ? options.animationUrl
      : resMetadate && resMetadate.animation_url
      ? resMetadate.animation_url
      : '';
  const metadateUrlType = convertUrlType(metadateUrl);
  const imageUrlType = convertUrlType(imageUrl);
  const animationUrlType = convertUrlType(animationUrl);

  let name =
    options && options.name
      ? options.name
      : resMetadate && resMetadate.name
      ? resMetadate.name
      : '';
  let description =
    options && options.description
      ? options.description
      : resMetadate && resMetadate.description
      ? resMetadate.description
      : '';
  let collection: NFTCollectionModel | undefined =
    options && options.collection ? options.collection : {};
  let attributes: NFTAttributeModel[] | undefined =
    options && options.attributes && options.attributes.length > 0 ? options.attributes : [];
  let externalUrl: string | undefined = options && options.externalUrl ? options.externalUrl : '';
  if (options && options.isOriginal) {
    const resData = (await sendRestApi('/api/opensea/asset', 'POST', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        chainId,
        tokenAddress,
        tokenId,
      },
    })) as {
      asset: NFTAssetModel;
    };
    const { asset } = resData;
    name = name ? name : asset.name;
    description = description ? description : asset.description;
    collection = asset.collection;
    attributes = asset.attributes;
    externalUrl = asset.externalUrl;
  }

  return {
    blockchain: networkName === 'mainnet' || networkName === 'goerli' ? 'ethereum' : 'localhost',
    network: {
      chainId,
      name: networkName,
    },
    tokenType,
    tokenAddress,
    tokenId,
    metadata: metadateUrlType,
    image: imageUrlType,
    animation: animationUrlType,
    name,
    description,
    royalty: {
      account: royalty.account,
      value: Number(royalty.value),
    },
    collection,
    attributes,
    externalUrl,
    thumbnailUrl,
  };
};

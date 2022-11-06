import { Network } from 'opensea-js';
import { getJsonRpcProvider } from '@lib/ethereum';
import { getTokenData } from '@lib/ethereum/tokenData';
import { OpenSeaAPI } from '@lib/opensea/api';
import { serverEnv } from '@env';
import { NFTAttributeModel } from 'src/types';
import { OpenSeaAPINFTTrait, OpenSeaAPIAssetOptions } from 'src/types/opensea';
import { SupportChainId } from 'src/types/ethereum';

export const getOpenSeaAPI = (chainId: SupportChainId) => {
  return new OpenSeaAPI({
    networkName: chainId === '1' ? Network.Main : Network.Goerli,
    apiKey: chainId === '1' ? serverEnv.opensea : undefined,
  });
};

export const convertOpenSeaTraitsForAttributes = (
  traits: OpenSeaAPINFTTrait[]
): NFTAttributeModel[] => {
  return traits.map(trait => {
    return {
      traitType: trait.trait_type,
      value: trait.value,
      displayType: trait.display_type ? trait.display_type : '',
      maxValue: trait.max_value ? trait.max_value : '',
      traitCount: trait.trait_count,
      order: trait.order,
    };
  });
};

export const convertAttributesForOpenSeaTraits = (
  attributes: NFTAttributeModel[]
): OpenSeaAPINFTTrait[] => {
  return attributes.map(attribute => {
    return {
      trait_type: attribute.traitType,
      value: attribute.value,
      display_type: attribute.displayType ? attribute.displayType : '',
      max_value: attribute.maxValue ? attribute.maxValue : '',
      trait_count: attribute.traitCount,
      order: attribute.order,
    };
  });
};

export const getAssetForOpenSea = async (
  chainId: SupportChainId,
  tokenAddress: string,
  tokenId: string
) => {
  const provider = getJsonRpcProvider(chainId);
  const openseaAPI = getOpenSeaAPI(chainId);
  const asset = await openseaAPI.getAsset({
    tokenAddress,
    tokenId,
  });
  return getTokenData(provider, chainId, asset.tokenAddress, asset.tokenId ? asset.tokenId : '', {
    thumbnailUrl: asset.imageUrl,
    imageUrl: asset.imageUrl,
    animationUrl: asset.animationUrl ? asset.animationUrl : undefined,
    metadateUrl: asset.tokenMetadata ? asset.tokenMetadata : undefined,
    royalty: {
      account:
        asset.assetContract && asset.assetContract.payoutAddress
          ? asset.assetContract.payoutAddress
          : '',
      value:
        asset.assetContract && asset.assetContract.devSellerFeeBasisPoints
          ? asset.assetContract.devSellerFeeBasisPoints
          : 0,
    },
    name: asset.name ? asset.name : '',
    description: asset.description ? asset.description : '',
    attributes: convertOpenSeaTraitsForAttributes(asset.traits as OpenSeaAPINFTTrait[]),
    collection: {
      bannerImageUrl: asset.collection.featuredImageUrl,
      externalUrl: asset.collection.externalLink,
      imageUrl: asset.collection.imageUrl,
      description: asset.collection.description,
      name: asset.collection.name,
      slug: asset.collection.slug,
    },
    externalUrl: asset.externalLink ? asset.externalLink : undefined,
  });
};

export const getAssetsForOpenSea = async (
  chainId: SupportChainId,
  options?: OpenSeaAPIAssetOptions
) => {
  const provider = getJsonRpcProvider(chainId);
  const openseaAPI = getOpenSeaAPI(chainId);
  const response = await openseaAPI.getAssets({
    owner: options && options.owner !== undefined ? options.owner : undefined,
    limit: options && options.limit !== undefined ? options.limit : 20,
    offset: options && options.offset !== undefined ? options.offset : undefined,
    asset_contract_address:
      options && options.tokenAddress !== undefined ? options.tokenAddress : undefined,
    asset_contract_addresses:
      options && options.tokenAddresses !== undefined ? options.tokenAddresses : undefined,
    token_ids: options && options.tokenIds ? options.tokenIds : undefined,
    order_by: options && options.orderBy ? options.orderBy : undefined,
    order_direction: options && options.orderDirection ? options.orderDirection : undefined,
    cursor: options && options.cursor ? options.cursor : undefined,
  });
  const assets = await Promise.all(
    response.assets.map(async asset => {
      return await getTokenData(
        provider,
        chainId,
        asset.assetContract.address,
        asset.tokenId ? asset.tokenId : '',
        {
          thumbnailUrl: asset.imageUrl,
          imageUrl: asset.imageUrl,
          animationUrl: asset.animationUrl ? asset.animationUrl : undefined,
          metadateUrl: asset.tokenMetadata ? asset.tokenMetadata : undefined,
          royalty: {
            account:
              asset.assetContract && asset.assetContract.payoutAddress
                ? asset.assetContract.payoutAddress
                : '',
            value:
              asset.assetContract && asset.assetContract.devSellerFeeBasisPoints
                ? asset.assetContract.devSellerFeeBasisPoints
                : 0,
          },
          name: asset.name ? asset.name : '',
          description: asset.description ? asset.description : '',
          attributes: convertOpenSeaTraitsForAttributes(asset.traits as OpenSeaAPINFTTrait[]),
          collection: {
            bannerImageUrl: asset.collection.featuredImageUrl,
            externalUrl: asset.collection.externalLink,
            imageUrl: asset.collection.imageUrl,
            description: asset.collection.description,
            name: asset.collection.name,
            slug: asset.collection.slug,
          },
          externalUrl: asset.externalLink ? asset.externalLink : undefined,
        }
      );
    })
  );

  return {
    estimatedCount: response.estimatedCount,
    next: response.next,
    previous: response.previous,
    assets,
  };
};

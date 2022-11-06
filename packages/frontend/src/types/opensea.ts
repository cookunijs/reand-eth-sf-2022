import { OpenSeaAsset, OpenSeaAssetContract, OpenSeaAssetQuery } from 'opensea-js/lib/types';
import { TokenType, NFTAttributeModel, NFTCollectionModel } from 'src/types';

export interface OpenSeaAPIAssetOptions {
  owner?: string;
  limit?: number;
  cursor?: string;
  offset?: number;
  orderBy?: string;
  orderDirection?: string;
  tokenAddress?: string;
  tokenAddresses?: string[];
  tokenIds?: string[];
}

export interface OpenSeaAPINFTTrait {
  trait_type: string;
  value: string | number;
  display_type?: string | null;
  max_value?: string | number | null;
  trait_count?: number;
  order?: any | null;
}

export interface OpenSeaAssetQueryModel extends OpenSeaAssetQuery {
  asset_contract_addresses?: string[];
}

export interface OpenSeaAPIAssetContractModel extends OpenSeaAssetContract {
  payoutAddress: string | null;
}

export interface OpenSeaAPIAssetModel extends OpenSeaAsset {
  animationUrl: string | null;
  animationUrlOriginal: string | null;
  tokenMetadata: string | null;
  assetContract: OpenSeaAPIAssetContractModel;
}

export interface OpenSeaAPIAssetJSONModel {
  id: number | null;
  num_sales: number | null;
  background_color: string | null;
  image_url: string;
  image_preview_url: string | null;
  image_thumbnail_url: string | null;
  image_original_url: string;
  animation_url: string | null;
  animation_original_url: string | null;
  name: string;
  description: string;
  external_link: string | null;
  asset_contract: {
    address: string;
    asset_contract_type: string | null;
    created_date: string | null;
    name: string | null;
    nft_version: string | null;
    opensea_version: string | null;
    owner: number | null;
    schema_name: string | null;
    symbol: string | null;
    total_supply: string | null;
    description: string | null;
    external_link: string | null;
    image_url: string | null;
    default_to_fiat: false;
    dev_buyer_fee_basis_points: number | null;
    dev_seller_fee_basis_points: number | null;
    only_proxied_transfers: false;
    opensea_buyer_fee_basis_points: number | null;
    opensea_seller_fee_basis_points: number | null;
    buyer_fee_basis_points: number | null;
    seller_fee_basis_points: number | null;
    payout_address: string | null;
  };
  permalink: string | null;
  collection: {
    banner_image_url: string | null;
    chat_url: string | null;
    created_date: string | null;
    default_to_fiat: false;
    description: string;
    dev_buyer_fee_basis_points: string | null;
    dev_seller_fee_basis_points: string | null;
    discord_url: string | null;
    display_data: {
      card_display_style: string | null;
    };
    external_url: string;
    featured: false;
    featured_image_url: string;
    hidden: true;
    safelist_request_status: string | null;
    image_url: string;
    is_subject_to_whitelist: false;
    large_image_url: string | null;
    medium_username: null;
    name: string;
    only_proxied_transfers: false;
    opensea_buyer_fee_basis_points: string | null;
    opensea_seller_fee_basis_points: string | null;
    payout_address: string | null;
    require_email: false;
    short_description: string | null;
    slug: string;
    telegram_url: string | null;
    twitter_username: string | null;
    instagram_username: string | null;
    wiki_url: string | null;
    is_nsfw: false;
  };
  decimals: string | null;
  token_metadata: string;
  is_nsfw: false;
  owner: {
    user: {
      username: string | null;
    };
    profile_img_url: string | null;
    address: string | null;
    config: string | null;
  };
  seaport_sell_orders: string | null;
  creator: {
    user: {
      username: string | null;
    };
    profile_img_url: string | null;
    address: string | null;
    config: string | null;
  };
  traits: {
    trait_type: string | null;
    value: number | string | null;
    display_type: number | string | null;
    max_value: number | string | null;
    trait_count: number | null;
    order: string | null;
  }[];
  last_sale: string | null;
  top_bid: string | null;
  listing_date: string | null;
  is_presale: false;
  transfer_fee_payment_token: string | null;
  transfer_fee: string | null;
  token_id: string;
}

export interface OpenSeaTokenAssetModel {
  tokenType: TokenType;
  tokenAddress: string;
  tokenId: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  imageUrl: string;
  animationUrl?: string;
  youtubeUrl?: string;
  attributes?: NFTAttributeModel[];
  collection?: NFTCollectionModel;
  externalUrl?: string;
}

import { OrderSide } from 'opensea-js/lib/types';
import {
  assetEventFromJSON,
  collectionFromJSON,
  orderFromJSON,
  tokenFromJSON,
  makeBigNumber,
} from 'opensea-js/lib/utils/utils';
import { OpenSeaAPIAssetModel, OpenSeaAPIAssetContractModel } from 'src/types/opensea';

export const assetContractFromJSON = (asset_contract: any): OpenSeaAPIAssetContractModel => {
  return {
    name: asset_contract.name,
    description: asset_contract.description,
    type: asset_contract.asset_contract_type,
    schemaName: asset_contract.schema_name,
    address: asset_contract.address,
    tokenSymbol: asset_contract.symbol,
    buyerFeeBasisPoints: +asset_contract.buyer_fee_basis_points,
    sellerFeeBasisPoints: +asset_contract.seller_fee_basis_points,
    openseaBuyerFeeBasisPoints: +asset_contract.opensea_buyer_fee_basis_points,
    openseaSellerFeeBasisPoints: +asset_contract.opensea_seller_fee_basis_points,
    devBuyerFeeBasisPoints: +asset_contract.dev_buyer_fee_basis_points,
    devSellerFeeBasisPoints: +asset_contract.dev_seller_fee_basis_points,
    imageUrl: asset_contract.image_url,
    externalLink: asset_contract.external_link,
    wikiLink: asset_contract.wiki_link,
    payoutAddress: asset_contract.payout_address,
  };
};

export const assetFromJSON = (asset: any): OpenSeaAPIAssetModel => {
  const isAnimated = asset.image_url && asset.image_url.endsWith('.gif');
  const isSvg = asset.image_url && asset.image_url.endsWith('.svg');
  const fromJSON: OpenSeaAPIAssetModel = {
    tokenId: asset.token_id,
    tokenAddress: asset.asset_contract.address,
    name: asset.name,
    description: asset.description,
    owner: asset.owner,
    assetContract: assetContractFromJSON(asset.asset_contract),
    collection: collectionFromJSON(asset.collection),
    orders: asset.orders ? asset.orders.map(orderFromJSON) : null,
    sellOrders: asset.sell_orders ? asset.sell_orders.map(orderFromJSON) : null,
    buyOrders: asset.buy_orders ? asset.buy_orders.map(orderFromJSON) : null,
    isPresale: asset.is_presale,
    imageUrl: isAnimated || isSvg ? asset.image_url : `${asset.image_url}=s1000`,
    imagePreviewUrl: asset.image_preview_url,
    imageUrlOriginal: asset.image_original_url,
    imageUrlThumbnail: asset.image_thumbnail_url,
    animationUrl: asset.animation_url,
    animationUrlOriginal: asset.animation_original_url,
    tokenMetadata: asset.token_metadata,
    externalLink: asset.external_link,
    openseaLink: asset.permalink,
    traits: asset.traits,
    numSales: asset.num_sales,
    lastSale: asset.last_sale ? assetEventFromJSON(asset.last_sale) : null,
    backgroundColor: asset.background_color ? `#${asset.background_color}` : null,
    transferFee: asset.transfer_fee ? makeBigNumber(asset.transfer_fee) : null,
    transferFeePaymentToken: asset.transfer_fee_payment_token
      ? tokenFromJSON(asset.transfer_fee_payment_token)
      : null,
  };
  // If orders were included, put them in sell/buy order groups
  if (fromJSON.orders && !fromJSON.sellOrders) {
    fromJSON.sellOrders = fromJSON.orders.filter(o => o.side == OrderSide.Sell);
  }
  if (fromJSON.orders && !fromJSON.buyOrders) {
    fromJSON.buyOrders = fromJSON.orders.filter(o => o.side == OrderSide.Buy);
  }
  return fromJSON;
};

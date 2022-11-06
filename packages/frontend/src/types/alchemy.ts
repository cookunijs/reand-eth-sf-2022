import { AssetTransfersCategory, AssetTransfersOrder } from 'alchemy-sdk';

export interface AlchemyAPIAssetOptions {
  category?: AssetTransfersCategory[];
  order?: AssetTransfersOrder;
  limit?: number;
  pageKey?: string;
  tokenAddress?: string;
}

export interface AssetData {
  assetClass: string;
  data: string;
}

export interface PartData {
  account: string;
  value: number;
}

export interface OrderData {
  executor: string;
  originAsset: AssetData;
  childAsset: AssetData;
}

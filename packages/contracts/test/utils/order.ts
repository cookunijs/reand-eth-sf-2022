export interface AssetType {
  assetClass: string;
  data: string;
}

export interface AssetData {
  assetType: AssetType;
  value: number;
  recipient: string;
}

export interface OrderData {
  maker: string;
  taker: string;
  arbitrator: string;
  makeAssets: AssetData[];
  takeAssets: AssetData[];
  extraAssets: AssetData[];
  message: string;
  salt: number;
  start: number;
  end: number;
  orderType: string;
  version: string;
}

export const OrderTypes = {
  AssetType: [
    { name: "assetClass", type: "bytes4" },
    { name: "data", type: "bytes" },
  ],
  AssetData: [
    { name: "assetType", type: "AssetType" },
    { name: "value", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
  OrderData: [
    { name: "maker", type: "address" },
    { name: "taker", type: "address" },
    { name: "arbitrator", type: "address" },
    { name: "makeAssets", type: "AssetData[]" },
    { name: "takeAssets", type: "AssetData[]" },
    { name: "extraAssets", type: "AssetData[]" },
    { name: "message", type: "bytes32" },
    { name: "salt", type: "uint256" },
    { name: "start", type: "uint256" },
    { name: "end", type: "uint256" },
    { name: "orderType", type: "bytes4" },
    { name: "version", type: "bytes4" },
  ],
};

export const OrdersTypes = {
  AssetType: [
    { name: "assetClass", type: "bytes4" },
    { name: "data", type: "bytes" },
  ],
  AssetData: [
    { name: "assetType", type: "AssetType" },
    { name: "value", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
  OrderData: [
    { name: "maker", type: "address" },
    { name: "taker", type: "address" },
    { name: "arbitrator", type: "address" },
    { name: "makeAssets", type: "AssetData[]" },
    { name: "takeAssets", type: "AssetData[]" },
    { name: "extraAssets", type: "AssetData[]" },
    { name: "message", type: "bytes32" },
    { name: "salt", type: "uint256" },
    { name: "start", type: "uint256" },
    { name: "end", type: "uint256" },
    { name: "orderType", type: "bytes4" },
    { name: "version", type: "bytes4" },
  ],
  OrdersData: [{ name: "orders", type: "OrderData[]" }],
};

export const AssetTypeTypes = {
  AssetType: [
    { name: "assetClass", type: "bytes4" },
    { name: "data", type: "bytes" },
  ],
};

export const AssetDataTypes = {
  AssetType: [
    { name: "assetClass", type: "bytes4" },
    { name: "data", type: "bytes" },
  ],
  AssetData: [
    { name: "assetType", type: "AssetType" },
    { name: "value", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
};

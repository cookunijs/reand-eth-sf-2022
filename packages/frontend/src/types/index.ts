import { FieldValue, Timestamp } from 'firebase/firestore';

export type LanguageType = 'en' | 'ja';
export type AuthorityStatusType =
  | 'public'
  | 'involved'
  | 'private'
  | 'disabled'
  | 'deleted'
  | 'suspended';
export type GeneralStatusType = 'active' | 'inactive';
export type TransactionStatusType = 'pending' | 'success' | 'reverted';
export type TranslationProviderType = 'deepl' | 'google';
export type BlockchainType = 'ethereum' | 'polygon' | 'bsc' | 'localhost';
export type ChainIdType = '1' | '5' | 'testnet';
export type NetworkNameType = 'mainnet' | 'goerli' | 'testnet';
export type TokenType = 'ERC721' | 'ERC1155';
export type MediaType = 'image' | 'video' | 'audio' | '3dmodel';
export type Timestampish = Timestamp | FieldValue | Date | string | number;
export type EnvType = 'local' | 'dev' | 'staging' | 'prod';

export interface PublicEnvModel {
  env: EnvType;
  host: string;
  deepl: string;
  infura: {
    id: string;
    secret: string;
  };
  alchemy: {
    mainnet: string;
    goerli: string;
    polygonMainnet: string;
    polygonTestnetMumbai: string;
    localhost: string;
  };
  algolia: {
    id: string;
    apiKey: string;
  };
}

export interface ServerEnvModel {
  alchemy: {
    mainnet: string;
    goerli: string;
    polygonMainnet: string;
    polygonTestnetMumbai: string;
    localhost: string;
  };
  algolia: {
    id: string;
    adminKey: string;
  };
  firebase: any;
  opensea: string;
  pinata: {
    key: string;
    secret: string;
    jwt: string;
  };
  twitter: {
    bearerToken: string;
  };
}

export interface BaseModel {
  id: string;
  status: AuthorityStatusType;
  createdAt: Timestampish;
  updatedAt: Timestampish;
}

export interface TranslationModel {
  type: 'original' | 'translation';
  provider: TranslationProviderType;
  language: LanguageType;
  text: string;
}

export interface FileModel {
  id: string;
  indexNumber: number;
  type: string;
  lastModified: number;
  size: number;
  width: number;
  height: number;
  name: string;
  extension: string;
  url: string;
}

export interface UrlTypeModel {
  type: 'ipfs' | 'arweave' | 'common' | 'other' | 'none';
  protocol: string;
  domain: string;
  url: string;
  httpUrl: string;
}

export interface NFTMetadataModel {
  name: string;
  description: string;
  image: string;
  attributes?: NFTAttributeModel;
  background_color?: string;
  external_url?: string;
  animation_url?: string;
  youtube_url?: string;
  image_data?: any;
}

export interface NFTAttributeModel {
  displayType?: string;
  traitType: string;
  value: string | number;
  maxValue?: string | number;
  traitCount?: number;
  order?: any;
}

export interface NFTCollectionModel {
  bannerImageUrl?: string;
  externalUrl?: string;
  imageUrl?: string;
  description?: string;
  name?: string;
  slug?: string;
}

export interface NetworkTypeModel {
  chainId: ChainIdType;
  name: NetworkNameType;
}

export interface BlockchainModel {
  blockchain: BlockchainType;
  network: NetworkTypeModel;
}

export interface PartModel {
  account: string;
  value: number;
}

export interface AccountModel {
  id: string;
  address: string;
}

export interface AssetTypeModel {
  classId: string; // bytes4(ETH)
  className: string; // ETH
  data: string; // bytes(tokenAddress, tokenId)
}

export interface AssetModel extends BlockchainModel {
  type: AssetTypeModel;
  value: number;
}

export interface NFTAssetModel extends BlockchainModel {
  tokenType: TokenType;
  tokenAddress: string;
  tokenId: string;
  name: string;
  description: string;
  royalty: PartModel;
  metadata: UrlTypeModel;
  image: UrlTypeModel;
  animation?: UrlTypeModel;
  // imageData?: string;
  attributes?: NFTAttributeModel[];
  collection?: NFTCollectionModel;
  externalUrl?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
}

export interface TransactionDetailModel {
  hash: string;
  nonce: number;
  blockNumber?: number;
  blockHash?: string;
  transactionIndex?: number;
  from: string;
  to?: string;
  value: string;
  gasPrice?: string;
  gasLimit: string;
  data: string;
  chainId: number;
}

export interface TransactionReceiptModel {
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  transactionIndex: number;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  from: string;
  to: string;
  status?: number;
}

export interface TransactionModel extends BaseModel, BlockchainModel {
  from: AccountModel;
  detail: TransactionDetailModel;
  receipt?: TransactionReceiptModel;
  txStatus: TransactionStatusType;
}

export interface TwitterUser extends BaseModel {
  twitterId: string;
  name: string;
  username: string;
  description: string;
  location: string;
  pinnedTweetId: string;
  profileImageUrl: string;
  protected: boolean;
  url: string;
  verified: boolean;
  withheld: string;
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  listedCount: number;
  creatorStatus: GeneralStatusType;
  twitterCreatedAt: string;
}

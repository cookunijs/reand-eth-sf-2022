import { Bytes } from 'ethers/lib/utils';

export type SupportChainId = '1' | '5' | '137' | '80001';

export type SupportNetwork = 'mainnet' | 'goerli' | 'matic' | 'mumbai';

export type SignMessageFunction = (
  config?:
    | {
        message?: string | Bytes | undefined;
      }
    | undefined
) => Promise<
  | {
      data: string;
      error: undefined;
    }
  | {
      data: undefined;
      error: Error;
    }
>;

export type AccountHookData = {
  address?: string;
  connector: any;
  ens?: {
    avatar?: string | null;
    name?: string | null;
  };
};

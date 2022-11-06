import { publicEnv } from '@env';
import { getJsonRpcProvider } from '@lib/ethereum';

export const getENSResolveName = async (name: string) => {
  const provider = getJsonRpcProvider(
    publicEnv.env === 'prod'
      ? '1'
      : publicEnv.env === 'staging'
      ? '1'
      : publicEnv.env === 'dev'
      ? '5'
      : '5'
  );
  return await provider.resolveName(name);
};

export const getENSLookupAddress = async (address: string) => {
  const provider = getJsonRpcProvider(
    publicEnv.env === 'prod'
      ? '1'
      : publicEnv.env === 'staging'
      ? '1'
      : publicEnv.env === 'dev'
      ? '5'
      : '5'
  );
  return await provider.lookupAddress(address);
};

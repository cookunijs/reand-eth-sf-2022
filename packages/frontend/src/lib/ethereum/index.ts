import { publicEnv } from '@env';
import { ethers } from 'ethers';
import chainIdJson from '@configs/ethereum/chainId.json';
import networkJson from '@configs/ethereum/network.json';
import { SupportChainId, SupportNetwork } from 'src/types/ethereum';

export const generateSalt = (account: string) => {
  const timestamp = Date.now();
  const rand = (Math.random() * 10 ** 18).toString().slice(0, 11);
  return Number(
    BigInt(account + timestamp + rand)
      .toString(10)
      .slice(-10)
  );
};

export const getDefaultChainId = () => {
  return publicEnv.env === 'prod'
    ? '1'
    : publicEnv.env === 'staging'
    ? '1'
    : publicEnv.env === 'dev'
    ? '80001'
    : '80001';
};

export const getDefaultNetwork = () => {
  return publicEnv.env === 'prod'
    ? 'mainnet'
    : publicEnv.env === 'staging'
    ? 'mainnet'
    : publicEnv.env === 'dev'
    ? 'polygonMumbai'
    : 'polygonMumbai';
};

export const getJsonRpcProvider = (chainId: SupportChainId) => {
  const networkName = chainIdJson[chainId] as SupportNetwork;
  return new ethers.providers.JsonRpcProvider(
    `${networkJson[networkName].rpc}${publicEnv.alchemy[networkName]}`
  );
};

export const getCurrentBlock = async (provider: ethers.providers.BaseProvider) => {
  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  return block;
};

export const getCurrentBlockTimestamp = async (provider: ethers.providers.BaseProvider) => {
  const { timestamp } = await getCurrentBlock(provider);
  return timestamp;
};

// NOTE: Sign Conversion
// https://github.com/MetaMask/metamask-extension/issues/10240#issuecomment-910670844
export const convertSignature = async (signature: string) => {
  if (signature.substring(2).length !== 130) throw new Error('Not Signature');
  const vInInt = parseInt(signature.slice(-2), 16);
  if (vInInt === 0 || vInInt === 1) {
    const modifiedVInInt = vInInt + 27;
    return signature.slice(0, signature.length - 2) + modifiedVInInt.toString(16);
  }
  return signature;
};

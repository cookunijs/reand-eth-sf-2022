import { ethers } from 'ethers';
import ReandInterface from '@lib/ethereum/contracts/interfaces/Reand.json';
import { Reand } from 'src/types/ethereum/contracts/interfaces/Reand.d';
import { OrderData } from 'src/types/ethereum/contracts/reand';

export const getReandContract = (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  return new Reand(contractAddress, ReandInterface.abi, senderOfProvider);
};

export const createAnd = async (
  sender: ethers.Signer,
  contractAddress: string,
  args: {
    orderData: OrderData;
  }
) => {
  const reand = getReandContract(sender, contractAddress);
  return await reand.createAnd(args.orderData);
};

export const verifyWithWorldId = async (
  sender: ethers.Signer,
  contractAddress: string,
  args: {
    account: string;
    root: ethers.BigNumberish;
    nullifierHash: ethers.BigNumberish;
    proof: [
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish
    ];
  }
) => {
  const reand = getReandContract(sender, contractAddress);
  return await reand.verifyWithWorldId(args.account, args.root, args.nullifierHash, args.proof);
};

export const getVerified = async (
  sender: ethers.Signer,
  contractAddress: string,
  args: {
    account: string;
    idType: ethers.utils.BytesLike;
  }
) => {
  const reand = getReandContract(sender, contractAddress);
  return await reand.getVerified(args.account, args.idType);
};

import { ethers } from 'ethers';
import { NULL_ADDRESS, NULL_NUMBER } from '@lib/ethereum/structs';
import { getSupportRoyaltyInfoInterface } from '@lib/ethereum/contracts/token';
import ERC721Interface from '@lib/ethereum/contracts/interfaces/ERC721.json';
import { PartModel } from 'src/types';
import { ERC721 } from 'src/types/ethereum/contracts/interfaces/ERC721.d';

export const getERC721Contract = (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  return new ERC721(contractAddress, ERC721Interface.abi, senderOfProvider);
};

export const getERC721BalanceOf = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string,
  owner: string
) => {
  try {
    const erc721 = getERC721Contract(senderOfProvider, contractAddress);
    const balance = await erc721.balanceOf(owner);
    return balance.toString();
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getERC721TokenURI = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string,
  tokenId: string
) => {
  try {
    const erc721 = getERC721Contract(senderOfProvider, contractAddress);
    const uri = await erc721.tokenURI(tokenId);
    return uri;
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getERC721RoyaltyInfo = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string,
  tokenId: string
): Promise<PartModel> => {
  try {
    const supported = await getSupportRoyaltyInfoInterface(senderOfProvider, contractAddress);
    if (!supported)
      return {
        account: NULL_ADDRESS,
        value: NULL_NUMBER,
      };

    const salePrice = 10000;
    const erc721 = getERC721Contract(senderOfProvider, contractAddress);
    const result = await erc721.royaltyInfo(tokenId, salePrice);
    return {
      account: result[0],
      value: result[1],
    };
  } catch (err) {
    console.log(err);
    return {
      account: '',
      value: 0,
    };
  }
};

export const getIsERC721ApprovedForAll = async (
  sender: ethers.Signer,
  contractAddress: string,
  targetAddress: string
) => {
  const erc721 = getERC721Contract(sender, contractAddress);
  const senderAddress = await sender.getAddress();
  return await erc721.isApprovedForAll(senderAddress, targetAddress);
};

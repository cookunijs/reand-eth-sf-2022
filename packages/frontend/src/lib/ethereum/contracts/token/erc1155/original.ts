import { ethers } from 'ethers';
import ERC1155Interface from '@lib/ethereum/contracts/interfaces/ERC1155.json';
import { ERC1155 } from 'src/types/ethereum/contracts/interfaces/ERC1155.d';

export const getERC1155Contract = (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  return new ERC1155(contractAddress, ERC1155Interface.abi, senderOfProvider);
};

export const getERC1155TokenURI = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string,
  tokenId: string
) => {
  try {
    const erc1155 = getERC1155Contract(senderOfProvider, contractAddress);
    const uri = await erc1155.uri(tokenId);
    return uri;
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getIsERC1155ApprovedForAll = async (
  senderOfProvider: ethers.Signer,
  contractAddress: string,
  targetAddress: string
) => {
  const erc1155 = getERC1155Contract(senderOfProvider, contractAddress);
  const senderAddress = await senderOfProvider.getAddress();
  return await erc1155.isApprovedForAll(senderAddress, targetAddress);
};

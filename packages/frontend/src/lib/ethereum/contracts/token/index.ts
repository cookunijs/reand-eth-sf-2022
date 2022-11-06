import { ethers } from 'ethers';
import ERC721Interface from '@lib/ethereum/contracts/interfaces/ERC721.json';
import { ERC721 } from 'src/types/ethereum/contracts/interfaces/ERC721.d';
import { getJsonRpcProvider } from '@lib/ethereum';
import { getERC721BalanceOf } from '@lib/ethereum/contracts/token/erc721/original';
import { SupportChainId } from 'src/types/ethereum';

export const getTokenContract = (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  return new ERC721(contractAddress, ERC721Interface.abi, senderOfProvider);
};

export const getTokenInterface = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  try {
    const token = getTokenContract(senderOfProvider, contractAddress);
    const validERC721 = await token.supportsInterface('0x80ac58cd');
    if (validERC721) return 'ERC721';
    const validERC1155 = await token.supportsInterface('0xd9b67a26');
    if (validERC1155) return 'ERC1155';
    return '';
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getSupportRoyaltyInfoInterface = async (
  senderOfProvider: ethers.Signer | ethers.providers.Provider,
  contractAddress: string
) => {
  try {
    const token = getTokenContract(senderOfProvider, contractAddress);
    const validERC2981 = await token.supportsInterface('0x2a55205a');
    if (validERC2981) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getERC721TokenBalanceOf = async (
  tokenAddress: string,
  account: string,
  chainId: SupportChainId = '1'
) => {
  const provider = getJsonRpcProvider(chainId);
  const balance = await getERC721BalanceOf(provider, tokenAddress, account);
  return balance;
};

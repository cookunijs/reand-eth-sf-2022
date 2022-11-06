import { ethers } from 'ethers';

export const id = (str: string) => {
  return `${ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str)).toString().substring(0, 10)}`;
};

export const ETH_NAME = 'ETH';
export const ETH = id(ETH_NAME);
export const ERC20_NAME = 'ERC20';
export const ERC20 = id(ERC20_NAME);
export const ERC721_NAME = 'ERC721';
export const ERC721 = id(ERC721_NAME);
export const ERC721_LAZY_NAME = 'ERC721_LAZY';
export const ERC721_LAZY = id(ERC721_LAZY_NAME);
export const ERC1155_NAME = 'ERC1155';
export const ERC1155 = id(ERC1155_NAME);
export const ERC1155_LAZY_NAME = 'ERC1155_LAZY';
export const ERC1155_LAZY = id(ERC1155_LAZY_NAME);

import { ethers } from 'ethers';

export const abiCoderEncode = (types: string[], data: (string | number | unknown)[]) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.encode(types, data);
};

export const abiCoderEncodeWithArray = (types: string[], data: (string | number | unknown)[]) => {
  return (
    '0x0000000000000000000000000000000000000000000000000000000000000020' +
    abiCoderEncode(types, data).substring(2)
  );
};

export const abiCoderEncodeForTokenData = (
  token: string,
  tokenId?: number | string,
  value?: number | string
) => {
  if (tokenId && value) {
    return abiCoderEncode(['address', 'uint256', 'uint256'], [token, tokenId, value]);
  } else if (tokenId) {
    return abiCoderEncode(['address', 'uint256'], [token, tokenId]);
  } else {
    return abiCoderEncode(['address'], [token]);
  }
};

export const abiCoderDecode = (types: string[], data: string) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.decode(types, data);
};

export const abiCoderDecodeForTokenData = (
  type: 'ERC20' | 'ERC721' | 'ERC1155' | string,
  data: string
) => {
  if (type === 'ERC721' || type === 'ERC1155') {
    return abiCoderDecode(['address', 'uint256'], data);
  } else {
    return abiCoderDecode(['address'], data);
  }
};

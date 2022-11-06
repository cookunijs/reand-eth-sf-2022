import { ethers } from "hardhat";

export const id = (str: string) => {
  return `${ethers.utils
    .keccak256(ethers.utils.toUtf8Bytes(str))
    .toString()
    .substring(0, 10)}`;
};

export const abiCoderEncodeTokenData = (token: string, tokenId?: number) => {
  if (tokenId) {
    return abiCoderEncode(["address", "uint256"], [token, tokenId]);
  } else {
    return abiCoderEncode(["address"], [token]);
  }
};

export const abiCoderEncode = (
  types: string[],
  data: (string | number | unknown)[]
) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.encode(types, data);
};

export const abiCoderEncodePacked = (
  types: string[],
  data: (string | number | unknown)[]
) => {
  return ethers.utils.solidityPack(types, data);
};

export const abiCoderEncodeWithArray = (
  types: string[],
  data: (string | number | unknown)[]
) => {
  return (
    "0x0000000000000000000000000000000000000000000000000000000000000020" +
    abiCoderEncode(types, data).substring(2)
  );
};

export const abiCoderDecode = (types: string[], data: string) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.decode(types, data);
};

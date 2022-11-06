import { _TypedDataEncoder } from "@ethersproject/hash";
import { waffle } from "hardhat";

import type { TypedDataField } from "@ethersproject/abstract-signer";

export const DOMAIN_TYPE = [
  {
    type: "string",
    name: "name",
  },
  {
    type: "string",
    name: "version",
  },
  {
    type: "uint256",
    name: "chainId",
  },
  {
    type: "address",
    name: "verifyingContract",
  },
];

export const createTypeData = (
  domain: any,
  primaryType: string,
  message: any,
  types: any
) => {
  return {
    types: Object.assign(
      {
        EIP712Domain: DOMAIN_TYPE,
      },
      types
    ),
    domain,
    primaryType,
    message,
  };
};

export const getDomain = async (
  name: string,
  version: string,
  verifyingContract: string
) => {
  const provider = waffle.provider;
  const { chainId } = await provider.getNetwork();
  return { name, version, chainId, verifyingContract };
};

export const hashStruct = async (
  name: string,
  types: Record<string, TypedDataField[]>,
  data: Record<string, any>
) => {
  return _TypedDataEncoder.from(types).hashStruct(name, data);
};

// NOTE: hash
export const hashData = async (
  types: Record<string, TypedDataField[]>,
  data: Record<string, unknown>
) => {
  return _TypedDataEncoder.from(types).hash(data);
};

// NOTE: hashTyped
export const hashTypedData = async (
  name: string,
  version: string,
  verifyingContract: string,
  types: Record<string, TypedDataField[]>,
  data: Record<string, unknown>
) => {
  const domain = await getDomain(name, version, verifyingContract);
  return _TypedDataEncoder.hash(domain, types, data);
};

// NOTE: sign
export const signTypedData = async (
  account: any, // Signer
  name: string,
  version: string,
  verifyingContract: string,
  types: Record<string, TypedDataField[]>,
  data: Record<string, unknown>
) => {
  const domain = await getDomain(name, version, verifyingContract);
  return await account._signTypedData(domain, types, data);
};

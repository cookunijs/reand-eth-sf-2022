import { TypedDataField } from '@ethersproject/abstract-signer';
import { _TypedDataEncoder } from '@ethersproject/hash';
import { convertSignature } from '@lib/ethereum';

export const DOMAIN_TYPE = [
  {
    type: 'string',
    name: 'name',
  },
  {
    type: 'string',
    name: 'version',
  },
  {
    type: 'uint256',
    name: 'chainId',
  },
  {
    type: 'address',
    name: 'verifyingContract',
  },
];

export const createTypeData = (domain: any, primaryType: string, message: any, types: any) => {
  return {
    types: Object.assign(
      {
        EIP712Domain: DOMAIN_TYPE,
      },
      types
    ),
    domain: domain,
    primaryType: primaryType,
    message: message,
  };
};

export const getDomain = async (
  name: string,
  version: string,
  chainId: string,
  verifyingContract: string
) => {
  return { name, version, chainId, verifyingContract };
};

export const hashStruct = async (
  name: string,
  types: Record<string, TypedDataField[]>,
  data: Record<string, any>
) => {
  return _TypedDataEncoder.from(types).hashStruct(name, data);
};

// hash
export const hashData = async (
  types: Record<string, TypedDataField[]>,
  data: Record<string, unknown>
) => {
  return _TypedDataEncoder.from(types).hash(data);
};

// hashTyped
export const hashTypedData = async (
  name: string,
  version: string,
  chainId: string,
  verifyingContract: string,
  types: Record<string, TypedDataField[]>,
  data: Record<string, unknown>
) => {
  const domain = await getDomain(name, version, chainId, verifyingContract);
  return _TypedDataEncoder.hash(domain, types, data);
};

// sign
export const signTypedData = async (
  account: any, // Signer
  name: string,
  version: string,
  chainId: string,
  verifyingContract: string,
  types: Record<string, TypedDataField[]>,
  data: any
) => {
  const domain = await getDomain(name, version, chainId, verifyingContract);
  const signature = await account._signTypedData(domain, types, data);
  return convertSignature(signature);
};

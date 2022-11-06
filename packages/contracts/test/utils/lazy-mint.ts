import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

import { abiCoderEncode } from "./abi-coder";
import { ALWAYS_VALID_FROM, ALWAYS_VALID_TO, NULL_BYTES } from "./constants";
import { hashData, signTypedData } from "./eip-712";

export interface BulkMintList {
  to: string;
  tokenId: number;
}

export interface SecurityData {
  validFrom: number;
  validTo: number;
  salt: number | string;
}

export interface SignatureData {
  root?: string;
  proof?: string[];
  signature: string;
}

export interface MintERC721Data {
  securityData: SecurityData;
  minter: string;
  to: string;
  tokenId: number;
  data: string;
}

export const MintERC721Types = {
  SecurityData: [
    { name: "validFrom", type: "uint256" },
    { name: "validTo", type: "uint256" },
    { name: "salt", type: "uint256" },
  ],
  MintERC721Data: [
    { name: "securityData", type: "SecurityData" },
    { name: "minter", type: "address" },
    { name: "to", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "data", type: "bytes" },
  ],
};

export const SignatureTypes = {
  SignatureData: [{ name: "root", type: "bytes32" }],
};

export const mintERC721DataTypeArray = [
  "address",
  "address",
  "MintERC721Data(SecurityData(uint256 validFrom, uint256 validTo, uint256 salt) securityData, address minter, address to, uint256 tokenId, bytes data)",
  "SignatureData(bytes32 root, bytes32[] proof, bytes signature)",
];

export const bulkMintERC721DataTypeArray = [
  "address",
  "MintERC721Data(SecurityData(uint256 validFrom, uint256 validTo, uint256 salt) securityData, address minter, address to, uint256 tokenId, bytes data)[]",
  "SignatureData(bytes32 root, bytes32[] proof, bytes signature)[]",
];

export const generateMintData = async (
  signer: any,
  name: string,
  version: string,
  proxyContract: string,
  verifyingContract: string,
  to: string,
  tokenId: string | number,
  options: {
    securityData?: SecurityData;
  }
) => {
  const minter = signer.address;
  const securityData = options.securityData || {
    validFrom: ALWAYS_VALID_FROM,
    validTo: ALWAYS_VALID_TO,
    salt: ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString(),
  };
  const mintData = {
    securityData,
    minter,
    to,
    tokenId,
    data: NULL_BYTES,
  };
  const signature = await signTypedData(
    signer,
    name,
    version,
    verifyingContract,
    MintERC721Types,
    mintData
  );
  const mintERC721leaf = await hashData(MintERC721Types, mintData);
  const mintERC721Tree = new MerkleTree([mintERC721leaf], keccak256, {
    sort: true,
  });
  const mintERC721Root = mintERC721Tree.getHexRoot();
  const mintERC721proof = mintERC721Tree.getHexProof(mintERC721leaf);
  const mintSignature = {
    root: mintERC721Root,
    proof: mintERC721proof,
    signature,
  };
  const assetTypeData = abiCoderEncode(mintERC721DataTypeArray, [
    proxyContract,
    verifyingContract,
    mintData,
    mintSignature,
  ]);

  return {
    assetTypeData,
    mintData,
    mintSignature,
  };
};

// NOTE: BulkMinter
export const generateBulkMintData = async (
  signer: any,
  name: string,
  version: string,
  verifyingContract: string,
  mintList: BulkMintList[],
  options: {
    securityData?: SecurityData;
  }
) => {
  const minter = signer.address;
  const securityData = options.securityData || {
    validFrom: ALWAYS_VALID_FROM,
    validTo: ALWAYS_VALID_TO,
    salt: ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString(),
  };
  const mintERC721DataList = mintList.map((data) => {
    return {
      securityData,
      minter,
      to: data.to,
      tokenId: data.tokenId,
      data: NULL_BYTES,
    };
  });
  const mintERC721leaves = await Promise.all(
    mintERC721DataList.map(async (data) => {
      return await hashData(MintERC721Types, data);
    })
  );
  const mintERC721Tree = new MerkleTree(mintERC721leaves, keccak256, {
    sort: true,
  });
  const mintERC721Root = mintERC721Tree.getHexRoot();
  const signatureData = {
    root: mintERC721Root,
  };
  const mintSignature = await signTypedData(
    signer,
    name,
    version,
    verifyingContract,
    SignatureTypes,
    signatureData
  );
  const mintSignatureList = mintERC721leaves.map((leaf: string | Buffer) => {
    const mintERC721proof = mintERC721Tree.getHexProof(leaf);
    return {
      root: mintERC721Root,
      proof: mintERC721proof,
      signature: mintSignature,
    };
  });
  const assetTypeData = abiCoderEncode(bulkMintERC721DataTypeArray, [
    verifyingContract,
    mintERC721DataList,
    mintSignatureList,
  ]);

  return {
    assetTypeData,
    mintERC721DataList,
    mintSignatureList,
    mintERC721Root,
    mintERC721leaves,
    mintERC721Tree,
  };
};

export const generateTokenId = (account: string) => {
  const timestamp = Date.now();
  const rand = (Math.random() * 10 ** 18).toString().slice(0, 11);
  return BigInt(account + timestamp + rand).toString(10);
};

import { ethers, Bytes } from 'ethers';
import { convertSignature } from '@lib/ethereum';

export class UserRejectedRequestError extends Error {
  name = 'UserRejectedRequestError';
  message = 'User rejected request';
}

export type SignMessageArgs = {
  message: Bytes | string;
};

type Signature = string;
export type SignMessageResult = Signature;

export const signMessage = async (
  signer: ethers.Signer,
  args: SignMessageArgs
): Promise<SignMessageResult> => {
  try {
    const signature = await signer.signMessage(args.message);
    return convertSignature(signature);
  } catch (error_) {
    const error: Error = <Error>error_;
    throw error;
  }
};

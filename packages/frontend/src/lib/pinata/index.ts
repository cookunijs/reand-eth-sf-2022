import * as fs from 'fs';
import pinataSDK, { PinataPinResponse, PinataPinOptions } from '@pinata/sdk';
import { serverEnv } from '@env';

const pinataDefaultOptions = {
  pinataOptions: {
    cidVersion: 0 as const,
  },
};

export const pinFileToIPFS = async (
  file: fs.ReadStream,
  options?: PinataPinOptions
): Promise<PinataPinResponse> => {
  try {
    const pinata = pinataSDK(serverEnv.pinata.key, serverEnv.pinata.secret);
    return pinata.pinFileToIPFS(file, {
      ...pinataDefaultOptions,
      ...options,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const pinJSONToIPFS = async (
  body: Object,
  options?: PinataPinOptions
): Promise<PinataPinResponse> => {
  try {
    const pinata = pinataSDK(serverEnv.pinata.key, serverEnv.pinata.secret);
    return pinata.pinJSONToIPFS(body, {
      ...pinataDefaultOptions,
      ...options,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

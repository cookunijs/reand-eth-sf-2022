import { publicEnv } from '@env';

const nodeEnv = publicEnv.env;

export const baseApiUrl =
  nodeEnv === 'local'
    ? 'http://localhost:3000'
    : nodeEnv === 'dev'
    ? 'https://dev.sample.com/'
    : nodeEnv === 'staging'
    ? 'https://staging.sample.com/'
    : nodeEnv === 'prod'
    ? 'https://sample.com'
    : '';

export const checkValueIncludeUrl = (value: string) => {
  if (['https://', 'http://'].filter(x => value.match(new RegExp(x))).length > 0) return true;
  return false;
};

export const sendRestApi = async (
  url: string,
  method: 'GET' | 'POST',
  params?: {
    headers?:
      | Headers
      | {
          'Content-Type'?: string;
          Accept?: string;
          Authorization?: string;
          'X-Api-Key'?: string;
        };
    body?: any;
  }
) => {
  try {
    const res = await fetch(url, {
      method,
      headers: params && params.headers ? params.headers : undefined,
      body: params && params.body ? JSON.stringify(params.body) : undefined,
    });
    const data = await res.json();
    if (!res.ok || !data) throw new Error('Error');
    return data;
  } catch (err) {
    return undefined;
  }
};

export const sleepSystem = async (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const copyClipboard = (value: string): void => {
  const input = document.createElement('textarea');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('id', 'copyinput');
  input.setAttribute('type', 'hidden');
  document.body.appendChild(input);
  input.value = value;
  input.select();
  document.execCommand('copy');
  input.remove();
};

export const downloadFile = async (url: string, name: string, extension: string): Promise<void> => {
  const response = await fetch(url, {
    method: 'GET',
  });
  const buffer = await response.arrayBuffer();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([buffer]));
  link.setAttribute('type', 'hidden');
  link.setAttribute('download', `${name}.${extension}`);
  document.body.appendChild(link);
  link.click();
};

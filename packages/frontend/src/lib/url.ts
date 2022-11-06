import { UrlTypeModel } from 'src/types';

export const getUrlInfo = (url: string) => {
  const uri = new URL(url);
  const { protocol, hostname, origin } = uri;
  return { protocol, hostname, origin };
};

export const convertUrlToHttp = (url: string) => {
  if (!url) return '';

  const { protocol } = getUrlInfo(url);
  if (protocol === 'ipfs:') {
    return `${url.replace('ipfs://', 'https://ipfs.io/ipfs/')}`;
  } else if (protocol === 'arweave:') {
    return `${url.replace('arweave://', 'https://arweave.net/')}`;
  } else if (protocol === 'https:' || protocol === 'http:') {
    return url;
  }
  return '';
};

export const convertUrlType = (url: string): UrlTypeModel => {
  const urlType = {
    type: 'none',
    protocol: '',
    domain: '',
    url,
    httpUrl: convertUrlToHttp(url),
  } as UrlTypeModel;
  if (!url) return urlType;

  const { protocol, hostname } = getUrlInfo(url);
  urlType.protocol = protocol;
  urlType.domain = hostname;

  if (protocol === 'ipfs:') {
    urlType.type = 'ipfs';
    return urlType;
  } else if (protocol === 'arweave:') {
    urlType.type = 'arweave';
  } else if ((protocol === 'https:' || protocol === 'http:') && hostname === 'ipfs.io') {
    urlType.type = 'ipfs';
  } else if ((protocol === 'https:' || protocol === 'http:') && hostname === 'arweave.net') {
    urlType.type = 'arweave';
  } else if (protocol === 'https:' || protocol === 'http:') {
    urlType.type = 'common';
  } else {
    urlType.type = 'other';
  }
  return urlType;
};

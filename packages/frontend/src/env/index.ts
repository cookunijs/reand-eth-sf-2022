import { EnvType, PublicEnvModel, ServerEnvModel } from 'src/types';

export const publicEnv: PublicEnvModel = {
  env: (process.env.NEXT_PUBLIC_APP_ENV as EnvType) ?? 'local',
  host: process.env.NEXT_PUBLIC_HOST ?? '',
  deepl: process.env.NEXT_PUBLIC_DEEPL_API_KEY ?? '',
  infura: {
    id: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID ?? '',
    secret: process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET ?? '',
  },
  alchemy: {
    mainnet: process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_API_KEY ?? '',
    goerli: process.env.NEXT_PUBLIC_ALCHEMY_ETH_GOERLI_API_KEY ?? '',
    polygonMainnet: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_API_KEY ?? '',
    polygonTestnetMumbai: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_API_KEY ?? '',
    localhost: '',
  },
  algolia: {
    id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? '',
  },
};

export const serverEnv: ServerEnvModel = (() => {
  if (process && process.browser) return undefined as any;
  return {
    alchemy: {
      mainnet: process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_API_KEY ?? '',
      goerli: process.env.NEXT_PUBLIC_ALCHEMY_ETH_GOERLI_API_KEY ?? '',
      polygonMainnet: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_API_KEY ?? '',
      polygonTestnetMumbai: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_API_KEY ?? '',
      localhost: '',
    },
    algolia: {
      id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      adminKey: process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY ?? '',
    },
    firebase: {
      type: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_TYPE ?? '',
      project_id: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PROJECT_ID ?? '',
      private_key_id: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID ?? '',
      private_key: (process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
        ? process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
        : ''
      ).replace(/\\n/g, '\n'),
      client_email: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL ?? '',
      client_id: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_CLIENT_ID ?? '',
      auth_uri: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_AUTH_URI ?? '',
      token_uri: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_TOKEN_URI ?? '',
      auth_provider_x509_cert_url:
        process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_URL ?? '',
      client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_CLIENT_CERT_URL ?? '',
    },
    opensea: process.env.NEXT_PUBLIC_OPENSEA_API_KEY ?? '',
    pinata: {
      key: process.env.NEXT_PUBLIC_PINATA_API_KEY ?? '',
      secret: process.env.NEXT_PUBLIC_PINATA_SECRET ?? '',
      jwt: process.env.NEXT_PUBLIC_PINATA_JWT ?? '',
    },
    twitter: {
      bearerToken: process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN ?? '',
    },
  } as ServerEnvModel;
})();

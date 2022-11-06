import algoliasearch, { SearchClient } from 'algoliasearch';
import { serverEnv } from '@env';

export const getAlgoliaSearchForServer = () => {
  return algoliasearch(`${serverEnv.algolia.id}`, `${serverEnv.algolia.adminKey}`);
};

export const getAlgoliaIndexNameForServer = () => {
  return {
    sample: 'sample',
  };
};

export const getAlgoliaSettingsForServer = () => {
  return {
    appId: serverEnv.algolia.id,
    adminKey: serverEnv.algolia.adminKey,
    client: getAlgoliaSearchForServer(),
    indexName: getAlgoliaIndexNameForServer(),
  };
};

export const searchAlgoliaIndexForServer = async (
  client: SearchClient,
  indexName: string,
  text: string
) => {
  const algoliaIndex = client.initIndex(indexName);
  return await algoliaIndex.search(text);
};

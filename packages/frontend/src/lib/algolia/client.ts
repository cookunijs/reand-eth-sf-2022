import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { publicEnv } from '@env';

export const getAlgoliaSearchForClient = () => {
  return algoliasearch(`${publicEnv.algolia.id}`, `${publicEnv.algolia.apiKey}`);
};

export const getAlgoliaIndexNameForClient = () => {
  return { sample: 'sample' };
};

export const getAlgoliaSettingsForClient = () => {
  return {
    appId: publicEnv.algolia.id,
    apiKey: publicEnv.algolia.apiKey,
    client: getAlgoliaSearchForClient(),
    indexName: getAlgoliaIndexNameForClient(),
  };
};

export const searchAlgoliaIndexForClient = async (
  client: SearchClient,
  indexName: string,
  text: string
) => {
  const algoliaIndex = client.initIndex(indexName);
  return await algoliaIndex.search(text);
};

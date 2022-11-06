import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { Deepl } from 'src/types/deepl';
import { publicEnv } from '@env';

export const supportedLanguages = ['EN', 'JA'];

export const getTargetTranslateLanguages = async (originalLng: Deepl.Languages) => {
  return supportedLanguages.filter(lng => lng !== originalLng) as Deepl.Languages[];
};

export const translateDeepl = async (
  parameters: Deepl.Parameters
): Promise<AxiosResponse<Deepl.Response>> => {
  const sub_domain = parameters.free_api ? 'api-free' : 'api';
  return axios.post(
    `https://${sub_domain}.deepl.com/v2/translate`,
    queryString.stringify(parameters)
  );
};

export const translateDeeplFull = async (
  originalLng: Deepl.Languages,
  originalText: string
): Promise<Deepl.Response[]> => {
  const translateLanguages = await getTargetTranslateLanguages(originalLng);
  const freeApi = publicEnv.env === 'prod' ? false : true;
  return await Promise.all(
    translateLanguages.map(async lng => {
      const result = await translateDeepl({
        free_api: freeApi,
        auth_key: publicEnv.deepl,
        text: originalText,
        source_lang: originalLng,
        target_lang: lng,
      });
      return result.data;
    })
  );
};

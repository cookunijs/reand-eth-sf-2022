import useSWR, { SWRConfiguration } from 'swr';
import { getDBDocs } from '@lib/firebase/client/firestore';
import { DB } from 'src/types/firebase/client/firestore';

export const useDBCollection = (
  path: string | null,
  field: DB.Field,
  options?: {
    db?: DB.Options;
    swr?: SWRConfiguration;
  }
) => {
  const swr = useSWR(
    path,
    async (path: string) => {
      const data = await getDBDocs(path, field, options?.db);
      return data;
    },
    options?.swr
  );
  return {
    ...swr,
  };
};

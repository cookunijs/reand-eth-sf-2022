import useSWR, { SWRConfiguration } from 'swr';
import { getDBDoc } from '@lib/firebase/client/firestore';
import { DB } from 'src/types/firebase/client/firestore';

export const useDBDocument = (
  path: string | null,
  options?: {
    db?: DB.Options;
    swr?: SWRConfiguration;
  }
) => {
  const swr = useSWR(
    path,
    async (path: string) => {
      const paths = path.split('/');
      const basePath = paths[0];
      const pathSegments = paths.splice(1);
      const data = await getDBDoc(basePath, pathSegments, options?.db);
      return data;
    },
    options?.swr
  );
  return {
    ...swr,
  };
};

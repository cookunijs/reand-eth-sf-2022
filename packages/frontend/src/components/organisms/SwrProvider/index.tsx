import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export interface SwrProviderProps {
  children: ReactNode;
}

export const SwrProvider = ({ children }: SwrProviderProps) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 180000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

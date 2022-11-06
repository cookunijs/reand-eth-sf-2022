/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { RecoilRoot } from 'recoil';
import { I18nextProvider } from 'react-i18next';
import {
  AppProvider,
  ChakraProvider,
  FirebaseProvider,
  Head,
  NProgressProvider,
  SwrProvider,
  WalletProvider,
} from '@components/organisms';
import i18n from '@lib/i18n';

export const App: React.FC = ({ children }) => {
  return (
    <>
      <Head defaultSeo />
      <WalletProvider>
        <RecoilRoot>
          <SwrProvider>
            <FirebaseProvider>
              <ChakraProvider>
                <I18nextProvider i18n={i18n}>
                  <NProgressProvider>
                    <AppProvider>{children}</AppProvider>
                  </NProgressProvider>
                </I18nextProvider>
              </ChakraProvider>
            </FirebaseProvider>
          </SwrProvider>
        </RecoilRoot>
      </WalletProvider>
    </>
  );
};

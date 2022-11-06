/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import i18n from '@lib/i18n';

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  useEffect(() => {
    getBrowserLanguage();
  }, []);

  const getBrowserLanguage = () => {
    if (typeof window !== 'undefined') {
      const language =
        (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
      i18n.changeLanguage(language === 'ja' ? 'ja' : 'en');
    }
  };

  return <Box color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>{children}</Box>;
};

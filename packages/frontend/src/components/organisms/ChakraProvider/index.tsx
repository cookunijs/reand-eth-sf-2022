import {
  ChakraProvider as Chakra,
  ChakraProviderProps,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '@lib/chakra-ui';

interface ChakraProps extends ChakraProviderProps {
  cookies?: string;
  children: ReactNode;
}

export const ChakraProvider = ({ children, cookies }: ChakraProps) => {
  return (
    <Chakra
      colorModeManager={cookies ? cookieStorageManager(cookies) : localStorageManager}
      theme={theme}
    >
      {children}
    </Chakra>
  );
};

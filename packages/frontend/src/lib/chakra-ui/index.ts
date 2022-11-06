import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  brand: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#3182CE',
    600: '#2B6CB0',
    700: '#2C5282',
    800: '#2A4365',
    900: '#1A365D',
  },
};
const components = {};
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const fonts = {};
const semanticTokens = {
  colors: {
    error: 'red.500',
    text: {
      default: 'gray.900',
      _dark: 'gray.50',
    },
  },
};
const styles = {
  global: (props: { colorMode: string }) => ({
    body: {
      fontFamily: 'body',
      color: mode('blackAlpha.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'blackAlpha.900')(props),
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: mode('blackAlpha.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    '*::selection': {
      bg: props.colorMode === 'dark' ? 'brand.700' : 'brand.50',
      color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
      textShadow: 'none',
    },
  }),
};

export const theme = extendTheme({
  colors,
  components,
  config,
  fonts,
  semanticTokens,
  styles,
});

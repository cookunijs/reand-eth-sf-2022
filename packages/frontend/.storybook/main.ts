import path from 'path';
const toPath = (_path: string) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-toolbars',
    '@chakra-ui/storybook-addon',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config: { resolve: { alias: any; fallback: any } }) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@components': toPath('src/components'),
          '@configs': toPath('src/configs'),
          '@env': toPath('src/env'),
          '@hooks': toPath('src/hooks'),
          '@lib': toPath('src/lib'),
          '@styles': toPath('src/styles'),
          '@types': toPath('src/types'),
          // "@emotion/core": toPath("node_modules/@emotion/react"),
          // "emotion-theming": toPath("node_modules/@emotion/react"),
          // "react-i18next": "react-i18next",
        },
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          child_process: false,
          net: false,
          dns: false,
          tls: false,
        },
      },
    };
  },
};

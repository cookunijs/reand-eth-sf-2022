import type { AppProps } from 'next/app';
import { App } from '@components/templates';
import '@styles/globals.scss';
import '@styles/nprogress.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;

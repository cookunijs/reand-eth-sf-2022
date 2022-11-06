import * as React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

export const startProgress = (): NProgress.NProgress => {
  return NProgress.start();
};

export const doneProgress = (): NProgress.NProgress => {
  return NProgress.done();
};

export const incProgress = (n?: number): NProgress.NProgress => {
  return NProgress.inc(n);
};

export const isStartedProgress = (): boolean => {
  return NProgress.isStarted();
};

export const NProgressProvider: React.FC = ({ children }) => {
  Router.events.on('routeChangeStart', () => {
    if (!isStartedProgress()) startProgress();
  });
  Router.events.on('routeChangeComplete', () => doneProgress());
  Router.events.on('routeChangeError', () => doneProgress());
  return <>{children}</>;
};

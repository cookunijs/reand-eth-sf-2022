import React from 'react';
import Component, { LogoProps } from './Component';

export const Logo: React.FC<LogoProps> = props => {
  return <Component {...props} />;
};

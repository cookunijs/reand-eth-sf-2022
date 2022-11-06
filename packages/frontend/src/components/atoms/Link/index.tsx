import React from 'react';
import Component, { LinkProps } from './Component';

export const Link: React.FC<LinkProps> = props => {
  return <Component {...props} />;
};

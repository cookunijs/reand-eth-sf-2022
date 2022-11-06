import React from 'react';
import { ImageProps } from '@chakra-ui/react';
import Component from './Component';

export const Image: React.FC<ImageProps> = props => {
  return <Component {...props} />;
};

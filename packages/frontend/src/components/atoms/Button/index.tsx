import React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import Component from './Component';

export const Button: React.FC<ButtonProps> = props => {
  return <Component {...props} />;
};

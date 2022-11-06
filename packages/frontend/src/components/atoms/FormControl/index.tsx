import React from 'react';
import Component, { FormControlProps } from './Component';

export const FormControl: React.FC<FormControlProps> = props => {
  return <Component {...props} />;
};

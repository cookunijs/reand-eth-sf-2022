import React from 'react';
import Component, { CardProps } from './Component';

export const Card: React.FC<CardProps> = props => {
  return <Component {...props} />;
};

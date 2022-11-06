import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import Component from './Component';

export const Header: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return <Component isDesktop={isDesktop} />;
};

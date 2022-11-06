/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Stack, StackProps, useColorModeValue } from '@chakra-ui/react';

export type CardProps = StackProps;

const Component: React.FC<CardProps> = props => {
  return (
    <Stack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      p="10px"
      border="1px"
      borderColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}
      borderRadius="lg"
      bgColor={useColorModeValue('whiteAlpha.900', 'blackAlpha.300')}
      _hover={{
        p: '9px',
        border: '2px',
        borderColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.100'),
        shadow: 'md',
      }}
      _focus={{
        p: '9px',
        border: '2px',
        borderColor: useColorModeValue('gray.100', 'gray.600'),
        shadow: 'md',
      }}
      boxShadow={useColorModeValue(
        'rgb(255, 255, 255) 0px 0px 0px 0px',
        'rgb(0, 0, 0) 0px 0px 0px 0px'
      )}
      willChange="transform"
      transition="box-shadow 0.15s ease-in-out 0s, transform"
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export default Component;

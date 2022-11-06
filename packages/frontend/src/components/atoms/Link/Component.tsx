import React from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export interface LinkProps extends ChakraLinkProps {
  type: 'internal' | 'ankerInternal' | 'external' | 'none';
  helperText?: string;
  errorText?: string;
}

const Component: React.FC<ChakraLinkProps> = props => {
  return (
    <>
      {(props.type === 'none' || !props.href) && <>{props.children}</>}
      {props.type === 'external' && props.href && (
        <ChakraLink
          isExternal
          style={{
            textDecoration: 'none',
            boxShadow: 'none',
          }}
          {...props}
        >
          {props.children}
        </ChakraLink>
      )}
      {props.type === 'internal' && props.href && (
        <NextLink href={props.href} passHref>
          <ChakraLink
            style={{
              textDecoration: 'none',
              boxShadow: 'none',
            }}
            {...props}
          >
            {props.children}
          </ChakraLink>
        </NextLink>
      )}
      {props.type === 'ankerInternal' && props.href && (
        <ChakraLink
          style={{
            textDecoration: 'none',
            boxShadow: 'none',
          }}
          {...props}
          href={undefined}
        >
          <a
            href={props.href}
            // target="_blank"
            // rel="noopener noreferrer"
          >
            {props.children}
          </a>
        </ChakraLink>
      )}
    </>
  );
};

export default Component;

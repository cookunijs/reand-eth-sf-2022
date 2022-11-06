/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import NextImage from 'next/image';
import { Stack } from '@chakra-ui/react';

export interface LogoProps {
  type: 'main' | 'icon';
  color?: 'p1' | 'p2' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Component: React.FC<LogoProps> = props => {
  return (
    <>
      {props.type === 'main' && (
        <Stack
          direction="row"
          spacing={props.size === 'sm' ? 1 : props.size === 'md' ? 2 : props.size === 'lg' ? 3 : 1}
          justifyContent="center"
          alignItems="center"
          p="0"
        >
          <NextImage
            {...props}
            src={`/assets/logo/main_logo${
              props.color === 'p2' ? '_pattern_2' : props.color === 'p1' ? '_pattern_1' : ''
            }.png`}
            objectFit="contain"
            width={
              props.size === 'sm' ? 80 : props.size === 'md' ? 100 : props.size === 'lg' ? 120 : 100
            }
            height={
              props.size === 'sm' ? 36 : props.size === 'md' ? 40 : props.size === 'lg' ? 44 : 40
            }
          />
        </Stack>
      )}
      {props.type === 'icon' && (
        <NextImage
          {...props}
          src={`/assets/logo/icon_logo${
            props.color === 'p2' ? '_pattern_2' : props.color === 'p1' ? '_pattern_1' : ''
          }.png`}
          objectFit="contain"
          width={
            props.size === 'sm' ? 36 : props.size === 'md' ? 40 : props.size === 'lg' ? 44 : 40
          }
          height={
            props.size === 'sm' ? 36 : props.size === 'md' ? 40 : props.size === 'lg' ? 44 : 40
          }
        />
      )}
    </>
  );
};

export default Component;

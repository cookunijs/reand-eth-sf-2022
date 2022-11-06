/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Image as ChakraImage, ImageProps, Skeleton, useColorModeValue } from '@chakra-ui/react';

const Component: React.FC<ImageProps> = props => {
  return (
    <ChakraImage
      fallback={
        <Skeleton
          boxSize={props.boxSize}
          w={props.w}
          h={props.h}
          maxW={props.maxW}
          maxH={props.maxH}
          borderRadius={props.borderRadius}
          rounded={props.rounded}
          startColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
          endColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
          fadeDuration={1}
          {...props}
        />
      }
      objectPosition="center"
      transition="opacity 0.33s ease-in-out 0s"
      {...props}
    />
  );
};

export default Component;

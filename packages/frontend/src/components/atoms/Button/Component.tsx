import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

const Component: React.FC<ButtonProps> = props => {
  return (
    <Button
      _focus={{ boxShadow: 'none' }}
      {...props}
      fontSize={
        props.size === 'xs'
          ? '12px'
          : props.size === 'sm'
          ? '14px'
          : props.size === 'md'
          ? '15px'
          : props.size === 'lg'
          ? '16px'
          : props.size === 'xl'
          ? '17px'
          : '15px'
      }
    />
  );
};

export default Component;

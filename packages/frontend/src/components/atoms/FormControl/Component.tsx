/* eslint-disable react-hooks/rules-of-hooks */
import {
  FormControlProps as ChakraFormControlProps,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  useColorModeValue,
  StackDirection,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FormControlProps extends ChakraFormControlProps {
  htmlFor?: string;
  helperText?: string;
  errorText?: string;
  icon?: ReactNode;
  switcher?: boolean;
}

const Component: React.FC<FormControlProps> = ({
  children,
  htmlFor,
  label,
  helperText,
  errorText,
  isInvalid,
  isRequired,
  icon,
  switcher,
}) => {
  const outterStackProps = switcher
    ? {
        spacing: '4',
        direction: 'row' as StackDirection,
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    : {
        spacing: '4',
      };

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {helperText ? (
        <Stack {...outterStackProps}>
          <Stack spacing="4" w="83%" direction="row" alignItems="flex-start">
            {icon}

            <Stack spacing="-1">
              {htmlFor && label && (
                <FormLabel
                  htmlFor={htmlFor}
                  fontWeight="semibold"
                  color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
                >
                  {label}
                </FormLabel>
              )}
              <FormHelperText
                fontSize="xs"
                color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
              >
                {helperText}
              </FormHelperText>
            </Stack>
          </Stack>
          {children}
        </Stack>
      ) : (
        <Stack spacing={icon ? 3 : 0}>
          <Stack spacing="4" direction="row" alignItems="flex-start">
            {icon}
            {htmlFor && label && (
              <FormLabel
                htmlFor={htmlFor}
                fontWeight="semibold"
                color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
              >
                {label}
              </FormLabel>
            )}
          </Stack>
          {children}
        </Stack>
      )}
      {isInvalid && errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default Component;

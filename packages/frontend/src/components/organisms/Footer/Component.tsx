import React from 'react';
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Text,
  Box,
  useColorModeValue,
  // useBreakpointValue,
} from '@chakra-ui/react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { Image, Link } from '@components/atoms';
// import { useTranslation } from '@hooks';

const Component: React.FC = () => {
  // const { t } = useTranslation('footer');
  // const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="footer" role="contentinfo" bgColor={useColorModeValue('brand.500', 'black.900')}>
      <Stack mx={['6', '32']}>
        <Stack
          spacing="8"
          direction={['column', 'column', 'column', 'column', 'row']}
          justify="space-between"
          py={{ base: '12', md: '16' }}
          textColor="white"
        >
          <Stack spacing={['2', '4']} align="start">
            <Link type="internal" href="/">
              <Stack
                direction="column"
                spacing={2}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Image src="" />
                <Text fontWeight="bold" fontSize="xl" letterSpacing={1}>
                  Title
                </Text>
              </Stack>
            </Link>
            <Text w={['xs', 'sm']}>Body</Text>
          </Stack>
          <Stack
            direction={['column', 'column', 'column', 'column', 'row']}
            spacing={['8', '12']}
            alignItems="flex-start"
          >
            <Stack spacing="4" minW={['100%', '36']} flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Title
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Link type="internal" href="">
                  <Button variant="link" textColor="white" fontWeight="normal">
                    Body
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Stack spacing="4" minW={['100%', '36']} flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Title
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Link type="internal" href="">
                  <Button variant="link" textColor="white" fontWeight="normal">
                    Body
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW={['100%', '36']} flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                  Title
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Link type="internal" href="">
                    <Button variant="link" textColor="white" fontWeight="normal">
                      Body
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')} />

        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
          textColor="white"
        >
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()}{' '}
            <Link type="external" href="">
              Title
            </Link>{' '}
            All rights reserved.
          </Text>
          <ButtonGroup variant="ghost">
            <Link type="external" href="">
              <IconButton
                aria-label="Discord"
                _hover={{
                  bgColor: useColorModeValue('brand.400', 'brand.600'),
                }}
                icon={<FaDiscord fontSize="1.25rem" />}
              />
            </Link>
            <Link type="external" href="">
              <IconButton
                aria-label="Twitter"
                _hover={{
                  bgColor: useColorModeValue('brand.400', 'brand.600'),
                }}
                icon={<FaTwitter fontSize="1.25rem" />}
              />
            </Link>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Component;

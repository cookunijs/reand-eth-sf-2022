/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button as ChakraButton,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  Switch,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FiMenu, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { Button, Logo, Link, Image } from '@components/atoms';
import { useTranslation } from '@hooks';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

interface Props {
  isDesktop?: boolean;
}

const MainMenu: React.FC<{
  signOut?: () => void;
}> = ({ children, signOut }) => {
  const { t } = useTranslation('header');
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FiMoon, FiSun);

  return (
    <Menu>
      {children}
      <MenuList
        p="0"
        border="1px"
        borderRadius="lg"
        borderColor={useColorModeValue('gray.50', 'whiteAlpha.300')}
        bgColor={useColorModeValue('white', '#101010')}
        boxShadow="lg"
      >
        <Stack spacing="0">
          <MenuItem
            as={ChakraButton}
            size="lg"
            variant="ghost"
            px="5"
            borderRadius="none"
            fontWeight="medium"
            cursor={'pointer'}
            leftIcon={<FiLogOut />}
            color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
            _focus={{
              boxShadow: 'none',
              bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            }}
            _hover={{
              boxShadow: 'none',
              bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            }}
            onClick={signOut}
          >
            <Text w="100%" px="2" fontWeight="semibold" fontSize="sm">
              {t('Signout')}
            </Text>
          </MenuItem>

          <Divider borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.400')} />

          <MenuItem
            as={ChakraButton}
            size="lg"
            variant="ghost"
            px="5"
            borderRadius="none"
            borderBottomRadius="lg"
            fontWeight="medium"
            cursor={'pointer'}
            icon={<SwitchIcon />}
            color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
            _focus={{
              boxShadow: 'none',
              bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            }}
            _hover={{
              boxShadow: 'none',
              bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            }}
            onClick={toggleColorMode}
          >
            <Stack direction="row">
              <Text w="100%" px="2" fontWeight="semibold" fontSize="sm">
                {text === 'light' ? t('Light Mode') : t('Night Mode')}
              </Text>
              <Switch isChecked={text === 'light' ? true : false} />
            </Stack>
          </MenuItem>
        </Stack>
      </MenuList>
    </Menu>
  );
};

const Component: React.FC<Props> = ({ isDesktop }) => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <>
      <Stack position="fixed" w="100vw" zIndex="1">
        <Box as="section" bgColor={useColorModeValue('white', '#101010')}>
          <Box
            as="nav"
            bg="bg-surface"
            // NOTE: For event
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            borderBottom={'1px'}
            borderColor={useColorModeValue('gray.50', 'whiteAlpha.300')}
          >
            <Box py={['3', '3']} mx={['4', '8']}>
              <HStack spacing="10" justify="space-between">
                {isDesktop ? (
                  <>
                    <Link type="internal" href="/">
                      <Logo type="main" color={useColorModeValue('p1', 'p2')} size="lg" />
                    </Link>

                    <Flex justify="space-between" flex="1">
                      <ButtonGroup variant="ghost" spacing="8">
                        {[].map(item => (
                          <Button key={item} borderRadius="full">
                            <Text color="gray.500" fontWeight="bold" fontSize="md">
                              {item}
                            </Text>
                          </Button>
                        ))}
                      </ButtonGroup>

                      <Stack>
                        {isConnected && (
                          <MainMenu signOut={disconnect}>
                            <MenuButton
                              as={Avatar}
                              size={'sm'}
                              // src={user && typeof user.photoURL === 'string' ? user.photoURL : ''}
                            />
                          </MainMenu>
                        )}

                        {!isConnected && <ConnectButton />}
                      </Stack>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Link type="internal" href="/">
                      <Logo type="main" color={useColorModeValue('p1', 'p2')} size="md" />
                    </Link>

                    <Stack direction="row" alignItems="center">
                      <Flex alignItems={'center'}>
                        {isConnected && (
                          <MainMenu signOut={disconnect}>
                            <MenuButton
                              as={IconButton}
                              variant="ghost"
                              icon={<FiMenu fontSize="1.25rem" />}
                              aria-label="Open Menu"
                              borderRadius="full"
                              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                              _active={{
                                boxShadow: 'none',
                                borderColor: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
                                bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
                                color: useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
                              }}
                              _hover={{
                                boxShadow: 'none',
                                borderColor: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
                                bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
                                color: useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
                              }}
                              _focus={{
                                boxShadow: 'none',
                                borderColor: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
                                bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
                                color: useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
                              }}
                            />
                          </MainMenu>
                        )}

                        {!isConnected && <ConnectButton />}
                      </Flex>
                    </Stack>
                  </>
                )}
              </HStack>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Stack w="100%" h="68px"></Stack>
    </>
  );
};

export default Component;

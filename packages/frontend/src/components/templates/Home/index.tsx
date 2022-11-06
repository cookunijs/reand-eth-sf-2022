/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  ButtonGroup,
  Icon,
  IconButton,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  keyframes,
} from '@chakra-ui/react';
import { useSigner } from 'wagmi';
import { motion } from 'framer-motion';
import { Button, FormControl, Image, Link } from '@components/atoms';
import { Modal } from '@components/molecules';
import { Head, Header, HeadProps, SelectNFTModal } from '@components/organisms';
import { FaTwitter } from 'react-icons/fa';
import { FiCheck, FiTrash2, FiX } from 'react-icons/fi';
import { useReward } from 'react-rewards';
import { ERC721 } from '@lib/ethereum/assets';
import { abiCoderEncodeForTokenData } from '@lib/ethereum/abiCoder';
import { createAnd } from '@lib/ethereum/contracts/reand';
import { NFTAssetModel } from 'src/types';

const animationKeyframes = keyframes`
  0% { transform: scale(1);  border-radius: 50%; opacity: 1; }
  25% { transform: scale(1.2); border-radius: 50%; opacity: 0.7; }
  50% { transform: scale(1); border-radius: 50%; opacity: 0.8; }
  75% { transform: scale(1); border-radius: 50%; opacity: 0.9; }
  100% { transform: scale(1); border-radius: 50%; opacity: 1; }
`;
const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export interface HomeContext {}

export interface HomeProps {
  meta?: HeadProps;
  pageContext: HomeContext;
}

export const Home: React.FC<HomeProps> = ({ meta }) => {
  const { data: signer, isLoading } = useSigner();
  const { reward } = useReward('rewardId', 'confetti', {
    lifetime: 280,
    angle: 75,
    spread: 70,
    elementCount: 180,
  });
  const [disabled, setDisabled] = useBoolean();
  const [loading, setLoading] = useBoolean();
  const [isCompleted, setIsCompleted] = useBoolean();
  const [awaitingSignForSubmit, setAwaitingSignForSubmit] = useState<
    'awaiting' | 'pending' | 'done'
  >('awaiting');
  const [completingTransactionForSubmit, setCompletingTransactionForSubmit] = useState<
    'awaiting' | 'pending' | 'done'
  >('awaiting');
  const [finalizingForSubmit, setFinalizingForSubmit] = useState<'awaiting' | 'pending' | 'done'>(
    'awaiting'
  );
  const {
    isOpen: isOpenForSending,
    onOpen: onOpenForSending,
    onClose: onCloseForSending,
  } = useDisclosure();

  // NOTE: selectedOriginNFTAssets
  const [selectedOriginNFTAssets, setSelectedOriginNFTAssets] = useState<NFTAssetModel[]>([]);
  const {
    isOpen: isOpenForSelectOriginNFT,
    onOpen: onOpenForSelectOriginNFT,
    onClose: onCloseForSelectOriginNFT,
  } = useDisclosure();

  // NOTE: selectedChildNFTAssets
  const [selectedChildNFTAssets, setSelectedChildNFTAssets] = useState<NFTAssetModel[]>([]);
  const {
    isOpen: isOpenForSelectChildNFT,
    onOpen: onOpenForSelectChildNFT,
    onClose: onCloseForSelectChildNFT,
  } = useDisclosure();

  const startFunction = () => {
    setDisabled.on();
    setLoading.on();
    setIsCompleted.off();
  };

  const endFunction = () => {
    setDisabled.off();
    setLoading.off();
  };

  const addSelectedNFTAsset = async (asset: NFTAssetModel) => {
    if (!signer || (asset.tokenType !== 'ERC721' && asset.tokenType !== 'ERC1155')) return;
    const selected = [asset];
    setSelectedOriginNFTAssets(selected);
  };

  const deleteSelectedNFTAsset = async (asset: NFTAssetModel) => {
    if (!selectedOriginNFTAssets || selectedOriginNFTAssets.length === 0) return;

    const deleteAssets = selectedOriginNFTAssets
      .map((selectedAsset, i) => {
        if (
          selectedAsset.tokenAddress === asset.tokenAddress &&
          selectedAsset.tokenId === asset.tokenId
        )
          return i;
      })
      .filter(x => x !== undefined) as number[];
    if (deleteAssets.length === 0) return;

    const newselectedOriginNFTAssets = selectedOriginNFTAssets.filter(
      (_, i) => i !== deleteAssets[0]
    );
    setSelectedOriginNFTAssets(newselectedOriginNFTAssets);
  };

  const addSelectedChildNFTAsset = async (asset: NFTAssetModel) => {
    if (!signer || (asset.tokenType !== 'ERC721' && asset.tokenType !== 'ERC1155')) return;
    const selected = [asset];
    setSelectedChildNFTAssets(selected);
  };

  const deleteSelectedChildNFTAsset = async (asset: NFTAssetModel) => {
    if (!selectedChildNFTAssets || selectedChildNFTAssets.length === 0) return;

    const deleteAssets = selectedChildNFTAssets
      .map((selectedAsset, i) => {
        if (
          selectedAsset.tokenAddress === asset.tokenAddress &&
          selectedAsset.tokenId === asset.tokenId
        )
          return i;
      })
      .filter(x => x !== undefined) as number[];
    if (deleteAssets.length === 0) return;

    const newselectedChildNFTAssets = selectedChildNFTAssets.filter(
      (_, i) => i !== deleteAssets[0]
    );
    setSelectedChildNFTAssets(newselectedChildNFTAssets);
  };

  const execute = async () => {
    if (!signer || !selectedOriginNFTAssets[0] || !selectedChildNFTAssets[0]) return;
    startFunction();
    onOpenForSending();

    const executor = await signer.getAddress();
    const originAssetTypeData = abiCoderEncodeForTokenData(
      selectedOriginNFTAssets[0].tokenAddress,
      selectedOriginNFTAssets[0].tokenId
    );
    const childAssetTypeData = abiCoderEncodeForTokenData(
      selectedChildNFTAssets[0].tokenAddress,
      selectedChildNFTAssets[0].tokenId
    );

    setAwaitingSignForSubmit('pending');
    const txDetail = await createAnd(signer, '0xccdb8FECC8DF79a771E95eDB99A3985087267248', {
      orderData: {
        executor,
        originAsset: {
          assetClass: ERC721,
          data: originAssetTypeData,
        },
        childAsset: {
          assetClass: ERC721,
          data: childAssetTypeData,
        },
      },
    });
    setAwaitingSignForSubmit('done');

    setCompletingTransactionForSubmit('pending');
    await txDetail.wait();
    setCompletingTransactionForSubmit('done');

    setFinalizingForSubmit('pending');
    await new Promise(resolve => {
      setTimeout(resolve, 600);
    });
    setFinalizingForSubmit('done');

    endFunction();
    setIsCompleted.on();
    reward();
  };

  return (
    <>
      <Head {...meta} />
      <Header />
      <Stack
        spacing={['16', '32']}
        justifyContent="center"
        alignItems="center"
        px={['8', '16']}
        py={['12', '20']}
      >
        <Stack
          spacing="8"
          alignItems="center"
          justifyContent="center"
          w={['100%', '100%', '600px']}
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        >
          <Stack alignItems="flex-start" justifyContent="center" w="100%">
            <Text fontSize={['3xl', '3xl']} fontWeight="bold">
              NFT ties!
            </Text>
          </Stack>
          <FormControl htmlFor="OriginNFT" label="Origin NFT" isRequired>
            <Stack
              w="full"
              borderWidth="1px"
              rounded="md"
              borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              overflow="hidden"
              py={['4', '6']}
              px={['4', '6']}
              cursor="pointer"
              onClick={() => {
                onOpenForSelectOriginNFT();
              }}
            >
              {selectedOriginNFTAssets && selectedOriginNFTAssets[0] ? (
                <Stack spacing={['4', '6']} direction={['column', 'row']} p="2">
                  <Image
                    src={selectedOriginNFTAssets[0].thumbnailUrl}
                    alt={selectedOriginNFTAssets[0].name}
                    fallbackSrc="/assets/icon/file.svg"
                    objectFit="cover"
                    rounded="lg"
                    w="full"
                    h={['40', '28']}
                    maxW={['40', '28']}
                    mt="1"
                    borderColor="brand.500"
                  />

                  <Stack spacing="2" maxW="360px">
                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">tokenAddress: </Text>
                      <Text>{selectedOriginNFTAssets[0].tokenAddress}</Text>
                    </Stack>

                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">tokenId: </Text>
                      <Text>{selectedOriginNFTAssets[0].tokenId}</Text>
                    </Stack>

                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">name: </Text>
                      <Text>{selectedOriginNFTAssets[0].name}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <Text fontSize="md" color={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}>
                  Select NFTs
                </Text>
              )}
            </Stack>

            {selectedOriginNFTAssets[0] && (
              <Stack w="full" pt="4">
                <ButtonGroup justifyContent="flex-end">
                  <IconButton
                    rounded="full"
                    size="md"
                    colorScheme="red"
                    fontWeight="bold"
                    variant="link"
                    onClick={() => {
                      deleteSelectedNFTAsset(selectedOriginNFTAssets[0]);
                    }}
                    aria-label="delete button"
                    icon={<FiTrash2 />}
                    _focus={{ boxShadow: 'none' }}
                  />
                </ButtonGroup>
              </Stack>
            )}
          </FormControl>

          <Stack alignItems="center" justifyContent="center" width="8" height="8">
            <Icon as={FiX} boxSize="8" color="blue.500" />
          </Stack>

          <FormControl htmlFor="ChildNFT" label="Child NFT" isRequired>
            <Stack
              w="full"
              borderWidth="1px"
              rounded="md"
              // borderStyle="dashed"
              borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              overflow="hidden"
              py={['4', '6']}
              px={['4', '6']}
              cursor="pointer"
              onClick={() => {
                onOpenForSelectChildNFT();
              }}
            >
              {selectedChildNFTAssets && selectedChildNFTAssets[0] ? (
                <Stack spacing={['4', '6']} direction={['column', 'row']} p="2">
                  <Image
                    src={selectedChildNFTAssets[0].thumbnailUrl}
                    alt={selectedChildNFTAssets[0].name}
                    fallbackSrc="/assets/icon/file.svg"
                    objectFit="cover"
                    rounded="lg"
                    w="full"
                    h={['40', '28']}
                    maxW={['40', '28']}
                    mt="1"
                    borderColor="brand.500"
                  />

                  <Stack spacing="2" maxW="360px">
                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">tokenAddress: </Text>
                      <Text>{selectedChildNFTAssets[0].tokenAddress}</Text>
                    </Stack>

                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">tokenId: </Text>
                      <Text>{selectedChildNFTAssets[0].tokenId}</Text>
                    </Stack>

                    <Stack
                      spacing="0"
                      fontSize={['sm', 'sm']}
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    >
                      <Text fontWeight="bold">name: </Text>
                      <Text>{selectedChildNFTAssets[0].name}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <Text fontSize="md" color={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}>
                  Select NFTs
                </Text>
              )}
            </Stack>

            {selectedChildNFTAssets[0] && (
              <Stack w="full" pt="4">
                <ButtonGroup justifyContent="flex-end">
                  <IconButton
                    rounded="full"
                    size="md"
                    colorScheme="red"
                    fontWeight="bold"
                    variant="link"
                    onClick={() => {
                      deleteSelectedChildNFTAsset(selectedChildNFTAssets[0]);
                    }}
                    aria-label="delete button"
                    icon={<FiTrash2 />}
                    _focus={{ boxShadow: 'none' }}
                  />
                </ButtonGroup>
              </Stack>
            )}
          </FormControl>

          <Stack w="full" pt="4">
            <Button
              w="100%"
              onClick={execute}
              colorScheme="blue"
              disabled={disabled}
              isLoading={loading || isLoading}
            >
              Execute
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <SelectNFTModal
        type="ownered"
        selectedAssets={selectedOriginNFTAssets}
        onlyTokenTypes={['ERC721', 'ERC1155']}
        isOpen={isOpenForSelectOriginNFT}
        onClose={onCloseForSelectOriginNFT}
        addSelectedAsset={addSelectedNFTAsset}
        deleteSelectedAsset={deleteSelectedNFTAsset}
      />

      <SelectNFTModal
        type="ownered"
        selectedAssets={selectedChildNFTAssets}
        onlyTokenTypes={['ERC721', 'ERC1155']}
        isOpen={isOpenForSelectChildNFT}
        onClose={onCloseForSelectChildNFT}
        addSelectedAsset={addSelectedChildNFTAsset}
        deleteSelectedAsset={deleteSelectedChildNFTAsset}
      />

      <Modal
        title={isCompleted ? `Done 🎉` : 'Sending Complete'}
        isOpen={isOpenForSending}
        onClose={onCloseForSending}
      >
        {isCompleted ? (
          <>
            <Stack spacing="4" w="100%" id="rewardId">
              <Stack alignItems="flex-start" justifyContent="center">
                <Text fontSize="md" fontWeight="medium">
                  NFT's are now tied up!
                </Text>
              </Stack>
              <Stack spacing="6" alignItems="flex-start" justifyContent="center">
                <Stack direction="row" alignItems="center" justifyContent="center" w="100%" py="8">
                  <Image
                    src={selectedOriginNFTAssets[0].thumbnailUrl}
                    alt={selectedOriginNFTAssets[0].name}
                    objectFit="cover"
                    rounded="lg"
                    w={['120px', '160px']}
                    h={['120px', '150px']}
                    maxWidth={['100%', '100%']}
                  />

                  <Stack alignItems="center" justifyContent="center" width="8" height="8">
                    <Icon as={FiX} boxSize="8" color="blue.500" />
                  </Stack>

                  <Image
                    src={selectedChildNFTAssets[0].thumbnailUrl}
                    alt={selectedChildNFTAssets[0].name}
                    objectFit="cover"
                    rounded="lg"
                    w={['120px', '160px']}
                    h={['120px', '150px']}
                    maxWidth={['100%', '100%']}
                  />
                </Stack>

                <Stack spacing="4" direction="row" w="100%">
                  <Link type="external" w="100%" href="https://dune.com/shiro_social/reand">
                    <Button w="100%" size="md" fontWeight="semibold" bgColor="orange.200">
                      <Stack
                        spacing="2"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image src="/assets/dune.png" w="4" h="4" />
                        <Text>View Dune</Text>
                      </Stack>
                    </Button>
                  </Link>

                  <Link type="external" w="100%" href="">
                    <Button
                      w="100%"
                      size="md"
                      colorScheme="blue"
                      fontWeight="semibold"
                      leftIcon={<FaTwitter color="blue.500" />}
                    >
                      <Text>Tweet it</Text>
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Stack spacing="6">
              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {awaitingSignForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {awaitingSignForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {awaitingSignForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Awaiting signature
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Open Wallet and sign the transaction.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {completingTransactionForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {completingTransactionForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {completingTransactionForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Completing
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Waiting for complete transaction to be completed.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {finalizingForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {finalizingForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {finalizingForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Finalizing
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Waiting for data to be saved.
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Modal>
    </>
  );
};

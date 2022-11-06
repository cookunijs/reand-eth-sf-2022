/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import {
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, FormControl, Image } from '@components/atoms';
import { Modal } from '@components/molecules';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@hooks';
import { NFTAssetModel } from 'src/types';

interface Props {
  displayAssets: NFTAssetModel[];
  displayAssetsForSearch: NFTAssetModel[];
  selectedAssets: NFTAssetModel[];
  searchMessage: string;
  onlyTokenTypes?: ('ERC721' | 'ERC1155')[];
  hasMore: boolean;
  hasMoreForSearch?: boolean;
  isInitLoading: boolean;
  isLoadMoreLoading: boolean;
  isSearchLoading: boolean;
  isOpen: boolean;
  addSelectedAsset: (asset: NFTAssetModel) => void;
  deleteSelectedAsset: (asset: NFTAssetModel) => void;
  onChangeForSearch: (message: string) => void;
  onSubmitForSearch: (message?: string) => void;
  loadMore: (page: number) => void;
  loadMoreForSearch?: (page: number) => void;
  onClose: () => void;
}

const Component: React.FC<Props> = ({
  displayAssets,
  selectedAssets,
  searchMessage,
  onlyTokenTypes,
  hasMore,
  isInitLoading,
  isLoadMoreLoading,
  isSearchLoading,
  isOpen,
  addSelectedAsset,
  deleteSelectedAsset,
  onChangeForSearch,
  onSubmitForSearch,
  loadMore,
  onClose,
}) => {
  const { t } = useTranslation('selectNFTModal');
  const {
    register,
    formState: { errors },
  } = useForm();
  const scrollParentRef = useRef(null);

  return (
    <Modal title={t('Select NFTs')} isOpen={isOpen} onClose={onClose} size="full">
      <Stack spacing="6">
        <Stack spacing="6">
          <Stack spacing="4">
            <FormControl
              htmlFor="contractAddress"
              isInvalid={errors.contractAddress}
              errorText={errors.contractAddress && errors.contractAddress.message}
            >
              <Stack direction="row">
                <InputGroup>
                  <InputLeftElement
                    h="2.9rem"
                    pointerEvents="none"
                    alignItems="center"
                    justifyContent="center"
                    color={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                    zIndex="0"
                    fontSize="lg"
                  >
                    <FiSearch />
                  </InputLeftElement>
                  <Input
                    placeholder={t('Contract address')}
                    size="lg"
                    fontSize="md"
                    borderRadius="lg"
                    borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    _hover={{
                      border: '2px',
                      borderColor: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
                    }}
                    _focus={{
                      border: '2px',
                      borderColor: useColorModeValue('brand.400', 'brand.400'),
                    }}
                    _placeholder={{
                      color: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
                      fontSize: 'md',
                    }}
                    disabled={isInitLoading || isSearchLoading}
                    value={searchMessage}
                    {...register('contractAddress', {
                      onChange: e => onChangeForSearch(e.target.value),
                    })}
                  />
                </InputGroup>
                <Button
                  isLoading={isSearchLoading}
                  disabled={isInitLoading || isSearchLoading}
                  onClick={() => onSubmitForSearch()}
                >
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
                  >
                    {t('Search')}
                  </Text>
                </Button>
              </Stack>
            </FormControl>

            <InfiniteScroll
              pageStart={0}
              loadMore={(page: number) => {
                loadMore(page);
              }}
              hasMore={hasMore && !isInitLoading && !isLoadMoreLoading}
              initialLoad={true}
              getScrollParent={() => scrollParentRef.current}
            >
              <Grid
                alignItems="center"
                justifyContent="center"
                templateColumns={['repeat(3, 1fr)', 'repeat(3, 1fr)']}
                gap={['3', '4']}
                maxH={['260px', '320px']}
                overflow="scroll"
                px="2px"
                py="2"
                rounded="lg"
                ref={scrollParentRef}
              >
                <>
                  {displayAssets && displayAssets.length > 0 ? (
                    displayAssets.map((asset, i) => {
                      return (
                        <GridItem key={`${asset.tokenAddress}#${asset.tokenId}#${i}`}>
                          <Stack
                            spacing="0"
                            borderRadius="10px"
                            m={
                              selectedAssets &&
                              selectedAssets.filter(
                                selectedAsset =>
                                  selectedAsset.tokenAddress === asset.tokenAddress &&
                                  selectedAsset.tokenId === asset.tokenId
                              ).length > 0
                                ? '0'
                                : '1px'
                            }
                            border={
                              selectedAssets &&
                              selectedAssets.filter(
                                selectedAsset =>
                                  selectedAsset.tokenAddress === asset.tokenAddress &&
                                  selectedAsset.tokenId === asset.tokenId
                              ).length > 0
                                ? '2px'
                                : '1px'
                            }
                            borderColor={
                              selectedAssets &&
                              selectedAssets.filter(
                                selectedAsset =>
                                  selectedAsset.tokenAddress === asset.tokenAddress &&
                                  selectedAsset.tokenId === asset.tokenId
                              ).length > 0
                                ? 'brand.500'
                                : useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
                            }
                            onClick={() => {
                              if (
                                selectedAssets &&
                                selectedAssets.filter(
                                  selectedAsset =>
                                    selectedAsset.tokenAddress === asset.tokenAddress &&
                                    selectedAsset.tokenId === asset.tokenId
                                ).length > 0
                              )
                                deleteSelectedAsset(asset);
                              else addSelectedAsset(asset);
                            }}
                          >
                            <Image
                              src={asset.thumbnailUrl}
                              alt={asset.name}
                              // fallback={
                              //   <Skeleton
                              //     h={["92px", 28]}
                              //     w="100%"
                              //     borderTopRadius="lg"
                              //     borderBottomRadius="none"
                              //     startColor={useColorModeValue(
                              //       "blackAlpha.50",
                              //       "whiteAlpha.50"
                              //     )}
                              //     endColor={useColorModeValue(
                              //       "blackAlpha.300",
                              //       "whiteAlpha.300"
                              //     )}
                              //   />
                              // }
                              objectFit="cover"
                              borderTopRadius="lg"
                              w="100%"
                              h={['92px', 28]}
                              // maxWidth={["92px", 28]}
                              opacity={
                                !onlyTokenTypes ||
                                onlyTokenTypes.filter(tokenType => tokenType === asset.tokenType)
                                  .length > 0
                                  ? '1'
                                  : '0.2'
                              }
                            />
                            <Stack spacing="0" maxWidth={['92px', 28]} p="2">
                              <Text
                                fontSize="xx-small"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                fontWeight="semibold"
                                color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                              >
                                {asset.collection ? asset.collection.name : t('none')}
                              </Text>
                              <Text
                                fontSize="xs"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                fontWeight="medium"
                              >
                                {asset.name ? asset.name : t('none')}
                              </Text>
                            </Stack>
                          </Stack>
                        </GridItem>
                      );
                    })
                  ) : isInitLoading ? (
                    <>
                      {[1, 2, 3, 4, 5, 6].map(element => {
                        return (
                          <GridItem key={element}>
                            <Stack
                              spacing="0"
                              m="1px"
                              borderRadius="10px"
                              border="1px"
                              borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                            >
                              <Skeleton
                                h={['92px', 28]}
                                w="100%"
                                borderTopRadius="lg"
                                borderBottomRadius="none"
                                startColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
                                endColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                              />
                              <Stack spacing="0" maxWidth={['92px', 28]} p="2">
                                <Text
                                  fontSize="xx-small"
                                  overflow="hidden"
                                  whiteSpace="nowrap"
                                  textOverflow="ellipsis"
                                  fontWeight="semibold"
                                  color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                                >
                                  {t('collection')}
                                </Text>
                                <Text
                                  fontSize="xs"
                                  overflow="hidden"
                                  whiteSpace="nowrap"
                                  textOverflow="ellipsis"
                                  fontWeight="medium"
                                >
                                  {t('name')}
                                </Text>
                              </Stack>
                            </Stack>
                          </GridItem>
                        );
                      })}
                    </>
                  ) : (
                    <Stack spacing="0" w="100%" alignItems="center" justifyContent="center" px="1">
                      <Text
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
                      >
                        {t('No NFT.')}
                      </Text>
                    </Stack>
                  )}
                  {hasMore &&
                    !isInitLoading &&
                    !isLoadMoreLoading &&
                    [1, 2, 3, 4, 5, 6].map(element => {
                      return (
                        <GridItem key={element}>
                          <Stack
                            spacing="0"
                            m="1px"
                            borderRadius="10px"
                            border="1px"
                            borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                          >
                            <Skeleton
                              h={['92px', 28]}
                              w="100%"
                              borderTopRadius="lg"
                              borderBottomRadius="none"
                              startColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
                              endColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                            />
                            <Stack spacing="0" maxWidth={['92px', 28]} p="2">
                              <Text
                                fontSize="xx-small"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                fontWeight="semibold"
                                color={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                              >
                                {t('collection')}
                              </Text>
                              <Text
                                fontSize="xs"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                fontWeight="medium"
                              >
                                {t('name')}
                              </Text>
                            </Stack>
                          </Stack>
                        </GridItem>
                      );
                    })}
                </>
              </Grid>
            </InfiniteScroll>

            <Stack alignItems="center" justifyContent="center" w="100%" pt="2" pb="1">
              <Button
                colorScheme="blue"
                borderRadius="lg"
                w="100%"
                disabled={!displayAssets}
                onClick={onClose}
              >
                {t('Confirm')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Component;

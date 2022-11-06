import React, { useEffect, useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { useNetwork, useSigner } from 'wagmi';
import Component from './Component';
import { sendRestApi } from '@lib';
import { getDefaultChainId } from '@lib/ethereum';
import { getAssetsForQN } from '@lib/quicknode';
import { NFTAssetModel } from 'src/types';
import { QuickNodeAPIAssetOptions } from 'src/types/quicknode';

export const getAssetLimit = 12;
export const getAssetLimitForSearch = 50;

export interface SelectNFTModalProps {
  type?: 'ownered';
  selectedAssets: NFTAssetModel[];
  onlyTokenTypes?: ('ERC721' | 'ERC1155')[];
  isOpen: boolean;
  addSelectedAsset: (asset: NFTAssetModel) => void;
  deleteSelectedAsset: (asset: NFTAssetModel) => void;
  onClose: () => void;
}

export const SelectNFTModal: React.FC<SelectNFTModalProps> = ({
  type,
  selectedAssets,
  onlyTokenTypes,
  isOpen,
  addSelectedAsset,
  deleteSelectedAsset,
  onClose,
}) => {
  const { chain } = useNetwork();
  const { data: signer, isError, isLoading } = useSigner();
  const chainId = chain?.id;
  const [displayAssets, setDisplayAssets] = useState<NFTAssetModel[]>([]);
  const [ownedAssets, setOwnedAssets] = useState<NFTAssetModel[]>([]);
  const [ownedAssetsForSearch, setOwnedAssetsForSearch] = useState<NFTAssetModel[]>([]);
  const [searchMessage, setSearchMessage] = useState('');
  const [hasMoreForOwned, setHasMoreForOwned] = useBoolean(true);
  const [hasMoreForOwnedSearch, setHasMoreForOwnedSearch] = useBoolean(true);
  const [isInitLoading, setIsInitLoading] = useBoolean(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useBoolean(false);
  const [isSearchLoading, setIsSearchLoading] = useBoolean(false);

  useEffect(() => {
    if (type === 'ownered' || !type) {
      if (searchMessage && ownedAssetsForSearch.length > 0)
        setDisplayAssets([...ownedAssetsForSearch]);
      else setDisplayAssets([...ownedAssets]);
    }
  }, [type, ownedAssets, searchMessage]);

  const getOwnedAssets = async (options?: QuickNodeAPIAssetOptions) => {
    const initReturnValue = {
      assets: [],
    };
    if (!signer) return initReturnValue;

    const response = await getAssetsForQN('1', {
      owner: await signer.getAddress(),
      ...options,
    });

    console.log(response);

    if (response && response.assets)
      return {
        assets: response.assets,
      };
    return initReturnValue;
  };

  const onChangeForSearch = async (message: string) => {
    setSearchMessage(message);
    setOwnedAssetsForSearch([]);
  };

  const onSubmitForOwnedSearch = async (message?: string) => {
    if (!message && !searchMessage) return;
    else if (message) setSearchMessage(message);

    setIsSearchLoading.on();
    const { assets: newOwnedAssets } = await getOwnedAssets({
      limit: getAssetLimit,
      tokenAddresses: message ? [message] : searchMessage ? [searchMessage] : [],
    });
    setHasMoreForOwnedSearch.on();

    setOwnedAssetsForSearch(newOwnedAssets);
    setDisplayAssets([...newOwnedAssets]);
    setHasMoreForOwnedSearch.on();
    setIsSearchLoading.off();
  };

  const loadMoreForOwned = async (page: number) => {
    if (page === 1 && ownedAssets.length === 0) setIsInitLoading.on();

    console.log(1);
    const { assets: newOwnedAssets } = await getOwnedAssets({
      page,
      limit: (page - 1) * getAssetLimit,
    });
    if (newOwnedAssets.length < getAssetLimit) {
      setHasMoreForOwned.off();
    }

    setOwnedAssets([...ownedAssets, ...newOwnedAssets]);
    if (page === 1 && ownedAssets.length === 0) setIsInitLoading.off();
    setIsLoadMoreLoading.off();
  };

  return (
    <Component
      displayAssets={displayAssets}
      displayAssetsForSearch={ownedAssetsForSearch}
      selectedAssets={selectedAssets}
      searchMessage={searchMessage}
      onlyTokenTypes={onlyTokenTypes}
      hasMore={hasMoreForOwned}
      hasMoreForSearch={hasMoreForOwnedSearch}
      isInitLoading={isInitLoading}
      isLoadMoreLoading={isLoadMoreLoading}
      isSearchLoading={isSearchLoading}
      isOpen={isOpen}
      addSelectedAsset={addSelectedAsset}
      deleteSelectedAsset={deleteSelectedAsset}
      onChangeForSearch={onChangeForSearch}
      onSubmitForSearch={onSubmitForOwnedSearch}
      loadMore={loadMoreForOwned}
      onClose={onClose}
    />
  );
};

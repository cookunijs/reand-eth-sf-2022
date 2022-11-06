// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

/**
 * @title AssetLib
 * @notice Library for handling Asset data structure
 */
library AssetLib {
    bytes4 public constant ERC20_ASSET_CLASS = bytes4(keccak256("ERC20"));
    bytes4 public constant ERC721_ASSET_CLASS = bytes4(keccak256("ERC721"));
    bytes4 public constant ERC1155_ASSET_CLASS = bytes4(keccak256("ERC1155"));

    bytes32 public constant ASSET_TYPEHASH =
        keccak256("AssetData(bytes4 assetClass,bytes data)");

    struct AssetData {
        bytes4 assetClass;
        bytes data;
    }

    function decodeAssetData(
        AssetData memory asset
    ) internal pure returns (address, uint256) {
        if (
            asset.assetClass == AssetLib.ERC721_ASSET_CLASS ||
            asset.assetClass == AssetLib.ERC1155_ASSET_CLASS
        ) {
            (address token, uint256 tokenId) = abi.decode(
                asset.data,
                (address, uint256)
            );
            return (token, tokenId);
        } else if (asset.assetClass == AssetLib.ERC20_ASSET_CLASS) {
            address token = abi.decode(asset.data, (address));
            return (token, 0);
        }
        return (address(0), 0);
    }

    function hash(AssetData calldata asset) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    ASSET_TYPEHASH,
                    asset.assetClass,
                    keccak256(asset.data)
                )
            );
    }
}

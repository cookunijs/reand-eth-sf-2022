// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./AssetLib.sol";

/**
 * @title OrderLib
 * @notice Library for handling Order data structure
 */
library OrderLib {
    struct OrderData {
        address executor;
        AssetLib.AssetData originAsset;
        AssetLib.AssetData childAsset;
    }

    error InvalidExecutor();

    function hashKey(OrderData calldata order) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(order.executor, order.originAsset, order.childAsset)
            );
    }

    function validate(OrderData calldata order) internal pure returns (bool) {
        if (order.executor == address(0)) {
            revert InvalidExecutor();
        }
        return true;
    }
}

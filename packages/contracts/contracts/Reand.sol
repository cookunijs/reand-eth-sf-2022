// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./ReandBase.sol";

/**
 * @title Reand
 * @notice
 */
contract Reand is ReandBase {
    constructor(
        IWorldID _worldId,
        string memory _actionId
    ) ReandBase(_worldId, _actionId) {}
}

// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

/**
 * @title ProofIdLib
 * @notice Library for handling ProofId data structure
 */
library ProofIdLib {
    bytes4 public constant WORLDID_TYPE = bytes4(keccak256("WORLDID"));
    bytes4 public constant POLYGONID_TYPE = bytes4(keccak256("POLYGONID"));
}

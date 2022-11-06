// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "on-chain-verification-test/contracts/verifiers/ZKPVerifier.sol";
import "on-chain-verification-test/contracts/interfaces/ICircuitValidator.sol";
import "on-chain-verification-test/contracts/lib/GenesisUtils.sol";
import "./WorldID.sol";
import "../libraries/ProofIdLib.sol";

/**
 * @title ProofIDVerifiable
 * @notice
 */
contract ProofIDVerifiable is WorldID, ZKPVerifier {
    /*//////////////////////////////////////////////////////////////
                            ProofID STATE
    //////////////////////////////////////////////////////////////*/

    uint64 public constant TRANSFER_REQUEST_ID = 1;
    mapping(address => mapping(bytes4 => bool)) internal _verified;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Verified(address account, bytes4 idType);

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error SenderInvalid();
    error ReuqestIdInvalid();
    error AlreadyVerified();

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        IWorldID _worldId,
        string memory _actionId
    ) WorldID(_worldId, _actionId) {}

    /*//////////////////////////////////////////////////////////////
                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getVerified(
        address account,
        bytes4 idType
    ) public view returns (bool) {
        return _verified[account][idType];
    }

    /*//////////////////////////////////////////////////////////////
                            VERIFY LOGIC
    //////////////////////////////////////////////////////////////*/

    function verifyWithWorldId(
        address account,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) public {
        if (_msgSender() != account) revert SenderInvalid();
        _verifyByWorldId(account, root, nullifierHash, proof);
        _setVerify(account, ProofIdLib.WORLDID_TYPE);
    }

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        address account = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        if (_msgSender() != account) revert SenderInvalid();
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        address account = _msgSender();
        if (requestId != TRANSFER_REQUEST_ID) revert ReuqestIdInvalid();
        if (_verified[account][ProofIdLib.POLYGONID_TYPE])
            revert AlreadyVerified();
        _setVerify(account, ProofIdLib.POLYGONID_TYPE);
    }

    function _setVerify(address account, bytes4 idType) private {
        if (_verified[account][ProofIdLib.POLYGONID_TYPE])
            revert AlreadyVerified();
        _verified[account][idType] = true;
        emit Verified(account, idType);
    }
}

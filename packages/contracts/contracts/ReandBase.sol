// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./extensions/ProofIDVerifiable.sol";
import "./libraries/AssetLib.sol";
import "./libraries/OrderLib.sol";
import "./libraries/ProofIdLib.sol";

/**
 * @title ReandBase
 * @notice
 */
abstract contract ReandBase is ProofIDVerifiable {
    /*//////////////////////////////////////////////////////////////
                            AND STATE
    //////////////////////////////////////////////////////////////*/

    mapping(address => mapping(uint256 => mapping(uint256 => AssetLib.AssetData)))
        private _ands;
    mapping(bytes32 => bool) private _completed;
    mapping(address => mapping(uint256 => uint256)) private _totalIndex;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Anded(
        address executor,
        address originToken,
        uint256 originTokenId,
        address childToken,
        uint256 childTokenId
    );

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error AlreadyCompleted();
    error NotAccountVerified();

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        IWorldID _worldId,
        string memory _actionId
    ) ProofIDVerifiable(_worldId, _actionId) {}

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier whenNotCompleted(OrderLib.OrderData calldata order) {
        if (getCompleted(OrderLib.hashKey(order))) revert AlreadyCompleted();
        _;
    }

    modifier whenAccountVerified() {
        if (
            !getVerified(_msgSender(), ProofIdLib.WORLDID_TYPE) &&
            !getVerified(_msgSender(), ProofIdLib.POLYGONID_TYPE)
        ) revert NotAccountVerified();
        _;
    }

    /*//////////////////////////////////////////////////////////////
                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getAnd(
        address originToken,
        uint256 originTokenId,
        uint256 index
    ) external view returns (address, uint256) {
        AssetLib.AssetData memory childAsset = _ands[originToken][
            originTokenId
        ][index];
        (address childToken, uint256 childTokenId) = AssetLib.decodeAssetData(
            childAsset
        );
        return (childToken, childTokenId);
    }

    function getCompleted(bytes32 id) public view returns (bool) {
        return _completed[id];
    }

    /*//////////////////////////////////////////////////////////////
                            AND LOGIC
    //////////////////////////////////////////////////////////////*/

    function createAnd(
        OrderLib.OrderData calldata order
    ) external whenNotCompleted(order) whenAccountVerified {
        _createAnd(order);
    }

    function _createAnd(OrderLib.OrderData calldata order) internal {
        (address originToken, uint256 originTokenId) = AssetLib.decodeAssetData(
            order.originAsset
        );
        (address childToken, uint256 childTokenId) = AssetLib.decodeAssetData(
            order.childAsset
        );
        _setAnd(originToken, originTokenId, order.childAsset);
        _setCompleted(OrderLib.hashKey(order), true);

        emit Anded(
            msg.sender,
            originToken,
            originTokenId,
            childToken,
            childTokenId
        );
    }

    function _setAnd(
        address originToken,
        uint256 originTokenId,
        AssetLib.AssetData memory childAsset
    ) internal {
        _ands[originToken][originTokenId][
            _totalIndex[originToken][originTokenId]
        ] = childAsset;
    }

    function _setCompleted(bytes32 id, bool status) internal {
        _completed[id] = status;
    }
}

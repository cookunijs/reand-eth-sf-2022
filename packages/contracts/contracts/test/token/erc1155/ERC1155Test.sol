// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

contract ERC1155Test is ERC1155Upgradeable {
    function __ERC1155Test_init(string memory uri_) external initializer {
        __Context_init_unchained();
        __ERC1155_init_unchained(uri_);
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        _mint(to, id, amount, data);
    }
}

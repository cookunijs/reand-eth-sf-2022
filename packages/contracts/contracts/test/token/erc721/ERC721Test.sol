// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract ERC721Test is ERC721Upgradeable {
    function __ERC721Test_init(
        string memory name_,
        string memory symbol_
    ) external initializer {
        __Context_init_unchained();
        __ERC721_init_unchained(name_, symbol_);
    }

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}

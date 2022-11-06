// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract ERC20Test is ERC20Upgradeable {
    function __ERC20Test_init(
        string memory name_,
        string memory symbol_
    ) external initializer {
        __Context_init_unchained();
        __ERC20_init_unchained(name_, symbol_);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

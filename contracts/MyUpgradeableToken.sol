// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

// import "truffle/Console.sol";

contract MyUpgradeableToken is Initializable, ERC20Upgradeable {
    event TokensMinted(uint256 total);

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 decimals
    ) public virtual initializer {
        emit TokensMinted(initialSupply * 10**decimals);
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply * 10**decimals);
    }
}

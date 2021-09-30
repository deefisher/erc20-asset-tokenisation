// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract MyUpgradeableContract is Initializable, OwnableUpgradeable {
    IERC20Upgradeable public token;
    uint8 public value;

    function initialize(IERC20Upgradeable _token) public initializer {
        __Ownable_init_unchained();
        token = _token;
        value = 42;
    }

    function getTokenAddress() public view onlyOwner returns (address) {
        return address(token);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

//person who creates smart contract recieves the initialSupply of tokens
contract MyToken is ERC20, Ownable {
    uint256 public value;
    using SafeMath for uint256;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        value = 42;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function incrementValue() public onlyOwner returns (bool) {
        value = value.add(1);
        return true;
    }
}

//test transferOwnership

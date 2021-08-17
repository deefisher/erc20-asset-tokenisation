pragma solidity ^0.8.0;

import "./Crowdsale.sol";

//this contract owns the tokens after it gets sent them from the MyToken contract creator
//when people send wei to this contract the sender will be sent tokens depending on the `rate`
contract MyTokenSale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
        public
    {

    }
}

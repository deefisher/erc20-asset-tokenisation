const MyToken = artifacts.require('./MyToken.sol');
const MyTokenSale = artifacts.require('./MyTokenSale.sol');
const MyKycContract = artifacts.require('./KycContract.sol');
require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS); //deploy the token contract
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKycContract.address); //deploy Token sale contract that will receive the tokens
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};

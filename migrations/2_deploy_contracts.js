const MyToken = artifacts.require('./MyToken.sol');
const MyNFT = artifacts.require('./MyNFT.sol');
const MyAccessControlledToken = artifacts.require('./MyAccessControlledToken.sol');
const MyTimelockController = artifacts.require('./MyTimelockController.sol');
const MyGovernerContract = artifacts.require('./MyGovernerContract.sol');
const MyVotingToken = artifacts.require('./MyVotingToken.sol');
const { args } = require('../utils/projectVariables');
//const MyUpgradeableToken = artifacts.require('./MyUpgradeableToken.sol');
//const MyUpgradeableContract = artifacts.require('./MyUpgradeableContract.sol');
//const { deployProxy } = require('@openzeppelin/truffle-upgrades');

require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();

    //deploy the token contract
    await deployer.deploy(MyToken, ...Object.values(args.tokenInstance));

    //deploy the nft contract
    let nftInstance = await deployer.deploy(MyNFT);
    await nftInstance.awardItem(addr[0], process.env.NFT_TOKEN_URI);

    //deploy the upgradeable token contracts
    // await deployProxy(MyUpgradeableToken, [...Object.values(args.upgradeableTokenInstance)], {
    //     deployer,
    //     initializer: 'initialize',
    // });
    // await deployProxy(MyUpgradeableContract, [MyUpgradeableToken.address], {
    //     deployer,
    //     initializer: 'initialize',
    // });

    //deploy the token contract
    await deployer.deploy(MyAccessControlledToken, ...Object.values(args.accessControlledTokenInstance));

    //deploy governer contracts
    await deployer.deploy(MyTimelockController, 1, [addr[0]], [addr[0]]);
    await deployer.deploy(MyVotingToken, ...Object.values(args.votingTokenInstance));
    await deployer.deploy(MyGovernerContract, MyVotingToken.address, MyTimelockController.address);
};

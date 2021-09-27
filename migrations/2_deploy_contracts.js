const MyToken = artifacts.require('./MyToken.sol');
const MyNFT = artifacts.require('./MyNFT.sol');
const MyUpgradeableToken = artifacts.require('./MyUpgradeableToken.sol');
const MyUpgradeableContract = artifacts.require('./MyUpgradeableContract.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const { args } = require('../utils/projectVariables');

require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();

    //deploy the token contract
    await deployer.deploy(MyToken, ...Object.values(args.tokenInstance));

    //deploy the nft contract
    let nftInstance = await deployer.deploy(MyNFT);
    await nftInstance.awardItem(addr[0], process.env.NFT_TOKEN_URI);

    //deploy the upgradeable token contacts
    await deployProxy(MyUpgradeableToken, [...Object.values(args.upgradeableTokenInstance)], {
        deployer,
        initializer: 'initialize',
    });
    await deployProxy(MyUpgradeableContract, [MyUpgradeableToken.address], {
        deployer,
        initializer: 'initialize',
    });
};

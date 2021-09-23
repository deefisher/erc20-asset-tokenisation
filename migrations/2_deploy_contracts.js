const MyToken = artifacts.require('./MyToken.sol');
const MyNFT = artifacts.require('./MyNFT.sol');
const MyUpgradeableToken = artifacts.require('./MyUpgradeableToken.sol');
const MyUpgradeableContract = artifacts.require('./MyUpgradeableContract.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

require('dotenv').config({ path: '../.env' });

const args = {
    upgradeableTokenInstance: {
        name: 'StarDucks Capu-Token 2',
        symbol: 'SCT2',
        initialSupply: process.env.INITIAL_TOKENS,
    },
};

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    console.log(addr[0], addr[1], addr[2]);

    //deploy the token contract
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);

    //deploy the nft contract
    let nftInstance = await deployer.deploy(MyNFT);
    await nftInstance.awardItem(addr[0], process.env.NFT_TOKEN_URI);

    //deploy the upgradeable token contacts
    await deployProxy(MyUpgradeableToken, [...Object.values(args.upgradeableTokenInstance)], { deployer });
    await deployProxy(MyUpgradeableContract, [MyUpgradeableToken.address], {
        deployer,
    });
};

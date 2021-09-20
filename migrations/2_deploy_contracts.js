const MyToken = artifacts.require('./MyToken.sol');
const MyNFT = artifacts.require('./MyNFT.sol');
require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    console.log(addr[0], addr[1], addr[2]);
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS); //deploy the token contract
    let nftInstance = await deployer.deploy(MyNFT); //deploy the token contract
    await nftInstance.awardItem(addr[0], process.env.NFT_TOKEN_URI);
};

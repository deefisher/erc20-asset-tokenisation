const UpgradeableContract = artifacts.require('MyUpgradeableContract');
const UpgradeableToken = artifacts.require('MyUpgradeableToken');
const { expect } = require('./testSetup');

contract('UpgradeableContract Test', async () => {
    //add accounts as an arg if you want to get and array of the accounts
    let upgradeableContractInstance;

    //eventually property is needed to allow for promises to resolve
    it('should return correct token address on getTokenAddress call', async () => {
        upgradeableContractInstance = await UpgradeableContract.deployed();
        const tokenAddress = await upgradeableContractInstance.getTokenAddress();
        expect(tokenAddress).to.equal(UpgradeableToken.address);
    });
});

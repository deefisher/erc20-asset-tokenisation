const UpgradeableContract = artifacts.require('MyUpgradeableContract');
const UpgradeableContractV2 = artifacts.require('MyUpgradeableContractV2');
const UpgradeableToken = artifacts.require('MyUpgradeableToken');
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const { expect } = require('./testSetup');

contract('UpgradeableContract Test', async () => {
    //add accounts as an arg if you want to get and array of the accounts
    let upgradeableContractInstance;

    it('should return correct token address on getTokenAddress call', async () => {
        upgradeableContractInstance = await UpgradeableContract.deployed();
        const tokenAddress = await upgradeableContractInstance.getTokenAddress();
        expect(tokenAddress).to.equal(UpgradeableToken.address);
    });
    
    it('upgrades', async () => {
        upgradeableContractInstance = await UpgradeableContract.deployed();
        const upgradeableContractInstanceV2 = await upgradeProxy(
            upgradeableContractInstance.address,
            UpgradeableContractV2,
        );

        const value = await upgradeableContractInstanceV2.value();
        expect(value.toString()).to.equal('42');
    });
});

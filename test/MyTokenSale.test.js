const TokenSale = artifacts.require('MyTokenSale');
const Token = artifacts.require('MyToken');

const { BN, expect } = require('./testSetup');

contract('TokenSale Test', async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it('should not have any tokens in my deployerAccount', async () => {
        let instance = await Token.deployed();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
});

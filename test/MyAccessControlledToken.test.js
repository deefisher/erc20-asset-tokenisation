const AccessControlledToken = artifacts.require('MyAccessControlledToken');
const { args } = require('../utils/projectVariables');
const { BN, expect } = require('./testSetup');

contract('AccessControlledToken Test', async (accounts) => {
    const [deployerAccount, recipient] = accounts;

    beforeEach(async () => {
        this.myAccessControlledToken = await AccessControlledToken.new(
            ...Object.values(args.accessControlledTokenInstance),
        );
        await web3.eth.getBalance(deployerAccount).then(console.log);
    });

    it('should allow deployer account to mint and burn tokens by default', async () => {
        const sendTokens = 1;
        let instance = await this.myAccessControlledToken;
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(0));
        await instance.mint(recipient, sendTokens);
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
        await instance.burn(recipient, sendTokens);
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it('should not allow non deployer account that is not granted permission to mint', async () => {
        const sendTokens = 1;
        let instance = await this.myAccessControlledToken;
        await expect(instance.mint(recipient, sendTokens, { from: recipient })).to.eventually.be.rejected;
    });

    it('should not allow non deployer account that is not granted permission to burn', async () => {
        const sendTokens = 1;
        let instance = await this.myAccessControlledToken;
        await instance.mint(recipient, sendTokens);
        await expect(instance.burn(recipient, sendTokens, { from: recipient })).to.eventually.be.rejected;
    });

    it('should allow non deployer account that is granted permission to mint and burn', async () => {
        const sendTokens = 1;
        let instance = await this.myAccessControlledToken;
        const minterRole = await instance.MINTER_ROLE();
        const burnerRole = await instance.BURNER_ROLE();
        instance.grantRole(minterRole, recipient);
        instance.grantRole(burnerRole, recipient);
        await expect(instance.mint(recipient, sendTokens, { from: recipient })).to.eventually.be.fulfilled;
        await expect(instance.burn(recipient, sendTokens, { from: recipient })).to.eventually.be.fulfilled;
    });
});

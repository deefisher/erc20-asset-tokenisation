const Token = artifacts.require('MyToken');

const { BN, expect } = require('./testSetup');

contract('Token Test', async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        console.log('.env', process.env.INITIAL_TOKENS);
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    //eventually property is needed to allow for promises to resolve
    it('should have all tokens in my account', async () => {
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it('is possible to send tokens between accounts', async () => {
        const sendTokens = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        //fulfilled property means promise gets fulfilled (as opposed to rejected)
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(
            totalSupply.sub(new BN(sendTokens)),
        );
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it('is not possible to send more tokens than available in total', async () => {
        let instance = await this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;

        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});

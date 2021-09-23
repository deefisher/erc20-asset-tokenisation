const { BN, expect } = require('./testSetup');

async function assertNotPossibleToSendMoreTokensThanAvailable({ token, deployerAccount, recipient }) {
    let instance = await token;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;

    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
}

async function assertSendTokensBetweenAccounts({ token, deployerAccount, recipient }) {
    const sendTokens = 1;
    let instance = await token;
    let totalSupply = await instance.totalSupply();
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    //fulfilled property means promise gets fulfilled (as opposed to rejected)
    //is erc20 instance therefore can use balanceOf method
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(
        totalSupply.sub(new BN(sendTokens)),
    );
    await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
}

async function assertAllTokensInDeployerAccount({ token, deployerAccount }) {
    let instance = await token;
    let totalSupply = await instance.totalSupply();
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
}

module.exports = {
    assertNotPossibleToSendMoreTokensThanAvailable,
    assertSendTokensBetweenAccounts,
    assertAllTokensInDeployerAccount,
};

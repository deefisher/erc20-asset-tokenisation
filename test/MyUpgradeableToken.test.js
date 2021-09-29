const UpgradeableToken = artifacts.require('MyUpgradeableToken');
const { args } = require('../utils/projectVariables');
const tokenTestAssertions = require('./tokenTestAssertions');

contract('UpgradeableToken Test', async (accounts) => {
    const [deployerAccount, recipient] = accounts;
    let UpgradeableTokenInstance;

    //eventually property is needed to allow for promises to resolve
    it('should have all tokens in my account', async () => {
        UpgradeableTokenInstance = await UpgradeableToken.deployed();
        await tokenTestAssertions.assertAllTokensInDeployerAccount({
            token: UpgradeableTokenInstance,
            deployerAccount,
            initialSupply: args.upgradeableTokenInstance.initialSupply,
        });
    });

    it('is possible to send tokens between accounts', async () => {
        UpgradeableTokenInstance = await UpgradeableToken.deployed();
        await tokenTestAssertions.assertSendTokensBetweenAccounts({
            token: UpgradeableTokenInstance,
            deployerAccount,
            recipient,
        });
    });

    it('is not possible to send more tokens than available in total', async () => {
        UpgradeableTokenInstance = await UpgradeableToken.deployed();
        await tokenTestAssertions.assertNotPossibleToSendMoreTokensThanAvailable({
            token: UpgradeableTokenInstance,
            deployerAccount,
            recipient,
        });
    });
});

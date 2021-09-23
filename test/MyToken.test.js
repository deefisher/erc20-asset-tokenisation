const Token = artifacts.require('MyToken');
const tokenTestAssertions = require('./tokenTestAssertions');

contract('Token Test', async (accounts) => {
    const [deployerAccount, recipient] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
        await web3.eth.getBalance(deployerAccount).then(console.log);
    });

    //eventually property is needed to allow for promises to resolve
    it('should have all tokens in my account', async () => {
        await tokenTestAssertions.assertAllTokensInDeployerAccount({ token: this.myToken, deployerAccount });
    });

    it('is possible to send tokens between accounts', async () => {
        await tokenTestAssertions.assertSendTokensBetweenAccounts({ token: this.myToken, deployerAccount, recipient });
    });

    it('is not possible to send more tokens than available in total', async () => {
        await tokenTestAssertions.assertNotPossibleToSendMoreTokensThanAvailable({
            token: this.myToken,
            deployerAccount,
            recipient,
        });
    });
});

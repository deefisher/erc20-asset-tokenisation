const GovernerContract = artifacts.require('MyGovernerContract');
const TimelockController = artifacts.require('MyTimelockController');
const { expect } = require('./testSetup');

contract('GovernerContract Test', async (accounts) => {
    const [deployerAccount, recipient] = accounts;
    let governerContractInstance;
    let timelockControllerInstance;

    beforeEach(async () => {
        governerContractInstance = await GovernerContract.deployed();
        timelockControllerInstance = await TimelockController.deployed();
    });

    it('should allow the granting of the proposer role to the governer contract', async () => {
        const proposerRole = await timelockControllerInstance.PROPOSER_ROLE();
        await timelockControllerInstance.grantRole(proposerRole, governerContractInstance.address);
        const governerHasRole = await timelockControllerInstance.hasRole(
            proposerRole,
            governerContractInstance.address,
        );
        await expect(governerHasRole).to.equal(true);
    });

    it('should allow the removal of the proposer role from the deployer account', async () => {
        const proposerRole = await timelockControllerInstance.PROPOSER_ROLE();
        await timelockControllerInstance.renounceRole(proposerRole, deployerAccount);
        const deployerHasRole = await timelockControllerInstance.hasRole(proposerRole, deployerAccount);
        await expect(deployerHasRole).to.equal(false);
    });
});

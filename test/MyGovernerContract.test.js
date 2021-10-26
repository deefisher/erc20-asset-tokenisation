const GovernerContract = artifacts.require('MyGovernerContract');
const TimelockController = artifacts.require('MyTimelockController');
const VotingToken = artifacts.require('MyVotingToken');
const Token = artifacts.require('MyToken');
const { expect } = require('./testSetup');

contract('GovernerContract Test', async (accounts) => {
    const [deployerAccount, recipient, voter1, voter2, voter3] = accounts;
    let governerContractInstance;
    let timelockControllerInstance;
    let votingTokenInstance;
    let tokenInstance;
    let proposalId;
    let proposalDescriptionString = 'Proposal #1: Give grant to team';
    let transferCalldata;

    async function getCurrentBlockNumber() {
        const currentBlock = await web3.eth.getBlock('latest');
        return currentBlock.number;
    }

    beforeEach(async () => {
        governerContractInstance = await GovernerContract.deployed();
        timelockControllerInstance = await TimelockController.deployed();
        votingTokenInstance = await VotingToken.deployed();
        tokenInstance = await Token.deployed();
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

    it('should be able to create a proposal for transfering a grant to a team', async () => {
        //there is an underlying web3 instance with truffle!
        const eventType = 'ProposalCreated';

        const tokenAmount = 1;
        transferCalldata = await tokenInstance.contract.methods.transfer(recipient, tokenAmount).encodeABI();
        const result = await governerContractInstance.propose(
            [tokenInstance.address],
            [0],
            [transferCalldata],
            proposalDescriptionString,
        );
        await expect(result.logs[0].event).to.equal(eventType);
        proposalId = result.logs[0].args.proposalId;
    });

    it('should allow votes to be cast on proposal', async () => {
        const previousBlockNumber = getCurrentBlockNumber();

        // await votingTokenInstance.mint(governerContractInstance.address, totalSupply);

        let blockChanged = false;
        let counter = 0;
        while (!blockChanged) {
            const currentBlockNumber = getCurrentBlockNumber();
            if (currentBlockNumber !== previousBlockNumber) blockChanged = true;
            if (counter % 1000 === 0) console.log('waiting for next block');
            counter++;
        }

        await votingTokenInstance.mint(voter1, 1);
        await votingTokenInstance.mint(voter2, 1);
        await votingTokenInstance.mint(voter3, 1);
        await governerContractInstance.castVote(proposalId, 1, { from: voter1 });
        await governerContractInstance.castVote(proposalId, 1, { from: voter2 });
        await governerContractInstance.castVote(proposalId, 1, { from: voter3 });
        const hasVoted = await governerContractInstance.hasVoted(proposalId, voter1);

        await expect(hasVoted).to.equal(true);
    });

    // it('should allow for queing prior to execution', async () => {
    //     const quorum = await governerContractInstance.quorumVotes();
    //     console.log('quorum', quorum.toString());

    //     const descriptionHash = await web3.utils.keccak256(proposalDescriptionString);
    //     //better to catch and print error and run all tests when theres an error
    //     await governerContractInstance
    //         .queue([tokenInstance.address], [0], [transferCalldata], descriptionHash)
    //         .then((result) => console.log('queue result:', result))
    //         .catch((error) => console.log('queue error:', error));
    // });
});

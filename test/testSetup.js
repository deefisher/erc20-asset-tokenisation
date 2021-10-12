var chai = require('chai');
const { ethers } = require('ethers');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

module.exports = {
    expect,
    BN,
    ethers,
};

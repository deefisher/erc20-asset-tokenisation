const args = {
    tokenInstance: {
        name: 'StarDucks Capu-Token',
        symbol: 'SCT',
        initialSupply: process.env.INITIAL_TOKENS,
    },
    accessControlledTokenInstance: {
        name: 'StarDucks Access Capu-Token',
        symbol: 'SACT',
    },
    upgradeableTokenInstance: {
        name: 'StarDucks Capu-Token Upgradeable',
        symbol: 'SCTUPG',
        initialSupply: process.env.INITIAL_TOKENS,
        decimals: 0,
    },
    votingTokenInstance: {
        name: 'Cryptapp utility token',
        symbol: 'ctap',
    },
};

module.exports = {
    args,
};

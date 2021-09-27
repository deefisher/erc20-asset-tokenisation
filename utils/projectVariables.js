const args = {
    tokenInstance: {
        name: 'StarDucks Capu-Token',
        symbol: 'SCT',
        initialSupply: process.env.INITIAL_TOKENS,
    },
    upgradeableTokenInstance: {
        name: 'StarDucks Capu-Token Upgradeable',
        symbol: 'SCTUPG',
        initialSupply: process.env.INITIAL_TOKENS,
        decimals: 0,
    },
};

module.exports = {
    args,
};

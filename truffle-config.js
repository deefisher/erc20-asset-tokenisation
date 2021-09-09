const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const AccountIndex = 0;

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
    networks: {
        development: {
            port: 7545,
            host: '127.0.0.1',
            network_id: 5777,
        },
        ganache_local: {
            //needed to create seperate wallet because metaMask creates its own account for the transaction but it won't be the owner account
            provider: function () {
                return new HDWalletProvider(process.env.MNEMONIC, 'http://127.0.0.1:7545', AccountIndex);
            },
            network_id: 5777,
        },
        goerli_infura: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    'https://goerli.infura.io/v3/024d6723679345e5b82906a904336f6e',
                    AccountIndex,
                );
            },
            network_id: 5,
        },
        ropsten_infura: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    'https://ropsten.infura.io/v3/024d6723679345e5b82906a904336f6e',
                    AccountIndex,
                );
            },
            network_id: 3,
            networkCheckTimeout: 1000000,
            timeoutBlocks: 2000
        },
    },
    compilers: {
        solc: {
            version: '0.8.0',
        },
    },
};

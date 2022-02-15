const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { infuraID, mnemonic } = require("./secrets.json");

const URL = `https://ropsten.infura.io/v3/${infuraID}`;

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "frontend/src/build/contracts"
  ),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, URL);
      },
      network_id: 3,
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};

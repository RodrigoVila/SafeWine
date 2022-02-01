const path = require("path");

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "frontend/src/build/contracts"
  ), //Browser
  // contracts_build_directory: path.join(__dirname, "client/src/build/contracts"), //Mobile
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    // ropsten: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       MNEMONIC,
    //       "https://ropsten.infura.io/v3/cd55c9873a2f42cca79b97fa8e39e30a"
    //     );
    //   },
    //   network_id: 3,
    //   gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
    // },
  },
  compilers: {
    solc: {
      version: "0.8.11",
    },
  },
};

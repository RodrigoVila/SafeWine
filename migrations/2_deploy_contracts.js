const MainContract = artifacts.require("MainContract");
const NFT = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(NFT);
  // Additional contracts can be deployed here
};

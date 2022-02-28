const MainContract = artifacts.require("MainContract");
const NFTContract = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(NFTContract);
  // Additional contracts can be deployed here
};

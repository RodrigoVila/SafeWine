const MainContract = artifacts.require("MainContract");
const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(MainContract);
  deployer.deploy(Token);
  // Additional contracts can be deployed here
};

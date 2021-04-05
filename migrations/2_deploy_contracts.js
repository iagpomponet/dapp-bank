const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

// deployer - network - account (accounts are the account that u see in ganashe that are on the blockchain)
module.exports = async function(deployer, network, accounts) {
  // first deploy mock DAI token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // first deploy mock DappToken
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // deploy tokenfarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // Transfer all tokens to TokenFarm (1 million tokes)
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], "100000000000000000000")
};



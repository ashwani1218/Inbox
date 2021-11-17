// https://rinkeby.infura.io/v3/43696b7135424441920a4851ff2f0831

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
const provider = new HDWalletProvider(
  "infant immense decline canvas skirt intact save smile vendor nephew village initial",
  "https://rinkeby.infura.io/v3/43696b7135424441920a4851ff2f0831"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Gettign the first account's address: ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to :", result.options.address);
  provider.engine.stop();
};
deploy();

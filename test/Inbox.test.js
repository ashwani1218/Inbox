const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //constructor function
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let inbox;
const initialMessage = "Hi there!";

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy contracts
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });
  it("Can change the message", async () => {
    await inbox.methods.setMessage("Bye there!").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye there!");
  });
});

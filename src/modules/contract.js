const config = require("../config")

const Web3 = require("web3")
const { CryptoUtils, Client, LoomProvider } = require("loom-js")

const loomClient = new Client(config.networkId, config.writeUrl, config.readUrl)
const web3 = new Web3(new LoomProvider(loomClient, CryptoUtils.B64ToUint8Array(config.privateKey)))

const abi = require("../config/Achievements.json")

const contract = new web3.eth.Contract(abi, config.contractAddress)

module.exports = contract
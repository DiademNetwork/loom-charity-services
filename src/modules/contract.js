const config = require("../config")

const Web3 = require("web3")
const { CryptoUtils, LocalAddress, Client, LoomProvider } = require("loom-js")

const privateKeyRaw = CryptoUtils.B64ToUint8Array(config.privateKey)

const loomClient = new Client(config.networkId, config.writeUrl, config.readUrl)
const web3 = new Web3(new LoomProvider(loomClient, privateKeyRaw))

const abi = require("../config/Achievements.json")

const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKeyRaw)
const serviceAddress = LocalAddress.fromPublicKey(publicKey).toString()

const contract = new web3.eth.Contract(abi, config.contractAddress, { from: serviceAddress })

module.exports = contract
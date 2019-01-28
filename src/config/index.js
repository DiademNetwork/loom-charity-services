const secrets = require("./secrets")

module.exports = {
  "networkId": "default",
  "writeUrl": "ws://diadem.host:46658/websocket",
  "readUrl": "ws://diadem.host:46658/queryws",
  "contractAddress": "0xaCc7bC52599Ec656AA66cE31d8915ad123E8A693",
  "faucetPort": "3003",
  "streamKey": secrets.streamKey,
  "streamSecret": secrets.streamSecret,
  "streamAppId": secrets.streamAppId,
  "privateKey": secrets.privateKey
}
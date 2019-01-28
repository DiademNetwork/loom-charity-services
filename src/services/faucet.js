const config = require("../config")

const stream = require("getstream")
const express = require("express")
const bodyParser = require("body-parser")

const streamClient = stream.connect(config.streamKey, config.streamSecret, config.streamAppId )

const app = express()

app.use(bodyParser())

app.get('/ping', (req, res) => {
  res.json({ pong: new Date() })
})

// personal token allows user to associate his wallet with social profile and listen to his personal achievements
app.post('/get-user-token', (req, res) => {
  const { userAddress } = req.body
  const token = streamClient.createUserToken(userAddress)

  res.json({ token })
})

// when user has connected his social profile
app.post('/loom/register', (req, res) => {
  res.send({ ok: true })
})

// when user has created a new wallet
app.post('/loom/registerWallet', (req, res) => {
  res.send({ ok: true })
})

app.listen(config.faucetPort, () => {
  console.log(`faucet started at ${config.faucetPort} port`)
})
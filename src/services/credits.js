const config = require("../config")

const stream = require("getstream")
const express = require("express")
const bodyParser = require("body-parser")

const getstream = require("../modules/getstream")

const app = express()

app.use(bodyParser())

app.get('/ping', (req, res) => {
  res.json({ pong: new Date() })
})

// personal token allows user to associate his wallet with social profile and listen to his personal achievements
app.post('/get-user-token', (req, res) => {
  const { userAddress } = req.body
  const token = getstream.client.createUserToken(userAddress)

  res.json({ token })
})

// when user has connected his social profile
app.post('/credits/register', (req, res) => {
  res.send({ ok: true })
})

// when user has created a new wallet
app.post('/credits/registerWallet', (req, res) => {
  res.send({ ok: true })
})

app.post('/credits/create', async (req, res) => {
  const { userAddress, title, link } = req.body
  await getstream.createHandler({ userAddress, title, link })

  res.send({ ok: true })
})

app.post('/credits/confirm', async (req, res) => {
  const { userAddress, creatorAddress, link } = req.body
  await getstream.confirmHandler({ userAddress, creatorAddress, link })

  res.send({ ok: true })
})

app.listen(config.faucetPort, () => {
  console.log(`faucet started at ${config.faucetPort} port`)
})

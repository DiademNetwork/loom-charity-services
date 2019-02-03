const config = require("../config")
const contract = require("../modules/contract")
const getstream = require("../modules/getstream")

contract.events.Create({ fromBlock: config.fromBlock }, async (err, event) => {
  if (err)
    return console.error(err)

  console.log('create', event)

  const { messageHash } = event.returnValues

  const achievement = await contract.methods.getAchievementByHash(messageHash).call()

  await getstream.createHandler({
    userAddress: achievement.owner,
    title: achievement.title,
    link: achievement.link
  })
})

contract.events.Confirm({ fromBlock: config.fromBlock }, async (err, event) => {
  if (err)
    return console.error(err)

  console.log('confirm', event)

  const { returnValues } = event

  await getstream.confirmHandler({
    userAddress: returnValues.witness,
    creatorAddress: returnValues.owner,
    link: returnValues.link
  })
})

contract.events.Support({ fromBlock: config.fromBlock }, async (err, event) => {
  if (err)
    return console.error(err)

  console.log('support', event)

  const { userAddress, creatorAddress, link, amount } = event.returnValues

  await getstream.supportHandler({
    userAddress, creatorAddress, link, amount
  })
})

console.log('reducer started')
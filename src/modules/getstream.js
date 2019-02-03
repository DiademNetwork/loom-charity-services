const config = require("../config")

const stream = require("getstream")

const client = stream.connect(config.streamKey, config.streamSecret, config.streamAppId)

const achievement = ({ title, link, userAddress, actor }) => ({
  actor: actor,
  object: link,
  title: title,
  foreign_id: `create_${link}`,
  verb: 'create',
  time: new Date(),
  to: [
    `timeline:${userAddress}`,
    `achievement_aggregated:${userAddress}`,
    `achievement_aggregated:common`
  ]
})

const confirmation = ({ link, userAddress, creatorAddress, actor }) => ({
  actor: actor,
  object: link,
  foreign_id: `confirm_${link}`,
  verb: 'confirm',
  time: new Date(),
  to: [
    `timeline:${userAddress}`,
    `timeline:${creatorAddress}`,
    `achievement_aggregated:${creatorAddress}`,
    `achievement_aggregated:common`
  ]
})

const support = ({ link, blockchain, amount, userAddress, creatorAddress, actor }) => ({
  actor: actor,
  object: link,
  blockchain: 'loom',
  amount: amount,
  foreign_id: `support_${link}`,
  verb: 'support',
  time: new Date(),
  to: [
    `timeline:${userAddress}`,
    `timeline:${creatorAddress}`,
    `achievement_aggregated:${creatorAddress}`,
    `achievement_aggregated:common`
  ]
})

const activity = (type) => (args) => {
  switch (type) {
    case 'achievement':
      return achievement(args)

    case 'confirmation':
      return confirmation(args)

    case 'support':
      return support(args)

    default:
      throw new Error('Invalid activity type')
  }
}

module.exports = {
  async createHandler(args) {
    const { userAddress, title, link } = args

    const achievements = client.feed('achievement', userAddress)

    const actor = await client.user(userAddress).get()

    await achievements.addActivity(activity('achievement')({ ...args, actor }))
  },

  async confirmHandler(args) {
    const { userAddress, creatorAddress, link } = args

    const achievements = client.feed('achievement', creatorAddress)

    const actor = await client.user(userAddress).get()

    await achievements.addActivity(activity('confirmation')({ ...args, actor }))
  },

  async supportHandler(args) {
    const { userAddress, creatorAddress, link, amount } = args

    const achievements = client.feed('achievement', creatorAddress)

    const actor = await client.user(userAddress).get()

    await achievements.addActivity(activity('support')({ ...args, actor }))
  }
}

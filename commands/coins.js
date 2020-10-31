
const { MessageEmbed, Collection } = require("discord.js");
let colours = require("../colours.json")
const mongoose = require('mongoose');
const Money = require('../models/money.js');
const MONGODB_URI =
  "mongodb+srv://" +
  process.env.atlasusername +
  ":" +
  process.env.atlaspass +
  "@" +
  process.env.host +
  "/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/CoinDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  name: "coins",
  aliases: ["coin", "balance", "bal"],
  cooldown: 10,
  category: "stats",
  description: "Shows how many coins someone has.",
  run: async (message, args, client, prefix) => {
    const target = message.mentions.users.first() || message.author;
    Money.findOne({
      userID: target.id
    }, (err, money) => {
      if (err) console.log(err)
      let coinEmbed = new MessageEmbed()
        .setColor(colours.economy)
        .setTitle(`Balance for ${target.username}: `)
        .setThumbnail(target.displayAvatarURL())
      if (!money) {
        coinEmbed.setDescription("`0 coins`")
        return message.channel.send(coinEmbed)
      } else {
        coinEmbed.setDescription(`\`${money.money} coin(s)\``)
        return message.channel.send(coinEmbed)
      }
    })
  }
}
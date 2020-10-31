
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
  name: "leaderboard",
  aliases: ['lb', 'rich'],
  cooldown: 50,
  category: "stats",
  description: "Shows richest in a server in terms of coins.",
  run: async (message, args, client) => {
    Money.find({})
    .sort([
      ['money', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);

      let embed = new MessageEmbed()
        .setTitle(`Coin Leaders for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())
      if (res.length === 0) {
        embed.setColor(0xe84d4d)
        embed.setDescription("`ERROR: No data found.`");
      } else if (res.length < 5) {
        embed.setColor(colours.economy);
        let guild = client.guilds.cache.get(message.guild.id);
        for (let i = 0; i <= res.length; i++) {
          if (res[i] != undefined && guild.member(res[i].userID)) {
            embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Coins: **${res[i].money}**`);
          }
        }
      } else {
        embed.setColor(colours.economy);
        let memberList = [];
        let guild = client.guilds.cache.get(message.guild.id);
        for (let i = 0; i <= res.length; i++) {
          if(guild.member(res[i].userID)) {
            if(memberList.length < 7) {
              memberList.push(res[i]);
            }
          }
        }

        for (let i = 0; i <= memberList.length; i++) {
          embed.addField((i + 1) + ". " + client.users.cache.get(memberList[i].userID).username, `Coins: **${memberList[i].money}**`);
        }
      }
      message.channel.send(embed)
    })
  }
}

/*
if (res[i] != undefined) {
  embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Coins: ${res[i].money}`);
}
*/
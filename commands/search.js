const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const Player = require("../models/player");
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
  name: "search",
  aliases: ["collect"],
  cooldown: 600,
  category: "stats",
  description: "Your player goes out into the wild and finds coins.",
  run: async (message, args, client, cmd) => {
    Player.findOne(
      {
        userID: message.author.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats)
          return message.channel.send(
            "`ERROR: You do not have stats.`"
          );
        let coins = (Math.ceil(Math.random() * 50) + 50) * stats.level;
        Money.findOne(
          {
            userID: message.author.id
          },
          (err, money) => {
            if (err) console.log(err);
            if (!money) {
              const newMoney = new Money({
                userID: message.author.id,
                serverID: message.guild.id,
                money: coins
              });

              newMoney.save().catch(err => console.log(err));
              const embed = new MessageEmbed()
                .setColor(colours.economy)
                .setTitle(`\`${message.author.username} goes on a trip...\``)
                .setDescription(
                  `\`You venture out into the distance in search of coins, and you find ${coins} of your first coins.\``
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                )
              message.channel.send(embed)
            } else {
              const embed1 = new MessageEmbed()
                .setColor(colours.economy)
                .setTitle(`\`${message.author.username} goes on a trip...\``)
                .setDescription(
                  `\`You venture out into the distance in search of coins, and you find ${coins} coins.\``
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                )
              message.channel.send(embed1);
              money.money += coins;
              money.save().catch(err => console.log(err));
            }
          }
        );
      }
    );
  }
};

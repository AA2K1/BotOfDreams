const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
const Player = require("../models/player");
const Money = require("../models/money.js");
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
  name: "daily",
  aliases: ["d"],
  cooldown: 86400,
  category: "stats",
  description: "Gives a daily amount of coins and xp.",
  run: async (message, args, client, cmd) => {
    Player.findOne(
      {
        userID: message.author.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats) {
          const newPlayer = new Player({
            userID: message.author.id,
            serverID: message.guild.id,
            level: 1,
            xp: 0,
            class: "peasant",
            stats: {
              strength: 5,
              magic: 0,
              vitality: 10,
              maxvitality: 10,
              agility: 10
            }
          });

          newPlayer.save().catch(err => console.log(err));
          message.channel.send(`\`${client.users.cache.get(message.author.id).username}'s character has been created!\``);
        }
        let coins = 1000 + Math.ceil(Math.random() * 50) + 150;
        let xp = Math.round((Math.ceil(Math.random() * 250) + 750) * stats.level/6)
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
              message.channel.send(`\`${client.users.cache.get(message.author.id).username}'s bank has been successfully created!\``);
              const embed = new MessageEmbed()
                .setColor(colours.economy)
                .setTitle(
                  `\`${message.author.username} just got juiced up with some coins and xp!\``
                )
                .setDescription(`\`Got ${coins} coins and ${xp} xp.\``)
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(embed);
            } else {
              const embed = new MessageEmbed()
                .setColor(colours.economy)
                .setTitle(
                  `\`${message.author.username} just got juiced up with some coins and xp!\``
                )
                .setDescription(`\`Got ${coins} coins and ${xp} xp.\``)
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(embed);
              money.money = money.money + coins;
              stats.xp = stats.xp + xp;
              stats.save().catch(err => console.log(err));
              money.save().catch(err => console.log(err));
            }
          }
        );
      }
    );
  }
};

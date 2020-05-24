const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const MONGODB_URI =
  "mongodb+srv://aa2k:Adam2006@botofdreams-dv0if.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/CoinDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  name: "daily",
  aliases: ["d"],
  cooldown: 86400,
  category: "stats",
  description: "Gives a daily amount of coins.",
  run: async (message, args, client, cmd) => {
    let coins = 1000 + Math.ceil(Math.random() * 50) + 150;
    Money.findOne(
      {
        userID: message.author.id,
        serverID: message.guild.id
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            username: message.author.tag,
            serverID: message.guild.id,
            money: coins
          });

          newMoney.save().catch(err => console.log(err));
          let firstCoinEmbed = new MessageEmbed()
            .setAuthor(`🤑${message.author.username}🤑`)
            .setColor(colours.economy)
            .setDescription(
              `**${coins}** coins are yours! And they're your first! You can get more of these by using commands.`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(firstCoinEmbed);
        } else {
          const embed = new MessageEmbed()
            .setColor(colours.economy)
            .setTitle(
              `\`${message.author.username} just got juiced up with some coins!\``
            )
            .setDescription(`\`Got ${coins} coins, gamer.\``)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(embed)
          money.money = money.money + coins;
          money.save().catch(err => console.log(err));
        }
      }
    );
  }
};

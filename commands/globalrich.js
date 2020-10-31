const { MessageEmbed, Collection } = require("discord.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
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
  name: "globalrich",
  aliases: ["glb", "globallb"],
  cooldown: 15,
  category: "stats",
  description: "Shows richest in the bot's database",
  run: async (message, args, client) => {
    Money.find({})
      .sort([["money", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new MessageEmbed()
          .setTitle(`Richest users for ${client.user.username}`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL());
        if (res.length === 0) {
          embed.setColor(0xe84d4d);
          embed.setDescription(
            "`ERROR: No data found.`"
          );
        } else if (res.length <= 5) {
          embed.setColor(colours.economy);
          for (let i = 0; i <= res.length; i++) {
            if (res[i] != undefined) {
              embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Coins: **${res[i].money}**`);
            }
          }
        } else {
          embed.setColor(colours.economy);
          for (let i = 0; i <= 7; i++) {
            if (res[i] != undefined) {
              embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Coins: **${res[i].money}**`);
            }
          }
        }

        message.channel.send(embed);
      });
  }
};
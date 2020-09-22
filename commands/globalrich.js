const { MessageEmbed, Collection } = require("discord.js");
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
          .setTitle(`**Global Coin Leaders for ${client.user.username}**`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL());
        if (res.length === 0) {
          embed.setColor(0xe84d4d);
          embed.setDescription(
            "`ERROR: No data found.`"
          );
        } else if (res.length < 5) {
          embed.setColor(colours.economy);
          for (let i = 0; i < res.length; i++) {
            let member =
              Money.findOne({userID: res[i].userID, username: res[i].username}) || "User left";
            let memberList = [];
            for(i=0; i < res.length; i++){
              if(memberList.indexOf(res[i]) === -1 && member != "User left") {
                memberList.push(res[i]);
              }
            }
            if (member == "User left") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Dreamcoins:** ${res[i].money}`
              );
            } else {
              if (i + 1 == 1) {
                embed.addField(
                  `🥇: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else if (i + 1 == 2) {
                embed.addField(
                  `🥈: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else if (i + 1 == 3) {
                embed.addField(
                  `🥉: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else {
                embed.addField(
                  `🏅: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              }
            }
          }
        } else {
          embed.setColor(colours.economy);
          for (let i = 0; i < 5; i++) {
            let member =
              Money.findOne({userID: res[i].userID, username: res[i].username}) || "User left";
            let memberList = [];
            for(i=0; i < res.length; i++){
              if(memberList.indexOf(res[i]) === -1 && member != "User left") {
                memberList.push(res[i]);
              }
            }
            if (member == "User left") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Dreamcoins:** ${res[i].money}`
              );
            } else {
              if (i + 1 == 1) {
                embed.addField(
                  `🥇: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else if (i + 1 == 2) {
                embed.addField(
                  `🥈: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else if (i + 1 == 3) {
                embed.addField(
                  `🥉: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              } else {
                embed.addField(
                  `🏅: **${res[i].username}**`,
                  `**Dreamcoins: ${res[i].money}**`
                );
              }
            }
          }
        }

        message.channel.send(embed);
      });
  }
};

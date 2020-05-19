const { MessageEmbed, Collection } = require("discord.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
const Player = require("../models/player.js");
const MONGODB_URI =
  "mongodb+srv://aa2k:Adam2006@botofdreams-dv0if.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/CoinDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  name: "xpleaderboard",
  aliases: ["xplb", "xprich"],
  cooldown: 50,
  category: "stats",
  description: "Shows richest in a server in terms of coins.",
  run: async (message, args, client) => {
    Player.find({
      serverID: message.guild.id
    })
      .sort({ level: -1 })
      .sort({ xp: -1 })
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new MessageEmbed()
          .setTitle(`**Level Leaders for ${message.guild.name}:**`)
          .setThumbnail(message.guild.iconURL())
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL());
        if (res.length === 0) {
          embed.setColor(0xe84d4d);
          embed.setDescription(
            "ERROR: No xp registerd. Type something to get xp."
          );
        } else if (res.length < 5) {
          embed.setColor(colours.stats);
          for (let i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User left";
            if (member == "User left") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Level:** ${res[i].level}`
              );
            } else {
              if (i + 1 == 1) {
                embed.addField(
                  `🥇: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else if (i + 1 == 2) {
                embed.addField(
                  `🥈: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else if (i + 1 == 3) {
                embed.addField(
                  `🥉: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else {
                embed.addField(
                  `🏅: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              }
            }
          }
        } else {
          embed.setColor(colours.stats);
          for (let i = 0; i < 5; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User left";
            if (member == "User left") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
              );
            } else {
              if (i + 1 == 1) {
                embed.addField(
                  `🥇: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else if (i + 1 == 2) {
                embed.addField(
                  `🥈: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else if (i + 1 == 3) {
                embed.addField(
                  `🥉: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              } else {
                embed.addField(
                  `🏅: **${member.user.username}**`,
                  `**Level:** ${res[i].level}\n**XP: ** ${res[i].xp}`
                );
              }
            }
          }
        }

        message.channel.send(embed);
      });
  }
};

const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
let MessageData = require("../models/messages.js");
module.exports = {
  name: "messagelb",
  aliases: ['msglb', 'msgleaderboard'],
  cooldown: 3,
  category: "tracking",
  description: "Leaderboard for number of messages sent",
  run: async (message, args, client, cmd) => {
    MessageData.find({})
        .sort([["messageCount", "descending"]])
        .exec((err, res) => {
          if (err) console.log(err);

          let embed = new MessageEmbed()
            .setTitle(`The Top Chatters of All Time`)
            .setFooter(client.user.username, client.user.displayAvatarURL());
          if (res.length === 0) {
            embed.setColor(0xe84d4d);
            embed.setDescription("`ERROR: No data to work off of...`");
          } else if (res.length < 5) {
            embed.setColor(0x3970b8);
            for (let i = 0; i < res.length; i++) {
              let member =
                MessageData.findOne({ userID: res[i].userID }) || "???";
              if (member == "???") {
                embed.addField(
                  `${i + 1}. ${member}`,
                  `**Count:** ${res[i].messageCount}`
                );
              } else {
                if (i + 1 == 1) {
                  embed.addField(
                    `🥇: **${res[i].username}**`,
                    `**Count: ${res[i].messageCount}**`
                  );
                } else if (i + 1 == 2) {
                  embed.addField(
                    `🥈: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                } else if (i + 1 == 3) {
                  embed.addField(
                    `🥉: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                } else {
                  embed.addField(
                    `🏅: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                }
              }
            }
          } else {
            embed.setColor(0x3970b8);
            for (let i = 0; i < 5; i++) {
              let member =
                MessageData.findOne({ userID: res[i].userID }) || "User left";
              if (member == "User left") {
                embed.addField(
                  `${i + 1}. ${member}`,
                  `**Count:** ${res[i].messageCount}`
                );
              } else {
                if (i + 1 == 1) {
                  embed.addField(
                    `🥇: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                } else if (i + 1 == 2) {
                  embed.addField(
                    `🥈: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                } else if (i + 1 == 3) {
                  embed.addField(
                    `🥉: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                } else {
                  embed.addField(
                    `🏅: **${res[i].username}**`,
                    `  **Count: ${res[i].messageCount}**`
                  );
                }
              }
            }
          }
          message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        });
  }
}
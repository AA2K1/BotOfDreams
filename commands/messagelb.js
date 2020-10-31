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
        embed.setColor(colours.tracking);
        for (let i = 0; i <= res.length; i++) {
          if (res[i] != undefined) {
            embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Messages: **${res[i].messageCount}**`);
          }
        }
      } else {
        embed.setColor(colours.tracking);
        for (let i = 0; i <= 7; i++) {
          if (res[i] != undefined) {
            embed.addField((i + 1) + ". " + client.users.cache.get(res[i].userID).username, `Messages: **${res[i].messageCount}**`);
          }
        }
      }
      message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
    });
  }
}
const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
let WordData = require("../models/words");
module.exports = {
  name: "wordstats",
  aliases: ['wordcount'],
  cooldown: 3,
  category: "tracking",
  description: "Tracks and displays a certain word that you sent",
  run: async (message, args, client, cmd) => {
    let words = message.content.toLowerCase().split(" ");
    if (words[1] == null) {
      return message.channel.send("`ERROR: You must specify a word.`")
    }
    try {
      WordData.findOne(
        {
          userID: message.author.id
        },
        (err, messages) => {
          if (err) console.error(err);
          if (!messages) {
            message.channel.send("`ERROR: You haven't sent a message yet.`").then(msg => msg.delete({ timeout: 15000 }));
          } else {
            if (messages.wordCount.get(words[1]) == null) {
              return message.channel.send("`ERROR: You haven't said that word yet.`")
            } else {
              let embed = new MessageEmbed()
                .setColor("0x3970b8")
                .setTitle(`How many times have you said ${words[1]}?`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(
                  `You have sent the word **${words[1]}** a total of: \n **${messages.wordCount.get(words[1])}** time(s)!`
                )
                .setFooter(client.user.username, client.user.displayAvatarURL());
              return message.channel
                .send(embed)
                .then(msg => msg.delete({ timeout: 15000 }));
            }
          }
        }
      );
    } catch {
      message.channel.send("`ERROR: Cannot find words that have symbols in front.`");
    }
  }
}
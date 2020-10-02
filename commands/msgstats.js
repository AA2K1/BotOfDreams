const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
let MessageData = require("../models/messages.js");
module.exports = {
  name: "msgstats",
  aliases: ['messagestats'],
  cooldown: 3,
  category: "tracking",
  description: "Shows how many messages you've sent.",
  run: async (message, args, client, cmd) => {
    //Display the number of messages sent
    MessageData.findOne(
      {
        userID: message.author.id,
        username: message.author.username
      },
      (err, messages) => {
        if (err) console.error(err);
        if (!messages) {
          const newTracker = new MessageData({
            userID: message.author.id,
            username: message.author.username,
            messageCount: 1
          });
          newTracker.save().catch(err => console.error(err));
          message.channel.send("`ERROR: You haven't sent a message yet.`").then(msg => msg.delete({ timeout: 15000 }));
        } else {
          messages.messageCount = messages.messageCount + 1;
          messages.save().catch(err => console.error(err));
          let embed = new MessageEmbed()
            .setColor("0x3970b8")
            .setTitle(`${message.author.username}'s Stats`)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "You have sent a total of: ",
              `**${messages.messageCount}** messages!`
            )
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel
            .send(embed)
            .then(msg => msg.delete({ timeout: 15000 }));
        }
      }
    );
  }
}
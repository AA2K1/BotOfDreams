const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
module.exports = {
    name: "twitch",
    aliases: ['stream'],
    cooldown: 3,
    category: "info",
    description: "Shows my Twitch!",
    run: async (message, args, client, cmd) => {
        const embed = new MessageEmbed()
          .setColor(colours.info)
          .setAuthor('My Twitch Channel!')
          .setTitle(`twitch.tv/monkecoder`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setURL('https://www.twitch.tv/monkecoder')
        message.channel.send(embed)
    }
}
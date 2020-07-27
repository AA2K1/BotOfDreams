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
          .setTitle(`twitch.tv/godot100`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setURL('https://www.twitch.tv/godot100')
        message.channel.send(embed)
    }
}
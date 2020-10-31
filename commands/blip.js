const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
module.exports = {
    name: "blip",
    aliases: ['ping'],
    cooldown: 3,
    category: "info",
    description: "Returns latency and API ping",
    run: async (message, args, client, cmd) => {
        const embed = new MessageEmbed()
          .setColor(colours.info)
          .setDescription(`\`API Latency 🐌: ${Math.round(client.ws.ping)}\``)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
          if(message.content.includes('ping')) {
            embed.setTitle('Pong!')
          } else if(message.content.includes('blip')) {
            embed.setTitle('Blop!')
          }
        message.channel.send(embed)
    }
}
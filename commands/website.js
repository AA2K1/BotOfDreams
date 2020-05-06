const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "website",
    aliases: ["aa2k", "aboutcreator"],
    category: "info",
    description: "Returns link to my website",
    execute(message, args, client) {
        const embed1 = new MessageEmbed()
            .setTitle('Website: ')
            .setDescription('https://aa2k.netlify.app/')
            .setColor(colours.info)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed1)
    }
}
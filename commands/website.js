const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "website",
    cooldown: 3,
    aliases: ["godot", "aboutcreator"],
    category: "info",
    description: "Returns link to my website",
    run: async (message, args, client) => {
        const embed1 = new MessageEmbed()
            .setTitle('`Website:`')
            .setDescription('https://monkecoder.wordpress.com/')
            .setColor(colours.info)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed1)
    }
}
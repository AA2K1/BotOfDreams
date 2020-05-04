const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "website",
    aliases: ["aa2k", ""],
    category: "info",
    description: "Returns link to my website",
    execute(message, args, client) {
        const embed1 = new MessageEmbed()
            .setTitle('Website: ')
            .setDescription('https://aa2k.netlify.app/')
            .setColor(0x96fac5)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(embed1)
    }
}
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "website",
    aliases: ["aa2k", "aboutcreator"],
    category: "info",
    description: "Returns link to my website",
    execute(message, args, client) {
        const embed1 = new MessageEmbed()
            .setTitle('Website: ')
            .setDescription('https://aa2k.netlify.app/')
            .setColor(0xd65a94)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(embed1)
    }
}
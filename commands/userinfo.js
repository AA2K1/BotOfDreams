const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "userinfo",
    aliases: ["aboutme"],
    category: "info",
    description: "Returns info about the user that sends the command",
    execute(message, args, client) {
        let user = message.mentions.users.first() || message.author;

        let userinfo = {};
        userinfo.avatar = user.displayAvatarURL();
        userinfo.name = user.username;
        userinfo.id = user.id;
        userinfo.status = user.presence.status;
        userinfo.registered = user.createdAt;

        const embed = new MessageEmbed()
            .setAuthor(user.tag, userinfo.avatar)
            .setThumbnail(userinfo.avatar)
            .setTimestamp()
            .setColor(colours.info)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .addField(`Username`, userinfo.name, true)
            .addField(`ID`, userinfo.id, true)
            .addField(`Status`, userinfo.status, true)
            .addField(`RegisterdAt`, userinfo.registered)
        message.channel.send(embed)
    }
}






            
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    category: "info",
    description: "Returns list of commands and prefix",
    execute(message, args, client, prefix) {
        const embed = new MessageEmbed() 
            .setColor(0x96fac5)
            .setAuthor(client.user.username, client.user.displayavatarURL)
            .setTitle("Command List")
            .setDescription("A list of commands for FunnyBot(working title). Prefix is: " + prefix)
            .setTimestamp()
            .setThumbnail(client.user.displayavatarURL)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .addField("Category: Info", "-------------------------------")
            .addField("Help", "Shows this menu.")
            .addField("Blip", "Returns blop and the latency of the API.")
            .addField("Say", "Echoes what you are saying, can put echo in an embed with say embed.")
            .addField("Website", "Displays my website.")
            .addField("Userinfo", "Returns information about the user.")
            .addField("Category: Fun", "-------------------------------")
            .addField("Meme", "Shows a fresh random meme for your viewing.")
            .addField("Reddit", "Shows a post from any image subreddit in randompuppy. Arguments must be in all lowercase.")
        message.channel.send(embed);
    }
}
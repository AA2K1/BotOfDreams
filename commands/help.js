const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "help",
        category: "info",
        description: "Returns list of commands and prefix",
    },

    run: async (message, args, client, prefix) => {
        if (args[0] == "help") return message.reply(`Just send ${prefix}help instead, dumb-dumb.`)

        let embed1 = new MessageEmbed()
            .setColor(0x96fac5)
            .setAuthor(`${client.user.username} Help`, client.user.displayavatarURL)
            .setThumbnail(client.user.displayavatarURL)
            .setTitle(`***Command List:***`)
            .setDescription(`For more information about a specific command, use ${prefix}help command. Prefix is ${prefix}.`)
            .setTimestamp()
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
            .addField("RPS", "Plays a nice, friendly game of rock paper scissors. Use arguments to pick your choice.")
        message.channel.send(embed1).then(m => m.delete(20000))
    }
}



const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    aliases: ["botinfo"],
    category: "info",
    description: "Returns list of commands and prefix",
    run: async (message, args, client, prefix) => {
        if (args[0] == "help") return message.reply(`Just send ${prefix}help instead, dumb-dumb. Or specify a command that's not help dumb-dumb.`);

        if(args[0]) {
            if(!client.commands.get(args[0])) return message.reply("There is no command with that name dumb-dumb.")
            let embed = new MessageEmbed()
                .setColor(0xd65a94)
                .setAuthor(`${client.user.username} Help`, client.user.displayavatarURL)
                .setThumbnail(client.user.displayavatarURL)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setDescription(`***Command: *** ${client.commands.get(args[0]).name}\n ***Category: *** ${client.commands.get(args[0]).category}\n ***Description: *** ${client.commands.get(args[0]).description}\n ***Aliases: *** [${client.commands.get(args[0]).aliases}]`)
            message.channel.send(embed)
        } else {
        let embed1 = new MessageEmbed()
            .setColor(0x96fac5)
            .setAuthor(`${client.user.username} Help`, client.user.displayavatarURL)
            .setThumbnail(client.user.displayavatarURL)
            .setTitle(`***Command List:***`)
            .setDescription(`For more information about a specific command, use ${prefix}help command. Prefix is ${prefix}.`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .addField("**Category: Info**", "-------------------------------")
            .addField("Help", "Shows this menu.")
            .addField("Blip", "Returns blop and the latency of the API.")
            .addField("Say", "Echoes what you are saying, can put echo in an embed with say embed.")
            .addField("Website", "Displays my website.")
            .addField("Userinfo", "Returns information about the user.")
            .addField("**Category: Fun**", "-------------------------------")
            .addField("Meme", "Shows a fresh random meme for your viewing.")
            .addField("Reddit", "Shows a post from any image subreddit in randompuppy. Arguments must be in all lowercase.")
            .addField("RPS", "Plays a nice, friendly game of rock paper scissors. Use arguments to pick your choice.")
            .addField("**Category: Economy**", "-------------------------------")
            .addField("Coins", "Shows how many coins someone has.")
        message.channel.send(embed1)
        }
    }
}



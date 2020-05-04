const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "help",
        aliases: ["botinfo"],
        usage: `~help`,
        category: "info",
        description: "Returns list of commands and prefix",
    },

    run: async (message, args, client, prefix) => {
        if (args[0] == "help") return message.reply(`Just send ${prefix}help instead, dumb-dumb.`)

        if (args[0]) {
            let command = args[0];
            if (client.command.has(command)) {
                command = client.commands.get(command);
                let embed = new MessageEmbed()
                    .setColor(0x96fac5)
                    .setAuthor('TheBotOfDreams Command List', message.guild.iconURL)
                    .setDescription(`The bot prefix is: ${prefix}\n\n\`***Command:*** ${command.config.name}\n***Description: ${command.config.description || "N/A"}\n***Usage*** ${command.config.usage || "N/A"}\n***Category*** ${command.config.category || "N/A"}\n***Aliases*** ${command.config.noalias || command.config.aliases}`)
                message.channel.send(embed).then(m => m.delete(20000))
            }
        }
        if (!args[0]) {
            message.delete();
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
}


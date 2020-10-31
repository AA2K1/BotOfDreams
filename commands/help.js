const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "help",
    aliases: ["botinfo"],
    cooldown: 1,
    category: "info",
    description: "Returns list of commands and prefix",
    run: async (message, args, client, prefix) => {
        if (args[0] == "help") return message.reply(`Either send ${prefix}help or specify a different command.`);

        if(args[0]) {
            if(!client.commands.get(args[0])) {
              if(!client.categories.get(args[0])) {
                return message.channel.send("`ERROR: There isn't a command with that name.`")
              } else {
                let categoryembed = new MessageEmbed()
                  .setColor(colours.info)
                  .setTitle(`${client.user.username} Help`)
                  .setThumbnail(client.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setDescription(`\`${args[0]}:\``)
                client.commands
                  .filter(c => c.category == args[0])
                  .map(m => categoryembed.addField(`\`${m.name}\`\n`, `\`Description: ${m.description}\`\n\n\`Aliases: ${m.aliases}\``, true))
                  .join(" ")
                message.channel.send(categoryembed).then(m => m.delete({timeout: 15000}))
              }
            } else {
              let embed = new MessageEmbed()
                .setColor(colours.info)
                .setTitle(`${client.user.username} help`)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`Command:  \`${client.commands.get(args[0]).name}\`\n\n Category:  \`${client.commands.get(args[0]).category}\`\n\n Description: \`${client.commands.get(args[0]).description}\`\n\n Aliases:  \`${client.commands.get(args[0]).aliases}\``)
            message.channel.send(embed)
            }
        } else {
        let embed1 = new MessageEmbed()
            .setColor(colours.info)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`Command List: `)
            .setDescription(`\`You can either find a category's commands with ${prefix}help [category], or find a command with ${prefix}help [command].\``)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .addField(`\`Category: Info 📰\``, `\`Miscellaneous stuff about your Discord user.\``)
            .addField(`\`Category: Fun 🎲\``, `\`Fun stuff. Because bots are fun.\``)
            .addField(`\`Category: Stats 📈\``, `\`Info about your character and balance, and ways to upgrade them.\``)
        message.channel.send(embed1)
        }
    }
}



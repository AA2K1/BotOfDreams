const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "help",
    aliases: ["botinfo"],
    cooldown: 1,
    category: "info",
    description: "Returns list of commands and prefix",
    run: async (message, args, client, prefix) => {
        if (args[0] == "help") return message.reply(`Just send ${prefix}help instead, dumb-dumb. Or specify a command that's not help dumb-dumb.`);

        if(args[0]) {
            if(!client.commands.get(args[0])) {
              if(!client.categories.get(args[0])) {
                return message.reply("There is no command, or a category with that name dumb-dumb.")
              } else {
                let categoryembed = new MessageEmbed()
                  .setColor(colours.info)
                  .setTitle(`${client.user.username} help`)
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
                .setDescription(`**Command: ** \`${client.commands.get(args[0]).name}\`\n\n **Category: ** \`${client.commands.get(args[0]).category}\`\n\n **Description: ** \`${client.commands.get(args[0]).description}\`\n\n **Aliases: ** \`${client.commands.get(args[0]).aliases}\``)
            message.channel.send(embed)
            }
        } else {
        let embed1 = new MessageEmbed()
            .setColor(colours.info)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`${client.user.username} help\n**Command List:**`)
            .setDescription(`\`You can either find a category's commands with ${prefix}help category, or find a command with ${prefix}help command.\``)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .addField(`\`Info 📰:\``, `\`Miscellaneous stuff about your Discord user.\``)
            .addField(`\`Fun 🎲:\``, `\`Fun stuff. Because bots are fun.\``)
            .addField(`\`Stats 📈:\``, `\`Info about your character and balance, and ways to upgrade them.\``)
        message.channel.send(embed1)
        }
    }
}



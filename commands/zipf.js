const { MessageEmbed, MessageCollector } = require('discord.js');
const fs = require("fs");
let Chart = require('chart.js');
let colours = require("../colours.json");
module.exports = {
    name: "zipf",
    aliases: ['ziph'],
    cooldown: 20,
    category: "fun",
    description: "Shows an example of the Zipf mystery in literature.",
    run: async (message, args, client, cmd) => {
        let options = ['1984', 'romeo and juliet']
        message.channel.send("`Zipf's law is the assertion that the frequencies of of certain events are inversely proportional to their rank r.`")
        message.channel.send(`\`So, to see this in action, I need you to specify what book out of a range you would like to zipfify. Your options are: ${options}. You can cancel by typing cancel.\``)
        const filter = m =>
        (!m.author.bot && m.content.includes("cancel")) || options.includes(m.content.toLowerCase());
        const collector = new MessageCollector(message.channel, filter, {
          max: 1
        });

        collector.on("collect", m => {
          console.log(`Collected: ${m.content}`)
          if(m.content.toLowerCase() === '1984') {
            let data = [9378, 3716, 2880, 2336, 2552, 1853, 629, 394, 1456, 1852, 659, 964, 2307, 793, 614, 727, 379, 627, 658, 634]
            message.channel.send('`The following data pairs your choice with the 20 most used words in literature.`')
            const embed = new MessageEmbed()
              .setColor(colours.fun)
              .setTitle(`1984, eh? Pretty ziphy, isn't it?`)
              .setDescription("`Data: `")
              .setImage('https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2F455077ed-79aa-4e9e-b90d-2a342722a0e1.image.png?v=1590428856234')
              .setTimestamp()
              .setFooter(
                client.user.username,
                client.user.displayAvatarURL()
              );
              data.map(m => embed.addField(`\`#${data.findIndex(element => element === m) + 1}\``, `\`${m}\``, true))
            message.channel.send(embed).then(m => m.delete({timeout: 150000}));
          } else if(m.content.toLowerCase() === 'romeo and juliet') {
            let data = [679, 214, 541, 401, 712, 468, 319, 347, 126, 578, 227, 224, 258, 77, 255, 118, 155, 290, 89, 70]
            message.channel.send('`The following data pairs your choice with the 20 most used words in literature.`')
            const embed1 = new MessageEmbed()
              .setColor(colours.fun)
              .setTitle(`Romeo and Juliet, eh? Pretty ziphy, isn't it?`)
              .setDescription("`Data: `")
              .setImage('https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2Fb0dac5b3-8b37-45ef-945d-2543b0e9e96f.image.png?v=1590428861129')
              .setTimestamp()
              .setFooter(
                client.user.username,
                client.user.displayAvatarURL()
              );
              data.map(m => embed1.addField(`\`#${data.findIndex(element => element === m) + 1}\``, `\`${m}\``, true))
            message.channel.send(embed1).then(m => m.delete({timeout: 150000}));
          }
        })
    }
}
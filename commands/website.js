// const { MessageEmbed } = require('discord.js');
// module.exports = {
//     config: {
//         name: "website",
//         aliases: ["aa2k", "site"],
//         usage: `~website`,
//         category: "info",
//         description: "Returns link to my website",
//     },
//     run: async (message, args, client, prefix) => {
//         const embed1 = new MessageEmbed()
//             .setTitle('Website: ')
//             .setDescription('https://aa2k.netlify.app/')
//             .setColor(0x96fac5)
//             .setTimestamp()
//             .setFooter(client.user.username, client.user.displayAvatarURL)
//         message.channel.send(embed1)
//     }
// }
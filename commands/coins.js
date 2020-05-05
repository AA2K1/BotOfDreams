let coins = require("../coins.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "coins",
    aliases: ["coin"],
    category: "economy",
    description: "Shows how many coins someone has.",
    run: async (message, args, client, prefix) => {
        if(!coins[message.author.id]) {
            coins[message.author.id] = {
                coins: 0
            };
        }
        let uCoins = coins[message.author.id].coins
        let coinEmbed = new MessageEmbed()
            .setAuthor(message.author.username)
            .setColor(0xc9b30c)
            .setDescription('💰💰💰💰💰💰💰💰💰💰')
            .addField(`Balance: `, `**${uCoins}** DreamCoin(s)`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(coinEmbed)
    }
}

// module.exports.config = {
//     name: "coins",
//     aliases: ["coin"],
//     category: "economy",
//     description: "Shows how many coins someone has."
// }
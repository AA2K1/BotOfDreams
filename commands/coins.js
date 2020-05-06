let coins = require("../coins.json");
const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json")

module.exports = {
    name: "coins",
    aliases: ["coin", "balance", "bal"],
    category: "rpg",
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
            .setColor(colours.economy)
            .setDescription('💰💰💰💰💰💰💰💰💰💰')
            .addField(`Balance: `, `**${uCoins}** DreamCoin(s)`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(coinEmbed)
    }
}

// module.exports.config = {
//     name: "coins",
//     aliases: ["coin"],
//     category: "economy",
//     description: "Shows how many coins someone has."
// }
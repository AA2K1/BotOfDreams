let coins = require("../coins.json");
const { MessageEmbed, Collection } = require("discord.js");
let colours = require("../colours.json")
const mongoose = require('mongoose');
const Money = require('../models/money.js');
mongoose.connect('mongodb://localhost:27017/CoinDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    name: "coins",
    aliases: ["coin", "balance", "bal"],
    cooldown: 3,
    category: "stats",
    description: "Shows how many coins someone has.",
    run: async (message, args, client, prefix) => {
        const target = message.mentions.users.first() || message.author;
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if (err) console.log(err)
            let coinEmbed = new MessageEmbed()
            .setColor(colours.economy)
            .setTitle(`💰Balance for ${target.username}:💰`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            if (!money) {
                coinEmbed.setDescription(" 0 DreamCoins. Get some money, will ya?")
                return message.channel.send(coinEmbed)
            } else {
                coinEmbed.setDescription(`**${money.money} DreamCoin(s)**`)
                return message.channel.send(coinEmbed)
            }
        })
        let uCoins = coins[message.author.id].coins
        // const target = message.mentions.users.first() || message.author;
        // let coinEmbed = new MessageEmbed()
        //     .setAuthor(target.username)
        //     .setColor(colours.economy)
        //     .setDescription('💰💰💰💰💰💰💰💰💰💰')
        //     .addField(`Balance for ${target.username}: `, `**${uCoins}** DreamCoin(s)`)
        //     .setTimestamp()
        //     .setFooter(client.user.username, client.user.displayAvatarURL())
        // message.channel.send(coinEmbed)
    }
}

// module.exports.config = {
//     name: "coins",
//     aliases: ["coin"],
//     category: "economy",
//     description: "Shows how many coins someone has."
// }
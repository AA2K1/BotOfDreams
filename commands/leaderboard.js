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
    name: "leaderboard",
    aliases: ['lb', 'rich'],
    cooldown: 10,
    category: "stats",
    description: "Shows richest in a server in terms of coins.",
    run: async (message, args, client) => {
        Money.find({
            serverID: message.guild.id
        }).sort([
            ['money', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);

            let embed = new MessageEmbed()
                .setTitle(`**Coin Leaders for ${message.guild.name}:**`)
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (res.length === 0) {
                embed.setColor(0xe84d4d)
                embed.setDescription("ERROR: No data found. Use other bot commands to get coins")
            } else if (res.length < 5) {
                embed.setColor(colours.economy)
                for (i = 0; i < res.length; i++) {
                    let member = message.guild.members.cache.get(res[i].userID) || "User left";
                    if (member == "User left") {
                        embed.addField(`${i + 1}. ${member}`, `**Dreamcoins:** ${res[i].money}`)
                    } else {
                        if (i + 1 == 1) {
                            embed.addField(`🥇: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else if (i + 1 == 2) {
                            embed.addField(`🥈: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else if (i + 1 == 3) {
                            embed.addField(`🥉: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else {
                            embed.addField(`🏅: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        }
                    }
                }
            } else {
                embed.setColor(colours.economy)
                for (i = 0; i < 5; i++) {
                    let member = message.guild.members.cache.get(res[i].userID) || "User left";
                    if (member == "User left") {
                        embed.addField(`${i + 1}. ${member}`, `**Dreamcoins:** ${res[i].money}`)
                    } else {
                        if (i + 1 == 1) {
                            embed.addField(`🥇: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else if (i + 1 == 2) {
                            embed.addField(`🥈: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else if (i + 1 == 3) {
                            embed.addField(`🥉: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        } else {
                            embed.addField(`🏅: **${member.user.username}**`, `**Dreamcoins:** ${res[i].money}`)
                        }
                    }
                }

            }

            message.channel.send(embed)
        })
    }
}
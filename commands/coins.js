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
        let phrase = '';
        let uCoins = coins[message.author.id].coins
        if(uCoins <= 20) {
            phrase = '**Wow, you are really poor.**'
        } else if(uCoins <= 21 && uCoins >= 200) {
            phrase = '**Decent, but not really swimming in cash.**'
        } else if(uCoins <= 201 && uCoins >= 500) {
            phrase = "**Looks like you've gotten this far to be so rich.**"
        } else if(uCoins >= 501) {
            phrase = "**OMG! You're practically made of cash!**"
        } 
        let coinEmbed = new MessageEmbed()
            .setAuthor(message.author.username)
            .setColor(0xc9b30c)
            .addField(`**Balance: **`, `${uCoins} DreamCoin(s)`)
            .addField("Appraisal", phrase)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(coinEmbed)
    }
}

module.exports.config = {
    name: "coins",
    aliases: ["coin"],
    category: "economy",
    description: "Shows how many coins someone has."
}
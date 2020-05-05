let xp = require("../xp.json");
const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
module.exports = {
    name: "level",
    aliases: ["lvl", "stats"],
    category: "stats",
    description: "Returns level, and xp until next level.",

    run: async (message, args, client, prefix, nxtLvl) => {
        xp[message.author.id].xpToNextLvL;
        if(!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                stats: {
                    strength: 10,
                    wit: 10,
                    vitality: 20,
                    agility: 10,
                    magic: 10
                }
            };
        }

        let lvlUp = new MessageEmbed() 
            .setColor(colours.stats)
            .setTitle(`**Stats for ${message.author.username}**`)
            .addField(`Level: `, `${xp[message.author.id].level}`)
            .addField(`Current XP: `, `${xp[message.author.id].xp}`)
            .addField(`XP Needed to Next Level: `, `${nxtLvl}`)
            .addField(`Stats: `, `**Strength: ** ${xp[message.author.id].stats.strength}\n**Wit: ** ${xp[message.author.id].stats.wit}\n**Vitality: ** ${xp[message.author.id].stats.vitality}\n**Agility: ** ${xp[message.author.id].stats.agility}\n**Magic: ** ${xp[message.author.id].stats.magic}\n`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(lvlUp)
    }


    // **Level:** ${xp[message.author.id].level}\n**XP until Next LvL:** ${xp[message.author.id].level * Math.floor(Math.random() * 300) + 305}
    //.addField("**Stats: **", `Strength: ${nxtStrength}\nWit: ${nxtWit}\nVitality: ${nxtVital}\nAgility: ${nxtAgility}\nMagic: ${nxtMagic}\n`)
}
let xp = require("../xp.json");
const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
module.exports = {
    name: "level",
    cooldown: 3,
    aliases: ["lvl", "stats"],
    category: "stats",
    description: "Returns level, and xp until next level.",

    run: async (message, args, client, prefix, nxtLvl) => {
        let user = message.mentions.users.first() || message.author;
        if(!xp[user.id]) {
            xp[user.id] = {
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
            .setTitle(`**Stats for ${user.username}**`)
            .addField(`Level: `, `${xp[user.id].level}`)
            .addField(`Current XP: `, `${xp[user.id].xp}`)
            .addField(`XP Needed to Next Level: `, `${nxtLvl}`)
            .addField(`Stats: `, `**Strength: ** ${xp[user.id].stats.strength}\n**Wit: ** ${xp[user.id].stats.wit}\n**Vitality: ** ${xp[user.id].stats.vitality}\n**Agility: ** ${xp[user.id].stats.agility}\n**Magic: ** ${xp[user.id].stats.magic}\n`)
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL())
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(lvlUp)
    }


    // **Level:** ${xp[message.author.id].level}\n**XP until Next LvL:** ${xp[message.author.id].level * Math.floor(Math.random() * 300) + 305}
    //.addField("**Stats: **", `Strength: ${nxtStrength}\nWit: ${nxtWit}\nVitality: ${nxtVital}\nAgility: ${nxtAgility}\nMagic: ${nxtMagic}\n`)
}
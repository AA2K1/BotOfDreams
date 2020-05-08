let { MessageEmbed } = require('discord.js');
const fs = require('fs');
let classes = require('../classes.json');
let colours = require('../colours.json');
let xp = require('../xp.json');
const { promptMessage } = require('../functions.js');
const emojiCharacters = require('../emojichraracters.js');
let strengthincrease;
let witIncrease;
let vitalIncrease;
let agilityIncrease;
let magicIncrease;

module.exports = {
    name: 'class',
    aliases: ['chooseclass'],
    cooldown: 20,
    category: 'rpg',
    description: 'Lets you choose a class, which influences stats.',

    run: async (message, args, client) => {
        if(!classes[message.author.id]) {
            classes[message.author.id] = {
                class: 'peasant',
                statIncreases: {
                    strength: 0,
                    wit: 0,
                    vitality: 0,
                    agility: 0,
                    magic: 0
                }
            }
        }
        let classesPool = ['🧙‍♂️', '⚔️', '💗', '🕵️'];
        let chooseClassEmbed = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle('**Pick a class: React to this message to pick your class.**')
            .setDescription(`🧙‍♂️: Mage\n\n⚔️: Warrior\n\n💗: Cleric\n\n🕵️: Thief\n\n`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        let m = await message.channel.send(chooseClassEmbed);
        const reacted = await promptMessage(m, message.author, 30, classesPool)
        const classchoice = choice(reacted)
        let classEmbed = new MessageEmbed() 
            .setColor(colours.stats)
            .setTitle(`**${message.author.username}'s class is: **`)
            .setDescription(`${classchoice}!`)
            .addField(`**Stat Increases: **`, `Strength increase: ${strengthincrease}\n Wit increase: ${witIncrease }\n Vitality increase: ${vitalIncrease}\n Agility increase: ${agilityIncrease}\n Magic increase: ${magicIncrease}\n`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(classEmbed)

        fs.writeFile("./classes.json", JSON.stringify(classes), (err) => {
            if(err) console.log(err)
        });



        function choice(choice) {
            if(choice === '🧙‍♂️') {
                classes[message.author.id].class = 'mage';
                strengthincrease = 1;
                witIncrease = 5;
                vitalIncrease = 2;
                agilityIncrease = 7;
                magicIncrease = 10;
                xp[message.author.id].stats = {
                    strength: xp[message.author.id].stats.strength + strengthincrease,
                    wit: xp[message.author.id].stats.wit + witIncrease,
                    vitality: xp[message.author.id].stats.vitality + vitalIncrease,
                    agility: xp[message.author.id].stats.agility + agilityIncrease,
                    magic: xp[message.author.id].stats.magic + magicIncrease
                }
                return 'Mage 🧙‍♂️';
            } else if(choice === '⚔️') {
                classes[message.author.id].class = 'warrior';
                strengthincrease = 8;
                witIncrease = 1;
                vitalIncrease = 5;
                agilityIncrease = 3;
                magicIncrease = 0;
                xp[message.author.id].stats = {
                    strength: xp[message.author.id].stats.strength + strengthincrease,
                    wit: xp[message.author.id].stats.wit + witIncrease,
                    vitality: xp[message.author.id].stats.vitality + vitalIncrease,
                    agility: xp[message.author.id].stats.agility + agilityIncrease,
                    magic: xp[message.author.id].stats.magic + magicIncrease
                }
                return 'Warrior ⚔️';
            } else if(choice === '💗') {
                classes[message.author.id].class = 'cleric';
                strengthincrease = 0;
                witIncrease = 6;
                vitalIncrease = 10;
                agilityIncrease = 4;
                magicIncrease = 7;
                xp[message.author.id].stats = {
                    strength: xp[message.author.id].stats.strength + strengthincrease,
                    wit: xp[message.author.id].stats.wit + witIncrease,
                    vitality: xp[message.author.id].stats.vitality + vitalIncrease,
                    agility: xp[message.author.id].stats.agility + agilityIncrease,
                    magic: xp[message.author.id].stats.magic + magicIncrease
                }
                return 'Cleric 💗';
            } else if(choice === '🕵️') {
                classes[message.author.id].class = 'thief';
                strengthincrease = 5;
                witIncrease = 7;
                vitalIncrease = 5;
                agilityIncrease = 10;
                magicIncrease = 3;
                xp[message.author.id].stats = {
                    strength: xp[message.author.id].stats.strength + strengthincrease,
                    wit: xp[message.author.id].stats.wit + witIncrease,
                    vitality: xp[message.author.id].stats.vitality + vitalIncrease,
                    agility: xp[message.author.id].stats.agility + agilityIncrease,
                    magic: xp[message.author.id].stats.magic + magicIncrease
                }
                return 'Thief 🕵️';
            }
        }
    }
}
const { MessageCollector, MessageEmbed } = require("discord.js");

const chooseArr = ['rock', 'paper', 'scissors'];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Plays a nice friendly game of rock paper scissors.",
    run: async (message, args, client) => {
        message.reply("Type rock, paper, or scissors into chat.");
        const pickCollect = new MessageCollector(message.channel, m => m.author.id == message.author.id);
        pickCollect.on('collect', message => {
            let humanPick = message.content;
            let botPick = chooseArr[Math.floor(Math.random() * chooseArr.length)];
            const result = getResult(humanPick, botPick);

            function getResult(humanChosenOption, me) {
                if((me === "rock" && humanChosenOption === "paper") || (me === "paper" && humanChosenOption === "scissors") || (me === "scissors" && humanChosenOption === "rock")) {
                    const embed = new MessageEmbed() 
                        .setTitle(`${message.author.username} vs ${client.user.username}`)
                        .addField(`Result: `, `${humanChosenOption} to ${me}`)
                        .setDescription(`Looks like you win, ${message.author.username}. Not bad.`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL)
                    message.channel.send(embed);
                } else if(me === humanChosenOption) {
                    const embed1 = new MessageEmbed() 
                        .setTitle(`${message.author.username} vs ${client.user.username}`)
                        .addField(`Result: `, `${humanChosenOption} to ${me}`)
                        .setDescription(`Looks like it's a tie.`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL)
                    message.channel.send(embed1);
                } else {
                    const embed2 = new MessageEmbed() 
                        .setTitle(`${message.author.username} vs ${client.user.username}`)
                        .addField(`Result: `, `${humanChosenOption} to ${me}`)
                        .setDescription(`Looks like you lose, ${message.author.username}. You suck.`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL)
                    message.channel.send(embed2);
                }
            }
        })
        
    }
}
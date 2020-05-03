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
            if(humanPick !== 'rock' || humanPick !== 'paper' || humanPick !== 'scissors') return;
            let botPick = chooseArr[Math.floor(Math.random() * chooseArr.length)];
            const result = getResult(humanPick, botPick);

            const embed = new MessageEmbed() 
                .setTitle(`${message.author.username} vs ${client.user.username}`)
                .addField(`Result: `, `${humanPick} to ${botPick}`)
                .setDescription(result)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(embed);
            
            function getResult(humanChosenOption, me) {
                if((me === "rock" && humanChosenOption === "paper") || (me === "paper" && humanChosenOption === "scissors") || (me === "scissors" && humanChosenOption === "rock")) {
                    return `Looks like you win, ${message.author.username}. Not bad.`;
                } else if(me === humanChosenOption) {
                    return `Looks like it's a tie.`;
                } else {
                    return `Looks like you lose, ${message.author.username}. You suck.`;
                }
            }
        })
        
    }
}
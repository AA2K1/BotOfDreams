const { MessageCollector, MessageEmbed } = require("discord.js");

const chooseArr = ['rock', 'paper', 'scissors'];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Plays a nice friendly game of rock paper scissors.",
    run: async (message, args, client) => {
        message.reply("Type rock, paper, or scissors into chat.");
        const pickCollect = new MessageCollector(message.channel, m => m.author.id == message.author.id, {time: 10000});
        pickCollect.on('collect', message => {
            let humanPick = message.content;
            //if(humanPick !== 'rock' || humanPick !== 'paper' || humanPick !== 'scissors') return;
            let botPick = chooseArr[Math.floor(Math.random() * chooseArr.length)];
            const result = getResult(humanPick, botPick);

            function getResult(humanChosenOption, me) {
                if((me === "rock" && humanChosenOption === "paper") || (me === "paper" && humanChosenOption === "scissors") || (me === "scissors" && humanChosenOption === "rock")) {
                    return `Looks like you win, ${message.author.username}. Not bad.`;
                } else if(me === humanChosenOption) {
                    return `Looks like it's a tie.`;
                } else {
                    return `Looks like you lose, ${message.author.username}. You suck.`;
                }
            }

            const embed = new MessageEmbed() 
                .setColor(0x96fac5)
                .setTitle(`${message.author.username} vs ${client.user.username}`)
                .addField(`Result: `, `${humanPick} to ${botPick}`)
                .setDescription(result)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(embed);
        })
        
    }
}
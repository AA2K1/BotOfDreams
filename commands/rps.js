const { MessageCollector, MessageEmbed } = require("discord.js");

const chooseArr = ['rock', 'paper', 'scissors'];

module.exports = {
    config: {
        name: "rps",
        aliases: ["rockpaperscissors"],
        usage: `~rps`,
        category: "fun",
        description: "Plays a nice friendly game of rock paper scissors.",
    },

    execute(message, args, client, prefix) {
        if (args.length < 1) {
            return message.reply("Give your choice after ~rps.");
        }
        if (!chooseArr.includes(args[0])) {
            return message.reply("Your choices are: rock, paper, or scissors.");
        }
        const humanPick = args[0];
        const botPick = chooseArr[Math.floor((Math.random() * chooseArr.length))];

        const embed = new MessageEmbed()
            .setColor(0x96fac5)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTitle(`${message.author.username} vs ${client.user.username}`)
            .addField(`You: ${humanPick} to Me: ${botPick}`, `-------------------------------------------------------------------------`)
            .setDescription(getWinner(botPick, humanPick))
        message.channel.send(embed)

        function getWinner(botOption, humanOption) {
            if (botOption === humanOption) {
                return `Looks like it's a tie, ${message.author.username}. Well played.`
            } else if ((botOption === 'rock' && humanOption === 'paper') || (botOption === 'paper' && humanOption === 'scissors') || (botOption === 'scissors' && humanOption === 'rock')) {
                return `Looks like you won, ${message.author.username}. That was just luck.`
            } else if ((botOption === 'rock' && humanOption === 'scissors') || (botOption === 'paper' && humanOption === 'rock') || (botOption === 'scissors' && humanOption === 'paper')) {
                return `Looks like I win, ${message.author.username}. Easy win, you suck.`
            }
        }
    }
}
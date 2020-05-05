const { MessageEmbed } = require("discord.js");
const { promptMessage } = require('../functions.js');

const chooseArr = ['🔥', '💦', '🌱'];

module.exports = {
    name: "rps",
    aliases: ["rockpaperscissors"],
    category: "fun",
    description: "Plays a nice friendly game of rock paper scissors.",
    run: async (message, args, client) => {
        // if(args.length < 1) {
        //     return message.reply("Give your choice after ~rps.");
        // }
        // if(!chooseArr.includes(args[0])) {
        //     return message.reply("Your choices are: rock, paper, or scissors.");
        // }
        // const humanPick = args[0];
        // const botPick = chooseArr[Math.floor((Math.random() * chooseArr.length))];

        const embed = new MessageEmbed()
            .setColor(0x96fac5)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTitle(`${message.author.username} vs ${client.user.username}`)
            .setDescription(`React to this message in order to pick your choice.`)
        const m = await message.channel.send(embed)
        const reacted = await promptMessage(m, message.author, 30, chooseArr)

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)]


        const result = await getWinner(reacted, botChoice);
        //await m.clearReactions();

        embed
            .setTitle(`**${reacted} vs ${botChoice}**`)
            .setDescription(result);

        m.edit(embed);


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

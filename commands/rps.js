const { MessageEmbed, Collection } = require("discord.js");
let colours = require("../colours.json")
const mongoose = require('mongoose');
const Money = require('../models/money.js');
const MONGODB_URI = 'mongodb+srv://aa2k:Adam2006@botofdreams-dv0if.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/CoinDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const { promptMessage } = require('../functions.js');

const chooseArr = ['🔥', '💦', '🌱'];

module.exports = {
    name: "rps",
    cooldown: 25,
    aliases: ["rockpaperscissors"],
    category: "fun",
    description: "Plays a nice friendly game of rock paper scissors. Can get a small amount of money out of it.",
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
            .setColor(colours.fun)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle(`${message.author.username} vs ${client.user.username}`)
            .setDescription(`React to this message in order to pick your choice.`)
        const m = await message.channel.send(embed)
        const reacted = await promptMessage(m, message.author, 30, chooseArr)

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)]
        let won = false;
        let moneyGained = Math.floor(Math.random() * 5) + 20;

        embed
            .setTitle(`**You: ${reacted} vs Me: ${botChoice}**`)
            .setDescription(getWinner(botChoice, reacted))
        m.edit(embed);


        function getWinner(botOption, humanOption) {
            if (botOption === humanOption) {
                return `Looks like it's a tie, ${message.author.username}. Well played.`
            } else if ((botOption === '🔥' && humanOption === '💦') || (botOption === '💦' && humanOption === '🌱') || (botOption === '🌱' && humanOption === '🔥')) {
                Money.findOne({
                    userID: message.author.id,
                    serverID: message.guild.id
                }, (err, money) => {
                    if (err) console.log(err)
                    if (!money) {
                        const newMoney = new Money({
                            userID: message.author.id,
                            serverID: message.guild.id,
                            money: moneyGained
                        })
    
                        newMoney.save().catch(err => console.log(err));
                        message.reply('your money has been saved in a database.')
                    } else {
                        money.money = money.money + moneyGained;
                        money.save().catch(err => console.log(err));
                    }
                })
                return `Looks like you won, ${message.author.username}. That was just luck. Got **${moneyGained}** coins.`
            } else if ((botOption === '🔥' && humanOption === '🌱') || (botOption === '💦' && humanOption === '🔥') || (botOption === '🌱' && humanOption === '💦')) {
                return `Looks like I win, ${message.author.username}. Easy win, you suck.`
            }
        }
    }
}

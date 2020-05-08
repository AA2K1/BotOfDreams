const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const mongoose = require('mongoose');
const Money = require('./models/money');
mongoose.connect('mongodb://localhost:27017/CoinDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const fs = require('fs');
let xp = require('./xp.json');
let classes = require('./classes.json');
let coins = require('./coins.json');
let colours = require('./colours.json');
let cdSeconds = 10;
const toNxtLvl = Math.floor(Math.random() * 300) + 50;
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
let cooldowns = new Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    client.commands.set(command.aliases, client.aliases);
}

config({
    path: __dirname + "/.env"
})

client.once("ready", async () => {
    console.log(`Let us start the game, ${client.user.username}`);
});

client.on("message", async message => {
    console.log(`${message.author.username} said ${message.content} at ${message.createdAt}`);
})

client.on("message", async message => {
    const prefix = '//';
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (message.mentions.members.username == client.user.username) {
        client.commands.get('help').run(message, args, client, prefix);
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    //------------------------------------------------------------------------------
    // if (!xp[message.author.id]) {
    //     xp[message.author.id] = {
    //         xp: 0,
    //         level: 1,
    //         stats: {
    //             strength: 10,
    //             wit: 10,
    //             vitality: 20,
    //             agility: 10,
    //             magic: 10
    //         }
    //     };
    // }

    // let xpAdd = Math.floor(Math.random() * 5) + 15;
    // let curLvl = xp[message.author.id].level;
    // const nxtLvl = curLvl * toNxtLvl;
    // if (cmd.length !== 0) {
    //     xp[message.author.id].xp += xpAdd
    // }
    // let curStats = xp[message.author.id].stats;
    // console.log(nxtLvl);

    // if (nxtLvl <= xp[message.author.id].xp) {
    //     xp[message.author.id].level = curLvl + 1;
    //     xp[message.author.id].xp = 0;
    //     let nxtStrength = curStats.strength += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
    //     let nxtWit = curStats.wit += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
    //     let nxtVital = curStats.vitality += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
    //     let nxtAgility = curStats.agility += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
    //     let nxtMagic = curStats.magic += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
    //     let lvlUp = new MessageEmbed()
    //         .setColor(colours.stats)
    //         .setTitle(`🎺🎺 ${message.author.username} leveled up! 🎺🎺`)
    //         .setDescription(`**Level:** ${xp[message.author.id].level}\n**XP until Next LvL:** ${xp[message.author.id].level * Math.floor(Math.random() * 300) + 305}`)
    //         .addField("**Stats: **", `Strength: ${nxtStrength}\nWit: ${nxtWit}\nVitality: ${nxtVital}\nAgility: ${nxtAgility}\nMagic: ${nxtMagic}\n`)
    //     message.channel.send(lvlUp)
    // }

    // fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    //     if (err) console.log(err)
    // });
    //------------------------------------------------------------------------------
    if (!classes[message.author.id]) {
        classes[message.author.id] = {
            class: 'peasant'
        }
        fs.writeFile("./classes.json", JSON.stringify(classes), (err) => {
            if (err) console.log(err)
        });
    }
    //------------------------------------------------------------------------------
    if (!cooldowns.has(cmd.name)) {
        cooldowns.set(cmd.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.name);
    const cooldownAmount = (cmd.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            let embed = new MessageEmbed()
            .setColor(colours.info)
            .setTitle(`Cooldown for ${message.author.username}:`)
            .setDescription(`Hold your horses there, you gotta wait ${timeLeft.toFixed(1)} second(s) before you can use ${cmd} again.`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            return message.channel.send(embed);
        }
    }
    if (message.content.startsWith(prefix)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        let coinAmt = Math.floor(Math.random() * 15) + 30;
        let baseAmt = Math.floor(Math.random() * 15) + 30;
        console.log(`${coinAmt}:${baseAmt}`);
        if (coinAmt === baseAmt) {
            Money.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, money) => {
                if (err) console.log(err)
                if (!money) {
                    const newMoney = new Money({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: coinAmt
                    })

                    newMoney.save().catch(err => console.log(err));
                    message.reply('your money has been saved in a database.')
                } else {
                    money.money = money.money + coinAmt;
                    money.save().catch(err => console.log(err));
                }
            })
            let coinEmbed = new MessageEmbed()
                .setAuthor(message.author.username)
                .setColor(colours.economy)
                .addField("🤑 🤑 🤑 🤑 🤑", `${coinAmt} DreamCoin(s) have been transfered to you!`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            message.channel.send(coinEmbed)
        }
        let commandfile = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
        if (commandfile) {
            commandfile.run(message, args, client, prefix);
        } else {
            return;
        }
    } else {
        const mention = message.mentions.users.first();
        if (mention.id == client.user.id) {
            client.commands.get('help').run(message, args, client, prefix);
        }
    }
});

client.login(process.env.TOKEN);
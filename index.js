const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
let xp = require('./xp.json');
let coins = require('./coins.json');
let colours = require('./colours.json')
const toNxtLvl = Math.floor(Math.random() * 300) + 50;
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    client.commands.set(command.aliases, client.aliases);
}

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
    client.on("ready", () => {
        client.user.setPresence({
            game: { 
                name: 'memes',
                type: 'WATCHING'
            },
            status: 'idle'
        })
    });
});

client.on("message", async message => {
    console.log(`${message.author.username} said ${message.content} at ${message.createdAt}`);
})

client.on("message", async message => {
    const prefix = '<'
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    //if(cmd.length === 0) return;

    if(!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 15) + 10;
    let baseAmt = Math.floor(Math.random() * 15) + 10;
    console.log(`${coinAmt}:${baseAmt}`);

    if(coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
        let coinEmbed = new MessageEmbed()
            .setAuthor(message.author.username)
            .setColor(colours.economy)
            .addField("🤑 🤑 🤑 🤑 🤑", `${coinAmt} DreamCoin(s) have been transfered to you!`)
        message.channel.send(coinEmbed)
    }

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

    let xpAdd = Math.floor(Math.random() * 5) + 15;
    let curLvl = xp[message.author.id].level;
    const nxtLvl = xp[message.author.id].level * toNxtLvl;
    xp[message.author.id].xp += xpAdd
    let curStats = xp[message.author.id].stats;

    console.log(toNxtLvl);

    if(nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = curLvl + 1;
        xp[message.author.id].xp = 0;
        let nxtStrength = curStats.strength += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
        let nxtWit = curStats.wit += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
        let nxtVital = curStats.vitality += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
        let nxtAgility = curStats.agility += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
        let nxtMagic = curStats.magic += xp[message.author.id].level * Math.floor(Math.random() * 3) + 7;
        let lvlUp = new MessageEmbed() 
            .setColor(colours.stats)
            .setTitle(`🎺🎺 ${message.author.username} leveled up! 🎺🎺`)
            .setDescription(`**Level:** ${xp[message.author.id].level}\n**XP until Next LvL:** ${xp[message.author.id].level * Math.floor(Math.random() * 300) + 305}`)
            .addField("**Stats: **", `Strength: ${nxtStrength}\nWit: ${nxtWit}\nVitality: ${nxtVital}\nAgility: ${nxtAgility}\nMagic: ${nxtMagic}\n`)
        message.channel.send(lvlUp)
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });

    switch(cmd) {
        case 'blip':
            client.commands.get('blip').execute(message, args, client);
        break;
        case 'ping':
            client.commands.get('blip').execute(message, args, client);
        break;
        case 'say':
            client.commands.get('say').execute(message, args, client);
        break;
        case 'echo':
            client.commands.get('say').execute(message, args, client);
        break;
        case 'repeat':
            client.commands.get('say').execute(message, args, client);
        break;
        case 'userinfo':
            client.commands.get('userinfo').execute(message, args, client);
        break;
        case 'aboutme':
            client.commands.get('userinfo').execute(message, args, client);
        break;
        case 'website':
            client.commands.get('website').execute(message, args, client);    
        break;
        case 'aa2k': 
            client.commands.get('website').execute(message, args, client);    
        break;
        case 'help':
            client.commands.get('help').run(message, args, client, prefix);
        break;
        case 'botinfo':
            client.commands.get('help').run(message, args, client, prefix);
        break;
        case 'meme':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'memes':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'maymay':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'randommeme':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'reddit':
            client.commands.get('reddit').run(message, args, client);
        break;
        case 'imagereddit':
            client.commands.get('reddit').run(message, args, client);
        break;
        case 'rps':
            client.commands.get('rps').run(message, args, client);
        break;
        case 'rockpaperscissors':
            client.commands.get('rps').run(message, args, client);
        break;
        case 'coins':
            client.commands.get('coins').run(message, args, client, prefix);
        break;
        case 'coin':
            client.commands.get('coins').run(message, args, client, prefix);
        break;
        case 'balance':
            client.commands.get('coins').run(message, args, client, prefix);
        break;
        case 'bal':
            client.commands.get('coins').run(message, args, client, prefix);
        break;
        default:
            message.reply("Hey dumb-dumb, that's not a command 🤦");
    }
});



client.login(process.env.TOKEN);
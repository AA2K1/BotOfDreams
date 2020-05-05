const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
let coins = require('./coins.json');
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
    })
});

client.on("message", async message => {
    console.log(`${message.author.username} said ${message.content} at ${message.createdAt}`);
})

client.on("message", async message => {
    const prefix = '~'
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
            .setColor(0xc9b30c)
            .addField("🤑 🤑 🤑 🤑 🤑", `${coinAmt} DreamCoin(s) have been transfered to you!`)
        message.channel.send(coinEmbed)
    }
 
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
    }
});



client.login(process.env.TOKEN);
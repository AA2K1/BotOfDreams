const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const coins = require('./coins.json');
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
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
    if(cmd.length === 0) return;

    if(!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 50) + 1;
    let baseAmt = Math.floor(Math.random() * 50) + 1;
    console.log(`${coinAmt}:${baseAmt}`);

    if(coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
    }
 
    switch(cmd) {
        case 'blip' || 'ping':
            client.commands.get('blip').execute(message, args, client);
        break;
        case 'say' || 'echo' || 'repeat':
            client.commands.get('say').execute(message, args, client);
        break;
        case 'userinfo' || 'aboutme':
            client.commands.get('userinfo').execute(message, args, client);
        break;
        case 'website' || 'aa2k': 
            client.commands.get('website').execute(message, args, client);    
        break;
        case 'help' || 'botinfo':
            client.commands.get('help').run(message, args, client, prefix);
        break;
        case 'meme' || 'randommeme' || 'maymay':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'reddit' || 'imagereddit':
            client.commands.get('reddit').run(message, args, client);
        break;
        case 'rps' || 'rockpaperscissors':
            client.commands.get('rps').execute(message, args, client);

    }
});



client.login(process.env.TOKEN);
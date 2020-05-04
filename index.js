const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    //const aliases = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    //client.aliases.set(command.aliases, aliases);
}

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
    client.user.setActivity("memes on /r/okbuddyretard", {type: "WATCHING"});
});

client.on('message', message => {
    const prefix = '~';
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    switch(cmd) {
        case 'blip':
            client.commands.get('blip').run(message, args, client, prefix);
        break;
        case 'help':
            client.commands.get('help').run(message, args, client, prefix);
        break;
        case 'meme':
            client.commands.get('meme').run(message, args, client, prefix);
        break;
        case 'reddit':
            client.commands.get('reddit').run(message, args, client, prefix);
        break;
        case 'rps':
            client.commands.get('rps').run(message, args, client, prefix);
        break;
        case 'say':
            client.commands.get('say').run(message, args, client, prefix);
        break;
        case 'userinfo':
            client.commands.get('userinfo').run(message, args, client, prefix);
        break;
        case 'website':
            client.commands.get('website').run(message, args, client, prefix);
    }
    
});

config({
    path: __dirname + "/.env"
})

client.login(process.env.TOKEN);
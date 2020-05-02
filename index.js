const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
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

    switch(cmd) {
        case 'blip':
            client.commands.get('blip').execute(message, args, client);
        break;
        case 'say':
            client.commands.get('say').execute(message, args, client);
        break;
        case 'userinfo':
            client.commands.get('userinfo').execute(message, args, client);
        break;
        case 'website': 
            client.commands.get('website').execute(message, args, client);    
        break;
        case 'help':
            client.commands.get('help').execute(message, args, client, prefix);
        break;
        case 'meme':
            client.commands.get('meme').run(message, args, client);
        break;
        case 'reddit':
            client.commands.get('reddit').run(message, args, client);
        break;

    }
});



client.login(process.env.TOKEN);
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
    const aliases = require(`./commands/${file}`)
    client.commands.set(command.name, command);
    client.aliases.set(command.aliases, aliases);
}

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
    client.user.setActivity("memes", {type: "WATCHING"});
});

client.on('message', message => {
    const prefix = '~';
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
    
});

config({
    path: __dirname + "/.env"
})

client.login(process.env.TOKEN);
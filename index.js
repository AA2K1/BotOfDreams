const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const client = new Client({
    disableEveryone: true
});


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    const aliases = require(`./commands/${file}`)
    client.commands.set(command.name, command);
    client.aliases.set(command.aliases, aliases);
}



//["aliases", "commands"].forEach(x => client[x] = new Collection());
//["console", "command", "event"].forEach(y => require(`./handlers/${y}`)(client));


client.on('message', message => {
    const prefix = '~';
    let args = message.content.substring(prefix.length).split(" ");
    let desiredCommand = command;
    client.commands.get(desiredCommand).run(message, args, client, prefix);
 
});

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
    client.user.setActivity("memes", {type: "WATCHING"});
});

client.login(process.env.TOKEN);
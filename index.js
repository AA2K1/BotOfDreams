const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const client = new Client({
    disableEveryone: true
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["console", "command", "event"].forEach(y => require(`./handlers/${y}`)(client));

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Let us start the game, ${client.user.username}`);
    client.user.setActivity("memes", {type: "WATCHING"});
});

client.login(process.env.TOKEN);
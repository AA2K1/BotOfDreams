const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json")
module.exports = {
    name: "say",
    cooldown: 3,
    aliases: ["echo", "repeat"],
    category: "info",
    description: "Repeats what user inputs",
    run: async (message, args, client) => {
      message.channel.send(`\`${args.slice(0).join(" ")}\``);
    }
}
const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
module.exports = {
    name: "search",
    aliases: ['s', 'searchforbattle'],
    cooldown: 600,
    category: "stats",
    description: "Finds enemies to battle to get xp and coins.",
    run: async (message, args, client, cmd) => {
        let enemytypes = [{
          name: 'goblin',
          health: 10,
          attack: 15,
          defense: 5,
          magic: 0
        }];
        let environments = ['a spooky forest', 'an open field', 'a town']
        let randomenvironments = Math.floor(Math.random() * environments.length)
        let randomenemy = Math.floor(Math.random() * enemytypes.length);
        const startembed = new MessageEmbed()
          .setColor(colours.stats)
          .setTitle(`\`${message.author.username} is walking in ${randomenvironments}\``)
        
    }
}
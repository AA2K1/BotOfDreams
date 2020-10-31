
const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
const Shop = require("../models/shop");
module.exports = {
    name: "shop",
    aliases: ['store'],
    cooldown: 10,
    category: "stats",
    description: "Displays a shop to buy items.",
    run: async (message, args, client, cmd) => {
      let shop = new Shop({
        items: [{
          name: "potion",
          cost: 10,
          description: "I don't know, it's a potion."
        }]
      })
      let shopembed = new MessageEmbed()
        .setColor(colours.economy)
        .setTitle("A shop. You buy stuff from it.")
        .setDescription(shop.items.toString())
      message.channel.send(shopembed)
      
    }
}
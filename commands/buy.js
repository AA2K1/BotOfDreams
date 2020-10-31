const { MessageEmbed } = require('discord.js');
const colours = require("../colours.json");
const Items = require("../models/items.js");
const Money = require("../models/money.js");
const Inventory = require("../models/inventory.js");
module.exports = {
  name: "buy",
  aliases: ['get', 'purchase'],
  cooldown: 5,
  category: "economy",
  description: "Allows you to purchase things from the shop.",
  run: async (message, args, client, cmd) => {
    message.channel.send("`ERROR: Currently, this command is unavailable as it is still in development.`");
    // //Should be what u want to buy
    // let itemToBuy = args[0];
    // //If not given return error
    // if(!itemToBuy) return message.channel.send('`ERROR: Must specify an item to buy.`');
    
    // //Go through items in shop and see if itemToBuy is in shop
    // Items.findOne({
    //   id: 55
    // }, (err, items) => {
    //   let inShop = false;
    //   let actualShop = Object.entries(shop.items.items);
    //   actualShop.forEach(item => {
    //     if(item[1].name == itemToBuy) {
    //       inShop = true;
    //     }
    //   })
    // })
    // //Return an error if item specified is not in shop
    // if(inShop == false) {
    //   return message.channel.send("`ERROR: The item you specified is not in the shop.`")
    // }

    // Money.findOne({
    //   id: message.author.id
    // }, (err, inventory) => {
    //   if(err) console.log(err);
    //   if(!inventory) {
    //     let newInventory = new Inventory() {
    //       id: message.author.id
    //     }
    //   }
    // })
  }
}
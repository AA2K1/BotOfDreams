// const { MessageEmbed } = require('discord.js');
// let colours = require("../colours.json");
// const Shop = require("../models/shop");
// module.exports = {
//     name: "shop",
//     aliases: ['store'],
//     cooldown: 10,
//     category: "stats",
//     description: "Displays a shop to buy items.",
//     run: async (message, args, client, cmd) => {
//       Shop.findOne({
//         items: {
//           args[1]: args
//         }
//       }, (err, items) => {
//         if(err) console.log(err);
//         if(!items) {
//           const newShop = new Shop({
//             items: {
//               potion: 10
//             }
//           })
//         }
//       })
//     }
// }
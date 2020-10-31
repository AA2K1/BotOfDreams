// let { MessageEmbed } = require("discord.js");
// const Player = require("../models/player");
// const Money = require("../models/money.js");
// const mongoose = require("mongoose");
// const { promptMessage } = require("../functions.js");
// let colours = require("../colours.json");
// const MONGODB_URI =
//   "mongodb+srv://" +
//   process.env.atlasusername +
//   ":" +
//   process.env.atlaspass +
//   "@" +
//   process.env.host +
//   "/test?retryWrites=true&w=majority";
// mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/CoinDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// module.exports = {
//   name: "battle",
//   aliases: ["fight"],
//   cooldown: 5400,
//   category: "stats",
//   description: "Fights another player. Can get money and xp.",
//   run: async (message, args, client) => {
//     let target = message.mentions.users.first();
//     if (target.bot)
//       return message.reply(
//         `just because you don't have any friends doesn't mean you battle bots, dumb-dumb.`
//       );
//     if (!target)
//       return message.reply(
//         "you can't battle someone if you didn't say who to battle dumb-dumb."
//       );
//     if (target.id === message.author.id)
//       return message.reply("you can't battle yourself dumb-dumb.");
//     let playerDoc = Player.findOne(
//       {
//         userID: message.author.id,
//         serverID: message.guild.id
//       },
//       (err, stats) => {
//         if (err) console.log(err);
//         let targetDoc = Player.findOne(
//           {
//             userID: target.id,
//             serverID: message.guild.id
//           },
//           (err, targetstats) => {
//             if (err) console.log(err);
//             reactionCollector();
//             async function reactionCollector() {
//               let acceptOptions = ["✅", "🚫"];
//               let acceptEmbed = new MessageEmbed()
//                 .setColor(colours.stats)
//                 .setTitle(`${target.username}'s Challenge`)
//                 .setDescription(
//                   `\`You have been challenged by **${message.author.username}**. Is this what you desire? React to this message accordingly:\`\n\n**Accept:** 👍\n\n**Cancel:** 🚫`
//                 )
//                 .setThumbnail(target.displayAvatarURL())
//                 .setTimestamp()
//                 .setFooter(
//                   client.user.username,
//                   client.user.displayAvatarURL()
//                 );
//               const m = await message.channel.send(acceptEmbed);
//               const reacted = await promptMessage(m, target, 30, acceptOptions);
//               if (reacted === "✅") {
//                 message.channel.send("`Let us start the game.`");
//                 //put in logic to run function
//                 let playerspeed = stats.stats.get("agility");
//                 let targetspeed = targetstats.stats.get("agility");
//                 //----------------------------------------------------------------------The below until the "the above" comment have been completed- proceed------------------------------------------------------
//                 if (playerspeed > targetspeed) {
//                   while (
//                     targetstats.stats.get("vitality") >= 0 ||
//                     stats.stats.get("vitality") >= 0
//                   ) {
//                     if (targetstats.stats.get("vitality") <= 0) {
//                       //player won
//                       let xpAdd =
//                         stats.level * Math.floor(Math.random() * 50) + 100;
//                       let moneyGained =
//                         stats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${message.author.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(message.author.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       stats.xp = stats.xp + xpAdd;
//                       stats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: message.author.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: message.author.id,
//                               username: message.author.tag,
//                               serverID: message.guild.id,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             let firstCoinEmbed = new MessageEmbed()
//                               .setColor(colours.economy)
//                               .setTitle(`${message.author.username}'s first coins!'`)
//                               .setDescription(`**A whopping ${moneyGained} coins! You can get more of these by using commands.`)
//                             message.channel.send(firstCoinEmbed).then(m => m.delete({timeout: 15000}))
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );
//                       targetstats.stats.set(
//                         "vitality",
//                         targetstats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else if (stats.stats.get("vitality") <= 0) {
//                       //target won
//                       let xpAdd =
//                         targetstats.level * Math.floor(Math.random() * 50) +
//                         100;
//                       let moneyGained =
//                         targetstats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${target.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(target.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       targetstats.xp = targetstats.xp + xpAdd;
//                       targetstats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: target.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: target.id,
//                               username: target.tag,
//                               serverID: message.guild.id,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             let firstCoinEmbed = new MessageEmbed()
//                               .setColor(colours.economy)
//                               .setTitle(`${target.username}'s first coins!'`)
//                               .setDescription(`\`A whopping ${moneyGained} coins! You can get more of these by using commands.\``)
//                             message.channel.send(firstCoinEmbed).then(m => m.delete({timeout: 15000}))
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );

//                       stats.stats.set(
//                         "vitality",
//                         stats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else {
//                       let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, message.author);
//                     }

//                     if (targetstats.stats.get("vitality") <= 0) {
//                       //player won
//                       let xpAdd =
//                         stats.level * Math.floor(Math.random() * 50) + 100;
//                       let moneyGained =
//                         stats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${message.author.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(message.author.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       stats.xp = stats.xp + xpAdd;
//                       stats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: message.author.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: message.author.id,
//                               username: message.author.tag,
//                               serverID: message.guild.id,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             let firstCoinEmbed = new MessageEmbed()
//                               .setColor(colours.economy)
//                               .setTitle(`${message.author.username}'s first coins!'`)
//                               .setDescription(`**A whopping ${moneyGained} coins! You can get more of these by using commands.`)
//                             message.channel.send(firstCoinEmbed).then(m => m.delete({timeout: 15000}))
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );
//                       targetstats.stats.set(
//                         "vitality",
//                         targetstats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else if (stats.stats.get("vitality") <= 0) {
//                       //target won
//                       let xpAdd =
//                         targetstats.level * Math.floor(Math.random() * 50) +
//                         100;
//                       let moneyGained =
//                         targetstats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${target.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(target.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       targetstats.xp = targetstats.xp + xpAdd;
//                       targetstats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: target.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: target.id,
//                               username: target.tag,
//                               serverID: message.guild.id,
//                               servername: message.guild.name,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             let firstCoinEmbed = new MessageEmbed()
//                               .setColor(colours.economy)
//                               .setTitle(`${target.username}'s first coins!'`)
//                               .setDescription(`**A whopping ${moneyGained} coins! You can get more of these by using commands.`)
//                             message.channel.send(firstCoinEmbed).then(m => m.delete({timeout: 15000}))
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );

//                       stats.stats.set(
//                         "vitality",
//                         stats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else {
//                       let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, target);
//                     }
//                   }
//                 } else if (targetspeed > playerspeed) {
//                   while (
//                     targetstats.stats.get("vitality") >= 0 ||
//                     stats.stats.get("vitality") >= 0
//                   ) {
//                     if (stats.stats.get("vitality") <= 0) {
//                       //target won
//                       let xpAdd =
//                         targetstats.level * Math.floor(Math.random() * 50) +
//                         100;
//                       let moneyGained =
//                         targetstats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${target.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(target.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       targetstats.xp = targetstats.xp + xpAdd;
//                       targetstats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: target.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: target.id,
//                               username: target.tag,
//                               serverID: message.guild.id,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             let firstCoinEmbed = new MessageEmbed()
//                               .setColor(colours.economy)
//                               .setTitle(`${target.username}'s first coins!'`)
//                               .setDescription(`**A whopping ${moneyGained} coins! You can get more of these by using commands.`)
//                             message.channel.send(firstCoinEmbed).then(m => m.delete({timeout: 15000}))
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );

//                       stats.stats.set(
//                         "vitality",
//                         stats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else if (targetstats.stats.get("vitality") <= 0) {
//                       //player won
//                       let xpAdd =
//                         stats.level * Math.floor(Math.random() * 50) + 100;
//                       let moneyGained =
//                         stats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${message.author.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(message.author.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       stats.xp = stats.xp + xpAdd;
//                       stats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: message.author.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: message.author.id,
//                               username: message.author.tag,
//                               serverID: message.guild.id,
//                               servername: message.guild.name,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             message.reply(
//                               "your money has been saved in a database."
//                             );
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );
//                       targetstats.stats.set(
//                         "vitality",
//                         targetstats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else {
//                        let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, message.author);
//                     }

//                     if (stats.stats.get("vitality") <= 0) {
//                       //target won
//                       let xpAdd =
//                         targetstats.level * Math.floor(Math.random() * 50) +
//                         100;
//                       let moneyGained =
//                         targetstats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${target.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(target.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       targetstats.xp = targetstats.xp + xpAdd;
//                       targetstats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: target.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: target.id,
//                               username: target.tag,
//                               serverID: message.guild.id,
//                               servername: message.guild.name,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             message.reply(
//                               "your money has been saved in a database."
//                             );
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );

//                       stats.stats.set(
//                         "vitality",
//                         stats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else if (targetstats.stats.get("vitality") <= 0) {
//                       //player won
//                       let xpAdd =
//                         stats.level * Math.floor(Math.random() * 50) + 100;
//                       let moneyGained =
//                         stats.level * Math.floor(Math.random() * 30) + 30;
//                       const embed = new MessageEmbed()
//                         .setColor(colours.stats)
//                         .setTitle(`${message.author.username} wins!`)
//                         .setDescription(
//                           `**Now for you to get the spoils of battle.**`
//                         )
//                         .setThumbnail(message.author.displayAvatarURL())
//                         .setTimestamp()
//                         .setFooter(
//                           client.user.username,
//                           client.user.displayAvatarURL()
//                         )
//                         .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                         .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                       message.channel.send(embed);
//                       stats.xp = stats.xp + xpAdd;
//                       stats.save().catch(err => console.log(err));
//                       Money.findOne(
//                         {
//                           userID: message.author.id,
//                           serverID: message.guild.id
//                         },
//                         (err, money) => {
//                           if (err) console.log(err);
//                           if (!money) {
//                             const newMoney = new Money({
//                               userID: message.author.id,
//                               username: message.author.tag,
//                               serverID: message.guild.id,
//                               servername: message.guild.name,
//                               money: moneyGained
//                             });

//                             newMoney.save().catch(err => console.log(err));
//                             message.reply(
//                               "your money has been saved in a database."
//                             );
//                             coinAchievement(money);
//                           } else {
//                             money.money = money.money + moneyGained;
//                             money.save().catch(err => console.log(err));
//                             coinAchievement(money);
//                           }
//                         }
//                       );
//                       targetstats.stats.set(
//                         "vitality",
//                         targetstats.stats.get("maxvitality")
//                       );
//                       break;
//                     } else {
//                        let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, target);
//                     }
//                   }
//                 }

//                 //-----------------------------------------The Above have been fully completed--------------------------------------------------------------------------------
//                 else {
//                   let chance = Math.floor(Math.random() * 50) + 50;

//                   //-------------------------------------------------------------------------------------------------------------------------------
//                   if (chance <= 50) {
//                     while (
//                       targetstats.stats.get("vitality") >= 0 ||
//                       stats.stats.get("vitality") >= 0
//                     ) {
//                       if (targetstats.stats.get("vitality") <= 0) {
//                         //player won
//                         let xpAdd =
//                           stats.level * Math.floor(Math.random() * 50) + 100;
//                         let moneyGained =
//                           stats.level * Math.floor(Math.random() * 30) + 30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${message.author.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(message.author.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         stats.xp = stats.xp + xpAdd;
//                         stats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: message.author.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: message.author.id,
//                                 username: message.author.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                               coinAchievement(money);
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                               coinAchievement(money);
//                             }
//                           }
//                         );
//                         targetstats.stats.set(
//                           "vitality",
//                           targetstats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else if (stats.stats.get("vitality") <= 0) {
//                         //target won
//                         let xpAdd =
//                           targetstats.level * Math.floor(Math.random() * 50) +
//                           100;
//                         let moneyGained =
//                           targetstats.level * Math.floor(Math.random() * 30) +
//                           30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${target.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(target.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         targetstats.xp = targetstats.xp + xpAdd;
//                         targetstats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: target.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: target.id,
//                                 username: target.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );

//                         stats.stats.set(
//                           "vitality",
//                           stats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else {
//                          let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, message.author);
//                       }

//                       if (targetstats.stats.get("vitality") <= 0) {
//                         //player won
//                         let xpAdd =
//                           stats.level * Math.floor(Math.random() * 50) + 100;
//                         let moneyGained =
//                           stats.level * Math.floor(Math.random() * 30) + 30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${message.author.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(message.author.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         stats.xp = stats.xp + xpAdd;
//                         stats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: message.author.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: message.author.id,
//                                 username: message.author.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );
//                         targetstats.stats.set(
//                           "vitality",
//                           targetstats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else if (stats.stats.get("vitality") <= 0) {
//                         //target won
//                         let xpAdd =
//                           targetstats.level * Math.floor(Math.random() * 50) +
//                           100;
//                         let moneyGained =
//                           targetstats.level * Math.floor(Math.random() * 30) +
//                           30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${target.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(target.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         targetstats.xp = targetstats.xp + xpAdd;
//                         targetstats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: target.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: target.id,
//                                 username: target.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );

//                         stats.stats.set(
//                           "vitality",
//                           stats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else {
//                          let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, target);
//                       }
//                     }
//                   }

//                   //------------------------------------------------------------------------------------------------------------------------------------------
//                   else {
//                     while (
//                       targetstats.stats.get("vitality") >= 0 ||
//                       stats.stats.get("vitality") >= 0
//                     ) {
//                       if (targetstats.stats.get("vitality") <= 0) {
//                         //player won
//                         let xpAdd =
//                           stats.level * Math.floor(Math.random() * 50) + 100;
//                         let moneyGained =
//                           stats.level * Math.floor(Math.random() * 30) + 30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${message.author.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(message.author.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         stats.xp = stats.xp + xpAdd;
//                         stats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: message.author.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: message.author.id,
//                                 username: message.author.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );
//                         targetstats.stats.set(
//                           "vitality",
//                           targetstats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else if (stats.stats.get("vitality") <= 0) {
//                         //target won
//                         let xpAdd =
//                           targetstats.level * Math.floor(Math.random() * 50) +
//                           100;
//                         let moneyGained =
//                           targetstats.level * Math.floor(Math.random() * 30) +
//                           30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${target.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(target.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         targetstats.xp = targetstats.xp + xpAdd;
//                         targetstats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: target.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: target.id,
//                                 username: target.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );

//                         stats.stats.set(
//                           "vitality",
//                           stats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else {
//                          let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, target);
//                       }

//                       if (targetstats.stats.get("vitality") <= 0) {
//                         //player won
//                         let xpAdd =
//                           stats.level * Math.floor(Math.random() * 50) + 100;
//                         let moneyGained =
//                           stats.level * Math.floor(Math.random() * 30) + 30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${message.author.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(message.author.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         stats.xp = stats.xp + xpAdd;
//                         stats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: message.author.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: message.author.id,
//                                 username: message.author.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );
//                         targetstats.stats.set(
//                           "vitality",
//                           targetstats.stats.get("maxvitality")
//                         );
//                         break;
//                       } else if (stats.stats.get("vitality") <= 0) {
//                         //target won
//                         let xpAdd =
//                           targetstats.level * Math.floor(Math.random() * 50) +
//                           100;
//                         let moneyGained =
//                           targetstats.level * Math.floor(Math.random() * 30) +
//                           30;
//                         const embed = new MessageEmbed()
//                           .setColor(colours.stats)
//                           .setTitle(`${target.username} wins!`)
//                           .setDescription(
//                             `**Now for you to get the spoils of battle.**`
//                           )
//                           .setThumbnail(target.displayAvatarURL())
//                           .setTimestamp()
//                           .setFooter(
//                             client.user.username,
//                             client.user.displayAvatarURL()
//                           )
//                           .addField(`**XP Gained: **`, `**${xpAdd}**`)
//                           .addField(`**Money Gained: **`, `**${moneyGained}**`);
//                         message.channel.send(embed);
//                         targetstats.xp = targetstats.xp + xpAdd;
//                         targetstats.save().catch(err => console.log(err));
//                         Money.findOne(
//                           {
//                             userID: target.id,
//                             serverID: message.guild.id
//                           },
//                           (err, money) => {
//                             if (err) console.log(err);
//                             if (!money) {
//                               const newMoney = new Money({
//                                 userID: target.id,
//                                 username: target.tag,
//                                 serverID: message.guild.id,
//                                 servername: message.guild.name,
//                                 money: moneyGained
//                               });

//                               newMoney.save().catch(err => console.log(err));
//                               message.reply(
//                                 "your money has been saved in a database."
//                               );
//                             } else {
//                               money.money = money.money + moneyGained;
//                               money.save().catch(err => console.log(err));
//                             }
//                           }
//                         );
//                         break;
//                         stats.stats.set(
//                           "vitality",
//                           stats.stats.get("maxvitality")
//                         );
//                       } else {
//                          let chance = Math.floor(Math.random() * 10)
//                       if(chance === 2) {
//                         message.channel.send('You missed!');
//                       } else await attack(message.author, target, message.author);
//                       }
//                     }
//                   }
//                 }
//               } else if (reacted === "🚫") {
//                 message.channel.send(
//                   "So, the game is over...what a truly foolish end."
//                 );
//               }
//               async function attack(player, opponent, attacker) {
//                 let attackOptions = ["💥", "🛑"];
//                 let attackEmbed = new MessageEmbed()
//                   .setColor(colours.battle)
//                   .setTitle(`**${attacker.username}'s** turn`)
//                   .setDescription(
//                     `**What will you do?**\n\n**👊💥: Attack**\n\n**🛑: Cancel**`
//                   );
//                 const m = await message.channel.send(attackEmbed);
//                 const reacted = await promptMessage(
//                   m,
//                   attacker,
//                   30,
//                   attackOptions
//                 );
//                 if (reacted === "🛑") {
//                   return message.reply(
//                     "So, the game is over... What a truly foolish end."
//                   );
//                 } else if (reacted === "💥") {
//                   if (attacker.id === player.id) {
//                     let damage =
//                       stats.stats.get("strength") +
//                       Math.floor(Math.random() * 4) +
//                       2;
//                     targetstats.stats.set(
//                       "vitality",
//                       targetstats.stats.get("vitality") - damage
//                     );
//                     const embed = new MessageEmbed()
//                       .setColor(colours.battle)
//                       .setTitle(
//                         `**${player.username}** attacked **${opponent.username}**!`
//                       )
//                       .setDescription(
//                         `**The attack did ${damage} damage!**\n**Your health is: ${stats.stats.get(
//                           "vitality"
//                         )}**\n**The opponent's health is: ${targetstats.stats.get(
//                           "vitality"
//                         )}**`
//                       )
//                       .setTimestamp()
//                       .setFooter(
//                         client.user.username,
//                         client.user.displayAvatarURL()
//                       );
//                     message.channel.send(embed);
//                   } else if (attacker.id === opponent.id) {
//                     let damage =
//                       targetstats.stats.get("strength") +
//                       Math.floor(Math.random() * 4) +
//                       2;
//                     stats.stats.set(
//                       "vitality",
//                       stats.stats.get("vitality") - damage
//                     );
//                     const embed = new MessageEmbed()
//                       .setColor(colours.battle)
//                       .setTitle(
//                         `**${opponent.username}** attacked **${player.username}**!`
//                       )
//                       .setDescription(
//                         `**The attack did ${damage} damage!**\n**Your health is: ${targetstats.stats.get(
//                           "vitality"
//                         )}**\n**The opponent's health is: ${stats.stats.get(
//                           "vitality"
//                         )}**`
//                       )
//                       .setTimestamp()
//                       .setFooter(
//                         client.user.username,
//                         client.user.displayAvatarURL()
//                       );
//                     message.channel.send(embed);
//                   }
//                 }
//               }
//             }
//           }
//         );
//       }
//     );
//   }
// };


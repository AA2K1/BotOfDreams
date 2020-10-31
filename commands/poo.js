const { MessageEmbed, Collection } = require("discord.js");
const Player = require("../models/player");
let colours = require("../colours.json")
const mongoose = require('mongoose');
const Money = require('../models/money.js');
const MONGODB_URI =
  "mongodb+srv://" +
  process.env.atlasusername +
  ":" +
  process.env.atlaspass +
  "@" +
  process.env.host +
  "/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/CoinDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  name: "poo",
  aliases: ["shit"],
  cooldown: 300,
  category: "fun",
  description: "You get coins from pooing...for some reason.",
  run: async (message, args, client, cmd) => {
    Player.findOne({
      userID: message.author.id
    }, (err, stats) => {
      if(err) console.log(err)
      if(!stats) {
        const newPlayer = new Player({
            userID: message.author.id,
            serverID: message.guild.id,
            level: 1,
            xp: 0,
            class: "peasant",
            stats: {
              strength: 5,
              magic: 0,
              vitality: 10,
              maxvitality: 10,
              agility: 10
            }
          });
          newPlayer.save().catch(err => console.log(err));
          message.channel.send(`\`${client.users.cache.get(message.author.id).username}'s character has been created!\``);
      }
      let moneyGained = Math.round((Math.floor(Math.random() * 50) + 150) * stats.level/2)
      Money.findOne(
      {
        userID: message.author.id
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            serverID: message.guild.id,
            money: moneyGained
          });

          newMoney.save().catch(err => console.log(err));
          message.channel.send(`\`${client.users.cache.get(message.author.id).user.username}'s bank has been successfully created!\``);
        } else {
          money.money = money.money + moneyGained;
          money.save().catch(err => console.log(err));
        }
        let embed = new MessageEmbed()
          .setColor(colours.fun)
          .setThumbnail(message.author.displayAvatarURL())
          .setTitle(`\`${message.author.username} goes to the bathroom...🤔\``)
          .setDescription(`\`And starts to take a poo. The weird thing is, some coins come out. Disgusting, but it's about ${moneyGained} coins.🤯\``)
          .setTimestamp()
          .setFooter('Still kinda disgusting tho')
        message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
      } 
    );
    })
  }
};

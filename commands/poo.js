const { MessageEmbed, Collection } = require("discord.js");
const Player = require("../models/player");
let colours = require("../colours.json")
const mongoose = require('mongoose');
const Money = require('../models/money.js');
const MONGODB_URI = 'mongodb+srv://aa2k:Adam2006@botofdreams-dv0if.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/CoinDB', {
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
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, stats) => {
      if(err) console.log(err)
      if(!stats) {
        const newPlayer = new Player({
            userID: message.author.id,
            username: message.author.tag,
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
          let lvlUp = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`${message.author.username} has gained his first XP!`)
            .setDescription(
              `These first stats will be the stepping stone for your success as a fighter.`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(lvlUp).then(m => m.delete({ timeout: 25000 }));
      }
      let moneyGained = (Math.floor(Math.random() * 50) + 150) * stats.level/2
      Money.findOne(
      {
        userID: message.author.id,
        serverID: message.guild.id
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
                userID: message.author.id,
                username: message.author.tag,
                serverID: message.guild.id,
                servername: message.guild.name,
                money: moneyGained
              });

              newMoney.save().catch(err => console.log(err));
              let firstCoinEmbed = new MessageEmbed()
                .setAuthor(`🤑${message.author.username}🤑`)
                .setColor(colours.economy)
                .setDescription(
                  `**${moneyGained}** coins are yours! And they're your first! You can get more of these by using commands.`
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(firstCoinEmbed);
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

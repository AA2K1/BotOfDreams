const { MessageEmbed } = require('discord.js');
const Money = require('../models/money');
let colours = require("../colours.json");
module.exports = {
  name: "pay",
  aliases: ['give', 'transfer'],
  cooldown: 10,
  category: "economy",
  description: "Gives an amount of money to somebody else",
  run: async (message, args, client, cmd) => {
    //Who to give the money to
    let recipient = message.mentions.members.first();
    
    if(recipient == null) return message.channel.send('`ERROR: You can\'t either give money to a bot or give money to a person not in the server.`');

    if(recipient.bot) return message.channel.send('`ERROR: You can\'t give money to a bot.`');

    //Amount of money to give 
    let amount = parseInt(args[1]);

    if(isNaN(amount)) return message.channel.send('`ERROR: The amount has to be a number.`');

    if(amount <= 0) return message.channel.send('`ERROR: The amount has to be greater than zero.`');
    //Reason
    args.splice(0, 2);
    let reason = args.toString();

    if(reason == "") reason = "No reason given...";

    let recipientBal, giverBal;

    //Make 2 Database calls, one for the giver and one for the reciever. Make sure to check if the person has enough coins.

    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, giverBal) => {
      if(err) console.error(err);

      if(!giverBal || giverBal <= 0) return message.channel.send('`ERROR: You don\'t have enough money to complete this transaction.`');

      //Go with the transaction
      giverBal.money = giverBal.money - amount;
      giverBal.save().catch(err => console.log(err));
      Money.findOne({
        userID: recipient.id,
        serverID: message.guild.id
      }, (err, recBal) => {
        if(err) console.error(err);

        if(!recBal) {
          let newUser = new Money({
            userID: recipient.id,
            username: recipient.user.tag,
            serverID: message.guild.id,
            servername: message.guild.name,
            money: amount
          })
          newUser.save().catch(err => console.log(err));
        } else {
          //Go with the transaction
          recBal.money = recBal.money + amount;
          recBal.save().catch(err => console.log(err));
          //Display mesage confirming the transaction
          let tEmbed = new MessageEmbed()
          .setColor(colours.economy)
          .setTitle(`Transaction between ${message.author.username} & ${recipient.user.username}`)
          .addField(`${message.author.username}'s Balance`, `**${giverBal.money}** coins`)
          .addField(`${recipient.user.username}'s Balance`, `**${recBal.money}** coins`)
          .addField(`Reason for Transaction`, `**${reason}**`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(tEmbed).then(msg => msg.delete({timeout: 15000}));
        }
      })
    })
  }
}



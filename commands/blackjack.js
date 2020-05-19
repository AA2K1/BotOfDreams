const { MessageEmbed } = require("discord.js");
const { getCard, promptMessage } = require("../functions.js");
let colours = require("../colours.json");
module.exports = {
  name: "blackjack",
  aliases: ["bj"],
  cooldown: 25,
  category: "fun",
  description: "Plays a nice game of blackjack.",
  run: async (message, args, client, cmd) => {
    message.channel.send("This command isn't done yet. Try other ones!");
    if (isNaN(args[0]))
      return message.channel.send("You bet money here, not your dumb letters.");
    if (!args[0])
      return message.channel.send(
        "It'd be nice if you would bet something in a blackjack game dumb-dumb."
      );
    let deck = [
      "A",
      "A",
      "A",
      "A",
      "2",
      "2",
      "2",
      "2",
      "3",
      "3",
      "3",
      "3",
      "4",
      "4",
      "4",
      "4",
      "5",
      "5",
      "5",
      "5",
      "6",
      "6",
      "6",
      "6",
      "7",
      "7",
      "7",
      "7",
      "8",
      "8",
      "8",
      "8",
      "9",
      "9",
      "9",
      "9",
      "10",
      "10",
      "10",
      "10",
      "J",
      "J",
      "J",
      "J",
      "Q",
      "Q",
      "Q",
      "Q",
      "K",
      "K",
      "K",
      "K"
    ];
    let suits = ['♣️', '♠️', '♢', '♡'];
    let money = args[0];
    let pc1 = getValue(getCard(deck));
    let pc2 = getValue(getCard(deck));
    let pTotal= pc1 + pc2;
    let pcs1 = suits[Math.floor(Math.random() * suits.length)]
    let pcs2 = suits[Math.floor(Math.random() * suits.length)]
    let hcs1 = suits[Math.floor(Math.random() * suits.length)]
    let hcs2 = suits[Math.floor(Math.random() * suits.length)]
    let hc1 = getValue(getCard(deck));
    let hc2 = getValue(getCard(deck));
    let houseTotal = hc1 + hc2;
    let options = ['💥', '✋', '🚫']
    
    const firstDeal = new MessageEmbed()
      .setColor(colours.fun)
      .setTitle(`${message.author.username} vs ${client.username}`)
      .setDescription(`**The hands have been dealt. **${money}** coins on the line.\n**Options: ** \n**💥: Hit**\n\n**✋: Stand**\n\n**🚫: End**`)
      .addField(`**Your hand: **`, `${pcs1}${pc1}, ${pcs2}${pc2}`)
      .addField(`**Your total: **`, `**${pTotal}**`)
      .addField(`**House hand: **`, `${hcs1}${hc1}, ${hcs2}${hc2}`)
      .addField(`**House total: **`, `**${houseTotal}**`)
     const m = await message.channel.send(firstDeal)
     const reacted = await promptMessage(m, message.author, 30, options)  
     
     if(reacted === '💥') {
       message.channel.send('You decide to hit!')
     } else if(reacted === '✋') {
       message.channel.send('You decide to stand!')
     } else if(reacted === '🚫') {
       message.channel.send('So, the game is over...what a truly foolish end.');
     }
  
    function getValue(card) {
      if (card == "A") {
        return 11;
      } else if (card == "base") {
        return 0;
      } else if (card == "J" || card == "Q" || card == "K") {
        return 10;
      } else {
        return Number(card);
      }
    }
  }
};

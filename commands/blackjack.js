const { MessageEmbed } = require("discord.js");
const { getCard, promptMessage } = require("../functions.js");
let colours = require("../colours.json");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
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
  name: "blackjack",
  aliases: ["bj"],
  cooldown: 600,
  category: "fun",
  description: "Plays a nice game of blackjack.",
  run: async (message, args, client, cmd) => {
    if (isNaN(args[0])) {
      if(message.content.includes('all')) {
        Money.findOne({
          userID: message.author.id
        }, (err, money) => {
          if(err) console.log(err);
          args[0] = money.money;
        })
      } else {
       return message.channel.send(
        "`ERROR: The bet must be a letter.`"
        ); 
      }
    }
    if (!args[0])
      return message.channel.send(
        "`ERROR: You must bet something.`"
      );
    if(args[0] < 100) {
      return message.channel.send("`ERROR: You must bet at least 100 coins.`")
    }
    Money.findOne(
      {
        userID: message.author.id
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          return message.channel.send("`ERROR: You do not have any coins.`")
        } else {
          if(money.money < args[0]) {
            return message.chanenl.send("`ERROR: You cannot bet more than you have.`")
          }
          firstdeal();

            // Functions
            async function firstdeal() {
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
            let suits = ["♧", "♤", "♦️", "♥️"];
            let bet = args[0];
            let pc1 = getCard(deck);
            let pc2 = getCard(deck);
            let pTotal = aceCheck(getValue(pc1), 0) + aceCheck(getValue(pc2), aceCheck(getValue(pc1), 0));
            let pcs1 = suits[Math.floor(Math.random() * suits.length)];
            let pcs2 = suits[Math.floor(Math.random() * suits.length)];
            let hcs1 = suits[Math.floor(Math.random() * suits.length)];
            let hcs2 = suits[Math.floor(Math.random() * suits.length)];
            let hc1 = getCard(deck);
            let hc2 = getCard(deck);
            let houseTotal = aceCheck(getValue(hc1), 0) + aceCheck(getValue(hc2), aceCheck(getValue(hc1), 0));
            let numoftimeshit = 0;
            let options = ["💥", "✋", "🚫"];

            const firstDeal = new MessageEmbed()
              .setColor(colours.fun)
              .setTitle(`${message.author.username} vs ${client.user.username}`)
              .setDescription(
                `**The hands have been dealt. ${bet} coins on the line.**\n\n`
              )

              .addField(
                `**Your hand: **`,
                `\`${pcs1}${pc1}\`, \`${pcs2}${pc2}\``,
                true
              )
              .addField(`**Your total: **`, `**${pTotal}**`, true)
              .addField(
                `**House hand: **`,
                `\`${hcs1}${hc1}\`, \`${hcs2}???\``, true
              )
              .addField(`**House total: **`, `???`, true)
              .addField(
                `**Options: **`,
                `\n\`💥: Hit\`\n\n\`✋: Stand\`\n\n\`🚫: End\``
              );
            const m = await message.channel.send(firstDeal);
            if (houseTotal === 21) {
              let multiplier = Math.round(10 * Math.random() * 0.5) / 10 + 2;
              let coinLoss = Math.floor((Math.random() * bet) / 2) + bet / 2;
              let coinsLost = Math.ceil(multiplier * coinLoss);
              firstDeal.setDescription(
                `\`The house got a blackjack! You lose ${Math.ceil(
                  coinLoss * multiplier
                )} coins! That's ${multiplier}x your bet. Hope you didn't bet high!\n\nYour hand: ${pcs1}${pc1}, ${pcs2}${pc2}\nYour total: ${pTotal}\n\nHouse hand: ${hcs1}${hc1}, ${hcs2}${hc2}\``
              );
              firstDeal.embeds = [];
              firstDeal.setColor(colours.loss);
              return m.edit(firstDeal);
              moneyGainorRemove(coinsLost, false);
            } else if (pTotal === 21) {
              let multiplier = Math.round(10 * Math.random() * 0.5) / 10 + 2;
              let coinWon = Math.floor((Math.random() * bet) / 2) + bet / 2;
              let coinsGained = Math.ceil(multiplier * coinWon);
              firstDeal.setDescription(
                `\`Oh hey, you got a blackjack. Nice job. Got ${Math.ceil(
                  multiplier * coinWon
                )} coins. That's ${multiplier}x your bet.\n\nYour hand: ${pcs1}${pc1}, ${pcs2}${pc2}\nYour total: ${pTotal}\n\nHouse hand: ${hcs1}${hc1}, ${hcs2}${hc2}\``
              );
              firstDeal.embeds = [];
              firstDeal.setColor(colours.win);
              return m.edit(firstDeal);
              moneyGainorRemove(coinsGained, true);
            } else if (houseTotal === 21 && pTotal === 21) {
              firstDeal.setDescription(
                `\`Oh wow. It looks like both the house and you got a blackjack. So, guess it's null and void. I'll give you one coin for sympathy.\n\nYour hand: ${pcs1}${pc1}, ${pcs2}${pc2}\nYour total: ${pTotal}\n\nHouse hand: ${hcs1}${hc1}, ${hcs2}${hc2}\``
              );
              firstDeal.embeds = [];
              return m.edit(firstDeal);
              moneyGainorRemove(1, true);
            } else {
              const reacted = await promptMessage(
                m,
                message.author,
                30,
                options
              );
              if (reacted === "💥") {
                hit(firstDeal);
              } else if (reacted === "✋") {
                stand(firstDeal);
              } else if (reacted === "🚫") {
                message.channel.send(
                  "So, the game is over...what a truly foolish end."
                );
              }
            }

             async function optionprompt(cards, suits) {
              let promptoptions = ['💥', '✋']
              let dealembed = new MessageEmbed()
                .setColor(colours.fun)
                .setTitle(`${message.author.username} hits...`)
                .setDescription(
                  `**The card has been given. ${bet} coins still on the line.**`
                );
              dealembed
                .addField(
                  `**House hand: **`,
                  `\`${hcs1}${hc1}\`, \`${hcs2}???\``,
                  true
                )
                .addField(`**House total: **`, `???`, true)
                .addField(`**Your total: **`, `**${pTotal}**`)
                .addField(
                  `**Options: **`,
                  `\n\`💥: Hit\`\n\n\`✋: Stand\``
                );
              const m = await message.channel.send(dealembed);
              const reacted = await promptMessage(
                m,
                message.author,
                30,
                promptoptions
              );
              if (reacted === "💥") {
                hit(dealembed);
              } else if (reacted === "✋") {
                stand(dealembed, cards, suits);
              } 
            }

            async function stand(deal) {
              //Let house draw a card if its total is less than 17. Show other card, and if houseTotal is greater than 21 or pTotal greater than houseTotal, then win. Else, house wins. 
              if(houseTotal <= 17) {
                let hc3 = getCard(deck);
                let hcs3 = suits[Math.floor(Math.random() * suits.length)];
                houseTotal += aceCheck(getValue(hc3), houseTotal);
                if(houseTotal > 21 || pTotal > houseTotal) {
                  message.channel.send(`\`\`\`House hand: \n${hcs1}${hc1}, ${hcs2}${hc2}, ${hcs3}${hc3}\nHouse total: ${houseTotal}\`\`\``)
                  win(deal);
                } else if(houseTotal < 21 && pTotal < houseTotal) {
                  message.channel.send(`\`\`\`House hand: \n${hcs1}${hc1}, ${hcs2}${hc2}, ${hcs3}${hc3}\nHouse total: ${houseTotal}\`\`\``)
                  loss(deal);
                }
              } else {
                if(houseTotal > 21 || pTotal > houseTotal) {
                  message.channel.send(`\`\`\`House hand: \n${hcs1}${hc1}, ${hcs2}${hc2}\nHouse total: ${houseTotal}\`\`\``)
                  win(deal);
                } else if(houseTotal < 21 && pTotal < houseTotal) {
                  message.channel.send(`\`\`\`House hand: \n${hcs1}${hc1}, ${hcs2}${hc2}\nHouse total: ${houseTotal}\`\`\``)
                  loss(deal);
                }
              }
            }

            async function hit(deal) {
              let pcards = [getCard(deck), getCard(deck), getCard(deck), getCard(deck), getCard(deck)];
              let psuits = [suits[Math.floor(Math.random() * suits.length)], suits[Math.floor(Math.random() * suits.length)], suits[Math.floor(Math.random() * suits.length)], suits[Math.floor(Math.random() * suits.length)], suits[Math.floor(Math.random() * suits.length)]];
              numoftimeshit += 1;
              if (numoftimeshit >= 5) {
                const win = new MessageEmbed()
                  .setColor(colours.win)
                  .setTitle(`\`${message.author.username} wins!\``)
                  .setDescription('`It looks like you were able to hit five times, so I guess you win!`')
                  .setTimestamp()
                  .setFooter(client.user.username, client.user.displayAvatarURL())
                message.channel.send(win);
                win(win);
              } else {
                pTotal += aceCheck(getValue(pcards[numoftimeshit]), pTotal);
                if (numoftimeshit === 1) {
                message.channel.send(
                  `\`\`\`Your hand: \n${pcs1}${pc1}, ${pcs2}${pc2}, ${pcards[1]}${psuits[1]}\nYou now have a total of ${pTotal}\`\`\``);
              } else if (numoftimeshit === 2) {
                message.channel.send(
                  `\`\`\`Your hand: \n
                  ${pcs1}${pc1}, ${pcs2}${pc2}, ${pcards[1]}${
                    psuits[1]
                  }, ${pcards[2]}${psuits[2]}\nYou now have a total of ${pTotal}\`\`\``
                );
              } else if (numoftimeshit === 3) {
                message.channel.send(
                  `\`\`\`Your hand: \n
                  ${pcs1}${pc1}, ${pcs2}${pc2}, ${pcards[1]}${
                    psuits[1]
                  }, ${pcards[2]}${psuits[2]}, ${pcards[3]}${psuits[3]}\nYou now have a total of ${pTotal}\`\`\``
                );
              } else if (numoftimeshit === 4) {
                message.channel.send(
                  `\`\`\`Your hand: \n
                  ${pcs1}${pc1}, ${pcs2}${pc2}, ${pcards[1]}${
                    psuits[1]
                  }, ${pcards[2]}${psuits[2]}, ${pcards[3]}${
                    psuits[3]
                  }, ${pcards[4]}${psuits[4]}\nYou now have a total of ${pTotal}\`\`\``
                );
              } else if (numoftimeshit === 5) {
                message.channel.send(
                  `\`\`\`Your hand: \n${pcs1}${pc1}, ${pcs2}${pc2}, ${
                    pcards[1]
                  }${psuits[1]}, ${pcards[2]}${psuits[2]}, ${pcards[3]}${
                    psuits[3]
                  }, ${pcards[4]}${psuits[4]}, ${pcards[5]}${psuits[5]}\nYou now have a total of ${pTotal}\`\`\``
                );
              }
              if (pTotal > 21) {
                loss(deal);
              } else if (pTotal === 21) {
                win(deal);
              } else {
                optionprompt(pcards, psuits);
              }
            }
          }

           

            async function win(embed) {
              embed.setColor(colours.win);
              let multiplier = Math.round(10 * Math.random() * 0.5) / 10 + 2;
              let coinWin = Math.floor((Math.random() * bet) / 2) + bet / 2;
              let coinsWon = Math.ceil(
                  coinWin * multiplier
                )
              message.channel.send(
                `\`Oh hey, looks like you win. Nice! Got ${Math.ceil(
                  coinWin * multiplier
                )} coins. That was ${multiplier}x your bet.\``
              );
              moneyGainorRemove(coinsWon, true)
            }

            async function loss(embed) {
              embed.setColor(colours.loss);
              let multiplier = Math.round(10 * Math.random() * 0.5) / 10 + 2;
              let coinLoss = Math.floor((Math.random() * bet) / 2) + bet / 2;
              let coinsLost = Math.ceil(
                  coinLoss * multiplier
                )
              message.channel.send(
                `\`Looks like you lost. You lose ${Math.ceil(
                  coinLoss * multiplier
                )} coins. That was ${multiplier}x your bet. Better luck next time!\``
              );
              moneyGainorRemove(coinsLost, false)
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
            
            function aceCheck(value, total) {
              if (total + value > 21 && value == 11) {
                return 1;
              }
              else {
                return value;
              }
            }

            function moneyGainorRemove(coinAmt, posOrNeg) {
              Money.findOne({
                userID: message.author.id
              }, (err, money) => {
                if(err) console.log(err);
                if(!money) {
                  if(posOrNeg) {
                    const newMoney = new Money({
                      userID: message.author.id,
                      serverID: message.guild.id,
                      money: coinAmt
                    });

                    newMoney.save().catch(err => console.log(err));
                    message.channel.send(`\`${client.users.cache.get(message.author.id).user.username}'s bank has been successfully created!\``);
                  } else {
                    const newMoney = new Money({
                      userID: message.author.id,
                      serverID: message.guild.id,
                      money: 0
                    });

                    newMoney.save().catch(err => console.log(err));
                    message.channel.send(`\`${client.users.cache.get(message.author.id).user.username}'s bank has been successfully created!\``);
                  }
                } else {
                  if(posOrNeg === true) {
                    money.money = money.money + coinAmt;
                    money.save().catch(err => console.log(err));
                  } else {
                    money.money = money.money - coinAmt;
                    money.save().catch(err => console.log(err));
                  }
                }
              })
            }
          }
        }
      }
    );
  }
};

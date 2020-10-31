const { MessageEmbed, MessageCollector } = require("discord.js");
const Player = require("../models/player.js");
const Money = require("../models/money.js");
const mongoose = require("mongoose");
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

let colours = require("../colours.json");
const { promptMessage } = require("../functions.js");
module.exports = {
  name: "rolldie",
  aliases: ["die", "rolldice", "roll", "dice"],
  cooldown: 120,
  category: "fun",
  description: "Rolls a die of your choosing. Can bet money and xp",
  run: async (message, args, client, cmd) => {
    let dieTypes = [`4`, `6`, `10`, `20`, `50`];
    let dieOfChoice;
    let betofChoice;
    let diePick;
    let bet;

    //collect bet, money or xp, and -die type-
    message.channel.send(`\`What die would you like to roll? Your options are: ${dieTypes}. Type one or type cancel to cancel.\``);
    const filter = m =>
      (!m.author.bot && m.content.toLowerCase().includes("cancel")) ||
      dieTypes.includes(m.content);
    const collector = new MessageCollector(message.channel, filter, {
      max: 1
    });

    collector.on("collect", m => {
      dieOfChoice = m.content;
      if (dieOfChoice === "cancel") {
        return message.channel.send("`Cancelled.`");
      } else {
        if (!dieTypes.includes(dieOfChoice)) {
          message.channel.send("`ERROR: You must pick from the given die types.`");
        } else {
          message.channel.send(
            `\`Will you bet money or xp? Type your answer now!\``
          );
          const filter1 = l =>
            !l.author.bot &&
            (l.content.toLowerCase().includes("xp") ||
              l.content.toLowerCase().includes("money") ||
              l.content.toLowerCase().includes("cancel"));
          const collector1 = new MessageCollector(message.channel, filter1, {
            max: 1
          });
          collector1.on("collect", m => {
            betofChoice = m.content.toLowerCase();
            if (dieOfChoice === "cancel") {
              return message.channel.send(
                "`Cancelled.`"
              );
            } else {
              message.channel.send(
                `\`How much will you bet? Type your answer now!\``
              );
              const filter2 = m =>
                (!m.author.bot && !isNaN(m)) || m.content.includes("cancel");
              const collector2 = new MessageCollector(
                message.channel,
                filter2,
                {
                  max: 1
                }
              );
              collector2.on("collect", m => {
                bet = m.content;
                if (isNaN(bet)) {
                  return message.channel.send("`ERROR: You must bet a number.`")
                } else {
                  message.channel.send(
                    `\`You can pick between a range of 1 and ${+dieOfChoice}. What will you pick?\``
                  );
                  const filter3 = m =>
                    !m.author.bot &&
                    !isNaN(m.content) &&
                    +m.content >= 1 &&
                    +m.content <= +dieOfChoice;
                  const collector3 = new MessageCollector(
                    message.channel,
                    filter3,
                    {
                      max: 1
                    }
                  );
                  collector3.on("collect", m => {
                    diePick = m.content;
                    if (isNaN(diePick)) {
                      return message.channel.send("`ERROR: You must pick a die type.")
                    }
                    let dieRoll =
                      Math.round(Math.random() * (+dieOfChoice - 1)) + 1;
                    message.channel.send(`\`${dieRoll}\``);
                    if (dieRoll === Number(diePick)) {
                      win(bet, betofChoice, +dieOfChoice);
                      message.channel.bulkDelete(8).catch(console.error);
                    } else {
                      message.channel.bulkDelete(8).catch(console.error);
                      lose(bet, betofChoice, +dieOfChoice);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
    function win(amount, xpormoney, die) {
      if(die === 6) {
          amount *= 1.25;
        } else if(die === 10) {
          amount *= 2;
        } else if(die === 20) {
          amount *= 3;
        } else if(die === 50) {
          amount *= 5;
        }
      if (xpormoney === "xp") {
        message.channel.send(`\`Nice job, you got ${amount} xp.\``)
        Player.findOne(
          {
            userID: message.author.id
          },
          (err, player) => {
            if (err) console.log(err);
            if (!player) {
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
            } else {
              player.xp = player.xp + +amount;
              player.save().catch(err => console.log(err));
            }
          }
        );
      } else if (xpormoney === "money") {
        message.channel.send(`\`Nice job, you got ${amount} coin(s).\``)
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
                money: coins
              });

              newMoney.save().catch(err => console.log(err));
              message.channel.send(`\`${client.users.cache.get(message.author.id).user.username}'s bank has been successfully created!\``);
            } else {
              money.money = money.money + +amount;
              money.save().catch(err => console.log(err));
            }
          }
        );

      }
    }
    async function lose(amount, xpormoney, die) {
      if(die === 6) {
          amount *= 1.25;
        } else if(die === 10) {
          amount *= 2;
        } else if(die === 20) {
          amount *= 3;
        } else if(die === 50) {
          amount *= 5;
        }
      if (xpormoney === "xp") {
        message.channel.send(`\`You have no luck, so you don't gain anything.\``)
      } else if (xpormoney === "money") {
        message.channel.send(`\`You have no luck, so you lose ${amount} coin(s).\``)
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
                money: coins
              });

              newMoney.save().catch(err => console.log(err));
              message.channel.send(`\`${client.users.cache.get(message.author.id).user.username}'s bank has been successfully created!\``);
            } else {
              money.money = money.money - +amount;
              money.save().catch(err => console.log(err));
            }
          }
        );
      }
    }
  }
};

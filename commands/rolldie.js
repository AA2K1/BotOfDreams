const { MessageEmbed, MessageCollector } = require("discord.js");
const Player = require("../models/player.js");
const Money = require("../models/money.js");
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://aa2k:Adam2006@botofdreams-dv0if.mongodb.net/test?retryWrites=true&w=majority";
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

    //     //collect bet, money or xp, and -die type-
    message.channel.send(
      `\`What kind of die would you like to roll? Your options are ${dieTypes}. Type the die you would like, or type cancel to cancel.\``
    );
    const filter = m =>
      (!m.author.bot && m.content.includes("cancel")) ||
      dieTypes.includes(m.content);
    const collector = new MessageCollector(message.channel, filter, {
      max: 1
    });

    collector.on("collect", m => {
      console.log(`Collected ${m.content}.`);
      dieOfChoice = m.content;
      if (dieOfChoice === "cancel") {
        return message.channel.send(
          "So, the game is over...what a truly foolish end."
        );
      } else {
        if (!dieTypes.includes(dieOfChoice)) {
          message.channel.send("`That's not a valid option!`");
        } else {
          message.channel.send(
            `\`Now, will you bet xp or money? Type xp for xp, and money for money. If you would like to cancel, just type cancel. Pretty self-explanatory.\``
          );
          const filter1 = l =>
            !l.author.bot &&
            (l.content.includes("xp") ||
              l.content.includes("money") ||
              l.content.includes("cancel"));
          const collector1 = new MessageCollector(message.channel, filter1, {
            max: 1
          });
          collector1.on("collect", m => {
            console.log(`Collected ${m.content}.`);
            betofChoice = m.content;
            if (dieOfChoice === "cancel") {
              return message.channel.send(
                "So, the game is over...what a truly foolish end."
              );
            } else {
              message.channel.send(
                `\`Now for how much you will bet. What'll it be?\``
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
                console.log(`Collected ${m.content}.`);
                bet = m.content;
                if (isNaN(bet)) {
                  return message.channel.send(
                    "`We bet money here, not your dumb letters.`"
                  );
                } else {
                  message.channel.send(
                    `\`Now for the betting. You can pick between a range of 1 and ${+dieOfChoice}. So, what'll it be?\``
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
                    console.log(`Collected ${m.content}.`);
                    diePick = m.content;
                    if (isNaN(diePick)) {
                      return message.channel.send(
                        "`We bet money here, not your dumb letters.`"
                      );
                    }
                    let dieRoll =
                      Math.round(Math.random() * (+dieOfChoice - 1)) + 1;
                    message.channel.send(`\`${dieRoll}\``);
                    if (dieRoll === Number(diePick)) {
                      win(bet, betofChoice, dieOfChoice);
                    } else {
                      lose(bet, betofChoice, dieOfChoice);
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
        Money.findOne(
          {
            userID: message.author.id,
            serverID: message.guild.id
          },
          (err, player) => {
            if (err) console.log(err);
            if (!player) {
              message.channel.send("`You don't have any stats lol`");
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
            userID: message.author.id,
            serverID: message.guild.id
          },
          (err, money) => {
            if (err) console.log(err);
            if (!money) {
              message.channel.send("`You don't have any money lol`");
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
            userID: message.author.id,
            serverID: message.guild.id
          },
          (err, money) => {
            if (err) console.log(err);
            if (!money) {
              message.channel.send("`You don't have any money lol`");
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

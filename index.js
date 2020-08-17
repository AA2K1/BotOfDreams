const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const {
  Client,
  MessageEmbed,
  Collection,
  MessageAttachment,
  MessageCollector
} = require("discord.js");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const Money = require("./models/money");
const Player = require("./models/player");
const Pog = require("./models/pog");
const snekfetch = require("snekfetch");
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
const fs = require("fs");
let colours = require("./colours.json");
let maxXp = Math.floor(Math.random() * 300) + 500;
const client = new Client({
  disableEveryone: true
});
const prefix = "//";

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.emojis = new Collection();
let cooldowns = new Collection();
let achieveTriggers = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  client.commands.set(command.aliases, client.aliases);
  client.categories.set(command.category, client.categories);
}

const achieveTriggerFiles = fs
  .readdirSync("./achieveTriggers/")
  .filter(file => file.endsWith(".js"));
for (const file of achieveTriggerFiles) {
  const command = require(`./achieveTriggers/${file}`);
  achieveTriggers.set(command.name, command);
}



config({
  path: __dirname + "/.env"
});

const activities_list = [
  `with big brain code.`,
  `${prefix}help`
];

client.on("ready", () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);
  console.log(`Let us start the game, ${client.user.username}.`);
});

client.on("message", async message => {
  client.emojis.cache.set("pog", "715433730336096288");
  client.emojis.cache.set("poggers", "715694111927304288");
  const pog = client.emojis.cache.get("715433730336096288");
  const poggers = client.emojis.cache.get("715694111927304288");
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if (message.mentions.members.username == client.user.username) {
      client.commands.get("help").run(message, args, client, prefix);
    } else {
      if (message.content.toLowerCase() === "sans") {
        achieveTriggers.get("sans").run(message, args, client, cmd);
      } else if (message.content.toLowerCase() === "pog") {
        achieveTriggers.get("pog").run(message, args, client, cmd);
      } else if (message.content.toLowerCase() === "poggers") {
        achieveTriggers.get("poggers").run(message, args, client, cmd);
      } else if (message.content.toLowerCase() === "weirdchamp") {
        achieveTriggers.get("weirdchamp").run(message, args, client, cmd);
      } else if (message.content.toLowerCase() == "ez" || message.content.toLowerCase() == "ez clap") {
        achieveTriggers.get("ez").run(message, args, client, cmd);
      }
    }
  } else {
    const command =
      client.commands.get(cmd) ||
      client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if (!cooldowns.has(command.name) && message.content.startsWith(prefix)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 30) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const embed = new MessageEmbed()
          .setColor(colours.info)
          .setTitle(`Hold your horses there, ${message.author.username}.`)
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL());
        if (cmd === "daily") {
          embed.setDescription(
            `**You gotta wait \`${Math.ceil(
              timeLeft.toFixed(1) / 86400
            )}\` day(s) before using \`${cmd}\` again.**`
          );
        } else {
          embed.setDescription(
            `**You gotta wait \`${Math.ceil((10 * timeLeft.toFixed(1)) / 60) /
              10}\` minute(s) before using \`${cmd}\` again.**`
          );
        }
        return message.channel.send(embed);
      }
    }
    // async function coinAchievement(coins) {
    //   Pog.findOne(
    //     {
    //       userID: message.author.id
    //     },
    //     (err, pogs) => {
    //       if (err) console.log(err);
    //       if (!pogs) {
    //         const newPog = new Pog({
    //             userID: message.author.id,
    //             username: message.author.tag,
    //             achievements: [],
    //             pogs: 0,
    //             poggers: 1,
    //             weirdchamps: 0,
    //             sans: 0,
    //             yankeewithbrim: 0,
    //             yankeewithnobrim: 0
    //           });
    //           pogs.achievements.push(`💵: Broke(not for long)`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Congratulations! You have found the achievement:\`💵: Broke(not for long). \`Make sure you get more of these coins by doing commands and battling.\`\``
    //           );
    //       } else {
    //         if (coins.money >= 1 && coins.money <= 45) {
    //           pogs.achievements.push(`💵: Broke(not for long)`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Congratulations! You have found the achievement:\`💵: Broke(not for long). \`Make sure you get more of these coins by doing commands and battling.\`\``
    //           );
    //         } else if (coins.money == 100) {
    //           pogs.achievements.push(`💸: Sufficient`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Congratulations! You have found the achievement:\`💸: Sufficient. \`Make sure you get more of these coins by doing commands and battling.\`\``
    //           );
    //         } else if (coins.money == 1000) {
    //           pogs.achievements.push(`💰: Getting Richer`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Congratulations! You have found the achievement:\`💰: Getting Richer. \`Make sure you get more of these coins by doing commands and battling.\`\``
    //           );
    //         } else if (coins.money == 20000) {
    //           pogs.achievements.push(`🤑: Big Bucks`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Congratulations! You have found the achievement:\`🤑: Big Bucks. \`You're almost a millionaire, you just got 80,000 more coins to go.\`\``
    //           );
    //         } else if (coins.money == 1000000) {
    //           pogs.achievements.push(`🏦: Millionaire`);
    //           pogs.save().catch(err => console.log(err));
    //           message.author.send(
    //             `\`Wow! You actually found the achievement:\`🏦: Millionaire. \`I don't know how you've done it, but you somehow managed to get a million dollars. You're basically set for life!\`\``
    //           );
    //         }
    //       }
    //     }
    //   );
    // }
    if (message.content.startsWith(prefix)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      let coinAmt = Math.floor(Math.random() * 15) + 30;
      let baseAmt = Math.floor(Math.random() * 15) + 30;
      console.log(`${coinAmt}:${baseAmt}`);
      if (coinAmt === baseAmt) {
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
                money: coinAmt
              });

              newMoney.save().catch(err => console.log(err));
              let firstCoinEmbed = new MessageEmbed()
                .setAuthor(`🤑${message.author.username}🤑`)
                .setColor(colours.economy)
                .setDescription(
                  `**${coinAmt}** coins are yours! And they're your first! You can get more of these by using commands.`
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(firstCoinEmbed);
              //coinAchievement(money);
            } else {
              let coinEmbed = new MessageEmbed()
                .setAuthor(`🤑${message.author.username}🤑`)
                .setColor(colours.economy)
                .setDescription(`**${coinAmt}** coins are yours!`)
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(coinEmbed);
              money.money = money.money + coinAmt;
              money.save().catch(err => console.log(err));
            }
          }
        );
      }
      let commandfile =
        client.commands.get(cmd) ||
        client.commands.find(c => c.aliases && c.aliases.includes(cmd));
      if (commandfile) {
        commandfile.run(message, args, client, prefix, cmd);
      } else {
        return;
      }
    } else {
    }
    let xpAdd = Math.floor(Math.random() * 5) + 15;
    console.log(`xpAdd: ${xpAdd}`);
    Player.findOne(
      {
        userID: message.author.id,
        serverID: message.guild.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats) {
          const newPlayer = new Player({
            userID: message.author.id,
            username: message.member.user.tag,
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
          message.reply("your stats are saved.");
          let lvlUp = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`${message.author.username} has gained his first XP!`)
            .setDescription(
              `These first stats will be the stepping stone for your success as a fighter.`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(lvlUp).then(m => m.delete({ timeout: 25000 }));
        } else {
          let lvl = stats.level;
          const toNxtLvl = maxXp * lvl;
          console.log("ToNxtLvl " + toNxtLvl);
          stats.xp = stats.xp + xpAdd;
          stats.save().catch(err => console.log(err));
          if (stats.xp >= toNxtLvl) {
            stats.level = stats.level + 1;
            Pog.findOne(
              {
                userID: message.author.id
              },
              (err, pogs) => {
                if (err) console.log(err);
                if (!pogs) {
                  const newPog = new Pog({
                    userID: message.author.id,
                    username: message.author.tag,
                    achievements: [],
                    pogs: 0,
                    poggers: 0,
                    weirdchamps: 0,
                    sans: 0,
                    yankeewithbrim: 0,
                    yankeewithnobrim: 0
                  });
                }
                if (stats.level == 3) {
                  message.author.send(
                    "`Nice job! You got the achievement: 🗑️: Amateur. You can get more of these types of achievements by leveling up.`"
                  );
                  pogs.achievements.push("🗑️: Amateur");
                  pogs.save().catch(err => console.log(err));
                } else if (stats.level == 10) {
                  message.author.send(
                    "`Nice job! You got the achievement: 🎗️: Experienced. You can get more of these types of achievements by leveling up.`"
                  );
                  pogs.achievements.push("🎗️: Experienced");
                  pogs.save().catch(err => console.log(err));
                } else if (stats.level == 25) {
                  message.author.send(
                    "`Nice job! You got the achievement: 🎖️: Expert. You're getting more and more experienced. Keep it up!`"
                  );
                  pogs.achievements.push("🎖️: Expert");
                  pogs.save().catch(err => console.log(err));
                } else if (stats.level == 50) {
                  message.author.send(
                    "`Wow! You got the achievement: 🏅: Master. You're becoming an expert, and a proficient fighter on the battlefield. Good job!`"
                  );
                  pogs.achievements.push("🏅: Master");
                  pogs.save().catch(err => console.log(err));
                } else if (stats.level == 100) {
                  message.author.send(
                    "`Oh my gosh! You got the achievement: 🏆: Legend. You've finally done it! I never thought I would see the day, but you have mastered the ins-and-outs of the battlefield.`"
                  );
                  pogs.achievements.push("🏆: Legend");
                  pogs.save().catch(err => console.log(err));
                }
              }
            );

            stats.xp = 0;
            let strengthInc = Math.floor(Math.random() * 10) + 5;
            let magicInc = Math.floor(Math.random() * 10) + 5;
            let vitalInc = Math.floor(Math.random() * 10) + 5;
            let agilInc = Math.floor(Math.random() * 10) + 5;
            stats.stats.set(
              "strength",
              stats.stats.get("strength") + strengthInc
            );
            stats.stats.set("magic", stats.stats.get("magic") + magicInc);
            stats.stats.set(
              "vitality",
              stats.stats.get("maxvitality") + vitalInc
            );
            stats.stats.set("vitality", stats.stats.get("maxvitality"));
            stats.stats.set("agility", stats.stats.get("agility") + agilInc);
            let lvlUpEmbed = new MessageEmbed()
              .setColor(colours.stats)
              .setTitle(`🎺🎺 ${message.author.username} leveled up! 🎺🎺`)
              .setThumbnail(message.author.avatarURL())
              .setDescription(
                `**Level:** ${stats.level}\n **XP Until Next Level: ** ${toNxtLvl}\n`
              )
              .addField(
                "**Stats: **",
                `Strength: ${stats.stats.get(
                  "strength"
                )}\n Magic: ${stats.stats.get(
                  "magic"
                )}\nVitality: ${stats.stats.get("vitality")}/${stats.stats.get(
                  "maxvitality"
                )}\nAgility: ${stats.stats.get("agility")}`
              )
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel
              .send(lvlUpEmbed)
              .then(m => m.delete({ timeout: 25000 }));
          }
        }
      }
    );
    const mention = message.mentions.users.first() || message.author;
    if (mention.id == client.user.id) {
      client.commands.get("help").run(message, args, client, prefix);
    } else {
      return;
    }
  }
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  // client.on('debug', info => console.log(info));
});

client.on("disconnect", () => console.error("Connection lost..."));
client.on("reconnecting", () => console.log("Attempting to reconnect..."));
client.on("error", error => console.error(error));
client.on("warn", info => console.error(info));
client.login(process.env.TOKEN);

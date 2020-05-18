let { MessageEmbed } = require("discord.js");
const fs = require("fs");
let classes = require("../classes.json");
let colours = require("../colours.json");
let xp = require("../xp.json");
const { promptMessage } = require("../functions.js");
const emojiCharacters = require("../emojichraracters.js");
const Player = require("../models/player");
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

module.exports = {
  name: "removeclass",
  aliases: ["remove"],
  cooldown: 45,
  category: "stats",
  description:
    "Removes the class that you have so that you can pick another one.",
  run: async (message, args, client, prefix) => {
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
          if (stats.class === "peasant") {
            message.reply(`you can't remove the peasant class. Use ${prefix}class to get a class!`)
          } else {
            message.reply('Are you willing to start anew with a different class? Your stats will be wiped. Yes: type y. No: type n')
            const filter = m =>
              m.content.includes("y") || m.content.includes("n");
            const collector = message.channel.createMessageCollector(filter, {
              time: 10000
            });

            collector.on("collect", m => {
              if (m.content == 'y') {
                removeClass(stats.class);
                stats.save().catch(err => console.log(err));
                message.channel.send('Successfully removed your class.')
              } else if (m.content == 'n') {
                message.channel.send(
                  "It seems you will wait until next time. Until then."
                );
              }
            });
          }
        }
        function removeClass(classChoice) {
          if (classChoice === "mage") {
            stats.class = "peasant";
            stats.stats.set("strength", 5);
            stats.stats.set("vitality", 10);
            stats.stats.set('maxvitality', 10);
            stats.stats.set("agility", 10);
            stats.stats.set("magic", 0);
          } else if (classChoice === "warrior") {
            stats.class = "peasant";
            stats.stats.set("strength", 5);
            stats.stats.set("vitality", 10);
            stats.stats.set('maxvitality', 10);
            stats.stats.set("agility", 10);
            stats.stats.set("magic", 0);
          } else if (classChoice === "cleric") {
            stats.class = "peasant";
            stats.stats.set("strength", 5);
            stats.stats.set("vitality", 10);
            stats.stats.set('maxvitality', 10);
            stats.stats.set("agility", 10);
            stats.stats.set("magic", 0);
          } else if (classChoice === "thief") {
            stats.class = "peasant";
            stats.stats.set("strength", 5);
            stats.stats.set("vitality", 10);
            stats.stats.set('maxvitality', 10);
            stats.stats.set("agility", 10);
            stats.stats.set("magic", 0);
          }
        }
      }
    );
  }
};

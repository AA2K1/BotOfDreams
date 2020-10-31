
const { MessageEmbed } = require("discord.js");
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

let colours = require("../colours.json");
module.exports = {
  name: "level",
  cooldown: 3,
  aliases: ["lvl", "stats"],
  category: "stats",
  description: "Returns level, and xp until next level.",
  run: async (message, args, client, prefix) => {
    let user = message.mentions.users.first() || message.author;
    Player.findOne(
      {
        userID: user.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats) {
          const newPlayer = new Player({
            userID: user.id,
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
          let lvlUpEmbed = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`\`Stats for: ${user.username}\``)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(
              `**Level:** ${stats.level}\n **XP: ** ${stats.xp}\n **Class: ** ${stats.class.toUpperCase()}\n`
            )
            .addField(
              "**Stats: **",
              `Strength: ${stats.stats.get(
                "strength"
              )}\n Magic: ${stats.stats.get(
                "magic"
              )}\nVitality: ${stats.stats.get(
                "vitality"
              )}/${stats.stats.get('maxvitality')}\nAgility: ${stats.stats.get("agility")}`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel
            .send(lvlUpEmbed)
            .then(m => m.delete({ timeout: 25000 }));
        }
      }
    );
  }
};

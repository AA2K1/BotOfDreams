let { MessageEmbed } = require("discord.js");
const fs = require("fs");
let classes = require("../classes.json");
let colours = require("../colours.json");
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
let strengthincrease;
let vitalIncrease;
let agilityIncrease;
let magicIncrease;

module.exports = {
  name: "class",
  aliases: ["chooseclass"],
  cooldown: 45,
  category: "stats",
  description: "Lets you choose a class, which influences stats.",

  run: async (message, args, client) => {
    let classesPool = ["🧙‍♂️", "⚔️", "💗", "🕵️"];
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
          let lvlUp = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`\`${message.author.username} has gained his first XP!\``)
            .setDescription(
              `**These first stats will be the stepping stone for your success as a fighter.**`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(lvlUp).then(m => m.delete({ timeout: 25000 }));
        } else {
          if (stats.class === "peasant") {
            message.reply(
              "you can only pick your class once. Are you willing to choose it now? Yes: type y. No: type n."
            );
            const filter = m =>
              m.content.includes("y") || m.content.includes("n");
            const collector = message.channel.createMessageCollector(filter, {
              time: 10000
            });

            collector.on("collect", m => {
              if (m.content == 'y') {
                getClass();
              } else if (m.content == 'n') {
                message.channel.send(
                  "It seems you will wait until next time. Until then."
                );
              }
            });
          } else {
            message.reply("Hey! You already have a class! It's " + stats.class);
          }
        }
        async function getClass() {
          let chooseClassEmbed = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(
              "`Pick a class: React to this message to pick your class.`"
            )
            .setDescription(
              `🧙‍♂️: Mage\n\n⚔️: Warrior\n\n💗: Cleric\n\n🕵️: Thief\n\n`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          let m = await message.channel.send(chooseClassEmbed);
          const reacted = await promptMessage(
            m,
            message.author,
            30,
            classesPool
          );
          const classchoice = choice(reacted);
          stats.save().catch(err => console.log(err));
          let classEmbed = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`**${message.author.username}'s class is: **`)
            .setDescription(`\`${classchoice}!\``)
            .addField(
              `**Stats: **`,
              `Strength: ${stats.stats.get(
                "strength"
              )}\nMagic: ${stats.stats.get(
                "magic"
              )}\nVitality: ${stats.stats.get(
                "vitality"
              )}/${stats.stats.get('maxvitality')}\nAgility: ${stats.stats.get("agility")}\n`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(classEmbed);
        }
        function choice(choice) {
          if (choice === "🧙‍♂️") {
            stats.class = "mage";
            stats.stats.set("strength", stats.stats.get("strength") + 1);
            stats.stats.set("maxvitality", stats.stats.get("maxvitality") + 2);
            stats.stats.set('vitality', stats.stats.get('maxvitality'));
            stats.stats.set("agility", stats.stats.get("agility") + 7);
            stats.stats.set("magic", stats.stats.get("magic") + 10);
            return "Mage 🧙‍♂️";
          } else if (choice === "⚔️") {
            stats.class = "warrior";
            stats.stats.set("strength", stats.stats.get("strength") + 8);
            stats.stats.set("maxvitality", stats.stats.get("maxvitality") + 5);
            stats.stats.set('vitality', stats.stats.get('maxvitality'));
            stats.stats.set("agility", stats.stats.get("agility") + 3);
            stats.stats.set("magic", 2);
            return "Warrior ⚔️";
          } else if (choice === "💗") {
            stats.class = "cleric";
            stats.stats.set("strength", stats.stats.get("strength") + 1);
            stats.stats.set("maxvitality", stats.stats.get("maxvitality") + 10);
            stats.stats.set('vitality', stats.stats.get('maxvitality'));
            stats.stats.set("agility", stats.stats.get("agility") + 4);
            stats.stats.set("magic", stats.stats.get("magic") + 7);
            return "Cleric 💗";
          } else if (choice === "🕵️") {
            stats.class = "thief";
            stats.stats.set("strength", stats.stats.get("strength") + 4);
            stats.stats.set("maxvitality", stats.stats.get("maxvitality") + 4);
            stats.stats.set('vitality', stats.stats.get('maxvitality'));
            stats.stats.set("agility", stats.stats.get("agility") + 8);
            stats.stats.set("magic", stats.stats.get("magic") + 1);
            return "Thief 🕵️";
          }
        }
      }
    );
  }
};

let { MessageEmbed } = require("discord.js");
const fs = require("fs");
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

module.exports = {
  name: "removeclass",
  aliases: ["remove"],
  cooldown: 45,
  category: "stats",
  description:
    "Removes the class that you have so that you can pick another one.",
  run: async (message, args, client, prefix) => {
    let chooseArr = ["✔️", "❌"];
    Player.findOne(
      {
        userID: message.author.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats) {
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
          if (stats.class === "peasant") {
            return message.channel.send("`ERROR: You cannot remove the peasant class.`")
          } else {
            prompt();
          }
        }

        async function prompt() {
          let chooseEmbed = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle("Would you like to proceed with removing your class?")
            .setDescription("Your class will be defaulted to the peasant class.")
          let m = await message.channel.send(chooseEmbed);
          const reacted = await promptMessage(
            m,
            message.author,
            30,
            chooseArr
          )

          if(reacted == "✔️") {
            removeClass();
            message.channel.send("`Your class has been successfully removed.`");
          } else return;
        }

        
        function removeClass() {
          stats.class = "peasant";
          stats.stats.set("strength", 5);
          stats.stats.set("vitality", 10);
          stats.stats.set('maxvitality', 10);
          stats.stats.set("agility", 10);
          stats.stats.set("magic", 0);
          stats.save().catch(err => console.log(err));
        }
      }
    );
  }
};

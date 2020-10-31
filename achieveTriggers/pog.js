const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
const Pog = require("../models/pog");
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
  name: "pog",
  run: async (message, args, client, cmd) => {
    const pog = "https://emoji.gg/assets/emoji/PogChamp.png";
    message.channel.send(pog).then(m => m.delete({ timeout: 15000 }));
    Pog.findOne(
      {
        userID: message.author.id
      },
      (err, pogs) => {
        if (err) console.log(err);
        if (!pogs) {
          const newPog = new Pog({
            userID: message.author.id,
            achievements: [],
            pogs: 1,
            poggers: 0,
            weirdchamps: 0,
            sans: 0,
            ez: 0
          });
          newPog.achievements.push(`First Pog`);
          newPog.save().catch(err => console.log(err));
          message.author.send(
            `\`Congratulations! You said your first pog! That means, you got the achievement: First Pog.\``
          );
        } else {
          pogs.pogs += 1;
          if (pogs.pogs == 1) {
            pogs.achievements.push(`First Pog`);
            pogs.save().catch(err => console.log(err));
            message.author.send(
              `\`Congratulations! You said your first pog! That means, you got the achievement: First Pog.\``
            );
          }
          else if (pogs.pogs == 10) {
            message.author.send(
              `\`Nice, you got the achievement: Ten Pogs\``
            );
            pogs.achievements.push(`1⃣0⃣:${pog}: Ten Pogs`);
            pogs.save().catch(err => console.log(err));
          }

          else if (pogs.pogs == 100) {
            message.author.send(
              `\`Wow! You got the achievement: 100 Pogs! That is pretty cool, pogger.\``
            );
            pogs.achievements.push(`100 Pogs`);
            pogs.save().catch(err => console.log(err));
          }
          
          else {
            pogs.save().catch(err => console.log(err));
          }
        }
      }
    );
  }
};

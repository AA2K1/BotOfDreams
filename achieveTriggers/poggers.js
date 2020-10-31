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
  name: "poggers",
  run: async (message, args, client, cmd) => {
    const poggers = "https://emoji.gg/assets/emoji/Poggers.png";
    message.channel.send(poggers).then(m => m.delete({timeout: 15000}));
    
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
            pogs: 0,
            poggers: 1,
            weirdchamps: 0,
            sans: 0,
            ez: 0
          });
          newPog.achievements.push(`First Poggers`);
          newPog.save().catch(err => console.log(err));
          message.author.send(
            `\`Congratulations! You have found the achievement: First Poggers.\nHINT: You can get an achievement by saying pog ten times.\``
          );
        } else {
          pogs.poggers += 1;
          
          if (pogs.poggers == 1) {
            pogs.achievements.push(`First Poggers`);
            pogs.save().catch(err => console.log(err));
            message.author.send(
              `\`Congratulations! You have found the achievement: First Poggers.\n\`HINT: You can get an achievement by saying pog ten times.\``
            );
          }
          else if (pogs.poggers == 10) {
            pogs.achievements.push(`Ten Poggers`);
            pogs.save().catch(err => console.log(err));
            message.author.send(
              `\`Nice! You got the achievement: Ten Poggers.\n\``
            );
          }

          else if (pogs.poggers == 100) {
            message.author.send(
              `\`Wow! You got the achievement: 100 Poggers! Keep on pogging, gamer!\``
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

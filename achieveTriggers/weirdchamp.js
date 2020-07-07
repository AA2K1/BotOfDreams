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
  name: "weirdchamp",
  run: async (message, args, client, cmd) => {
    //------------
    const weirdchamp = client.emojis.cache.get("726205989766037524");
    message.channel.send(`${weirdchamp}`).then(m => m.delete({timeout: 15000}));
    //------------
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
            weirdchamps: 1,
            sans: 0,
            ez: 0
          });
          newPog.achievements.push(`${weirdchamp}: First Weirdchamp`);
          newPog.save().catch(err => console.log(err));
          message.author.send(
            `\`Congratulations! You said your first weirdchamp! You got the achievement:\` ${weirdchamp}: \`First Weirdchamp.\``
          );
        } else {
          pogs.weirdchamps += 1;
          
          if (pogs.weirdchamps == 1) {
            message.author.send(
              `\`Nice, you got the achievement:\`${weirdchamp}: \`First Weirdchamp.\``
            );
            pogs.achievements.push(`${weirdchamp}: First Weirdchamp`);
            pogs.save().catch(err => console.log(err));
          }
          
          else if (pogs.weirdchamps == 10) {
            message.author.send(
              `\`Nice, you got the achievement:\`1⃣0⃣${weirdchamp}: \`Ten Weirdchamps\``
            );
            pogs.achievements.push(`1⃣0⃣${weirdchamp}: Ten Weirdchamps`);
            pogs.save().catch(err => console.log(err));
          }

          else if (pogs.weirdchamps == 100) {
            message.author.send(
              `\`Wow! You got the achievement:\` 💯${weirdchamp}: \`100 Weirdchamps! That is pretty cool, pogger.\``
            );
            pogs.achievements.push(`💯${weirdchamp}: 100 Weirdchamps`);
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

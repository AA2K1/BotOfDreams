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
  name: "ez",
  run: async (message, args, client, cmd) => {
    const ez = client.emojis.cache.get("726206004374667265");
    message.channel.send(`${ez}`);
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
            ez: 1
          });
          newPog.achievements.push(`${ez}: First Ez`);
          newPog.save().catch(err => console.log(err));
          message.author.send(
            `\`Congratulations! You said your first ez! That means, you got the achievement:\` ${ez}: \`First EZ.\``
          );
        } else {
          pogs.ez += 1;
          if (pogs.ez == 1) {
            pogs.achievements.push(`${ez}: First Ez`);
            pogs.save().catch(err => console.log(err));
            message.author.send(
              `\`Congratulations! You said your first ez! That means, you got the achievement:\` ${ez}: \`First EZ.\``
            );
          }
          else if (pogs.ez == 10) {
            message.author.send(
              `\`Nice, you got the achievement:\`1⃣0⃣${ez}: \`Ten EZs\``
            );
            pogs.achievements.push(`1⃣0⃣${ez}: Ten EZs`);
            pogs.save().catch(err => console.log(err));
          }

          else if (pogs.pogs == 100) {
            message.author.send(
              `\`Wow! You got the achievement:\` 💯${ez}: \`100 EZs! That is pretty cool, pogger.\``
            );
            pogs.achievements.push(`💯${ez}: 100 EZs`);
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

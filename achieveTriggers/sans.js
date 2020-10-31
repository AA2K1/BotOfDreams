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
  name: "sans",
  run: async (message, args, client, cmd) => {
    Pog.findOne(
      {
        userID: message.author.id
      },
      (err, sans) => {
        if (err) console.log(err);
        if (!sans) {
          const newSans = new Pog({
            userID: message.author.id,
            achievements: [],
            pogs: 0,
            poggers: 0,
            weirdchamps: 0,
            sans: 1,
            ez: 0
          });
          newSans.achievements.push("💀: First Sans");
          newSans.save().catch(err => console.log(err));
          message.author.send(
            "`Congrats on saying your first sans! Even though sans is listening to lofi beats rn, I can say in his behalf that he is proud of you for calling him. Gained the 💀 achievement: First Sans`"
          );
          const embed = new MessageEmbed()
            .setColor(colours.fun)
            .setTitle("**Sans is listening to lofi beats rn**")
            .setDescription("**He doesn't want to be disturbed**")
            .setImage(
              "https://media.tenor.com/images/886108cf9522baa385c9a31187befa32/tenor.gif"
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
        } else {
          sans.sans += 1;
          if (sans.sans == 1) {
            sans.achievements.push("💀: First Sans");
            sans.save().catch(err => console.log(err));
            message.author.send(
              "`Congrats on saying your first sans! Even though sans is listening to lofi beats rn, I can say in his behalf that he is proud of you for calling him. Gained the 💀 achievement: First Sans`"
            );
          } else if (sans.sans == 10) {
            message.author.send(
              "`Nice, you got the achievement:` 1⃣0⃣💀: `Ten Sans`"
            );
            sans.achievements.push("1⃣0⃣💀: Ten Sans");
            sans.save().catch(err => console.log(err));
          } else if (sans.sans == 100) {
            message.author.send(
              "`Wow! You got the achievement:` 💯💀: `100 Sans. That is pretty cool bro.`"
            );
            sans.achievements.push("💯💀: 100 Sans");
            sans.save().catch(err => console.log(err));
          } else {
            const embed = new MessageEmbed()
              .setColor(colours.fun)
              .setTitle("**Sans is listening to lofi beats rn**")
              .setDescription("**He doesn't want to be disturbed**")
              .setImage(
                "https://media.tenor.com/images/886108cf9522baa385c9a31187befa32/tenor.gif"
              )
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
            sans.save().catch(err => console.log(err));
          }
        }
      }
    );
  }
};

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
    const pog = client.emojis.cache.get("715433730336096288");
    let pogimages = [
      "https://i.redd.it/bvmxrvfuoka41.jpg",
      "https://cdn131.picsart.com/318402728358201.png?type=webp&to=min&r=240",
      "https://i.redd.it/h3twynz0uxf41.png",
      "https://i.redd.it/3w61wmud4tj41.png",
      "https://discordemoji.com/assets/emoji/PogChamp.png",
      "https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2Ff20bb68e-01fc-42b9-9724-5002a98656ef.image.png?1590289064407",
      "https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2F8638680d-cbd7-4536-ba64-c27fab1d99f5.image.png?v=1590289293439"
    ];
    let randompog = pogimages[Math.floor(Math.random() * pogimages.length)];
    console.log(randompog);
    const embed = new MessageEmbed()
      .setColor(colours.fun)
      .setImage(randompog)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL());
    switch (randompog) {
      case "https://i.redd.it/bvmxrvfuoka41.jpg":
        embed.setTitle("`Pog fish with teeth`");
        break;
      case "https://cdn131.picsart.com/318402728358201.png?type=webp&to=min&r=240":
        embed.setTitle("`Poggers fish`");
        break;
      case "https://i.redd.it/h3twynz0uxf41.png":
        embed.setTitle("`Weird pog fish`");
        break;
      case "https://i.redd.it/3w61wmud4tj41.png":
        embed.setTitle("`No pog this time.`");
        break;
      case "https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2F8638680d-cbd7-4536-ba64-c27fab1d99f5.image.png?v=1590289293439":
        embed.setTitle("`Pogu.`");
        break;
      case "https://discordemoji.com/assets/emoji/PogChamp.png":
        embed.setTitle("`The og pog.`");
        break;
    }
    message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
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
            pogs: 1,
            poggers: 0,
            weirdchamps: 0,
            sans: 0,
            ez: 0
          });
          newPog.achievements.push(`${pog}: First Pog`);
          newPog.save().catch(err => console.log(err));
          message.author.send(
            `\`Congratulations! You said your first pog! That means, you got the achievement:\` ${pog}: \`First Pog.\``
          );
        } else {
          pogs.pogs += 1;
          if (pogs.pogs == 1) {
            pogs.achievements.push(`${pog}: First Pog`);
            pogs.save().catch(err => console.log(err));
            message.author.send(
              `\`Congratulations! You said your first pog! That means, you got the achievement:\` ${pog}: \`First Pog.\``
            );
          }
          else if (pogs.pogs == 10) {
            message.author.send(
              `\`Nice, you got the achievement:\`1⃣0⃣${pog}: \`Ten Pogs\``
            );
            pogs.achievements.push(`1⃣0⃣${pog}: Ten Pogs`);
            pogs.save().catch(err => console.log(err));
          }

          else if (pogs.pogs == 100) {
            message.author.send(
              `\`Wow! You got the achievement:\` 💯${pog}: \`100 Pogs! That is pretty cool, pogger.\``
            );
            pogs.achievements.push(`💯${pog}: 100 Pogs`);
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

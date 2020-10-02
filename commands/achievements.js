const { MessageEmbed } = require("discord.js");
let colours = require("../colours.json");
const Pog = require("../models/pog");
const mongoose = require("mongoose")
module.exports = {
  name: "achievements",
  aliases: ["a", "achieve", "achievement"],
  cooldown: 10,
  category: "stats",
  description:
    "Shows your achievements from saying pog, sans, and other things.",
  run: async (message, args, client, cmd) => {
    const pog = client.emojis.cache.get("758383329241989162");
    const poggers = client.emojis.cache.get('715694111927304288');
    Pog.findOne(
      {
        userID: message.author.id
      },
      (err, achievements) => {
        if (err) console.log(err);
        if (!achievements) {
          const newAchieve = new Pog({
            userID: message.author.id,
            username: message.author.tag,
            achievements: [],
            pogs: 0,
            poggers: 0,
            weirdchamps: 0,
            sans: 0,
            yankeewithbrim: 0,
            yankeewithnobrim: 0
          });
          newAchieve.save().catch(err => console.log(err));
          message.author.send(
            "`You have successfully started your achieving career! But, you don't have any achievements, so you might want to get on that. HINT: An easy one is saying pog once.`"
          );
        } else {
          const embed = new MessageEmbed()
            .setColor(colours.achievements)
            .setTitle(`\`${message.author.username}'s Achievements\``)
            .setDescription(`\`Achievements:\` ${achievements.achievements.join(', ')}`)
            .addField(`\`Times said various funny phrases lol:\``, `\n\`# of Pogs: ${achievements.pogs}\n# of Poggers: ${achievements.poggers}\n# of Weirdchamps: ${achievements.weirdchamps}\n# of Sans: ${achievements.sans}\n# of EZs: ${achievements.ez}\``)

          message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
        }
      }
    );
  }
};

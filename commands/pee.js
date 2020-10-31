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
  name: "pee",
  aliases: ["piss"],
  cooldown: 300,
  category: "fun",
  description: "You get xp from peeing...for some reason.",
  run: async (message, args, client, cmd) => {
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
        }
        let xpgained = (Math.floor(Math.random() * 10) + 40) * stats.level;
        let embed = new MessageEmbed()
          .setColor(colours.fun)
          .setThumbnail(message.author.displayAvatarURL())
          .setTitle(`\`${message.author.username} pees for some reason...🤔\``)
          .setDescription(`\`And somehow understands a bit more of the universe and gains ${xpgained} xp! 🤯\``)
          .setTimestamp()
          .setFooter('I guess he just needed to take a leak')
        message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
        stats.xp += xpgained;
        stats.save().catch(err => console.log(err));
      } 
    );
  }
};

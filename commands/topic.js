const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
const Topics = require("../models/topics.js");
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
let topicsList = ["Anime", "Movies", "TV Shows", "Programming", "Discord Bots", "Memes", "YouTube Drama"];
module.exports = {
    name: "topic",
    aliases: ['discusstopic', 'discussion', 'topics'],
    cooldown: 3,
    category: "fun",
    description: "Gives you a random topic to talk about for those socially inept people. Do //topic add [topic] to add a topic.",
    run: async (message, args, client, cmd) => {
      if(args[0] == "add") {
        if(args[1]) {
          args.shift();
          let phrase = args.toString();
          let fixedPhrase = phrase.replace(/,/g, " ");
          topicsList.push(fixedPhrase);
          Topics.findOne({
            id: message.guild.id
          }, (err, topics) => {
            if(err) console.log(err);
            if(!topics) {
              const newTopics = new Topics({
                id: message.guild.id,
                topicsArr: topicsList
              });

              newTopics.save().catch(err => console.log(err));
            } else {
              let inArr = false; 
              for(let i = 0; i <= topics.topicsArr.length; i++) {
                if(topics.topicsArr[i] == fixedPhrase) {
                  inArr = true;
                }
              }
              if(!inArr) {
                topics.topicsArr.push(fixedPhrase);
                message.channel.send(`\`Successfully added ${fixedPhrase} to the list.\``)
              } else {
                return message.channel.send("`ERROR: The phrase is already in the database.`");
              }
              topics.save().catch(err=> console.log(err));
            }
          })
        } else {
          return message.channel.send('`ERROR: Specify what you wanted to add to the list.`');
        }
      } else {
        Topics.findOne({
          id: message.guild.id
        }, (err, topics) => {
          if(err) console.log(err);
            if(!topics) {
              const newTopics = new Topics({
                id: message.guild.id,
                topicsArr: topicsList
              });

              newTopics.save().catch(err => console.log(err));
            } else {
              const embed = new MessageEmbed()
                .setColor(0x41c464)
                .setTitle("Conversation Topic")
                .setDescription(`The topic to talk about next is: \`${topics.topicsArr[Math.floor(Math.random() * topics.topicsArr.length)]}\``)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
              message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
          }
        })
      }
  }
}
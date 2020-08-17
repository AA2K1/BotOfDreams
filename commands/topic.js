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
            message.channel.send(`Successfully added **${args[1]}** to the list.`);
            topicsList.push(args[1]);
            Topics.findOne({
              ID: 55
            }, (err, topics) => {
              if(err) console.log(err);
              if(!topics) {
                const newTopics = new Topics({
                  ID: 55,
                  topicsArr: topicsList
                });

                newTopics.save().catch(err => console.log(err));
              } else {
                topics.topicsArr.push(args[1]);
                topics.save().catch(err=> console.log(err));
              }
            })
          } else {
            message.channel.send('`ERROR: You forgot to specify what you wanted to add to the list!`');
            return;
          }
        } else {
          Topics.findOne({
            ID: 55
          }, (err, topics) => {
            if(err) console.log(err);
              if(!topics) {
                const newTopics = new Topics({
                  ID: 55,
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
                message.channel.send(embed);
            }
          })
        }
    }
}
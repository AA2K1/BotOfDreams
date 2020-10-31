const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
let fetch = require("node-fetch").default;
module.exports = {
  name: "copypasta",
  aliases: ["cp"],
  cooldown: 3,
  category: "fun",
  description: "Shows a random copypasta",
  run: async (message, args, client, cmd) => {
    let results = await fetch("https://www.reddit.com/r/copypasta/new.json?sort=new").then(res => res.json());
    const allowed = message.channel.nsfw
      ? results.data.children
      : results.data.children.filter(post => post.data.selftext.length <= 2044 && !post.data.selftext.includes("u/RepostRavioli"));
    if (!allowed.length)
      return message.channel.send(
        "`ERROR: I am out of copypastas to give you.`"
      );
    let randomnumber = Math.floor(Math.random() * allowed.length);
    let randomPost = allowed[randomnumber].data;
    let postEmbed = new MessageEmbed() 
      .setColor(colours.fun)
      .setTitle("Title: " + randomPost.title)
      .setFooter("Upvotes: " + randomPost.ups + "  | Author: " + randomPost.author)
    if(!randomPost.over_18) {
      postEmbed.setDescription(randomPost.selftext)
    } else {
      postEmbed.setDescription("||" + randomPost.selftext + "||")
    }
    message.channel.send(postEmbed).then(msg => msg.delete({timeout: 15000}));
  }
}
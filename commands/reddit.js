const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch").default;
const colours = require("../colours.json");
module.exports = {
  name: "reddit",
  cooldown: 15,
  aliases: ["imagereddit"],
  category: "fun",
  description: "Shows an image from any image subreddit.",
  run: async (message, args, client, prefix) => {
    if (args.length == 1) {
      const subReddit = args[0].toLowerCase();
      const results = await fetch(`https://www.reddit.com/r/${subReddit}.json?sort=top&t=week`)
      .then(res => res.json());
      const allowed = message.channel.nsfw
        ? results.data.children
        : results.data.children.filter(post => !post.data.over_18);
      if (!allowed.length)
        return message.channel.send(
          "It seems we are out of fresh memes or the subreddit you typed is not a subreddit! Try again later."
        );
      const randomnumber = Math.floor(Math.random() * allowed.length);
      const embed = new MessageEmbed()
        .setColor(colours.fun)
        .setAuthor(`From /r/${subReddit}`)
        .setTitle(`Title of fresh meme: \`${allowed[randomnumber].data.title}\``)
        .setDescription(
          `Posted by fellow memer: \`${allowed[randomnumber].data.author}\``
        )
        .setImage(allowed[randomnumber].data.url)
        .addField(
          "Other info:",
          `**Updoots: ** \`${allowed[randomnumber].data.ups}\``,
          true
        )
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());
      message.channel.send(embed);
    } else {
      message.reply(
        `\`ERROR: Specify a subreddit. If you want random memes, try ${prefix}meme.\``
      );
    }
  }
};

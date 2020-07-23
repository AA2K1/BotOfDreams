const { MessageEmbed } = require("discord.js");
const snekfetch = require("snekfetch");
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
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${subReddit}.json?sort=top&t=week`)
        .query({ limit: 800 });
      const allowed = message.channel.nsfw
        ? body.data.childrenar
        : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length)
        return message.channel.send(
          "It seems we are out of fresh memes! Try again later."
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

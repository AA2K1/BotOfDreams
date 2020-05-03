const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    config: {
        name: "meme",
        aliases: ["memes", "maymay"],
        usage: `~meme`,
        category: "fun",
        description: "Sends a random dank meme through an embed",
    },
    run: async (message, args, client) => {
        if (args.length < 1) {
            const subReddits = ["dankmemes", "xkcd", "me_irl", "meme", "dankmeme", "cursedcomments", "cursedimages", "blursedimages"];
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];
            message.channel.send("Your juicy meme, sir.");
            const img = await randomPuppy(random);
            const embed = new MessageEmbed()
                .setColor(0x96fac5)
                .setImage(img)
                .setTitle(`From /r/${random}`)
                .setURL(`https://www.reddit.com/r/${random}/`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(embed);
        } else {
            message.reply("ERROR: Cannot input subreddit name. For that, use ~reddit.")
        }
    }
}


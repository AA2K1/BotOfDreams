const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
module.exports = {
    name: "reddit",
    category: "fun",
    description: "Shows an image from any image subreddit.",
    run: async (message, args, client) => {
        if(args.length == 1) {
            const subReddit = args[0];
            message.channel.send("Your juicy meme, sir. (If it's from /r/okbuddyretard, it's not gonna show up becuase it's not supported.)");
            const image = await randomPuppy(subReddit);
            const embed = new MessageEmbed()
                .setColor(0x96fac5)
                .setImage(image)
                .setTitle(`From /r/${subReddit}`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(embed);
        } else {
            message.reply("ERROR: Specify a subreddit. If you want random memes, try ~meme.")
        }
    }
}
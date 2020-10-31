const { MessageEmbed } = require('discord.js');
let colours = require("../colours.json");
module.exports = {
    name: "support",
    aliases: ['paypal'],
    cooldown: 3,
    category: "info",
    description: "Shows you my PayPal. It would be very cash money of you if you supported me.",
    run: async (message, args, client, cmd) => {
      let embed = new MessageEmbed() 
        .setColor("0x3970b8")
        .setTitle(`monkecoder's Paypal.Me`)
        .setDescription(`Hey! If you want to support me so I can make more stuff like this, consider donating to my Paypal!`)
        .setURL("https://paypal.me/thetf2gamer1?locale.x=en_US")
        .setFooter("It would be very cash money of you")
      message.channel.send(embed).then(msg => msg.delete({ timeout: 15000 }));
    }
}
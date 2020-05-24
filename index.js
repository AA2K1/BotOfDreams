var http = require("http");

http
  .createServer(function(request, response) {
    //The following code will print out the incoming request text
    request.pipe(response);
  })
  .listen(1988, "127.0.0.1");

console.log("Listening on port 1988...");
const {
  Client,
  MessageEmbed,
  Collection,
  MessageAttachment,
  MessageCollector
} = require("discord.js");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const Money = require("./models/money");
const Player = require("./models/player");
const snekfetch = require("snekfetch");
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
const fs = require("fs");
let classes = require("./classes.json");
let colours = require("./colours.json");
let maxXp = Math.floor(Math.random() * 300) + 500;
const client = new Client({
  disableEveryone: true
});
const prefix = "//";

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
let cooldowns = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  client.commands.set(command.aliases, client.aliases);
  client.categories.set(command.category, client.categories);
}

config({
  path: __dirname + "/.env"
});

const activities_list = [
  "okbuddyretard because I'm funny",
  "with some big brain books",
  "with some big brain code",
  "with memes",
  "Danganronpa because I'm a weeb",
  "Persona because I like pancakes",
  `${prefix}help`
];

client.on("ready", () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);
});

client.on("ready", () => {
  console.log(`Let us start the game, ${client.user.username}.`);
});

client.on("message", async message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find(c => c.aliases && c.aliases.includes(cmd));
  if (message.mentions.members.username == client.user.username) {
    client.commands.get("help").run(message, args, client, prefix);
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if (message.content.toLowerCase().includes("sans")) {
      const embed = new MessageEmbed()
        .setColor(colours.fun)
        .setTitle("**Sans is listening to lofi beats rn**")
        .setDescription("**He doesn't want to be disturbed**")
        .setImage(
          "https://media.tenor.com/images/886108cf9522baa385c9a31187befa32/tenor.gif"
        )
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());
      message.channel.send(embed);
    } else if (
      message.content === "wanna get on vc" ||
      message.content === "wanna get on vc?"
    ) {
      return message.channel.send("lmao imagine getting on vc");
    } else if (message.content.toLowerCase().includes("yankee")) {
      message.channel.send(`\`With brim or with no brim?\``);
      const filter = m =>
        (!m.author.bot && m.content.toLowerCase() === "with") ||
        m.content.toLowerCase() === "brim" ||
        m.content.toLowerCase() === "with brim" ||
        m.content.toLowerCase() === "with no" ||
        m.content.toLowerCase() === "no brim";
      const collector = new MessageCollector(message.channel, filter, {
        max: 1
      });

      collector.on("collect", m => {
        if (m.content.toLowerCase() === "with no" || m.content.toLowerCase() === 'no brim') {
          const embed = new MessageEmbed()
            .setColor(colours.fun)
            .setTitle(`\`Yankee with no brim.\``)
            .setImage(
              "https://d2lllwtzebgpl1.cloudfront.net/98ff0c5836b1eb2bd73885ad868e8cc6_listingImg2_mtA1UteXd2.jpg"
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(embed).then(m => m.delete({timeout: 15000}))
        } else if (m.content.toLowerCase() === "with" || m.content.toLowerCase() === 'brim' || m.content.toLowerCase() === 'with brim') {
          const embed = new MessageEmbed()
            .setColor(colours.fun)
            .setTitle(`\`Yankee with brim.\``)
            .setImage(
              "https://www.ecapcity.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/n/e/new-york-yankees-new-era-59fifty-fitted-hats-_navy-red-under-brim_-1.jpg"
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(embed).then(m => m.delete({timeout: 15000}))
        } else {
          message.channel.send(`\`Yankee hater.\``);
        }
      });
    } else if(message.content.toLowerCase().includes('pog')) {
      let pogimages = ['https://i.redd.it/bvmxrvfuoka41.jpg', 'https://cdn131.picsart.com/318402728358201.png?type=webp&to=min&r=240', 'https://i.redd.it/h3twynz0uxf41.png', 'https://i.redd.it/3w61wmud4tj41.png', 'https://discordemoji.com/assets/emoji/PogChamp.png', 'https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2Ff20bb68e-01fc-42b9-9724-5002a98656ef.image.png?1590289064407', 'https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2F8638680d-cbd7-4536-ba64-c27fab1d99f5.image.png?v=1590289293439']
      let randompog = pogimages[Math.floor(Math.random() * pogimages.length)]
      console.log(randompog);
      const embed = new MessageEmbed()
        .setColor(colours.fun)
        .setImage(randompog)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())
      switch (randompog) {
        case 'https://i.redd.it/bvmxrvfuoka41.jpg':
          embed.setTitle('`Pog fish with teeth`')
        break;
        case 'https://cdn131.picsart.com/318402728358201.png?type=webp&to=min&r=240':
          embed.setTitle('`Poggers fish`')
        break;
        case 'https://i.redd.it/h3twynz0uxf41.png':
          embed.setTitle('`Weird pog fish`')
        break;
        case 'https://i.redd.it/3w61wmud4tj41.png':
          embed.setTitle('`No pog this time.`')
        break;
        case  'https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2Ff20bb68e-01fc-42b9-9724-5002a98656ef.image.png?1590289064407':
          embed.setTitle('`No pog this time.`')
        break;
        case 'https://cdn.glitch.com/687a1c01-a180-42cb-b870-e7099bb8c0ab%2F8638680d-cbd7-4536-ba64-c27fab1d99f5.image.png?v=1590289293439':
          embed.setTitle('`Pogu.`')
        break;
        case 'https://discordemoji.com/assets/emoji/PogChamp.png':
          embed.setTitle('`The og pog.`')
        break;
      }
      message.channel.send(embed).then(m => m.delete({timeout: 15000}))
    }
  } else {
    if (!cooldowns.has(command.name) && message.content.startsWith(prefix)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 30) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const embed = new MessageEmbed()
          .setColor(colours.info)
          .setTitle(`Hold your horses there, ${message.author.username}.`)
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL());
        if (cmd === "daily") {
          embed.setDescription(
            `**You gotta wait \`${Math.ceil(
              timeLeft.toFixed(1) / 86400
            )}\` day(s) before using \`${cmd}\` again.**`
          );
        } else {
          embed.setDescription(
            `**You gotta wait \`${Math.ceil(10 * timeLeft.toFixed(
              1
            ) / 60) / 10}\` minute(s) before using \`${cmd}\` again.**`
          );
        }
        return message.channel.send(embed);
      }
    }
    if (message.content.startsWith(prefix)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      let coinAmt = Math.floor(Math.random() * 15) + 30;
      let baseAmt = Math.floor(Math.random() * 15) + 30;
      console.log(`${coinAmt}:${baseAmt}`);
      if (coinAmt === baseAmt) {
        Money.findOne(
          {
            userID: message.author.id,
            serverID: message.guild.id
          },
          (err, money) => {
            if (err) console.log(err);
            if (!money) {
              const newMoney = new Money({
                userID: message.author.id,
                username: message.author.tag,
                serverID: message.guild.id,
                money: coinAmt
              });

              newMoney.save().catch(err => console.log(err));
              let firstCoinEmbed = new MessageEmbed()
                .setAuthor(`🤑${message.author.username}🤑`)
                .setColor(colours.economy)
                .setDescription(
                  `**${coinAmt}** coins are yours! And they're your first! You can get more of these by using commands.`
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(firstCoinEmbed);
            } else {
              let coinEmbed = new MessageEmbed()
                .setAuthor(`🤑${message.author.username}🤑`)
                .setColor(colours.economy)
                .setDescription(`**${coinAmt}** coins are yours!`)
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL()
                );
              message.channel.send(coinEmbed);
              money.money = money.money + coinAmt;
              money.save().catch(err => console.log(err));
            }
          }
        );
      }
      let commandfile =
        client.commands.get(cmd) ||
        client.commands.find(c => c.aliases && c.aliases.includes(cmd));
      if (commandfile) {
        commandfile.run(message, args, client, prefix, cmd);
      } else {
        return;
      }
    } else {
    }
    let xpAdd = Math.floor(Math.random() * 5) + 15;
    console.log(`xpAdd: ${xpAdd}`);
    Player.findOne(
      {
        userID: message.author.id,
        serverID: message.guild.id
      },
      (err, stats) => {
        if (err) console.log(err);
        if (!stats) {
          const newPlayer = new Player({
            userID: message.author.id,
            username: message.member.user.tag,
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
          message.reply("your stats are saved.");
          let lvlUp = new MessageEmbed()
            .setColor(colours.stats)
            .setTitle(`${message.author.username} has gained his first XP!`)
            .setDescription(
              `These first stats will be the stepping stone for your success as a fighter.`
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
          message.channel.send(lvlUp).then(m => m.delete({ timeout: 25000 }));
        } else {
          let lvl = stats.level;
          const toNxtLvl = maxXp * lvl;
          console.log("ToNxtLvl " + toNxtLvl);
          stats.xp = stats.xp + xpAdd;
          stats.save().catch(err => console.log(err));
          if (stats.xp >= toNxtLvl) {
            stats.level += 1;
            stats.xp = 0;
            let strengthInc = Math.floor(Math.random() * 10) + 5;
            let magicInc = Math.floor(Math.random() * 10) + 5;
            let vitalInc = Math.floor(Math.random() * 10) + 5;
            let agilInc = Math.floor(Math.random() * 10) + 5;
            stats.stats.set(
              "strength",
              stats.stats.get("strength") + strengthInc
            );
            stats.stats.set("magic", stats.stats.get("magic") + magicInc);
            stats.stats.set(
              "vitality",
              stats.stats.get("maxvitality") + vitalInc
            );
            stats.stats.set("vitality", stats.stats.get("maxvitality"));
            stats.stats.set("agility", stats.stats.get("agility") + agilInc);
            let lvlUpEmbed = new MessageEmbed()
              .setColor(colours.stats)
              .setTitle(`🎺🎺 ${message.author.username} leveled up! 🎺🎺`)
              .setThumbnail(message.author.avatarURL())
              .setDescription(
                `**Level:** ${lvl}\n **XP Until Next Level: ** ${toNxtLvl}\n`
              )
              .addField(
                "**Stats: **",
                `Strength: ${stats.stats.get(
                  "strength"
                )}\n Magic: ${stats.stats.get(
                  "magic"
                )}\nVitality: ${stats.stats.get("vitality")}/${stats.stats.get(
                  "maxvitality"
                )}\nAgility: ${stats.stats.get("agility")}`
              )
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel
              .send(lvlUpEmbed)
              .then(m => m.delete({ timeout: 25000 }));
          }
        }
      }
    );
    const mention = message.mentions.users.first() || message.author;
    if (mention.id == client.user.id) {
      client.commands.get("help").run(message, args, client, prefix);
    } else {
      return;
    }
  }
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  // client.on('debug', info => console.log(info));
});


client.on("disconnect", () => console.error("Connection lost..."));
client.on("reconnecting", () => console.log("Attempting to reconnect..."));
client.on("error", error => console.error(error));
client.on("warn", info => console.error(info));
client.login(process.env.TOKEN);

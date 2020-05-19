var http = require('http');

http.createServer(function(request, response){

    //The following code will print out the incoming request text
    request.pipe(response);

}).listen(1988, '127.0.0.1');

console.log('Listening on port 1988...');
const {
  Client,
  MessageEmbed,
  Collection,
  MessageAttachment
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
let xp = require("./xp.json");
let classes = require("./classes.json");
let coins = require("./coins.json");
let colours = require("./colours.json");
let maxXp = Math.floor(Math.random() * 300) + 500;
const client = new Client({
  disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
let cooldowns = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  client.commands.set(command.aliases, client.aliases);
}

config({
  path: __dirname + "/.env"
});

client.once("ready", async () => {
  console.log(`Let us start the game, ${client.user.username}`);
  client.user.setActivity("maymays", { type: "WATCHING" });
});

client.on("message", async message => {
  console.log(
    `${message.author.username} said ${message.content} at ${message.createdAt}`
  );
});

client.on("message", async message => {
  const prefix = "//";
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
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  if (!cooldowns.has(command.name)) {
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
        .setDescription(
          `**You gotta wait \`${timeLeft.toFixed(
            1
          )}\` second(s) before using \`${cmd}\` again.**`
        )
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());
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
              .setDescription(`**${coinAmt}** coins are yours! And they're your first! You can get more of these by using commands.`)
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel.send(firstCoinEmbed);
          } else {
            let coinEmbed = new MessageEmbed()
              .setAuthor(`🤑${message.author.username}🤑`)
              .setColor(colours.economy)
              .setDescription(`**${coinAmt}** coins are yours!`)
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL());
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
    if (
      message.content === "wanna get on vc" ||
      message.content === "wanna get on vc?"
    )
      return message.channel.send("lmao imagine getting on vc");
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
      return message.channel.send(embed);
    }
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
});
client.on('disconnect', () => console.error('Connection lost...'));
client.on('reconnecting', () => console.log('Attempting to reconnect...'));
client.on('error', error => console.error(error));
client.on('warn', info => console.error(info));
// client.on('debug', info => console.log(info));

client.login(process.env.TOKEN);

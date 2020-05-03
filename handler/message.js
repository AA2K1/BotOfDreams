module.exports = async (message, client) => {
    const prefix = '~';
    const messageArray = message.content.split(" ");
    const args = messageArray.slice(1);//message.content.slice(1).trim().split(/ +/g);
    const cmd = messageArray[0].toLowerCase();   //args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if(cmd.length === 0) return;

    let commandfile = client.commands.get(cmd) || client.comands.get(client.aliases.get(cmd));
    if(commandfile) commandfile.run(message, args, client);

}
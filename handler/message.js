module.exports = async (message, client) => {
    const prefix = '~';
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if(cmd.length === 0) return;

    let commandfile = client.commands.get(cmd) || client.comands.get(client.aliases.get(cmd));
    if(commandfile) commandfile.run(message, args, client);

}
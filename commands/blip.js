module.exports = {
    name: "blip",
    aliases: ['ping'],
    cooldown: 15,
    category: "info",
    description: "Returns latency and API ping",
    run: async (message, args, client) => {
        message.channel.send(`Blop\nAPI Latency: ${Math.round(client.ws.ping)}`);
    }
}
module.exports = {
    config: {
        name: "blip",
        aliases: ["ping"],
        usage: `~blip`,
        category: "info",
        description: "Returns latency and API ping",
    
    },
    execute(message, args, client, prefix) {
        message.channel.send(`Blop\nAPI Latency: ${Math.round(client.ws.ping)}`);
    }
}
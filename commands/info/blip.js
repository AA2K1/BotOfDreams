module.exports = {
    config: {
        name: "blip",
        aliases: ["ping"],
        usage: `${prefix}blip`,
        category: "info",
        description: "Returns latency and API ping",
    
    },
    run: async(message, args, client) => {
        message.channel.send(`Blop\nAPI Latency: ${Math.round(client.ws.ping)}`);
    }
}
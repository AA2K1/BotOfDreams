module.exports = {
    name: "blip",
    category: "info",
    description: "Returns latency and API ping",
    execute(message, args, client) {
        message.channel.send(`Blop\nAPI Latency: ${Math.round(client.ws.ping)}`);
    }
}
module.exports = (client) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        client.channels.get("555039958121971736").send(x.join(" "));
    });
}
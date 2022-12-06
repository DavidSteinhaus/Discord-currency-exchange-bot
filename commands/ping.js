module.exports = {
  name: "ping",
  description: "pong",
  execute(client, message, args, Discord) {
    message.channel.send("pong!");
  },
};

const Discord = require("discord.js");
require("dotenv").config();
const token = process.env.CLIENT_TOKEN;
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["commands_handler", "events_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});
client.login(token);

const Discord = require('discord.js');
const token = 'OTMxMjE5NDQ4ODc3MTY2NjQz.YeBPsQ.vVVos4de3L3_kD7fcsD4gES4lmw';

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commands_handler','events_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})
client.login(token);
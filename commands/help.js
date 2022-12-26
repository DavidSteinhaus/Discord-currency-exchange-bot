module.exports = {
  name: "help",
  description: "send user friendly information",
  execute(client, message, args, Discord) {
    const embedMessage = new Discord.MessageEmbed()
      .setColor(0x446b89)
      .setTitle("Available commands: ")
      .addFields(
        {
          name: "!config add",
          value:
            "adds a new currency. example: !config add [currency one] [currency two] ...",
          inline: false,
        },
        {
          name: "!config remove",
          value:
            "removes a currency that is already in the currency list example: !config remove [currency]",
          inline: false,
        },
        {
          name: "!config remove-all",
          value: "removes all currencies for the configs.",
          inline: false,
        }
      );
    message.channel.send({ embeds: [embedMessage] });
  },
};

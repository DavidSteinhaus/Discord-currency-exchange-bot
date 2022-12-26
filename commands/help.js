module.exports = {
  name: "help",
  description: "send user friendly information",
  execute(client, message, args, Discord) {
    message.channel.send(
      "to add a new currency please use !config add [currency one] [currency two] ..."
    );
    message.channel.send(
      "to remove a currency please use !config remove [currency]"
    );
    message.channel.send(
      "to remove all currencies please use !config remove-all"
    );
    const embedMessage = new Discord.MessageEmbed()
      .setColor(0x446b89)
      .setTitle("Available commands: ")
      .addFields(
        {
          name: "!config add",
          value:
            "adds a new currency. example: !config add [currency one] [currency two] ...",
          inline: true,
        },
        {
          name: "!config remove",
          value:
            "removes a currency that is already in the currency list example: !config remove [currency]",
          inline: true,
        },
        {
          name: "!config remove-all",
          value: "removes all currencies for the configs.",
          inline: true,
        }
      );
    message.channel.send({ embeds: [embedMessage] });
  },
};

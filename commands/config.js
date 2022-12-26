const configs = require("../config/config");
module.exports = {
  name: "config",
  description: "edit bot configs",
  execute(client, message, args, Discord) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.channel.send("you must be an admin to use the !config command");
      return;
    }
    if (!configs.myEnmap.has("currencyList")) {
      return;
    }
    let currencyList = configs.myEnmap.get("currencyList");
    if (args.length == 0) {
      if (currencyList.length == 0) {
        return message.channel.send(
          "there are currently no currencies set up. please use !config add [currency] to add your first currency!"
        );
      } else {
        message.channel.send("Available currencies: ");
        currencyList.map((currency) => {
          message.channel.send(currency);
        });
      }
    }
    switch (args[0]) {
      case "add":
        for (let i = 1; i < args.length; i++) {
          if (!configs.symbole.includes(args[i].toUpperCase())) {
            message.channel.send(args[i] + " is not a valid currency symbol.");
          } else if (currencyList.includes(args[i].toUpperCase())) {
            message.channel.send(
              args[i].toUpperCase() + " is already in the list."
            );
          } else {
            configs.myEnmap.push("currencyList", args[i].toUpperCase());
            message.channel.send(
              args[i].toUpperCase() + " added successfully!"
            );
          }
        }
        break;
      case "remove":
        if (!currencyList.includes(args[1].toUpperCase())) {
          return message.channel.send("this currency is not in the list!");
        }
        configs.myEnmap.remove("currencyList", args[1].toUpperCase());
        message.channel.send(args[1].toUpperCase() + " removed successfully!");
        break;
      case "remove-all":
        configs.myEnmap.delete("currencyList");
        if (!configs.myEnmap.has("currencyList")) {
          configs.myEnmap.set("currencyList", []);
        }
        message.channel.send("All currencies were removed successfully!");
        break;
      case "set-base":
        configs.myEnmap.delete("base");
        configs.myEnmap.set("base", args[1].toUpperCase());

        message.channel.send(
          `${args[1]} is now the base exchange to currency for the !rate command.`
        );
        break;
      case "help":
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
            },
            {
              name: "!convert",
              value:
                "convert an amount to a specific currency. example: !convert [amount] [from] [to]",
              inline: false,
            }
          );
        message.channel.send({ embeds: [embedMessage] });
        break;
      default:
        break;
    }
  },
};
// TODO : comments and documentations

const configs = require("../config/config");
module.exports = {
  name: "config",
  description: "edit bot configs",
  execute(client, message, args, Discord) {
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
        message.channel.send(
          "to add a new currency please use !config add [currency one] [currency two] ..."
        );
        message.channel.send(
          "to remove a currency please use !config remove [currency]"
        );
        message.channel.send(
          "to remove all currencies please use !config remove-all"
        );
      }
    }
    switch (args[0]) {
      case "add":
        for (let i = 1; i < args.length; i++) {
          if (!configs.symbole.includes(args[i].toUpperCase())) {
            message.channel.send(args[i] + " is not a valid currency symbol.");
          } else if (currencyList.includes(args[i].toUpperCase())) {
            message.channel.send(
              args[i].toUpperCase() + " is already in the list"
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
        configs.myEnmap.deleteAll();
        if (!configs.myEnmap.has("currencyList")) {
          configs.myEnmap.set("currencyList", []);
        }
        message.channel.send("All currencies were removed successfully!");
        break;

      default:
        break;
    }
  },
};

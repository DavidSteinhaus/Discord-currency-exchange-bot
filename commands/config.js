const configs = require("../config/config");
module.exports = {
  name: "config",
  description: "edit bot configs",
  execute(client, message, args, Discord) {
    let currencyList = configs.myEnmap.get("currencyList");
    if (args.length == 0) {
      if (currencyList.length == 0) {
        return message.channel.send(
          "there are currently no currencies set up. please use !config add [currency] to add your first currency!"
        );
      } else {
        currencyList.map((currency) => {
          message.channel.send(currency);
        });
        message.channel.send(
          "to add a new currency please use !config add [currency one] [currency two] ..."
        );
        message.channel.send(
          "to remove a currency please use !config remove [currency]"
        );
      }
    }
    switch (args[0]) {
      case "add":
        for (let i = 1; i < args.length; i++) {
          configs.myEnmap.push("currencyList", args[i]);
          message.channel.send(args[i] + " added successfully!");
        }
        break;
      case "remove":
        if (!currencyList.includes(args[1])) {
          return message.channel.send("this currency is not in the list!");
        }
        configs.myEnmap.remove("currencyList", args[1]);
        message.channel.send(args[1] + " removed successfully!");
        break;
      default:
        break;
    }
    //TODO:
    // ex: !config add for agrs[+1] ....
    // error handling (only add available currencies)
    // testing
  },
};

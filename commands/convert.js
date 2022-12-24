var fx = require("../utils/money");
const getSymbolFromCurrency = require("currency-symbol-map");
const axios = require("axios");
require("dotenv").config();
const API = process.env.EXCHANGE_API;
module.exports = {
  name: "convert",
  description: "convert currency",
  execute(client, message, args, Discord) {
    if (isNaN(args[0])) {
      message.channel.send("please enter a valid number!");
      return;
    }
    (async () => {
      await axios
        .get(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
        .then((response) => {
          let data = response.data;
          fx.base = data.base;
          fx.rates = data.rates;
          try {
            const from = args[1].toUpperCase();
            const to = args[2].toUpperCase();
            fx.settings = { from: from, to: to };
            let converted = fx.convert(args[0]).toFixed(3);
            message.channel.send(
              args[0] +
                " " +
                getSymbolFromCurrency(args[1]) +
                " = " +
                converted +
                " " +
                getSymbolFromCurrency(args[2])
            );
          } catch (error) {
            message.channel.send("Please use the command like the following:");
            message.channel.send("!convert [amount] [from] [to]");
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    })();
  },
};

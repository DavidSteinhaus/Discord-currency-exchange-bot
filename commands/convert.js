var fx = require("../utils/money");
const http = require("https");
require("dotenv").config();
const API = process.env.EXCHANGE_API;
module.exports = {
  name: "convert",
  description: "convert from turkish lira to desired currency",
  execute(client, message, args, Discord) {
    if (!currencyList.includes(args[0])) {
      message.channel.send(
        "to convert an amount please use the command like this '!convert eur 50'"
      );
      message.channel.send(
        "Please choose only one of the following currencies"
      );
      message.channel.send("eur, usd, cad, sek or gbp");
      return;
    }
    if (isNaN(args[1])) {
      message.channel.send("please enter a valid number!");
      return;
    }
    (async () => {
      let req = http.get(
        `https://openexchangerates.org/api/latest.json?app_id=${API}`,
        (res) => {
          let data = "",
            json_data;

          res.on("data", (stream) => {
            data += stream;
          });
          res.on("end", () => {
            json_data = JSON.parse(data);
            fx.rates = json_data.rates;
            fx.base = json_data.base;
            // TODO add all to one message maybe?
            let converted = 0;
            switch (args[0]) {
              case "eur":
                fx.settings = { from: "TRY", to: "EUR" };
                converted = fx.convert(args[1]).toFixed(3);
                message.channel.send(converted + "€");
                break;
              case "usd":
                fx.settings = { from: "TRY", to: "USD" };
                converted = fx.convert(args[1]).toFixed(3);
                message.channel.send(converted + "$");
                break;
              case "cad":
                fx.settings = { from: "TRY", to: "CAD" };
                converted = fx.convert(args[1]).toFixed(3);
                message.channel.send(converted + "C$");
                break;
              case "sek":
                fx.settings = { from: "TRY", to: "SEK" };
                converted = fx.convert(args[1]).toFixed(3);
                message.channel.send(converted + "kr");
                break;
              case "gbp":
                fx.settings = { from: "TRY", to: "GBP" };
                converted = fx.convert(args[1]).toFixed(3);
                message.channel.send(converted + "£");
                break;

              default:
                break;
            }
          });
        }
      );

      req.on("error", (e) => {
        console.log(e.message);
      });
    })();
  },
};

currencyList = ["eur", "usd", "cad", "sek", "gbp"];

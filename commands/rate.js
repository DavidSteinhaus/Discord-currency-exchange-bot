/* var fx = require("../utils/money");
const http = require("https");
require("dotenv").config();
const API = process.env.EXCHANGE_API; */
const convert = require("../utils/convert");
module.exports = {
  name: "rate",
  description: "send exchange rate of turkish lira",
  async execute(client, message, args, Discord) {
    let converted = await convert.convert(1, "EUR", "TRY");
    console.log(converted);
    /* (async () => {
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
            fx.settings = { from: "EUR", to: "TRY" };
            let EURTRY = fx.convert(1).toFixed(3);
            fx.settings = { from: "USD", to: "TRY" };
            let USDTRY = fx.convert(1).toFixed(3);
            fx.settings = { from: "CAD", to: "TRY" };
            let CADTRY = fx.convert(1).toFixed(3);
            fx.settings = { from: "GBP", to: "TRY" };
            let GBPTRY = fx.convert(1).toFixed(3);
            fx.settings = { from: "SEK", to: "TRY" };
            let SEKTRY = fx.convert(1).toFixed(3);
            message.channel.send(
              "EUR: " +
                EURTRY +
                "\n" +
                "USD: " +
                USDTRY +
                "\n" +
                "CAD: " +
                CADTRY +
                "\n" +
                "GBP: " +
                GBPTRY +
                "\n" +
                "SEK: " +
                SEKTRY +
                "\n"
            );
          });
        }
      );

      req.on("error", (e) => {
        console.log(e.message);
      });
    })(); */
  },
};

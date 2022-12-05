var fx = require("../static/money");
const http = require("https");

module.exports = {
  name: "rate",
  description: "send exchange rate of turkish lira",
  execute(client, message, args, Discord) {
    (async () => {
      let req = http.get(
        "https://openexchangerates.org/api/latest.json?app_id=e0e62c8ed9b3436bb8b587cc5074e1cf",
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
            let EURTRY = fx.convert(1);
            fx.settings = { from: "USD", to: "TRY" };
            let USDTRY = fx.convert(1);
            fx.settings = { from: "CAD", to: "TRY" };
            let CADTRY = fx.convert(1);
            fx.settings = { from: "GBP", to: "TRY" };
            let GBPTRY = fx.convert(1);
            fx.settings = { from: "SEK", to: "TRY" };
            let SEKTRY = fx.convert(1);
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
    })();
  },
};

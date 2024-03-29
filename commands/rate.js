var fx = require("../utils/money");
const configs = require("../config/config");
const axios = require("axios");
require("dotenv").config();
const API = process.env.EXCHANGE_API;
module.exports = {
  name: "rate",
  description: "send exchange rates for a currency",
  execute(client, message, args, Discord) {
    let resultToSend = [];
    (async () => {
      await axios
        .get(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
        .then((response) => {
          let data = response.data;
          fx.base = data.base;
          fx.rates = data.rates;
          let currencyList = configs.myEnmap.get("currencyList");
          let base = configs.myEnmap.get("base");
          if (currencyList == 0) {
            message.channel.send(
              "there are currently no currencies available. please use !config add to add a new currency."
            );
          } else {
            currencyList.map((currency) => {
              fx.settings = { from: currency, to: base };
              let converted = fx.convert(1).toFixed(3);
              resultToSend.push({ name: currency, value: converted });
            });
            const embedMessage = new Discord.MessageEmbed()
              .setColor(0x446b89)
              .setTitle(`${base} purchase rate:    `)
              .addFields(
                resultToSend.map((result) => {
                  return {
                    name: result.name,
                    value: result.value,
                    inline: true,
                  };
                })
              );
            message.channel.send({ embeds: [embedMessage] });
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    })();
  },
};

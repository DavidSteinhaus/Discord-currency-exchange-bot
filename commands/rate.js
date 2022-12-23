var fx = require("../utils/money");
const currencies = require("../config/config");
const axios = require("axios");
require("dotenv").config();
const API = process.env.EXCHANGE_API;
module.exports = {
  name: "rate",
  description: "send exchange rate of turkish lira",
  execute(client, message, args, Discord) {
    let resultToSend = [];
    (async () => {
      await axios
        .get(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
        .then((response) => {
          let data = response.data;
          fx.base = data.base;
          fx.rates = data.rates;
          currencies.currencyList.map((currency) => {
            fx.settings = { from: currency, to: "TRY" };
            let converted = fx.convert(1).toFixed(3);
            resultToSend.push({ name: currency, value: converted });
          });
          const embedMessage = new Discord.MessageEmbed()
            .setColor(0x446b89)
            .setTitle("Turkish lira exchange rates:    ")
            .addFields(
              resultToSend.map((result) => {
                return { name: result.name, value: result.value, inline: true };
              })
            );
          message.channel.send({ embeds: [embedMessage] });
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    })();
  },
};

//.setTitle("Hello " + message.member.user.tag.replace(/#[0-9]{4}/, "") + "!")
//.setDescription(date.toString())

const convert = require("../utils/convert");
const currencies = require("../config/config");
module.exports = {
  name: "rate",
  description: "send exchange rate of turkish lira",
  execute(client, message, args, Discord) {
    let resultToSend = [];
    currencies.currencyList.map((currency) => {
      let converted = convert.convert(1, currency, "TRY");
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
  },
};

//.setTitle("Hello " + message.member.user.tag.replace(/#[0-9]{4}/, "") + "!")
//.setDescription(date.toString())

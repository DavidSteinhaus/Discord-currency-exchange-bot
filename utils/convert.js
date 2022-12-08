const fx = require("./money");
const axios = require("axios");
require("dotenv").config();
const API = process.env.EXCHANGE_API;

(async () => {
  await axios
    .get(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
    .then((response) => {
      let data = response.data;
      fx.base = data.base;
      fx.rates = data.rates;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
})();

module.exports = {
  convert(amount, from, to) {
    fx.settings = { from: from, to: to };
    let result = fx.convert(amount).toFixed(3);
    return result;
  },
};

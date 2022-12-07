const fx = require("./money");
const axios = require("axios");
require("dotenv").config();
const API = process.env.EXCHANGE_API;

module.exports = {
  convert(amount, from, to) {
    (async () => {
      try {
        console.log("one");
        const response = await axios.get(
          `https://openexchangerates.org/api/latest.json?app_id=${API}`
        );
        const data = response.data;
        fx.base = data.base;
        fx.rates = data.rates;
        fx.settings = { from: from, to: to };
        let result = fx.convert(amount).toFixed(3);
        console.log("two");
        return result;
      } catch (error) {
        console.log(error);
        return;
      }
    })();
  },
};

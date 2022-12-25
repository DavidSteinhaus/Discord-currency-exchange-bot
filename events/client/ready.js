const configs = require("../../config/config");
module.exports = (Discord, client, message) => {
  if (!configs.myEnmap.has("currencyList")) {
    configs.myEnmap.set("currencyList", []);
  }
  console.log("TRYbot is online!");
};

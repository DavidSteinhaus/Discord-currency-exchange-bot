const configs = require("../../config/config");
module.exports = (Discord, client, message) => {
  if (!configs.myEnmap.has("currencyList")) {
    configs.myEnmap.set("currencyList", []);
  }
  if (!configs.myEnmap.has("base")) {
    configs.myEnmap.set("base", "TRY");
  }
  console.log("TRYbot is online!");
};

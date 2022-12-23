const axios = require("axios");
module.exports = {
  name: "ping",
  description: "pong",
  execute(client, message, args, Discord) {
    message.channel.send("pong!");
    (async () => {
      await axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then((res) => {
          let json = res.data;
          let url = json[0]?.url;
          message.channel.send({ files: [url] });
        })
        .catch((err) => console.log(err));
    })();
  },
};

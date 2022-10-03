const pupp = require("puppeteer");
const cheerio = require("cheerio");

module.exports = {
  name: "cad",
  description: "fetch price cad",
  execute(client, message, args, Discord) {
    (async () => {
      const browser = await pupp.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });
      const page = await browser.newPage();
      await page.goto(
        "https://wise.com/gb/currency-converter/cad-to-try-rate?amount=1"
      );
      const pageData = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
        };
      });

      const $ = cheerio.load(pageData.html);
      const price = $(
        "#calculator > div.cc-calculator > div.text-xs-center.text-lg-left > h3 > span.text-success"
      );

      await browser.close();

      message.channel.send("1CAD is " + price.text() + "TRY");
    })();
  },
};

const pupp = require('puppeteer');

module.exports = {
    name: 'usd',
    description:'send image',
    execute(client, message, args, Discord){
        (async () => {
            const browser = await pupp.launch();
            const page = await browser.newPage();
            await page.goto('https://www.google.com/finance/quote/USD-TRY');
            let screenshot = await page.screenshot({ path: 'screenshot.png' });
            await browser.close();

            message.channel.send({files: [screenshot]});
          })();
    }
}
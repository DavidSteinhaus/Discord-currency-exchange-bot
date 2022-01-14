const pupp = require('puppeteer');

module.exports = {
    name: 'eur',
    description:'send image',
    execute(client, message, args, Discord){
        (async () => {
            const browser = await pupp.launch();
            const page = await browser.newPage();
            await page.goto('https://www.google.com/finance/quote/EUR-TRY');
            let screenshot = await page.screenshot({ path: 'screenshot.png' });
            await browser.close();

            message.channel.send({files: [screenshot]});
          })();
    }
}
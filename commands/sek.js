const pupp = require('puppeteer');

module.exports = {
    name: 'sek',
    description:'send image',
    execute(client, message, args, Discord){
        (async () => {
            const browser = await pupp.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
    });
            const page = await browser.newPage();
            await page.goto('https://www.google.com/finance/quote/SEK-TRY');
            let screenshot = await page.screenshot({ path: 'screenshot.png' });
            await browser.close();

            message.channel.send({files: [screenshot]});
          })();
    }
}

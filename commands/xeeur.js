const pupp = require('puppeteer');

module.exports = {
    name: 'xeeur',
    description:'send image',
    execute(client, message, args, Discord){
        const number = args[0];
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
            await page.goto('https://wise.com/gb/currency-converter/try-to-eur-rate?amount='+number);
            await page.evaluate(_ => {
                var xcc
                // ids
                var xcc_id = [
                    'borlabsCookieOptionAll',
                    'cookie-apply-all',
                    'cookie-settings-all',
                    'twcc__accept-button',
                    // add ids here
                ];
                for (let i = 0; i < xcc_id.length; i++) {
                    xcc = document.getElementById(xcc_id[i]);
                    if (xcc != null) {
                        xcc.click();
                    }
                }
                // classes
                var xcc_class = [
                    'accept-all',
                    'accept-cookies-button',
                    'avia-cookie-select-all',
                    'twcc__button'
                    // add classes here
                ];
                for (let i = 0; i < xcc_class.length; i++) {
                    xcc = document.getElementsByClassName(xcc_class[i]);
                    if (xcc != null && xcc.length != 0) {
                        xcc[0].click();
                    }
                }
            
                // custom data attributes
                xcc = document.querySelectorAll('[data-cookieman-accept-all]'); if (xcc != null && xcc.length != 0) { xcc[0].click(); }
            
                 // hide iframes, can't eval
                xcc = document.querySelectorAll("iframe[src*=eurocookie]"); if (xcc != null && xcc.length != 0) { xcc[0].style.display = 'none'; }
                xcc = document.querySelectorAll("iframe[src*=eurocookie]"); if (xcc != null && xcc.length > 1) { xcc[1].style.display = 'none'; }
            
            });

            await page.waitForSelector('body > main > section > div:nth-child(2) > div');
            const x = await page.$('body > main > section > div:nth-child(2) > div');

            let screenshot = await x.screenshot({ path: 'screenshot.png' });
            await page.close();
            await browser.close();

            message.channel.send({files: [screenshot]});
          })();
    }
}
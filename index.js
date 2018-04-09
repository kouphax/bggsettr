const puppeteer = require('puppeteer');

//if(!process.env.BGG_PASSWORD) console.log("no BGG_PASSWORD set")
//if(!process.env.BGG_PASSWORD) process.exit(1)

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://boardgamegeek.com/login');
  await page.type('#username', 'kouphax')
  const elementHandle = await page.$('#password');
  await elementHandle.type('PUT PASSWORD IN HERE')
  await elementHandle.press('Enter');
  await page.waitForNavigation()

  // currently have 4 pages so we do this one at a time
  await page.goto('https://boardgamegeek.com/plays/bydate/user/kouphax/subtype/boardgame/4');

  const hrefs = await page.evaluate(() => {
    const anchors = document.querySelectorAll('a[href^="/play/edit/"]');
    return [].map.call(anchors, a => a.href);
  });
  for (const anchor of hrefs) {
    await page.goto(anchor)
    await page.evaluate(() => {
      try {
        document.querySelector("input[name='" + document.querySelector('input[type=text][value="James"]').name.replace("[name]", "[username]") + "']").value = "kouphax"
      } catch(e) { }
    })
    const elementHandle = await page.$('input[type=text][name="players[0][name]"]')
    await elementHandle.press('Enter');
    await page.waitForNavigation()
  }
  //browser.close();
})();

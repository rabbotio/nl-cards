const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/view/1', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: '1.png', omitBackground: true, clip: { x: 0, y: 0, width: 480, height: 320 } })

  await browser.close()
})()

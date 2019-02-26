const puppeteer = require('puppeteer')

const generate = async (source, cid) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:3000/view/${cid}`, { waitUntil: 'networkidle0' })
  await page.screenshot({
    path: `./output/${source}/${cid}.png`,
    omitBackground: true,
    clip: { x: 0, y: 0, width: 480 * 2, height: 320 * 2 }
  })

  await browser.close()

  // Optimize
  await require('util')
    .promisify(require('child_process').exec)(`./pngquant ./output/${source}/*.png --ext=.png --force`)
    .catch(({ stderr }) => console.error(stderr))
}

generate('accenture', 1)

#! /usr/bin/env node

const puppeteer = require('puppeteer')

const search = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://wvfs.fsu.edu')

  const songSelector = 'i.fa-music + a'
  await page.waitForSelector(songSelector)

  const songData = await page.evaluate(songSelector => {
    const song = document.querySelector(songSelector).innerHTML
    return song
  }, songSelector)

  if (typeof songData == 'undefined') {
    console.log(
      `Error retrieving song. Check https://wvfs.fsu.edu to make sure the relevant selector ${songSelector} has not changed.`
    )
  } else {
    console.log(songData)
  }

  await browser.close()
}

search()

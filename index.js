const puppeteer = require('puppeteer');

// const url = 'https://www.airbnb.fr/rooms/53158745?adults=2&source_impression_id=p3_1644069820_NKjQ3dzKXx5v8MlM&guests=1'
const url = 'https://www.airbnb.fr/rooms/48320782?checkin=&checkout=&adults=2&children=0&infants=0&source_impression_id=p3_1644069849_evlV0TWIN9rnfmGU'

const finalMonths = []
const finalDays = []

const today = new Date();
const monthToScrape = 11-(today.getMonth()+1);
console.log(monthToScrape)

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

 function removeDuplicates(array) {
     return array.filter((value, index) => array.indexOf(value) === index)
 }
 
 function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function getAvailabilitiesInMonth(months, availabilities, status) {
    const results = []
    for(let i = 0; i < removeDuplicates(months).length; i++) {
        indexes = getAllIndexes(availabilities, '1')
        if(i != removeDuplicates(months).length-1) {
            results.push(status.slice(indexes[i],indexes[i+1]-1).filter(function(s) { return s === 'true' || s === true; }).length)
        } else {
            results.push(status.slice(indexes[i],).filter(function(s) { return s === 'true' || s === true; }).length)
        }
    }

    return results
}

async function run () {
    const browser = await puppeteer.launch({headless: true,
        ignoreHTTPSErrors: true,
        args: [`--window-size=1920,1080`],
        defaultViewport: {
          width:1920,
          height:1080
        }});
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('._o5o6vxn')

    await page.click('body > div:nth-child(7) > div > div > div:nth-child(1) > div > div > div._153hgp9 > section > div._gsw2t0 > div._160gnkxa > button')

    console.log('coucou')

    for(let i = 0; i <= 4; i++) {
        await delay(2000)

        let months = await page.$$eval('._1lds9wb h3', months => {
            months = months.map(el => el.innerText)
            return months
        })
    
        let availabilities = await page.$$eval('._1lds9wb td', days => {
            days = days.map(el => el.innerText)
            return days
        })
    
        let status = await page.$$eval('._1lds9wb td', days => {
            days = days.map(el => el.getAttribute('aria-disabled'))
            return days
        })

        console.log(getAvailabilitiesInMonth(months, availabilities, status))
        console.log(removeDuplicates(months))

        await delay(1000)
        await page.click('html.scrollbar-gutter.js-focus-visible body.with-new-header div div div.t1bgcr6e div div div.zcm3uzi.dir.dir-ltr div._1a5fl1v div._3hmsj div._2hs30c div div._16grqhk main#site-content div.cgx2eil.dir.dir-ltr div._88xxct div.c1yo0219.dir.dir-ltr div._12nksyy div._16e70jgn div div.c1yo0219.dir.dir-ltr div div div div._sk02b4 div._16bq4jy div div div._g2s11rv div div div._14676s3 div._5neba7a div._qz9x4fc button._1kkx984')
        await delay(1000)
        await page.click('html.scrollbar-gutter.js-focus-visible body.with-new-header div div div.t1bgcr6e div div div.zcm3uzi.dir.dir-ltr div._1a5fl1v div._3hmsj div._2hs30c div div._16grqhk main#site-content div.cgx2eil.dir.dir-ltr div._88xxct div.c1yo0219.dir.dir-ltr div._12nksyy div._16e70jgn div div.c1yo0219.dir.dir-ltr div div div div._sk02b4 div._16bq4jy div div div._g2s11rv div div div._14676s3 div._5neba7a div._qz9x4fc button._1kkx984')

    }

    // for(let j = 0; j <= monthToScrape+1; j++) {        
    //     let months = await page.$$eval('._1lds9wb h3', months => {
    //         months = months.map(el => el.innerText)
    //         return months
    //     })

    //     let availabilities = await page.$$eval('._1lds9wb td', days => {
    //         days = days.map(el => el.innerText)
    //         return days
    //     })

    //     let status = await page.$$eval('._1lds9wb td', days => {
    //         days = days.map(el => el.getAttribute('aria-disabled'))
    //         return days
    //     })

    //     await delay(100)

    //     console.log(months)
    //     // console.log(availabilities)
    //     // console.log(status)
        
    //     for(let i = 0; i < removeDuplicates(months).length; i++) {
    //         if(finalMonths.includes(removeDuplicates(months)[i])) {
    //             let new_value = status.slice(indexes[i],indexes[i+1]-1).filter(function(s) { return s === 'true' || s === true; }).length
    //             console.log(removeDuplicates(months)[i], new_value)
    //             if(finalDays[finalMonths.indexOf(removeDuplicates(months)[i])] === 0 && new_value > 0) {
    //                 finalDays[finalMonths.indexOf(removeDuplicates(months)[i])] = new_value
    //             }
    //         } else {
    //             finalMonths.push(removeDuplicates(months)[i])
    //             indexes = getAllIndexes(availabilities, '1')
    //             // console.log(indexes)
    //             // console.log(availabilities.slice(indexes[i],indexes[i+1]-1))
    //             // console.log(status.slice(indexes[i],indexes[i+1]-1))
    //             // console.log(status.slice(indexes[i],indexes[i+1]-1).filter(function(s) { return s === 'true'; }).length)
    //             finalDays.push(status.slice(indexes[i],indexes[i+1]-1).filter(function(s) { return s === 'true' || s === true; }).length)
    //         }
    //     }

    //     await delay(2000)
    //     await page.click('html.scrollbar-gutter.js-focus-visible body.with-new-header div div div.t1bgcr6e div div div.zcm3uzi.dir.dir-ltr div._1a5fl1v div._3hmsj div._2hs30c div div._16grqhk main#site-content div.cgx2eil.dir.dir-ltr div._88xxct div.c1yo0219.dir.dir-ltr div._12nksyy div._16e70jgn div div.c1yo0219.dir.dir-ltr div div div div._sk02b4 div._16bq4jy div div div._g2s11rv div div div._14676s3 div._5neba7a div._qz9x4fc button._1kkx984')
    // }

    // console.log(finalMonths, finalDays)
    
    browser.close();
}

run();
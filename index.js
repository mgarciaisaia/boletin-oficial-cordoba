const puppeteer = require('puppeteer');

const waitAndTap = async (page, selector) => {
  await page.waitForSelector(selector)
  await page.tap(selector)
}

const nextAndReturn = async (page) => {
  await page.tap('input[value=">"]')
  await page.once('domcontentloaded', async (event, args) => {
    await page.tap('input[value="<"]')
    await page.once('domcontentloaded', async (event, args) => {
      console.log("ahora chequeamos")
    })
  })
}

const pickTurnOrRefresh = async (page) => {
  if (await page.$('td.calendarCellOpen .pulsanteCalendario') !== null) {
    await page.tap('td.calendarCellOpen .pulsanteCalendario')
    await waitAndTap(page, 'input[value="Confirmación"]')
  } else if (await page.$('td.calendarCellMed .pulsanteCalendario') !== null) {
    await page.tap('td.calendarCellMed .pulsanteCalendario')
    await waitAndTap(page, 'input[value="Confirmación"]')
  } else {
    console.log("Bancame...")
    await new Promise(done => setTimeout(done, 5000));
    console.log("Ya esperé!")
    await nextAndReturn(page)
    await page.once('domcontentloaded', async (event, args) => {
      await pickTurnOrRefresh(page)
    })
  }
}

const availableMonths = [
  "https://boletinoficial.cba.gov.ar/2006/02/",
  "https://boletinoficial.cba.gov.ar/2006/03/",
  "https://boletinoficial.cba.gov.ar/2006/04/",
  "https://boletinoficial.cba.gov.ar/2006/05/",
  "https://boletinoficial.cba.gov.ar/2006/06/",
  "https://boletinoficial.cba.gov.ar/2006/07/",
  "https://boletinoficial.cba.gov.ar/2006/08/",
  "https://boletinoficial.cba.gov.ar/2006/09/",
  "https://boletinoficial.cba.gov.ar/2006/10/",
  "https://boletinoficial.cba.gov.ar/2006/11/",
  "https://boletinoficial.cba.gov.ar/2006/12/",
  "https://boletinoficial.cba.gov.ar/2007/01/",
  "https://boletinoficial.cba.gov.ar/2007/02/",
  "https://boletinoficial.cba.gov.ar/2007/03/",
  "https://boletinoficial.cba.gov.ar/2007/04/",
  "https://boletinoficial.cba.gov.ar/2007/05/",
  "https://boletinoficial.cba.gov.ar/2007/06/",
  "https://boletinoficial.cba.gov.ar/2007/07/",
  "https://boletinoficial.cba.gov.ar/2007/08/",
  "https://boletinoficial.cba.gov.ar/2007/09/",
  "https://boletinoficial.cba.gov.ar/2007/10/",
  "https://boletinoficial.cba.gov.ar/2007/11/",
  "https://boletinoficial.cba.gov.ar/2007/12/",
  "https://boletinoficial.cba.gov.ar/2008/01/",
  "https://boletinoficial.cba.gov.ar/2008/02/",
  "https://boletinoficial.cba.gov.ar/2008/03/",
  "https://boletinoficial.cba.gov.ar/2008/04/",
  "https://boletinoficial.cba.gov.ar/2008/05/",
  "https://boletinoficial.cba.gov.ar/2008/06/",
  "https://boletinoficial.cba.gov.ar/2008/07/",
  "https://boletinoficial.cba.gov.ar/2008/08/",
  "https://boletinoficial.cba.gov.ar/2008/09/",
  "https://boletinoficial.cba.gov.ar/2008/10/",
  "https://boletinoficial.cba.gov.ar/2008/11/",
  "https://boletinoficial.cba.gov.ar/2008/12/",
  "https://boletinoficial.cba.gov.ar/2009/01/",
  "https://boletinoficial.cba.gov.ar/2009/02/",
  "https://boletinoficial.cba.gov.ar/2009/03/",
  "https://boletinoficial.cba.gov.ar/2009/04/",
  "https://boletinoficial.cba.gov.ar/2009/05/",
  "https://boletinoficial.cba.gov.ar/2009/06/",
  "https://boletinoficial.cba.gov.ar/2009/07/",
  "https://boletinoficial.cba.gov.ar/2009/08/",
  "https://boletinoficial.cba.gov.ar/2009/09/",
  "https://boletinoficial.cba.gov.ar/2009/10/",
  "https://boletinoficial.cba.gov.ar/2009/11/",
  "https://boletinoficial.cba.gov.ar/2009/12/",
  "https://boletinoficial.cba.gov.ar/2010/01/",
  "https://boletinoficial.cba.gov.ar/2010/02/",
  "https://boletinoficial.cba.gov.ar/2010/03/",
  "https://boletinoficial.cba.gov.ar/2010/04/",
  "https://boletinoficial.cba.gov.ar/2010/05/",
  "https://boletinoficial.cba.gov.ar/2010/06/",
  "https://boletinoficial.cba.gov.ar/2010/07/",
  "https://boletinoficial.cba.gov.ar/2010/08/",
  "https://boletinoficial.cba.gov.ar/2010/09/",
  "https://boletinoficial.cba.gov.ar/2010/10/",
  "https://boletinoficial.cba.gov.ar/2010/11/",
  "https://boletinoficial.cba.gov.ar/2010/12/",
  "https://boletinoficial.cba.gov.ar/2011/01/",
  "https://boletinoficial.cba.gov.ar/2011/02/",
  "https://boletinoficial.cba.gov.ar/2011/03/",
  "https://boletinoficial.cba.gov.ar/2011/04/",
  "https://boletinoficial.cba.gov.ar/2011/05/",
  "https://boletinoficial.cba.gov.ar/2011/06/",
  "https://boletinoficial.cba.gov.ar/2011/07/",
  "https://boletinoficial.cba.gov.ar/2011/08/",
  "https://boletinoficial.cba.gov.ar/2011/09/",
  "https://boletinoficial.cba.gov.ar/2011/10/",
  "https://boletinoficial.cba.gov.ar/2011/11/",
  "https://boletinoficial.cba.gov.ar/2011/12/",
  "https://boletinoficial.cba.gov.ar/2012/01/",
  "https://boletinoficial.cba.gov.ar/2012/02/",
  "https://boletinoficial.cba.gov.ar/2012/03/",
  "https://boletinoficial.cba.gov.ar/2012/04/",
  "https://boletinoficial.cba.gov.ar/2012/05/",
  "https://boletinoficial.cba.gov.ar/2012/06/",
  "https://boletinoficial.cba.gov.ar/2012/07/",
  "https://boletinoficial.cba.gov.ar/2012/08/",
  "https://boletinoficial.cba.gov.ar/2012/09/",
  "https://boletinoficial.cba.gov.ar/2012/10/",
  "https://boletinoficial.cba.gov.ar/2012/11/",
  "https://boletinoficial.cba.gov.ar/2012/12/",
  "https://boletinoficial.cba.gov.ar/2013/01/",
  "https://boletinoficial.cba.gov.ar/2013/02/",
  "https://boletinoficial.cba.gov.ar/2013/03/",
  "https://boletinoficial.cba.gov.ar/2013/04/",
  "https://boletinoficial.cba.gov.ar/2013/05/",
  "https://boletinoficial.cba.gov.ar/2013/06/",
  "https://boletinoficial.cba.gov.ar/2013/07/",
  "https://boletinoficial.cba.gov.ar/2013/08/",
  "https://boletinoficial.cba.gov.ar/2013/09/",
  "https://boletinoficial.cba.gov.ar/2013/10/",
  "https://boletinoficial.cba.gov.ar/2013/11/",
  "https://boletinoficial.cba.gov.ar/2013/12/",
  "https://boletinoficial.cba.gov.ar/2014/01/",
  "https://boletinoficial.cba.gov.ar/2014/02/",
  "https://boletinoficial.cba.gov.ar/2014/03/",
  "https://boletinoficial.cba.gov.ar/2014/04/",
  "https://boletinoficial.cba.gov.ar/2014/05/",
  "https://boletinoficial.cba.gov.ar/2014/06/",
  "https://boletinoficial.cba.gov.ar/2014/07/",
  "https://boletinoficial.cba.gov.ar/2014/08/",
  "https://boletinoficial.cba.gov.ar/2014/09/",
  "https://boletinoficial.cba.gov.ar/2014/10/",
  "https://boletinoficial.cba.gov.ar/2014/11/",
  "https://boletinoficial.cba.gov.ar/2014/12/",
  "https://boletinoficial.cba.gov.ar/2015/01/",
  "https://boletinoficial.cba.gov.ar/2015/02/",
  "https://boletinoficial.cba.gov.ar/2015/03/",
  "https://boletinoficial.cba.gov.ar/2015/04/",
  "https://boletinoficial.cba.gov.ar/2015/05/",
  "https://boletinoficial.cba.gov.ar/2015/06/",
  "https://boletinoficial.cba.gov.ar/2015/07/",
  "https://boletinoficial.cba.gov.ar/2015/08/",
  "https://boletinoficial.cba.gov.ar/2015/09/",
  "https://boletinoficial.cba.gov.ar/2015/10/",
  "https://boletinoficial.cba.gov.ar/2015/11/",
  "https://boletinoficial.cba.gov.ar/2015/12/",
  "https://boletinoficial.cba.gov.ar/2016/01/",
  "https://boletinoficial.cba.gov.ar/2016/02/",
  "https://boletinoficial.cba.gov.ar/2016/03/",
  "https://boletinoficial.cba.gov.ar/2016/04/",
  "https://boletinoficial.cba.gov.ar/2016/05/",
  "https://boletinoficial.cba.gov.ar/2016/06/",
  "https://boletinoficial.cba.gov.ar/2016/07/",
  "https://boletinoficial.cba.gov.ar/2016/08/",
  "https://boletinoficial.cba.gov.ar/2016/09/",
  "https://boletinoficial.cba.gov.ar/2016/10/",
  "https://boletinoficial.cba.gov.ar/2016/11/",
  "https://boletinoficial.cba.gov.ar/2016/12/",
  "https://boletinoficial.cba.gov.ar/2017/01/",
  "https://boletinoficial.cba.gov.ar/2017/02/",
  "https://boletinoficial.cba.gov.ar/2017/03/",
  "https://boletinoficial.cba.gov.ar/2017/04/",
  "https://boletinoficial.cba.gov.ar/2017/05/",
  "https://boletinoficial.cba.gov.ar/2017/06/",
  "https://boletinoficial.cba.gov.ar/2017/07/",
  "https://boletinoficial.cba.gov.ar/2017/08/",
  "https://boletinoficial.cba.gov.ar/2017/09/",
  "https://boletinoficial.cba.gov.ar/2017/10/",
  "https://boletinoficial.cba.gov.ar/2017/11/",
  "https://boletinoficial.cba.gov.ar/2017/12/",
  "https://boletinoficial.cba.gov.ar/2018/01/",
  "https://boletinoficial.cba.gov.ar/2018/02/",
  "https://boletinoficial.cba.gov.ar/2018/03/",
  "https://boletinoficial.cba.gov.ar/2018/04/",
  "https://boletinoficial.cba.gov.ar/2018/05/",
  "https://boletinoficial.cba.gov.ar/2018/06/",
  "https://boletinoficial.cba.gov.ar/2018/07/",
  "https://boletinoficial.cba.gov.ar/2018/08/",
  "https://boletinoficial.cba.gov.ar/2018/09/",
  "https://boletinoficial.cba.gov.ar/2018/10/",
  "https://boletinoficial.cba.gov.ar/2018/11/",
  "https://boletinoficial.cba.gov.ar/2018/12/",
  "https://boletinoficial.cba.gov.ar/2019/01/",
  "https://boletinoficial.cba.gov.ar/2019/02/",
  "https://boletinoficial.cba.gov.ar/2019/03/",
  "https://boletinoficial.cba.gov.ar/2019/04/",
  "https://boletinoficial.cba.gov.ar/2019/05/",
  "https://boletinoficial.cba.gov.ar/2019/06/",
  "https://boletinoficial.cba.gov.ar/2019/07/",
  "https://boletinoficial.cba.gov.ar/2019/08/",
  "https://boletinoficial.cba.gov.ar/2019/09/",
  "https://boletinoficial.cba.gov.ar/2019/10/",
  "https://boletinoficial.cba.gov.ar/2019/11/",
  "https://boletinoficial.cba.gov.ar/2019/12/",
  "https://boletinoficial.cba.gov.ar/2020/01/",
  "https://boletinoficial.cba.gov.ar/2020/02/",
  "https://boletinoficial.cba.gov.ar/2020/03/",
  "https://boletinoficial.cba.gov.ar/2020/04/",
  "https://boletinoficial.cba.gov.ar/2020/05/",
  "https://boletinoficial.cba.gov.ar/2020/06/",
  "https://boletinoficial.cba.gov.ar/2020/07/",
  "https://boletinoficial.cba.gov.ar/2020/08/",
  "https://boletinoficial.cba.gov.ar/2020/09/",
  "https://boletinoficial.cba.gov.ar/2020/10/",
  "https://boletinoficial.cba.gov.ar/2020/11/",
  "https://boletinoficial.cba.gov.ar/2020/12/",
  "https://boletinoficial.cba.gov.ar/2021/01/",
  "https://boletinoficial.cba.gov.ar/2021/02/"
]

const printMonthLinks = async (page, monthLink) => {
  await page.goto(monthLink, {waitUntil: 'domcontentloaded'});
  const pageLinks = await page.$$('.left a[href]');
  const myLinks = await Promise.all(pageLinks.map( (link) => { return link.evaluate(link => link.href) }));
  myLinks.forEach(link => console.log(link));
}

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  for (monthLink of availableMonths) {
    await printMonthLinks(page, monthLink);
    await new Promise(done => setTimeout(done, 1000));
  }
})();

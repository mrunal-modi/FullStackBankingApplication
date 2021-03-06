const puppeteer = require("puppeteer");
const loginURL = "http://localhost/login";

async function test() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(loginURL);
  await page.type(".Email-identifier", "aa@aa.com");
  await page.type(".Email-password", "aaa123!!!");
  await page.screenshot({ path: "Login-screenshot-1.png" });
  await page.click(".Login-Button");
  await page.waitForNavigation();
  await page.screenshot({ path: "Login-screenshot-2.png" });
  await page.click(".DepositPage");
  await page.type(".Amount", "5000");
  await page.click(".Deposit-Button");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "Deposit-screenshot.png" });
  browser.close();
}

test();

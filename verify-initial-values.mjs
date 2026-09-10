import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });

  await page.locator('#preview-pushups-slider').fill('45');
  await page.waitForTimeout(100);

  await page.click('#launch-full-test-btn');
  await page.waitForSelector('text=QUESTION 01 / 04');

  const displayed = await page.locator('span.font-mono.text-3xl.font-black.text-white').first().textContent();
  console.log(`Preview sync test: slider=45, modal shows=${displayed?.trim()}`);
  console.log(displayed?.trim() === '45' ? 'PASS' : 'FAIL - initialValues not synced');

  await browser.close();
}

main();

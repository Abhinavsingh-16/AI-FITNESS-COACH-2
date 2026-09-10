import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const widths = [375, 768];

const ctaSelectors = [
  '#nav-cta-btn',
  '#hero-cta-btn',
  '#launch-full-test-btn',
  '#final-cta-btn',
  'button:has-text("Test My Real Baseline")',
  'button:has-text("Start Step 01 Now")',
];

async function checkOverflow(page, width) {
  return page.evaluate((w) => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = w;
    const issues = [];
    if (scrollWidth > clientWidth + 1) {
      issues.push(`Horizontal scroll: scrollWidth=${scrollWidth}, viewport=${clientWidth}`);
    }
    const overflowing = [];
    document.querySelectorAll('section, header, footer, button, h1, h2, span').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > clientWidth + 2 || rect.left < -2) {
        const tag = `${el.tagName}${el.id ? `#${el.id}` : ''}`;
        overflowing.push(`${tag} (${Math.round(rect.left)}-${Math.round(rect.right)}px)`);
      }
    });
    return { issues, overflowing: overflowing.slice(0, 8) };
  }, width);
}

async function runModalFlow(page) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.click('#nav-cta-btn');
  await page.waitForSelector('text=QUESTION 01 / 04');

  for (let step = 0; step < 3; step++) {
    await page.click('button:has-text("Next Step")');
    await page.waitForTimeout(150);
  }

  await page.click('button:has-text("Generate My AI Plan")');
  await page.waitForSelector('text=AI Calibrating Your Strength Profile', { timeout: 3000 });
  await page.waitForSelector('text=YOUR PERSONALIZED WORKOUT PROGRAM', { timeout: 8000 });

  const planVisible = await page.isVisible('text=Calibrated Strength Tier');
  if (!planVisible) throw new Error('Generated plan modal did not show plan content');

  await page.click('button[aria-label], button:has(svg) >> nth=0').catch(() => {});
  const closeBtn = page.locator('.fixed.inset-0').last().locator('button').first();
  await closeBtn.click();
  await page.waitForTimeout(300);

  return true;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 812 } });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[${width}px] ${msg.text()}`);
    });
    page.on('pageerror', (err) => consoleErrors.push(`[${width}px] PAGE ERROR: ${err.message}`));

    await page.goto(BASE, { waitUntil: 'networkidle' });

    for (const sel of ctaSelectors) {
      await page.goto(BASE, { waitUntil: 'networkidle' });
      const btn = page.locator(sel).first();
      const count = await btn.count();
      if (!count) {
        console.log(`MISSING CTA at ${width}px: ${sel}`);
        continue;
      }
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      const modalOpen = await page.locator('text=60-Second Strength Assessment').isVisible({ timeout: 3000 }).catch(() => false);
      if (!modalOpen && (sel.includes('cta') || sel.includes('Test') || sel.includes('launch'))) {
        console.log(`CTA did not open modal at ${width}px: ${sel}`);
      }
      const close = page.locator('text=60-Second Strength Assessment').locator('..').locator('button').last();
      if (await close.isVisible().catch(() => false)) await close.click();
    }

    const overflow = await checkOverflow(page, width);
    console.log(`\n=== Responsive check ${width}px ===`);
    console.log(JSON.stringify(overflow, null, 2));

    if (width === 375) {
      try {
        await runModalFlow(page);
        console.log('Modal flow: PASS');
      } catch (e) {
        console.log(`Modal flow: FAIL - ${e.message}`);
      }
    }

    await context.close();
  }

  console.log('\n=== Console errors ===');
  if (consoleErrors.length === 0) console.log('None');
  else consoleErrors.forEach((e) => console.log(e));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

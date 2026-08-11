/**
 * Dev-only visual check: screenshots the built site.
 * Usage: npx astro preview & node shots.mjs [selector-mode]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.env.SHOT_DIR || './.shots';
const BASE = process.env.SHOT_BASE || 'http://localhost:4321';
mkdirSync(OUT, { recursive: true });

const settle = async (page) => {
  await page.evaluate(async () => {
    // `scroll-behavior: smooth` turns scripted scrolling into an animation
    // that never lands, so reveal observers would never fire.
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
};

const pages = [
  { name: 'desktop', width: 1440, height: 900, path: '/' },
  { name: 'mobile', width: 390, height: 844, path: '/' },
];

const sections = ['#home', '#measure', '#method', '#services', '#water', '#modeling', '#about', '#team', '#contact'];

const browser = await chromium.launch();

for (const p of pages) {
  const page = await browser.newPage({
    viewport: { width: p.width, height: p.height },
    deviceScaleFactor: 2,
  });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${p.name}-full.png`, fullPage: true });

  for (const sel of sections) {
    const el = page.locator(sel);
    if (!(await el.count())) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${OUT}/${p.name}${sel.replace('#', '-')}.png` });
  }

  console.log(errors.length ? `⚠ ${p.name}: ${errors.slice(0, 5).join(' | ')}` : `✓ ${p.name}`);
  await page.close();
}

// pt hero for a language spot-check
const pt = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await pt.goto(BASE + '/pt/', { waitUntil: 'networkidle' });
await pt.waitForTimeout(1500);
await pt.screenshot({ path: `${OUT}/pt-hero.png` });
console.log('✓ pt');
await pt.close();

await browser.close();

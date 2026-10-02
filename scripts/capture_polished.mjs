import { chromium } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const ARTIFACTS_DIR = '/Users/kyzenn/.gemini/antigravity-ide/brain/cd52db23-e7ce-44be-af34-5cad78f379b1';

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Redesigned Mega-Menu Dropdown (Hovering, Cookie banner dismissed)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Hover over Weddings & Events trigger
    const trigger = page.locator('div:has(button:has-text("Weddings & Events"))').first();
    await trigger.hover();
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_mega_menu_redesign.png') });
    await page.close();
  }

  // 2. Category Specialists Grid with Real Portfolio Photos (Scrolled to grid)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    });
    await page.goto(`${BASE_URL}/categories/weddings-events/planning`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Scroll to specialist grid
    const grid = page.locator('.saathi-professional-grid');
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_category_cards_real_portfolio.png') });

    // Click card to open shared-element expand modal
    const firstCard = page.locator('.saathi-professional-card').first();
    await firstCard.click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_expand_card_modal_opened.png') });
    await page.close();
  }

  // 3. Expand-on-click in Dark Mode
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
      localStorage.setItem('saathi_theme_preference', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.goto(`${BASE_URL}/categories/weddings-events/planning`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const grid = page.locator('.saathi-professional-grid');
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const firstCard = page.locator('.saathi-professional-card').first();
    await firstCard.click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_expand_card_modal_dark.png') });
    await page.close();
  }

  // 4. Hero Clean Scrim Badge without Cookie banner
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_hero_badge_redesign.png') });
    await page.close();
  }

  await browser.close();
  console.log('Polished screenshots captured!');
}

capture();

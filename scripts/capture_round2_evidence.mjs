import { chromium } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const ARTIFACTS_DIR = '/Users/kyzenn/.gemini/antigravity-ide/brain/cd52db23-e7ce-44be-af34-5cad78f379b1';

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Redesigned Mega-Menu
  {
    console.log('Capturing redesigned mega-menu...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Hover "Weddings & Events" dropdown to trigger menu
    const navDropdownBtn = page.locator('button:has-text("Weddings & Events")').first();
    await navDropdownBtn.hover();
    await page.waitForSelector('[role="menu"]', { state: 'visible', timeout: 3000 });
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_mega_menu_redesign.png') });
    await page.close();
  }

  // 2. Redesigned Hero Image Badge (No glassmorphism, clean scrim caption)
  {
    console.log('Capturing hero badge redesign...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_hero_badge_redesign.png') });
    await page.close();
  }

  // 3. Category Page with Real Portfolio Photos & Expand Interaction
  {
    console.log('Capturing expand-on-click cards in Category page...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
    });
    await page.goto(`${BASE_URL}/categories/weddings-events/planning`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Scroll slightly to frame the specialist cards grid perfectly
    await page.evaluate(() => window.scrollTo({ top: 380, behavior: 'instant' }));
    await page.waitForTimeout(300);

    // Default state: cards in grid with real portfolio photos
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_category_cards_real_portfolio.png') });

    // Click first professional card to expand
    const firstCard = page.locator('.saathi-professional-card').first();
    await firstCard.click();
    await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 3000 });
    await page.waitForTimeout(500);

    // Expanded view
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_expand_card_modal_opened.png') });

    await page.close();
  }

  // 4. Feedback Page
  {
    console.log('Capturing feedback page...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
    });
    await page.goto(`${BASE_URL}/feedback`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_feedback_page.png') });
    await page.close();
  }

  // 5. Dark Mode Home
  {
    console.log('Capturing dark mode home...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
      localStorage.setItem('saathi_theme_preference', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_dark_mode_home.png') });
    await page.close();
  }

  // 6. Expanded Card in Dark Mode
  {
    console.log('Capturing expanded card in dark mode...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('saathi_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true }));
      localStorage.setItem('saathi_theme_preference', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.goto(`${BASE_URL}/categories/weddings-events/planning`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo({ top: 380, behavior: 'instant' }));
    await page.waitForTimeout(300);

    const firstCard = page.locator('.saathi-professional-card').first();
    await firstCard.click();
    await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 3000 });
    await page.waitForTimeout(500);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_expand_card_modal_dark.png') });
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully into artifacts!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const EVIDENCE_DIR = path.resolve(process.cwd(), 'visual-evidence');
const ARTIFACT_DIR = '/Users/kyzenn/.gemini/antigravity-ide/brain/cd52db23-e7ce-44be-af34-5cad78f379b1';

if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseRgb(colorStr) {
  if (!colorStr) return [0, 0, 0];
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }
  return [0, 0, 0];
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function verify() {
  console.log('--- Starting Visual Verification Pass ---');
  const browser = await chromium.launch({ headless: true });

  const results = {
    contrastLight: [],
    contrastDark: [],
    screenshots: [],
  };

  // 1. Desktop Light Mode
  console.log('Capturing Desktop Light Mode (1280x850)...');
  const desktopLight = await browser.newPage({ viewport: { width: 1280, height: 850 } });
  await desktopLight.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktopLight.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('saathi_theme_preference', 'light');
  });
  await desktopLight.waitForTimeout(500);

  const heroDesktopLight = path.join(EVIDENCE_DIR, 'hero_desktop_light.png');
  await desktopLight.screenshot({ path: heroDesktopLight, clip: { x: 0, y: 0, width: 1280, height: 850 } });
  results.screenshots.push(heroDesktopLight);

  // Measure contrast on key elements in Light Mode
  const lightContrast = await desktopLight.evaluate(() => {
    function getElemColor(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        text: el.innerText ? el.innerText.substring(0, 30) : '',
        color: style.color,
        bg: style.backgroundColor,
      };
    }
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      h1: getElemColor('h1'),
      subhead: getElemColor('h1 + p'),
      cta: getElemColor('header a[href="/signup"]'),
      navLink: getElemColor('header nav a'),
      serviceHeading: getElemColor('#services h2'),
    };
  });
  results.contrastLight = lightContrast;

  // 2. Desktop Dark Mode
  console.log('Capturing Desktop Dark Mode (1280x850)...');
  const desktopDark = await browser.newPage({ viewport: { width: 1280, height: 850 } });
  await desktopDark.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktopDark.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('saathi_theme_preference', 'dark');
  });
  await desktopDark.waitForTimeout(500);

  const heroDesktopDark = path.join(EVIDENCE_DIR, 'hero_desktop_dark.png');
  await desktopDark.screenshot({ path: heroDesktopDark, clip: { x: 0, y: 0, width: 1280, height: 850 } });
  results.screenshots.push(heroDesktopDark);

  // Measure contrast on key elements in Dark Mode
  const darkContrast = await desktopDark.evaluate(() => {
    function getElemColor(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        text: el.innerText ? el.innerText.substring(0, 30) : '',
        color: style.color,
        bg: style.backgroundColor,
      };
    }
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      h1: getElemColor('h1'),
      subhead: getElemColor('h1 + p'),
      cta: getElemColor('header a[href="/signup"]'),
      navLink: getElemColor('header nav a'),
      serviceHeading: getElemColor('#services h2'),
    };
  });
  results.contrastDark = darkContrast;

  // 3. Services / Category Cards Staggered View
  console.log('Capturing Services Section...');
  const servicesEl = await desktopLight.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoViewIfNeeded();
    await desktopLight.waitForTimeout(600);
    const servicesPath = path.join(EVIDENCE_DIR, 'services_section_light.png');
    await desktopLight.screenshot({ path: servicesPath });
    results.screenshots.push(servicesPath);
  }

  // 4. Mobile Breakpoints (375px)
  console.log('Capturing Mobile (375x812)...');
  const mobileLight = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobileLight.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobileLight.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await mobileLight.waitForTimeout(400);
  const mobileLightPath = path.join(EVIDENCE_DIR, 'hero_mobile_light.png');
  await mobileLight.screenshot({ path: mobileLightPath });
  results.screenshots.push(mobileLightPath);

  const mobileDark = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobileDark.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobileDark.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await mobileDark.waitForTimeout(400);
  const mobileDarkPath = path.join(EVIDENCE_DIR, 'hero_mobile_dark.png');
  await mobileDark.screenshot({ path: mobileDarkPath });
  results.screenshots.push(mobileDarkPath);

  // 5. Category Page (/categories/weddings-events/planning)
  console.log('Capturing Category Page (Planning)...');
  const catPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await catPage.goto(`${BASE_URL}/categories/weddings-events/planning`, { waitUntil: 'networkidle' });
  await catPage.waitForTimeout(400);
  const catLightPath = path.join(EVIDENCE_DIR, 'category_planning_light.png');
  await catPage.screenshot({ path: catLightPath });
  results.screenshots.push(catLightPath);

  await catPage.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await catPage.waitForTimeout(400);
  const catDarkPath = path.join(EVIDENCE_DIR, 'category_planning_dark.png');
  await catPage.screenshot({ path: catDarkPath });
  results.screenshots.push(catDarkPath);

  await browser.close();

  // Copy screenshots to artifact directory for presentation
  for (const src of results.screenshots) {
    const filename = path.basename(src);
    const dest = path.join(ARTIFACT_DIR, filename);
    fs.copyFileSync(src, dest);
  }

  // Calculate Contrast Ratios
  const bgLightRgb = parseRgb(lightContrast.bodyBg);
  const h1LightRgb = parseRgb(lightContrast.h1?.color);
  const subLightRgb = parseRgb(lightContrast.subhead?.color);
  const navLightRgb = parseRgb(lightContrast.navLink?.color);

  const bgDarkRgb = parseRgb(darkContrast.bodyBg);
  const h1DarkRgb = parseRgb(darkContrast.h1?.color);
  const subDarkRgb = parseRgb(darkContrast.subhead?.color);
  const navDarkRgb = parseRgb(darkContrast.navLink?.color);

  const report = {
    lightMode: {
      canvasBackground: lightContrast.bodyBg,
      h1ContrastRatio: getContrastRatio(h1LightRgb, bgLightRgb).toFixed(2) + ':1',
      subheadContrastRatio: getContrastRatio(subLightRgb, bgLightRgb).toFixed(2) + ':1',
      navLinkContrastRatio: getContrastRatio(navLightRgb, bgLightRgb).toFixed(2) + ':1',
    },
    darkMode: {
      canvasBackground: darkContrast.bodyBg,
      h1ContrastRatio: getContrastRatio(h1DarkRgb, bgDarkRgb).toFixed(2) + ':1',
      subheadContrastRatio: getContrastRatio(subDarkRgb, bgDarkRgb).toFixed(2) + ':1',
      navLinkContrastRatio: getContrastRatio(navDarkRgb, bgDarkRgb).toFixed(2) + ':1',
    },
  };

  console.log('\n=== CONTRAST RATIO AUDIT REPORT ===');
  console.log(JSON.stringify(report, null, 2));

  fs.writeFileSync(path.join(EVIDENCE_DIR, 'contrast_audit.json'), JSON.stringify(report, null, 2));
  console.log('\nAll screenshots and audit logs written successfully.');
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

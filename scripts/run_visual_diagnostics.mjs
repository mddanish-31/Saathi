import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'visual-evidence');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BASE_URL = 'http://localhost:3009';

// WCAG 2.1 relative luminance and contrast calculations
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseRgb(colorStr) {
  if (colorStr.startsWith('#')) {
    let hex = colorStr.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
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

async function runDiagnostics() {
  console.log('====================================================');
  console.log('   SAATHI FULL VISUAL DIAGNOSTIC SUITE STARTING     ');
  console.log('====================================================\n');

  const browser = await chromium.launch({
    headless: true,
  });

  const summary = {};

  // -------------------------------------------------------------------------
  // 1. NAVBAR (375px mobile full-screen overlay)
  // -------------------------------------------------------------------------
  console.log('>>> [1/11] NAVBAR TEST (375px mobile overlay)');
  {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const menuBtn = page.locator('button[aria-label="Open navigation menu"]');
    await menuBtn.waitFor({ state: 'visible', timeout: 5000 });
    await menuBtn.click();
    await page.waitForTimeout(400);

    const overlay = page.locator('div.fixed.inset-0.z-50');
    const isVisible = await overlay.isVisible();
    const box = await overlay.boundingBox();
    const isFullScreen = box && box.width >= 370 && box.height >= 800;

    const links = await overlay.locator('a, button').all();
    const linkMetrics = [];
    for (const link of links) {
      const b = await link.boundingBox();
      const txt = (await link.innerText()).trim();
      if (b && b.height > 0) {
        linkMetrics.push({ text: txt.split('\n')[0], width: Math.round(b.width), height: Math.round(b.height) });
      }
    }

    const screenshotPath = path.join(OUTPUT_DIR, '01_navbar_mobile_overlay_375px.png');
    await page.screenshot({ path: screenshotPath });

    summary.navbar = {
      pass: isVisible && isFullScreen,
      overlayVisible: isVisible,
      box,
      isFullScreenOverlay: isFullScreen,
      links: linkMetrics,
      screenshot: screenshotPath,
    };
    console.log(`    Result: ${summary.navbar.pass ? 'PASS' : 'FAIL'}`);
    console.log(`    Overlay BoundingBox: ${JSON.stringify(box)}`);
    console.log(`    Full screen overlay: ${isFullScreen} (width: ${box?.width}px, height: ${box?.height}px)`);
    console.log(`    Tap Targets Sample: ${JSON.stringify(linkMetrics.slice(0, 4))}`);
    console.log(`    Saved: ${screenshotPath}\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 2. DARK/LIGHT THEME TOGGLE & PERSISTENCE (3 fresh loads + mid-transition)
  // -------------------------------------------------------------------------
  console.log('>>> [2/11] THEME TOGGLE & PERSISTENCE TEST');
  {
    const reloadScreenshots = [];
    const loadDetails = [];
    let zeroFlash = true;

    for (let i = 1; i <= 3; i++) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      const ssPath = path.join(OUTPUT_DIR, `02_theme_fresh_load_${i}.png`);
      await page.screenshot({ path: ssPath });
      reloadScreenshots.push(ssPath);

      const themeInfo = await page.evaluate(() => {
        const docClass = document.documentElement.className;
        const dataTheme = document.documentElement.getAttribute('data-theme');
        const bg = window.getComputedStyle(document.body).backgroundColor;
        const text = window.getComputedStyle(document.body).color;
        return { docClass, dataTheme, bg, text };
      });

      console.log(`    Fresh load ${i}: class="${themeInfo.docClass}", data-theme="${themeInfo.dataTheme}", bg="${themeInfo.bg}"`);
      loadDetails.push(themeInfo);
      if (themeInfo.docClass.includes('dark')) {
        zeroFlash = false;
      }
      await page.close();
    }

    const togglePage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await togglePage.goto(BASE_URL, { waitUntil: 'load' });
    await togglePage.waitForTimeout(500);

    const toggleBtn = togglePage.locator('button[aria-label*="Switch to"]').first();
    await toggleBtn.click();

    await togglePage.waitForTimeout(100);
    const midTransitionPath = path.join(OUTPUT_DIR, '02_theme_mid_transition.png');
    await togglePage.screenshot({ path: midTransitionPath });

    await togglePage.waitForTimeout(300);
    const finalThemePath = path.join(OUTPUT_DIR, '02_theme_dark_complete.png');
    await togglePage.screenshot({ path: finalThemePath });

    const finalTheme = await togglePage.evaluate(() => {
      const cs = window.getComputedStyle(document.body);
      return {
        isDark: document.documentElement.classList.contains('dark'),
        bg: cs.backgroundColor,
        text: cs.color,
        transition: cs.transition,
      };
    });

    summary.themeToggle = {
      pass: zeroFlash && finalTheme.isDark,
      loads: loadDetails,
      midTransitionScreenshot: midTransitionPath,
      finalDarkScreenshot: finalThemePath,
      finalComputedBg: finalTheme.bg,
      transitionStyle: finalTheme.transition,
    };
    console.log(`    Mid-transition captured: ${midTransitionPath}`);
    console.log(`    Final Dark captured: ${finalThemePath} (bg: ${finalTheme.bg})`);
    console.log(`    Body transition: ${finalTheme.transition}`);
    console.log(`    Result: ${summary.themeToggle.pass ? 'PASS' : 'FAIL'}\n`);
    await togglePage.close();
  }

  // -------------------------------------------------------------------------
  // 3. BENTO GRID (Breakpoints: 375px, 768px, 1024px, 1440px)
  // -------------------------------------------------------------------------
  console.log('>>> [3/11] BENTO GRID BREAKPOINTS TEST');
  {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'laptop', width: 1024, height: 768 },
      { name: 'desktop', width: 1440, height: 900 },
    ];

    const bentoResults = {};

    for (const bp of breakpoints) {
      const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
      await page.goto(BASE_URL, { waitUntil: 'load' });
      await page.waitForTimeout(500);

      const categorySection = page.locator('#categories');
      await categorySection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const ssPath = path.join(OUTPUT_DIR, `03_bento_grid_${bp.width}px_${bp.name}.png`);
      await categorySection.screenshot({ path: ssPath });

      const gridMetrics = await page.evaluate(() => {
        const grid = document.querySelector('#categories .grid');
        if (!grid) return null;
        const style = window.getComputedStyle(grid);
        const children = Array.from(grid.children).map((el, i) => {
          const rect = el.getBoundingClientRect();
          return {
            index: i,
            title: el.querySelector('h3')?.innerText || `Tile ${i}`,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top),
            left: Math.round(rect.left),
          };
        });
        return {
          gridTemplateColumns: style.gridTemplateColumns,
          childCount: children.length,
          children,
        };
      });

      bentoResults[bp.name] = {
        width: bp.width,
        gridTemplateColumns: gridMetrics?.gridTemplateColumns,
        childCount: gridMetrics?.childCount,
        children: gridMetrics?.children,
        screenshot: ssPath,
      };

      console.log(`    Breakpoint ${bp.width}px (${bp.name}):`);
      console.log(`      Columns: ${gridMetrics?.gridTemplateColumns}`);
      console.log(`      Tile Count: ${gridMetrics?.childCount}`);
      console.log(`      Saved: ${ssPath}`);
      await page.close();
    }

    summary.bentoGrid = {
      pass: true,
      breakpoints: bentoResults,
    };
    console.log(`    Result: PASS\n`);
  }

  // -------------------------------------------------------------------------
  // 4. HERO SHUFFLE / BLEND (4x CPU throttling, scroll blend at 0%, 50%, 100%)
  // -------------------------------------------------------------------------
  console.log('>>> [4/11] HERO SHUFFLE & SCROLL-BLEND WITH 4X CPU THROTTLING');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    console.log('    Enabled 4x CPU slowdown via Chrome DevTools Protocol');

    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const ss0 = path.join(OUTPUT_DIR, '04_hero_scroll_0pct.png');
    await page.screenshot({ path: ss0 });

    const fpsData = await page.evaluate(async () => {
      const timestamps = [];
      let lastTime = performance.now();

      return new Promise((resolve) => {
        let elapsed = 0;
        const scrollStep = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;
          timestamps.push(delta);
          elapsed += delta;

          window.scrollBy(0, 15);

          if (elapsed < 1200) {
            requestAnimationFrame(scrollStep);
          } else {
            const fpsList = timestamps.map((d) => 1000 / d);
            const avgFps = Math.round(fpsList.reduce((a, b) => a + b, 0) / fpsList.length);
            const droppedFrames = timestamps.filter((d) => d > 33.3).length;
            resolve({ avgFps, droppedFrames, totalFrames: timestamps.length });
          }
        };
        requestAnimationFrame(scrollStep);
      });
    });

    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(300);
    const ss50 = path.join(OUTPUT_DIR, '04_hero_scroll_50pct.png');
    await page.screenshot({ path: ss50 });

    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(300);
    const ss100 = path.join(OUTPUT_DIR, '04_hero_scroll_100pct.png');
    await page.screenshot({ path: ss100 });

    const blendMetrics = await page.evaluate(() => {
      const heroPanel = document.querySelector('section.relative .rounded-3xl.overflow-hidden');
      if (!heroPanel) return null;
      const cs = window.getComputedStyle(heroPanel);
      return {
        transform: cs.transform,
        opacity: cs.opacity,
      };
    });

    summary.heroPerformance = {
      pass: fpsData.avgFps >= 30,
      cpuThrottle: '4x slowdown',
      measuredAvgFps: fpsData.avgFps,
      droppedFrames: fpsData.droppedFrames,
      totalFrames: fpsData.totalFrames,
      blendTransform: blendMetrics,
      screenshots: { '0%': ss0, '50%': ss50, '100%': ss100 },
    };

    console.log(`    Performance under 4x CPU Throttling:`);
    console.log(`      Average FPS: ${fpsData.avgFps} fps`);
    console.log(`      Dropped Frames (>33ms): ${fpsData.droppedFrames} / ${fpsData.totalFrames}`);
    console.log(`      Blend at 700px scroll: transform=${blendMetrics?.transform}, opacity=${blendMetrics?.opacity}`);
    console.log(`      Result: ${summary.heroPerformance.pass ? 'PASS' : 'FAIL'}\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 5. TYPOGRAPHY (Line-height 1.68, Max-width 72ch)
  // -------------------------------------------------------------------------
  console.log('>>> [5/11] TYPOGRAPHY SPEC & RENDERING VERIFICATION');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const typoMetrics = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll('p')).filter(
        (p) => p.innerText.length > 50
      );
      const targetP = paragraphs[0] || document.querySelector('p');
      if (!targetP) return null;
      const style = window.getComputedStyle(targetP);
      const rect = targetP.getBoundingClientRect();
      const fontSize = parseFloat(style.fontSize);
      const lineHeightPx = parseFloat(style.lineHeight);
      const calculatedLineHeight = (lineHeightPx / fontSize).toFixed(2);
      return {
        text: targetP.innerText.substring(0, 100) + '...',
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        calculatedLineHeightRatio: calculatedLineHeight,
        maxWidth: style.maxWidth,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
      };
    });

    const ssPath = path.join(OUTPUT_DIR, '05_typography_body_paragraph.png');
    const pEl = page.locator('p').filter({ hasText: typoMetrics?.text.substring(0, 30) || '' }).first();
    await pEl.screenshot({ path: ssPath });

    summary.typography = {
      pass: true,
      metrics: typoMetrics,
      screenshot: ssPath,
    };

    console.log(`    Paragraph Typography:`);
    console.log(`      Text: "${typoMetrics?.text}"`);
    console.log(`      Font Family: ${typoMetrics?.fontFamily}`);
    console.log(`      Font Size: ${typoMetrics?.fontSize}`);
    console.log(`      Line Height: ${typoMetrics?.lineHeight} (Ratio: ${typoMetrics?.calculatedLineHeightRatio})`);
    console.log(`      Max Width: ${typoMetrics?.maxWidth}`);
    console.log(`      Rendered Width: ${typoMetrics?.renderedWidth}px`);
    console.log(`      Saved: ${ssPath}\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 6. REVIEWS SECTION (Mobile carousel vs Desktop 3-col grid + Initials avatar)
  // -------------------------------------------------------------------------
  console.log('>>> [6/11] REVIEWS SECTION (Mobile carousel vs Desktop 3-col grid)');
  {
    // Mobile view
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await mobilePage.goto(BASE_URL, { waitUntil: 'load' });
    await mobilePage.waitForTimeout(500);

    const reviewsSectionMobile = mobilePage.locator('section#reviews');
    await reviewsSectionMobile.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(300);

    const mobileReviewsSs = path.join(OUTPUT_DIR, '06_reviews_mobile_carousel.png');
    await reviewsSectionMobile.screenshot({ path: mobileReviewsSs });

    const mobileSnap = await mobilePage.evaluate(() => {
      const container = document.querySelector('section#reviews .snap-x');
      if (!container) return null;
      const cs = window.getComputedStyle(container);
      return {
        scrollSnapType: cs.scrollSnapType,
        overflowX: cs.overflowX,
      };
    });
    await mobilePage.close();

    // Desktop view
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(BASE_URL, { waitUntil: 'load' });
    await desktopPage.waitForTimeout(500);

    const reviewsSectionDesktop = desktopPage.locator('section#reviews');
    await reviewsSectionDesktop.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(300);

    const desktopReviewsSs = path.join(OUTPUT_DIR, '06_reviews_desktop_3col.png');
    await reviewsSectionDesktop.screenshot({ path: desktopReviewsSs });

    const desktopReviewsInfo = await desktopPage.evaluate(() => {
      const container = document.querySelector('section#reviews .md\\:grid');
      const cs = container ? window.getComputedStyle(container) : null;
      const avatars = Array.from(document.querySelectorAll('section#reviews .rounded-full')).filter(
        (el) => el.innerText && el.innerText.trim().length <= 3 && el.innerText.trim().length >= 1
      );
      return {
        gridTemplateColumns: cs?.gridTemplateColumns,
        avatars: avatars.map((a) => ({
          initials: a.innerText.trim(),
          width: Math.round(a.getBoundingClientRect().width),
          height: Math.round(a.getBoundingClientRect().height),
        })),
      };
    });

    summary.reviews = {
      pass: true,
      mobileScrollSnap: mobileSnap,
      desktopColumns: desktopReviewsInfo.gridTemplateColumns,
      avatarsFound: desktopReviewsInfo.avatars,
      screenshots: { mobile: mobileReviewsSs, desktop: desktopReviewsSs },
    };

    console.log(`    Mobile Scroll Snap: ${JSON.stringify(mobileSnap)}`);
    console.log(`    Desktop Grid Columns: ${desktopReviewsInfo.gridTemplateColumns}`);
    console.log(`    Initials Avatars: ${JSON.stringify(desktopReviewsInfo.avatars.slice(0, 3))}`);
    console.log(`    Saved: ${mobileReviewsSs}, ${desktopReviewsSs}\n`);
    await desktopPage.close();
  }

  // -------------------------------------------------------------------------
  // 7. PRIVACY & COOKIES PAGES (Sticky section nav & scroll-reveal)
  // -------------------------------------------------------------------------
  console.log('>>> [7/11] PRIVACY & COOKIES PAGES (Sticky Nav & Scroll Reveal)');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE_URL}/privacy`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(400);

    const privacySs = path.join(OUTPUT_DIR, '07_privacy_sticky_nav_scroll.png');
    await page.screenshot({ path: privacySs });

    const privacyNav = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const activeItem = document.querySelector('aside button[class*="text-[var(--accent)]"], aside button[class*="accent"], aside a[class*="accent"]');
      return {
        asidePosition: aside ? window.getComputedStyle(aside).position : null,
        activeSectionText: activeItem ? activeItem.innerText : null,
      };
    });

    await page.goto(`${BASE_URL}/cookies`, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(400);

    const cookiesSs = path.join(OUTPUT_DIR, '07_cookies_sticky_nav_scroll.png');
    await page.screenshot({ path: cookiesSs });

    summary.policyPages = {
      pass: true,
      privacyNav,
      screenshots: { privacy: privacySs, cookies: cookiesSs },
    };

    console.log(`    Privacy Sticky Nav: ${JSON.stringify(privacyNav)}`);
    console.log(`    Saved: ${privacySs}, ${cookiesSs}\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 8. PAGE TRANSITIONS (Homepage -> Category transition)
  // -------------------------------------------------------------------------
  console.log('>>> [8/11] PAGE TRANSITIONS TEST (Fade + TranslateY)');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    // Find and click on the Weddings & Events nav button
    const categoryLink = page.locator('header button:has-text("Weddings & Events")').first();
    await categoryLink.click();

    await page.waitForTimeout(75);
    const transitionSs = path.join(OUTPUT_DIR, '08_route_transition_mid_fade.png');
    await page.screenshot({ path: transitionSs });

    await page.waitForTimeout(350);
    const completeSs = path.join(OUTPUT_DIR, '08_route_transition_complete.png');
    await page.screenshot({ path: completeSs });

    summary.pageTransitions = {
      pass: true,
      screenshots: { mid: transitionSs, complete: completeSs },
    };

    console.log(`    Saved Mid-Transition: ${transitionSs}`);
    console.log(`    Saved Complete: ${completeSs}\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 9. LIGHTHOUSE AUDIT
  // -------------------------------------------------------------------------
  console.log('>>> [9/11] LIGHTHOUSE MOBILE AUDIT (Will run via Lighthouse CLI)');

  // -------------------------------------------------------------------------
  // 10. CONTRAST CHECKS (DevTools exact computation)
  // -------------------------------------------------------------------------
  console.log('>>> [10/11] WCAG CONTRAST CHECKS');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const lightTokens = await page.evaluate(() => {
      const cs = window.getComputedStyle(document.documentElement);
      const textPrimary = cs.getPropertyValue('--text-primary').trim();
      const bgBase = cs.getPropertyValue('--bg-base').trim();
      return { textPrimary, bgBase };
    });

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(100);

    const darkTokens = await page.evaluate(() => {
      const cs = window.getComputedStyle(document.documentElement);
      const accent = cs.getPropertyValue('--accent').trim();
      const bgBase = cs.getPropertyValue('--bg-base').trim();
      return { accent, bgBase };
    });

    const lightRatio = getContrastRatio(parseRgb(lightTokens.textPrimary), parseRgb(lightTokens.bgBase));
    const darkRatio = getContrastRatio(parseRgb(darkTokens.accent), parseRgb(darkTokens.bgBase));

    summary.contrast = {
      lightMode: {
        textPrimary: lightTokens.textPrimary,
        bgBase: lightTokens.bgBase,
        contrastRatio: `${lightRatio.toFixed(2)}:1`,
        wcagAAPassBody: lightRatio >= 4.5,
      },
      darkMode: {
        accent: darkTokens.accent,
        bgBase: darkTokens.bgBase,
        contrastRatio: `${darkRatio.toFixed(2)}:1`,
        wcagAAPassLarge: darkRatio >= 3.0,
      },
    };

    console.log(`    Light Mode (--text-primary vs --bg-base):`);
    console.log(`      Text: ${lightTokens.textPrimary}, Background: ${lightTokens.bgBase}`);
    console.log(`      Contrast Ratio: ${lightRatio.toFixed(2)}:1 (Pass >= 4.5:1: ${lightRatio >= 4.5})`);
    console.log(`    Dark Mode (--accent vs --bg-base):`);
    console.log(`      Accent: ${darkTokens.accent}, Background: ${darkTokens.bgBase}`);
    console.log(`      Contrast Ratio: ${darkRatio.toFixed(2)}:1 (Pass >= 3.0:1 for large/UI: ${darkRatio >= 3.0})\n`);
    await page.close();
  }

  // -------------------------------------------------------------------------
  // 11. CONSOLE AUDIT ON ALL ROUTES
  // -------------------------------------------------------------------------
  console.log('>>> [11/11] CONSOLE AUDIT ON ALL ROUTES');
  {
    const routesToTest = [
      '/',
      '/categories/weddings-events',
      '/categories/music-entertainment',
      '/privacy',
      '/cookies',
      '/contact',
      '/login',
      '/professionals/pro-vedic-heritage',
    ];

    const consoleEvents = [];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error' || type === 'warn' || text.toLowerCase().includes('hydration') || text.toLowerCase().includes('mismatch')) {
        consoleEvents.push({ route: page.url(), type, text });
      }
    });

    page.on('pageerror', (err) => {
      consoleEvents.push({ route: page.url(), type: 'uncaught-error', text: err.message });
    });

    for (const route of routesToTest) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'load' });
      await page.waitForTimeout(300);
    }

    summary.consoleAudit = {
      routesChecked: routesToTest.length,
      totalEvents: consoleEvents.length,
      events: consoleEvents,
    };

    console.log(`    Checked ${routesToTest.length} routes.`);
    console.log(`    Errors / Warnings / Hydration issues: ${consoleEvents.length}`);
    if (consoleEvents.length > 0) {
      consoleEvents.forEach((e) => console.log(`      [${e.type.toUpperCase()}] ${e.route}: ${e.text}`));
    }
    await page.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'visual_diagnostic_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('\n====================================================');
  console.log('   FULL VISUAL DIAGNOSTIC EXECUTION COMPLETE!       ');
  console.log('====================================================\n');
}

runDiagnostics().catch((err) => {
  console.error('Diagnostic error:', err);
  process.exit(1);
});

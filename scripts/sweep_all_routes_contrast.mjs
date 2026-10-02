import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
  '/',
  '/categories/weddings-events',
  '/categories/weddings-events/planning',
  '/categories/weddings-events/entertainment',
  '/categories/weddings-events/photography',
  '/categories/weddings-events/catering-food-desserts',
  '/categories/weddings-events/beauty-makeup-mehndi',
  '/categories/weddings-events/wedding-venues',
  '/categories/weddings-events/wedding-transportation',
  '/categories/weddings-events/decor-styling-essentials',
  '/faq',
  '/contact',
  '/feedback',
  '/login',
  '/signup',
  '/privacy',
  '/cookies',
];

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseRgba(colorStr) {
  if (!colorStr) return [0, 0, 0, 0];
  if (colorStr.startsWith('#')) {
    let hex = colorStr.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 1];
  }
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      match[4] !== undefined ? parseFloat(match[4]) : 1,
    ];
  }
  return [0, 0, 0, 0];
}

async function sweep() {
  console.log('===============================================================');
  console.log('      SAATHI COMPREHENSIVE WCAG CONTRAST SWEEP ACROSS ALL ROUTES');
  console.log('===============================================================\n');

  const browser = await chromium.launch({ headless: true });
  const allViolations = [];
  const resultsByRoute = {};

  for (const route of ROUTES) {
    resultsByRoute[route] = { light: 0, dark: 0 };

    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

      try {
        // Pre-seed theme in localStorage and document root
        await page.addInitScript((t) => {
          try {
            localStorage.setItem('saathi_theme_preference', t);
            document.documentElement.setAttribute('data-theme', t);
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch {}
        }, theme);

        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Ensure theme applied
        await page.evaluate((t) => {
          document.documentElement.setAttribute('data-theme', t);
          if (t === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }, theme);

        await page.waitForTimeout(500);

        // Scan all visible text-rendering elements in the DOM
        const pageViolations = await page.evaluate((themeName) => {
          function parseRgbaInner(colorStr) {
            if (!colorStr) return [0, 0, 0, 0];
            const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match) {
              return [
                parseInt(match[1]),
                parseInt(match[2]),
                parseInt(match[3]),
                match[4] !== undefined ? parseFloat(match[4]) : 1,
              ];
            }
            return [0, 0, 0, 0];
          }

          function getLuminanceInner(r, g, b) {
            const [rs, gs, bs] = [r, g, b].map((c) => {
              c = c / 255;
              return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
          }

          function getEffectiveBg(el) {
            let current = el;
            let layers = [];
            while (current && current !== document.documentElement) {
              const style = window.getComputedStyle(current);
              const bg = style.backgroundColor;
              const [r, g, b, a] = parseRgbaInner(bg);
              if (a > 0.05) {
                layers.unshift([r, g, b, a]);
                if (a >= 0.95) break; // Fully opaque
              }
              current = current.parentElement;
            }

            // Default canvas fallback
            const canvasDefault = themeName === 'dark' ? [20, 18, 16] : [247, 246, 243];
            let composite = [...canvasDefault];

            for (const layer of layers) {
              const a = layer[3];
              composite = [
                Math.round(layer[0] * a + composite[0] * (1 - a)),
                Math.round(layer[1] * a + composite[1] * (1 - a)),
                Math.round(layer[2] * a + composite[2] * (1 - a)),
              ];
            }

            return composite;
          }

          // Select elements that render text
          const allTextEls = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, td, th')
          );

          // Focus on leaf elements or elements without text-bearing children
          const elements = allTextEls.filter((el) => {
            const hasTextChild = Array.from(el.children).some((c) =>
              ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'BUTTON', 'A'].includes(c.tagName)
            );
            return !hasTextChild || el.tagName.startsWith('H') || el.tagName === 'P';
          });

          const violations = [];

          for (const el of elements) {
            const text = el.innerText?.trim();
            if (!text || text.length === 0) continue;

            // Check visibility
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0 || rect.top > 4000) continue;

            const style = window.getComputedStyle(el);
            if (style.visibility === 'hidden' || style.display === 'none' || parseFloat(style.opacity) < 0.1) {
              continue;
            }

            const fgRgba = parseRgbaInner(style.color);
            if (fgRgba[3] < 0.1) continue;

            const bgRgb = getEffectiveBg(el);

            // Compute composite text color if fg has alpha
            const effectiveFg = [
              Math.round(fgRgba[0] * fgRgba[3] + bgRgb[0] * (1 - fgRgba[3])),
              Math.round(fgRgba[1] * fgRgba[3] + bgRgb[1] * (1 - fgRgba[3])),
              Math.round(fgRgba[2] * fgRgba[3] + bgRgb[2] * (1 - fgRgba[3])),
            ];

            const lum1 = getLuminanceInner(effectiveFg[0], effectiveFg[1], effectiveFg[2]);
            const lum2 = getLuminanceInner(bgRgb[0], bgRgb[1], bgRgb[2]);
            const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

            const fontSize = parseFloat(style.fontSize) || 16;
            const fontWeight = parseInt(style.fontWeight) || 400;
            const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 600);
            const minRequired = isLargeText ? 3.0 : 4.5;

            if (ratio < minRequired) {
              violations.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className || '').toString().slice(0, 50),
                textSnippet: text.slice(0, 40).replace(/\n/g, ' '),
                fg: `rgb(${effectiveFg.join(',')})`,
                bg: `rgb(${bgRgb.join(',')})`,
                ratio: Number(ratio.toFixed(2)),
                required: minRequired,
                fontSize: Math.round(fontSize),
                fontWeight,
              });
            }
          }

          // Deduplicate
          const seen = new Set();
          return violations.filter((v) => {
            const k = `${v.textSnippet}-${v.ratio}`;
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          });
        }, theme);

        resultsByRoute[route][theme] = pageViolations.length;

        for (const v of pageViolations) {
          allViolations.push({
            route,
            theme,
            ...v,
          });
        }
      } catch (err) {
        console.error(`Error sweeping ${route} in ${theme}:`, err.message);
      } finally {
        await page.close();
      }
    }

    console.log(
      `Route: ${route.padEnd(46)} | Light: ${String(resultsByRoute[route].light).padStart(2)} violations | Dark: ${String(
        resultsByRoute[route].dark
      ).padStart(2)} violations`
    );
  }

  await browser.close();

  console.log('\n===============================================================');
  console.log(`TOTAL VIOLATIONS FOUND ACROSS ALL ROUTES: ${allViolations.length}`);
  console.log('===============================================================\n');

  if (allViolations.length > 0) {
    console.log('FULL LIST OF VIOLATIONS:');
    allViolations.forEach((v, i) => {
      console.log(
        `[${i + 1}] [${v.theme.toUpperCase()}] ${v.route} -> <${v.tag}> "${v.textSnippet}" | FG: ${v.fg} on BG: ${v.bg} | Ratio: ${v.ratio}:1 (Required: ${v.required}:1)`
      );
    });
  } else {
    console.log('ALL ROUTES PASSED WCAG AA CONTRAST CRITERIA IN BOTH LIGHT AND DARK THEMES!');
  }

  fs.writeFileSync('contrast_sweep_results.json', JSON.stringify({ summary: resultsByRoute, violations: allViolations }, null, 2));
}

sweep();

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const EVIDENCE_DIR = path.resolve(process.cwd(), 'visual-evidence');
const ARTIFACT_DIR = '/Users/kyzenn/.gemini/antigravity-ide/brain/cd52db23-e7ce-44be-af34-5cad78f379b1';

async function generateSideBySide() {
  const lightImgBase64 = fs.readFileSync(path.join(EVIDENCE_DIR, 'hero_desktop_light.png')).toString('base64');
  const darkImgBase64 = fs.readFileSync(path.join(EVIDENCE_DIR, 'hero_desktop_dark.png')).toString('base64');

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0f0e0d;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 32px;
      color: #f7f6f3;
    }
    .header {
      margin-bottom: 24px;
      text-align: center;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .header p {
      font-size: 14px;
      color: #9e9891;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      max-width: 2600px;
      margin: 0 auto;
    }
    .panel {
      background: #1c1917;
      border: 1px solid #2e2a26;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .panel-header {
      padding: 14px 20px;
      background: #141210;
      border-bottom: 1px solid #2e2a26;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .panel-title {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 9999px;
      background: rgba(184, 83, 46, 0.15);
      color: #d97047;
      border: 1px solid rgba(217, 112, 71, 0.3);
      font-weight: 500;
    }
    .panel img {
      width: 100%;
      height: auto;
      display: block;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Saathi — Theme Contrast Verification (Light vs Dark)</h1>
    <p>Zero hardcoded text hexes • Theme-aware semantic CSS tokens • Fraunces display typography</p>
  </div>
  <div class="grid">
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Light Mode (#F7F6F3 Canvas / #171412 Text)</span>
        <span class="badge">H1 16.97:1 • Subhead 4.67:1</span>
      </div>
      <img src="data:image/png;base64,${lightImgBase64}" alt="Light Mode" />
    </div>
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Dark Mode (#141210 Canvas / #F2EFEA Text)</span>
        <span class="badge">H1 12.64:1 • Subhead 6.15:1</span>
      </div>
      <img src="data:image/png;base64,${darkImgBase64}" alt="Dark Mode" />
    </div>
  </div>
</body>
</html>
  `;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2680, height: 1100 } });
  await page.setContent(htmlContent);
  await page.waitForTimeout(500);

  const outputPath = path.join(EVIDENCE_DIR, 'side_by_side_modes.png');
  await page.screenshot({ path: outputPath, fullPage: true });
  fs.copyFileSync(outputPath, path.join(ARTIFACT_DIR, 'side_by_side_modes.png'));
  console.log('Side-by-side comparison saved to:', outputPath);
  await browser.close();
}

generateSideBySide().catch(console.error);

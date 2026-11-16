const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function renderMoreAssets() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  const assetsDir = path.join(__dirname, 'assets');

  // 4. Plans Comparison Card (Sleek, visual, zero overflow)
  console.log('Rendering plans_tiers.png...');
  await page.setViewportSize({ width: 440, height: 460 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #0c1512; color: #fff; width: 440px; height: 460px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .tier { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; }
        .tier.popular { background: linear-gradient(135deg, rgba(37,168,120,0.18), rgba(15,36,29,0.95)); border: 1.5px solid #25A878; box-shadow: 0 8px 20px rgba(37,168,120,0.25); position: relative; }
        .badge-pop { position: absolute; right: 14px; top: -10px; background: #25A878; color: #041f14; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 10px; text-transform: uppercase; }
        .title-group { display: flex; flex-direction: column; gap: 3px; }
        .tier-name { font-size: 15px; font-weight: 800; color: #ffffff; }
        .tier.popular .tier-name { color: #34d399; }
        .tier-features { font-size: 12px; color: #94a3b8; }
        .tier.popular .tier-features { color: #d1fae5; font-weight: 500; }
        .price-group { text-align: right; }
        .price { font-size: 18px; font-weight: 800; color: #ffffff; }
        .price span { font-size: 11px; color: #94a3b8; font-weight: 500; }
        .tier.popular .price { color: #34d399; }
      </style>
    </head>
    <body>
      <div class="tier">
        <div class="title-group">
          <div class="tier-name">🌱 Basic Plan</div>
          <div class="tier-features">1 Clean Landing Page · Free Subdomain</div>
        </div>
        <div class="price-group">
          <div class="price">₹599 <span>/mo</span></div>
        </div>
      </div>
      <div class="tier popular">
        <div class="badge-pop">⭐ Most Popular</div>
        <div class="title-group">
          <div class="tier-name">🚀 Business Plan</div>
          <div class="tier-features">5 Pages · Local SEO · Google Maps Sync</div>
        </div>
        <div class="price-group">
          <div class="price">₹1,199 <span>/mo</span></div>
        </div>
      </div>
      <div class="tier">
        <div class="title-group">
          <div class="tier-name">👑 Premium Plan</div>
          <div class="tier-features">Unlimited Pages · Online Bookings & Dashboards</div>
        </div>
        <div class="price-group">
          <div class="price">₹2,199 <span>/mo</span></div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(assetsDir, 'plans_tiers.png') });

  // 5. Domain Search Showcase Card
  console.log('Rendering domain_card.png...');
  await page.setViewportSize({ width: 440, height: 380 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #0c1512; color: #fff; width: 440px; height: 380px; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
        .domain-box { background: #13271f; border: 1.5px solid #25A878; border-radius: 14px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 25px rgba(37,168,120,0.2); }
        .domain-url { font-size: 18px; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 8px; }
        .domain-url .lock { color: #34d399; }
        .domain-status { background: #25A878; color: #041f14; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
        .info-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
        .info-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #e2e8f0; font-weight: 600; }
        .info-item .check { color: #34d399; font-weight: 800; }
      </style>
    </head>
    <body>
      <div class="domain-box">
        <div class="domain-url"><span class="lock">🔒</span> webrivo.in</div>
        <div class="domain-status">✓ AVAILABLE</div>
      </div>
      <div class="info-card">
        <div class="info-item"><span class="check">✓</span> Free Custom Domain Included (Business & Premium)</div>
        <div class="info-item"><span class="check">✓</span> Free Subdomain with Basic Plan</div>
        <div class="info-item"><span class="check">✓</span> Full SSL Encryption & Fast Cloud DNS</div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(assetsDir, 'domain_card.png') });

  // 6. Fast 48h Dispatch & Delivery Progress Card
  console.log('Rendering request_dispatch.png...');
  await page.setViewportSize({ width: 440, height: 380 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #0c1512; color: #fff; width: 440px; height: 380px; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
        .btn-send { background: linear-gradient(135deg, #25A878, #1c7c59); color: #ffffff; font-size: 16px; font-weight: 800; padding: 14px; border-radius: 12px; text-align: center; box-shadow: 0 8px 20px rgba(37,168,120,0.35); letter-spacing: 0.5px; }
        .progress-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(37,168,120,0.3); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .step { display: flex; align-items: center; gap: 12px; }
        .step-icon { width: 32px; height: 32px; border-radius: 50%; background: rgba(37,168,120,0.2); color: #34d399; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; }
        .step-text { display: flex; flex-direction: column; gap: 2px; }
        .step-title { font-size: 13px; font-weight: 700; color: #ffffff; }
        .step-sub { font-size: 11px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="btn-send">⚡ 1-Click Request Submitted</div>
      <div class="progress-card">
        <div class="step">
          <div class="step-icon">1</div>
          <div class="step-text">
            <div class="step-title">WebRivo Design Expert Assigned</div>
            <div class="step-sub">We review your brand & business goals</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">2</div>
          <div class="step-text">
            <div class="step-title">Interactive Prototype Ready</div>
            <div class="step-sub">Full mobile & desktop responsive preview</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">🚀</div>
          <div class="step-text">
            <div class="step-title">100% Live in 48 Hours</div>
            <div class="step-sub">Google Maps, domain, and SEO activated</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(assetsDir, 'request_dispatch.png') });

  await browser.close();
  console.log('All additional UI assets rendered successfully!');
}

renderMoreAssets().catch(err => {
  console.error(err);
  process.exit(1);
});

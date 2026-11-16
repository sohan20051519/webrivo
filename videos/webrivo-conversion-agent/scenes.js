// @ts-check

/**
 * WebRivo - Visual Motion Graphics Explainer Video
 * Platform: Vertical (Reels / Shorts / TikTok 1080x1920)
 * Domain: webrivo.in
 * Visual Assets: Real storefronts, human customers searching on smartphones,
 * real responsive mobile website mockups, and realistic UI dashboards.
 */

export default {
  /**
   * Scene 1: hook
   * Script: [#hook] Your shop is [#hidden] hidden online. [#search] A customer searches near you, and finds [#them] someone else.
   */
  hook(s) {
    s.short.backdrop({ color: '#081410', glow: '#ef4444', pattern: 'grid' });
    s.short.hook('Your shop is *hidden online*', {
      kicker: 'LOCAL BUSINESS REALITY',
      kickerIcon: 'alert-triangle',
      y: 230,
      size: 48,
    });

    // 0s - 1.77s: Real cozy local storefront with an offline warning
    s.image('assets/shop_front.jpg', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'cover',
      kenburns: true,
      at: 0,
      out: '#search',
    });
    s.box('⚠️ OFFLINE · NO WEBSITE', {
      size: 42,
      x: s.cx,
      y: 990,
      color: '#ffffff',
      fill: '#ef4444',
      radius: 12,
      pad: [12, 28],
      at: '#hidden',
      out: '#search',
    });

    // 1.77s - 3.75s: Customer searching on phone outdoors
    s.short.jolt('#search');
    s.image('assets/customer_search.jpg', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'cover',
      kenburns: true,
      at: '#search',
      out: '#them',
    });
    s.box('🔍 Searching "Bakery Near Me"...', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#search',
      out: '#them',
    });

    // 3.75s - end: Competitor chosen over your unlisted shop
    s.short.jolt('#them');
    s.image('assets/maps_comparison.png', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      at: '#them',
    });
    s.box('❌ Customer Chooses Competitor', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#ffffff',
      fill: '#ef4444',
      radius: 12,
      pad: [12, 28],
      at: '#them',
    });
  },

  /**
   * Scene 2: fix
   * Script: [#fix] WebRivo fixes the [#map] map, the [#page] page, and the [#form] forms. [#live] Your site goes live.
   */
  fix(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'rays' });
    s.short.hook('WebRivo *builds & fixes* it', {
      kicker: 'THE WEBRIVO SOLUTION',
      kickerIcon: 'sparkles',
      y: 230,
      size: 48,
    });

    // Realistic responsive mobile website mockup
    s.image('assets/website_mobile.png', {
      w: 720,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      kenburns: true,
      at: '#fix',
    });

    s.box('🚀 WebRivo All-In-One Setup', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#fix',
      out: '#map',
    });

    s.short.jolt('#map');
    s.box('📍 Google Maps Verified Sync', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#map',
      out: '#page',
    });

    s.short.jolt('#page');
    s.box('🌐 Custom 5-Page Responsive Site', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#page',
      out: '#form',
    });

    s.short.jolt('#form');
    s.box('⚡ 1-Click Online Order Form', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#form',
      out: '#live',
    });

    s.burst({ x: s.cx, y: 990, at: '#live' });
    s.box('🎉 100% Live In 48 Hours', {
      size: 42,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#live',
    });
  },

  /**
   * Scene 3: plans
   * Script: [#three] Three plans. [#basic] Basic is 599 a month, [#onepage] one page. [#biz] Business is 1,199, [#fivepages] 5 pages with SEO. [#prem] Premium is 2,199, [#full] with bookings and dashboards.
   */
  plans(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'grid' });
    s.short.hook('Transparent *pricing for all*', {
      kicker: 'WEBRIVO PLANS',
      kickerIcon: 'tag',
      y: 230,
      size: 48,
    });

    // Tier comparison card
    s.image('assets/plans_tiers.png', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      at: '#three',
    });

    s.box('📋 Simple Transparent Plans', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#three',
      out: '#basic',
    });

    s.short.jolt('is#1');
    s.short.jolt('599');
    s.short.jolt('month');
    s.box('🌱 Basic Plan: ₹599 / month', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#basic',
      out: '#biz',
    });

    s.short.jolt('is#2');
    s.short.jolt('1,199');
    s.short.jolt('5');
    s.short.jolt('pages');
    s.box('⭐ Business: ₹1,199 (Popular)', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#biz',
      out: '#prem',
    });

    s.short.jolt('SEO');

    s.short.jolt('is#3');
    s.short.jolt('2,199');
    s.box('👑 Premium: ₹2,199 (Full Automation)', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#prem',
    });

    s.short.jolt('bookings');
    s.short.jolt('dashboards');
  },

  /**
   * Scene 4: estimator
   * Script: [#agent] The estimator builds your mix. [#add] It adds [#seo] local SEO, [#maps] maps, [#pay] payments. [#live] The total updates live.
   */
  estimator(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'dots' });
    s.short.hook('Build your *feature mix*', {
      kicker: 'LIVE ESTIMATOR',
      kickerIcon: 'calculator',
      y: 230,
      size: 48,
    });

    s.image('assets/estimator_ui.png', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      at: '#agent',
    });

    s.box('⚙️ WebRivo Live Estimator', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#agent',
      out: '#seo',
    });

    s.short.jolt('builds');

    s.short.jolt('#seo');
    s.box('🔍 Local SEO Added', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#seo',
      out: '#maps',
    });

    s.short.jolt('#maps');
    s.box('📍 Google Maps Verified Sync', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#maps',
      out: '#pay',
    });

    s.short.jolt('#pay');
    s.box('💳 1-Click Online Customer Orders', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#pay',
      out: '#live',
    });

    s.burst({ x: s.cx, y: 990, at: '#live' });
    s.short.jolt('total');
    s.box('⚡ Real-Time Price Calculation', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#live',
    });
  },

  /**
   * Scene 5: domain
   * Script: [#domain] Pick your domain too. [#inc] Business and Premium include one. [#sub] Basic gets a free subdomain.
   */
  domain(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'grid' });
    s.short.hook('Pick your *official domain*', {
      kicker: 'CUSTOM BRANDING',
      kickerIcon: 'globe',
      y: 230,
      size: 48,
    });

    s.image('assets/domain_card.png', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      at: '#domain',
    });

    s.box('🌐 Custom Domain Search', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#domain',
      out: '#inc',
    });

    s.short.jolt('#inc');
    s.short.jolt('and');
    s.box('FREE webrivo.in Domain Included', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#inc',
      out: '#sub',
    });

    s.short.jolt('#sub');
    s.short.jolt('gets');
    s.box('✓ Free Subdomain with Basic Plan', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#sub',
    });
  },

  /**
   * Scene 6: send
   * Script: [#tap] Choose the Send request button. [#full] The form lists your plan, [#extras] extras, and the total. [#reach] Submit it, and WebRivo follows up.
   */
  send(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'rays' });
    s.short.hook('Send your *request in 1-click*', {
      kicker: 'FAST ONBOARDING',
      kickerIcon: 'send',
      y: 230,
      size: 48,
    });

    s.image('assets/request_dispatch.png', {
      w: 740,
      h: 420,
      y: 680,
      frame: 'card',
      fit: 'contain',
      at: '#tap',
    });

    s.box('⚡ 1-Click Request Submission', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#tap',
      out: '#full',
    });

    s.short.jolt('form');
    s.short.jolt('lists');
    s.short.jolt('plan');
    s.short.jolt('extras');
    s.box('📋 Plan & Features Summary', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#34d399',
      fill: '#13271f',
      radius: 12,
      pad: [12, 28],
      at: '#full',
      out: '#reach',
    });

    s.short.jolt('it');
    s.short.jolt('#reach');
    s.short.jolt('WebRivo');
    s.box('🤝 Dedicated WebRivo Advisor Assigned', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#reach',
    });
  },

  /**
   * Scene 7: payoff
   * Script: [#found] Get found. [#chosen] Get chosen. No setup fee, and live in days.
   */
  payoff(s) {
    s.short.backdrop({ color: '#081410', glow: '#25A878', pattern: 'rays' });

    // Real thriving, bustling local shop filled with happy customers
    s.image('assets/thriving_shop.jpg', {
      w: 740,
      h: 420,
      y: 650,
      frame: 'card',
      fit: 'cover',
      kenburns: true,
      at: 0,
      out: 'No',
    });

    s.box('⭐ 1. Get Found on Google Search', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#found',
      out: '#chosen',
    });

    s.short.jolt('#chosen');
    s.box('🏆 2. Get Chosen by Local Customers', {
      size: 40,
      x: s.cx,
      y: 990,
      color: '#041f14',
      fill: '#25A878',
      radius: 12,
      pad: [12, 28],
      at: '#chosen',
      out: 'No',
    });

    s.burst({ x: s.cx, y: 500, at: 'No' });
    s.short.payoff({
      title: 'webrivo.in',
      icon: 'rocket',
      lines: [
        'Zero setup fee · Live in days',
        'Custom 5-page responsive website',
        'Google Maps & local SEO included',
      ],
      y: 660,
      w: 740,
      at: 'No',
    });
  },
};

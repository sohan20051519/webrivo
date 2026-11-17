// WebRivo — Get Found, Get Chosen. A vertical short in the site's own look:
// forest background, sage accents, Anton display type, the tape motif.
// The facts are the site's facts: ₹599 / ₹1,199 / ₹2,199 a month, hosting and
// updates in every plan, domains per plan. Nothing invented.
import { backdrop, beats, hookFrame, payoff, punch } from './format.js';

const SAGE = '#DDE3D5';
const WHITE = '#FFFFFF';
const MUTED = '#A9BBA2';

export default {
  hook(s) {
    s.camera(punch(s, '#else', { zoom: 1.05 }));
    hookFrame(s, 'Your shop is *hidden* online', {
      icon: 'store',
      color: SAGE,
      kicker: 'WEBSITES FOR LOCAL BUSINESSES',
    });
    s.short.sticker('off the map', { x: s.cx, y: s.safe.y + s.safe.h * 0.45, size: 46, at: '#search', color: SAGE, keyColor: '#18352B', textColor: '#18352B' });
  },

  fix(s) {
    s.camera(punch(s, '#fix', { zoom: 1.05 }));
    backdrop(s, { glow: SAGE, pattern: 'dots' });
    s.short.step(1, 5, { color: SAGE });
    s.short.flash('#build', { color: WHITE, alpha: 0.25 });
    beats(s, [
      { at: '#fix', icon: 'layout-template', label: 'Hand-built page', color: SAGE },
      { at: '#gallery', icon: 'images', label: 'Photos and services', color: WHITE },
      { at: '#map', icon: 'map-pin', label: 'Map pin on Google', color: SAGE },
      { at: '#whatsapp', icon: 'message-circle', label: 'WhatsApp booking', color: WHITE },
    ]);
  },

  price(s) {
    s.camera(punch(s, '#biz', { zoom: 1.1 }));
    backdrop(s, { glow: SAGE, pattern: 'dots' });
    s.short.step(2, 5, { color: SAGE });
    beats(s, [
      { at: '#basic', icon: 'zap', label: 'Basic ₹599 /mo', color: SAGE },
      { at: '#biz', icon: 'layout-template', label: 'Business ₹1,199 /mo', color: WHITE },
      { at: '#prem', icon: 'sparkles', label: 'Premium ₹2,199 /mo', color: SAGE },
    ]);
    s.short.flash('#prem', { color: SAGE, alpha: 0.3 });
    s.short.flash('#five', { color: WHITE, alpha: 0.28 });
    s.short.flash('#full', { color: SAGE, alpha: 0.3 });
  },

  turn(s) {
    s.camera(punch(s, '#any', { zoom: 1.1 }));
    backdrop(s, { glow: SAGE, pattern: 'rays' });
    s.short.step(3, 5, { color: SAGE });
    s.short.interrupt('#turn', { flash: true });
    s.short.flash('#host', { color: WHITE, alpha: 0.25 });
    beats(s, [
      { at: '#host', icon: 'shield-check', label: 'Hosting updates included', color: MUTED },
      { at: '#dom', icon: 'globe-check', label: 'Business .in domain', color: SAGE },
      { at: '#any', icon: 'globe', label: 'Premium any domain', color: WHITE },
      { at: '#sub', icon: 'link', label: 'Basic free subdomain', color: SAGE },
    ]);
    s.short.flash('#sub', { color: SAGE, alpha: 0.25 });
  },

  estimator(s) {
    s.camera(punch(s, '#live', { zoom: 1.08 }));
    backdrop(s, { glow: SAGE, pattern: 'dots' });
    s.short.step(4, 5, { color: SAGE });
    beats(s, [
      { at: '#est', icon: 'list-checks', label: 'Pick your mix', color: SAGE },
      { at: '#seo', icon: 'search', label: 'Local SEO', color: WHITE },
      { at: '#maps', icon: 'map', label: 'Maps embed', color: SAGE },
      { at: '#wa', icon: 'message-circle', label: 'WhatsApp buttons', color: WHITE },
      { at: '#yearly', icon: 'percent', label: '10% off yearly', color: SAGE },
    ]);
  },

  payoff(s) {
    s.camera(punch(s, '#mail', { zoom: 1.05 }));
    return payoff(s, 'Get found. Get chosen.', [
      { text: '₹599 / ₹1,199 / ₹2,199 per month', at: '#found' },
      { text: 'Hosting and updates included', at: '#chosen' },
      { text: 'webrivo.official@gmail.com', at: '#mail' },
    ], { icon: 'search', tone: 'dark', color: SAGE });
  },
};

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Globe,
  Zap,
} from 'lucide-react';

/* ─── Universal feature catalogue ──────────────────────────────────────
   Every item here can be toggled on ANY plan.
   The plan only determines what comes FREE (included) vs what costs extra.
   ───────────────────────────────────────────────────────────────────── */

const FEATURES = [
  { id: 'extra_pages',          label: 'Additional pages',          price: 99  },
  { id: 'local_seo',            label: 'Local SEO setup',           price: 249 },
  { id: 'gbp_setup',            label: 'Google Business Profile',   price: 199 },
  { id: 'google_maps',          label: 'Google Maps embed',         price: 99  },
  { id: 'whatsapp_link',        label: 'WhatsApp & call buttons',   price: 49  },
  { id: 'booking_system',       label: 'Booking system',            price: 349 },
  { id: 'payment_gateway',      label: 'Payment gateway',           price: 299 },
  { id: 'admin_dashboard',      label: 'Admin dashboard',           price: 349 },
  { id: 'analytics_dashboard',  label: 'Analytics dashboard',       price: 199 },
];

const ADDONS = [
  { id: 'gbp_optimization', label: 'GBP Optimization', price: 199 },
  { id: 'wa_automation',    label: 'WA Automation',    price: 149 },
  { id: 'multilingual',     label: 'Extra Language',   price: 149 },
];

const DOMAIN_SUPPLEMENTS = { com: 210, org: 170, xyz: 100 };

const YEARLY_DISCOUNT = 0.10;

const fmt = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/* ─── Plans ───────────────────────────────────────────────────────────── */

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: '1-page site, hosted & ready.',
    basePrice: 599,
    included: [
      { feature: '1-page website' },
      { feature: 'Fully responsive' },
      { feature: 'Hosting & updates' },
    ],
    freeFeatureIds: [],
    domainNote: 'Free subdomain (e.g. yourshop.webrivo.in)',
    domainExtraMap: {},
  },
  {
    id: 'business',
    name: 'Business',
    tagline: '5 pages + SEO & local presence.',
    popular: true,
    basePrice: 1199,
    included: [
      { feature: '5-page website' },
      { feature: 'Local SEO setup' },
      { feature: 'Google Business Profile' },
      { feature: 'WhatsApp & call buttons' },
      { feature: 'Hosting & updates' },
    ],
    freeFeatureIds: ['local_seo', 'gbp_setup', 'whatsapp_link'],
    domainNote: '.in domain included · other TLDs extra',
    domainIncludedExt: ['in'],
    domainExtraMap: DOMAIN_SUPPLEMENTS,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Bookings, payments & dashboards.',
    basePrice: 2199,
    included: [
      { feature: '5+ page website' },
      { feature: 'Local SEO + GBP' },
      { feature: 'Google Maps embed' },
      { feature: 'Booking & payments' },
      { feature: 'Admin & analytics' },
      { feature: 'WhatsApp & calls' },
      { feature: 'Hosting & updates' },
    ],
    freeFeatureIds: ['local_seo', 'gbp_setup', 'google_maps', 'booking_system', 'payment_gateway', 'admin_dashboard', 'analytics_dashboard', 'whatsapp_link'],
    domainNote: 'Any TLD domain included',
    domainExtraMap: {},
    domainIncludedAll: true,
  },
];

/* ─── Component ────────────────────────────────────────────────────── */

export default function Calculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('business');
  const [billing, setBilling] = useState('monthly');
  const [selectedFeatures, setSelectedFeatures] = useState(new Set());
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [domainTld, setDomainTld] = useState(null);

  const [isBooking, setIsBooking] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  /* Reset selections when plan changes — pre-tick included features */
  useEffect(() => {
    const p = PLANS.find((x) => x.id === selectedPlanId) || PLANS[1];
    setSelectedFeatures(new Set(p.freeFeatureIds));
    setSelectedAddons(new Set());
    setDomainTld(null);
  }, [selectedPlanId]);

  /* Cross-component plan actions from pricing cards */
  useEffect(() => {
    const switchHandler = (e) => {
      if (e.detail && PLANS.some((p) => p.id === e.detail)) setSelectedPlanId(e.detail);
    };
    const bookingHandler = (e) => {
      if (!e.detail || !PLANS.some((p) => p.id === e.detail)) return;
      setSelectedPlanId(e.detail);
      setIsBooking(true);
    };
    window.addEventListener('switchPlan', switchHandler);
    window.addEventListener('openBooking', bookingHandler);
    return () => {
      window.removeEventListener('switchPlan', switchHandler);
      window.removeEventListener('openBooking', bookingHandler);
    };
  }, []);

  /* Modal keyboard close */
  useEffect(() => {
    if (!isBooking) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setIsBooking(false); setFormStatus('idle'); }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [isBooking]);

  const toggleFeature = (id) =>
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAddon = (id) =>
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const plan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];
  const isYearly = billing === 'yearly';

  /* ── Costs ── */
  let featuresCost = 0;
  selectedFeatures.forEach((id) => {
    const feat = FEATURES.find((f) => f.id === id);
    if (!feat) return;
    if (plan.freeFeatureIds?.includes(id)) return;
    featuresCost += feat.price;
  });

  let addonsCost = 0;
  selectedAddons.forEach((id) => {
    const a = ADDONS.find((x) => x.id === id);
    if (a) addonsCost += a.price;
  });

  const domainMonthly = (() => {
    if (plan.domainIncludedAll) return 0;
    if (!domainTld) return 0;
    return plan.domainExtraMap?.[domainTld] ?? 0;
  })();

  const monthlyTotal = plan.basePrice + featuresCost + addonsCost + domainMonthly;
  const yearlyTotal = Math.round(monthlyTotal * 12 * (1 - YEARLY_DISCOUNT));
  const displayTotal = isYearly ? yearlyTotal : monthlyTotal;
  const yearlySaving = Math.round(monthlyTotal * 12 * YEARLY_DISCOUNT);

  const selectedFeatureDetails = Array.from(selectedFeatures)
    .map((id) => FEATURES.find((feature) => feature.id === id))
    .filter(Boolean);
  const selectedAddonDetails = Array.from(selectedAddons)
    .map((id) => ADDONS.find((addon) => addon.id === id))
    .filter(Boolean);
  const paidFeatureDetails = selectedFeatureDetails.filter(
    (feature) => !plan.freeFeatureIds?.includes(feature.id)
  );
  const includedFeatureDetails = selectedFeatureDetails.filter(
    (feature) => plan.freeFeatureIds?.includes(feature.id)
  );
  const domainSelection = plan.domainIncludedAll
    ? 'Any domain extension included'
    : domainTld
      ? `.${domainTld} domain (+${fmt(domainMonthly)}/mo)`
      : plan.domainIncludedExt?.includes('in')
        ? '.in domain included'
        : 'Free WebRivo subdomain';
  const requestSummary = [
    `PLAN: ${plan.name}`,
    `BILLING: ${isYearly ? 'Yearly (10% discount)' : 'Monthly (6-month minimum)'}`,
    `BASE: ${fmt(plan.basePrice)}/mo`,
    paidFeatureDetails.length
      ? `EXTRA FEATURES: ${paidFeatureDetails.map((feature) => `${feature.label} (+${fmt(feature.price)}/mo)`).join(', ')}`
      : 'EXTRA FEATURES: None',
    includedFeatureDetails.length
      ? `INCLUDED FEATURES: ${includedFeatureDetails.map((feature) => feature.label).join(', ')}`
      : null,
    selectedAddonDetails.length
      ? `MONTHLY ADD-ONS: ${selectedAddonDetails.map((addon) => `${addon.label} (+${fmt(addon.price)}/mo)`).join(', ')}`
      : 'MONTHLY ADD-ONS: None',
    `DOMAIN: ${domainSelection}`,
    `ESTIMATED TOTAL: ${fmt(displayTotal)}/${isYearly ? 'yr' : 'mo'}`,
    isYearly ? `YEARLY SAVING: ${fmt(yearlySaving)}` : null,
  ].filter(Boolean).join('\n');

  const closeBooking = () => { setIsBooking(false); setFormStatus('idle'); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xlgrlddg', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      setFormStatus(res.ok ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  /* Domain extensions shown as upgrade options */
  const domainExtensions = Object.entries(plan.domainExtraMap).filter(
    ([tld]) => !plan.domainIncludedExt?.includes(tld)
  );
  const anyDomainUpgrades = domainExtensions.length > 0 || plan.domainNote?.toLowerCase().includes('extra');

  return (
    <div id="calculator" className="calc-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Estimator</span>
            <h2 className="display">Build your plan.</h2>
          </div>
        </div>

        {/* Billing toggle + reset */}
        <div className="calc-billing-row reveal">
          <div className="calc-billing" role="radiogroup" aria-label="Billing period">
            <button
              type="button" role="radio" aria-checked={!isYearly}
              className={`calc-billing__btn${!isYearly ? ' is-on' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly<small>6-month min.</small>
            </button>
            <button
              type="button" role="radio" aria-checked={isYearly}
              className={`calc-billing__btn${isYearly ? ' is-on' : ''}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly<small className="calc-billing__save">Save 10%</small>
            </button>
          </div>
          <button
            type="button"
            className="calc-reset"
            onClick={() => {
              setBilling('monthly');
              setSelectedFeatures(new Set(plan.freeFeatureIds));
              setSelectedAddons(new Set());
              setDomainTld(null);
            }}
          >
            Reset selections
          </button>
        </div>

        <div className="calc reveal">
          <div className="calc__grid">
            <div className="calc__main">

              {/* Plan picker */}
              <div>
                <div className="calc__label">Choose plan</div>
                <div className="calc-plans">
                  {PLANS.map((p) => (
                    <button
                      type="button" key={p.id}
                      className={`calc-plan${selectedPlanId === p.id ? ' is-selected' : ''}`}
                      onClick={() => setSelectedPlanId(p.id)}
                      aria-pressed={selectedPlanId === p.id}
                    >
                      {p.popular && <span className="calc-plan__flag">Most picked</span>}
                      <b>{p.name}</b>
                      <span>{p.tagline}</span>
                      <em>
                        {fmt(isYearly ? Math.round(p.basePrice * 12 * (1 - YEARLY_DISCOUNT)) : p.basePrice)}{isYearly ? '/yr' : '/mo'}
                      </em>
                    </button>
                  ))}
                </div>
              </div>

              {/* Included features */}
              <div className="calc-group">
                <h4><Check aria-hidden="true" />Included in {plan.name}</h4>
                <ul className="calc-included-list">
                  {plan.included.map(({ feature }) => (
                    <li key={feature} className="calc-included-item">
                      <Check className="calc-included-icon" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="calc-domain-hint">{plan.domainNote}</p>
              </div>

              {/* Add-on features — same catalogue on every plan */}
              <div className="calc-group">
                <h4>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add features
                </h4>
                <div className="calc-chips">
                  {FEATURES.map((e) => {
                    const sel = selectedFeatures.has(e.id);
                    const isFree = plan.freeFeatureIds?.includes(e.id);
                    return (
                      <button
                        type="button" key={e.id}
                        className={`calc-chip${sel ? ' is-selected' : ''}${isFree ? ' is-included' : ''}`}
                        onClick={() => toggleFeature(e.id)}
                        aria-pressed={sel}
                        disabled={isFree}
                      >
                        {isFree
                          ? <span className="calc-chip__check is-ticked" aria-hidden="true"><Check size={8} /></span>
                          : <span className="calc-chip__check" aria-hidden="true">{sel && <Check size={9} />}</span>
                        }
                        <span className="calc-chip__label">{e.label}</span>
                        <span className="calc-chip__price">{isFree ? 'Included' : `+${fmt(e.price)}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monthly add-ons */}
              <div className="calc-group">
                <h4><Zap aria-hidden="true" />Monthly add-ons</h4>
                <div className="calc-chips">
                  {ADDONS.map((addon) => {
                    const sel = selectedAddons.has(addon.id);
                    return (
                      <button
                        type="button" key={addon.id}
                        className={`calc-chip${sel ? ' is-selected' : ''}`}
                        onClick={() => toggleAddon(addon.id)}
                        aria-pressed={sel}
                      >
                        <span className="calc-chip__check" aria-hidden="true">{sel && <Check size={9} />}</span>
                        <span className="calc-chip__label">{addon.label}</span>
                        <span className="calc-chip__price">+{fmt(addon.price)}/mo</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Domain upgrade */}
              {anyDomainUpgrades && (
                <div className="calc-group">
                  <h4><Globe aria-hidden="true" />Domain extension</h4>
                  <div className="calc-chips">
                    {[
                      { id: null, label: 'Default (.in)', price: 0 },
                      ...domainExtensions.map(([ext, price]) => ({ id: ext, label: `.${ext}`, price })),
                    ].map((d) => (
                      <button
                        type="button" key={d.id ?? 'default'}
                        className={`calc-chip${domainTld === d.id ? ' is-selected' : ''}`}
                        onClick={() => setDomainTld(d.id)}
                        aria-pressed={domainTld === d.id}
                      >
                        <span className="calc-chip__label">{d.label}</span>
                        <span className="calc-chip__price">{d.price === 0 ? 'Included' : `+${fmt(d.price)}/mo`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Summary sidebar */}
            <aside className="calc__side">
              <div className="calc__label">
                {isYearly
                  ? <>Yearly estimate · <span className="calc-badge"><Check size={10} />10% off</span></>
                  : 'Monthly estimate'}
              </div>

              <div className="calc-summary">
                <div className="calc-line calc-line--head">
                  <span>{plan.name} plan</span>
                  <span>{fmt(plan.basePrice)}/mo</span>
                </div>

                {Array.from(selectedFeatures).map((id) => {
                  const f = FEATURES.find((x) => x.id === id);
                  if (!f) return null;
                  if (plan.freeFeatureIds?.includes(id)) return null;
                  return (
                    <div className="calc-line" key={id}>
                      <span>{f.label}</span>
                      <span>+{fmt(f.price)}/mo</span>
                    </div>
                  );
                })}

                {Array.from(selectedAddons).map((id) => {
                  const a = ADDONS.find((x) => x.id === id);
                  if (!a) return null;
                  return (
                    <div className="calc-line" key={id}>
                      <span>{a.label}</span>
                      <span>+{fmt(a.price)}/mo</span>
                    </div>
                  );
                })}

                {domainMonthly > 0 && (
                  <div className="calc-line">
                    <span>Domain (.{domainTld})</span>
                    <span>+{fmt(domainMonthly)}/mo</span>
                  </div>
                )}

                {isYearly && (
                  <div className="calc-line calc-line--saving">
                    <span>You save</span>
                    <span>{fmt(yearlySaving)} / yr</span>
                  </div>
                )}
              </div>

              <div className="calc-total">
                <div className="calc-total__label">
                  {isYearly ? 'Total / year' : 'Total / month'}
                </div>
                <div className="calc-total__num">
                  {fmt(displayTotal)}
                  <span className="calc-total__per">/{isYearly ? 'yr' : 'mo'}</span>
                </div>
                {!isYearly && <p className="calc-total__note">6-month minimum</p>}
                <button
                  type="button"
                  className="btn btn--lg btn--wide"
                  onClick={() => setIsBooking(true)}
                >
                  Send request
                  <ArrowRight className="arrow" aria-hidden="true" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {isBooking && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Book your plan">
          <div className="modal__backdrop" onClick={closeBooking} />
          <div className="modal__panel">
            <button type="button" className="modal__close" onClick={closeBooking} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>

            {formStatus === 'success' ? (
              <div className="modal__success">
                <span className="modal__success-icon" aria-hidden="true"><Check /></span>
                <h3>Request sent</h3>
                <p className="modal__lead">We&apos;ll reach out about your {plan.name} plan soon.</p>
                <button type="button" className="btn btn--primary" onClick={closeBooking}>Close</button>
              </div>
            ) : (
              <>
                <h3>Book your plan</h3>
                <p className="modal__lead">
                  {plan.name} · {fmt(displayTotal)}/{isYearly ? 'yr' : 'mo'}
                  {!isYearly && <> · <em>6-month min.</em></>}
                </p>

                <form className="form" onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value={`New Subscription: ${plan.name} Plan · ${isYearly ? 'Yearly' : 'Monthly'} · ${fmt(displayTotal)}`} />
                  <input type="hidden" name="summary" value={requestSummary} />

                  <div className="field">
                    <label htmlFor="calc-name">Name</label>
                    <input id="calc-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="calc-phone">Phone</label>
                    <input id="calc-phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
                  </div>
                  <div className="field">
                    <label htmlFor="calc-email">Email · optional</label>
                    <input id="calc-email" name="email" type="email" placeholder="you@example.com" />
                  </div>

                  {formStatus === 'error' && (
                    <p className="form__status form__status--error">Something went wrong. Try again.</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn--primary btn--wide"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending…' : 'Send request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

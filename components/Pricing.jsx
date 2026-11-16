import React, { useState } from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    monthly: 599,
    yearly: 6469,
    tagline: 'For shops, salons & clinics starting out.',
    features: [
      'Website built for you — free',
      '1-page landing site',
      'Fully responsive',
      'Hosting & maintenance',
      'Free random domain',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 1199,
    yearly: 12949,
    tagline: 'For growing businesses that want to rank.',
    featured: true,
    features: [
      'Website built for you — free',
      '5-page website',
      'Local SEO setup',
      'Google Business Profile',
      'WhatsApp & call buttons',
      '.in domain included',
      'Hosting & maintenance',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthly: 2199,
    yearly: 23749,
    tagline: 'For high-volume brands with bookings.',
    features: [
      'Everything in Business',
      'Booking & payment system',
      'Admin dashboard',
      'Analytics dashboard',
      'Any TLD domain included',
      'Hosting & maintenance',
    ],
  },
];

const ADDONS = [
  { name: 'GBP Optimization', price: '+₹199/mo' },
  { name: 'WA Automation', price: '+₹149/mo' },
  { name: 'Extra Language', price: '+₹149/mo' },
];

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const isYearly = billing === 'yearly';

  const customize = (planId) => {
    const section = document.getElementById('calculator');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('switchPlan', { detail: planId }));
  };

  return (
    <section id="pricing" className="section section--line">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Pricing</span>
            <h2 className="display">No setup fee.</h2>
            <p className="lead">
              We build your website free. You just pay a monthly fee that covers
              hosting, maintenance & your domain.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="billing-toggle reveal" role="radiogroup" aria-label="Billing period">
            <button
              type="button"
              role="radio"
              aria-checked={!isYearly}
              className={`billing-toggle__opt${!isYearly ? ' is-on' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
              <small>6-month min.</small>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={isYearly}
              className={`billing-toggle__opt${isYearly ? ' is-on' : ''}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly
              <small className="billing-toggle__save">Save 10%</small>
            </button>
          </div>
        </div>

        <div className="pricing">
          {PLANS.map((plan, index) => (
            <article
              key={plan.id}
              className={`price-card${plan.featured ? ' price-card--featured' : ''} reveal`}
              data-delay={index + 1}
            >
              {plan.featured && <span className="price-card__badge">Most picked</span>}
              <span className="price-card__name">{plan.name}</span>

              <div className="price-card__price">
                {isYearly ? (
                  <>
                    {fmt(plan.yearly)}
                    <span className="price-card__per">/yr</span>
                  </>
                ) : (
                  <>
                    {fmt(plan.monthly)}
                    <span className="price-card__per">/mo</span>
                  </>
                )}
              </div>

              <div className="price-card__freq">
                {isYearly
                  ? `₹${plan.yearly}/yr · saves ₹${Math.round(plan.monthly * 12 - plan.yearly)} vs monthly`
                  : `6-month commitment · then cancel anytime`}
              </div>

              <p className="price-card__desc">{plan.tagline}</p>

              <ul className="price-card__list">
                {plan.features.map((feature) => (
                  <li className="price-feature" key={feature}>
                    <Check aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="price-card__actions">
                <a href="#contact" className="btn btn--primary">
                  Choose {plan.name}
                  <ArrowRight className="arrow" aria-hidden="true" />
                </a>
                <button type="button" className="btn btn--ghost" onClick={() => customize(plan.id)}>
                  Customize plan
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="addon-strip reveal">
          <span className="addon-strip__label">Add-ons · billed monthly</span>
          {ADDONS.map((addon) => (
            <span className="tag" key={addon.name}>
              <Zap aria-hidden="true" style={{ width: 14, height: 14, display: 'inline', marginRight: 5 }} />
              {addon.name} · {addon.price}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

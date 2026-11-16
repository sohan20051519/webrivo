import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    name: 'Aurea Hotels',
    type: 'Hospitality',
    theme: 'a',
    kicker: 'Jaipur · Boutique stay',
    headline: 'Stay somewhere worth remembering.',
    line: 'Twelve suites. One courtyard.',
    cta: 'Book a room',
  },
  {
    name: 'Kaya Clinic',
    type: 'Healthcare',
    theme: 'b',
    kicker: 'Pune · Family care',
    headline: 'Care that fits your day.',
    line: 'Walk in. Get seen. Go home.',
    cta: 'Book a visit',
  },
  {
    name: 'Nova Gym',
    type: 'Fitness',
    theme: 'c',
    kicker: 'Bengaluru · Strength',
    headline: 'Train like it matters.',
    line: 'Coaching, classes, recovery.',
    cta: 'Start a trial',
  },
  {
    name: 'Saffron Table',
    type: 'Restaurant',
    theme: 'b',
    kicker: 'Delhi · Modern Indian',
    headline: 'A table worth the trip.',
    line: 'Seasonal plates. Open late.',
    cta: 'Reserve',
  },
];

export default function Work() {
  return (
    <section id="work" className="section section--line">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Work</span>
            <h2 className="display">Selected builds.</h2>
          </div>
          <p className="lead">Local names. Global finish.</p>
        </div>

        <div className="work">
          {PROJECTS.map((project, index) => (
            <a
              href="#contact"
              className="work-card reveal"
              data-delay={index}
              key={project.name}
            >
              <div className="work-card__media">
                <div className={`site site--${project.theme}`}>
                  <div className="site__bar">
                    <span>{project.name}</span>
                    <span>0{index + 1} / 04</span>
                  </div>
                  <div className="site__hero">
                    <div className="site__hero-kicker">{project.kicker}</div>
                    <h4>{project.headline}</h4>
                    <p>{project.line}</p>
                  </div>
                  <div className="site__row" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="site__pill">
                    <span>{project.cta}</span>
                  </span>
                </div>
              </div>

              <div className="work-card__meta">
                <div>
                  <h3>{project.name}</h3>
                  <span>{project.type}</span>
                </div>
                <span className="work-card__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

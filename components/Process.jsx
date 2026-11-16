import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    id: '01',
    title: 'Scout',
    desc: 'We find the gap in your market.',
  },
  {
    id: '02',
    title: 'Shape',
    desc: 'We design the brand around it.',
  },
  {
    id: '03',
    title: 'Ship',
    desc: 'We launch it. Then we watch it work.',
  },
];

function VisualScout() {
  return (
    <div className="pv-frame">
      <div className="pv-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="pv-frame__body">
        <span className="pv-tag">Mapped</span>
        <div className="pv-line pv-line--accent" />
        <div className="pv-line pv-line--short" />
        <div className="pv-grid">
          <span className="pv-block" />
          <span className="pv-block" />
        </div>
        <div className="pv-line" />
      </div>
    </div>
  );
}

function VisualShape() {
  return (
    <div className="pv-frame">
      <div className="pv-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="pv-frame__body">
        <span className="pv-tag pv-tag--coral">In design</span>
        <span className="pv-block" />
        <div className="pv-grid">
          <div>
            <div className="pv-line" />
            <div className="pv-line pv-line--short" />
          </div>
          <div>
            <div className="pv-line" />
            <div className="pv-line pv-line--short" />
          </div>
        </div>
        <div className="pv-line pv-line--accent" />
      </div>
    </div>
  );
}

function VisualShip() {
  return (
    <div className="pv-frame">
      <div className="pv-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="pv-frame__body">
        <span className="pv-tag">Live</span>
        <div className="pv-line pv-line--accent" />
        <div className="pv-grid">
          <span className="pv-block" />
          <span className="pv-block" />
        </div>
        <div className="pv-line pv-line--short" />
        <div className="pv-line" />
      </div>
    </div>
  );
}

const VISUALS = [VisualScout, VisualShape, VisualShip];

export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.46;
      let next = 0;
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        if (el.getBoundingClientRect().top < marker) next = index;
      });
      setActive(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="process" className="section section--line">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Process</span>
            <h2 className="display">Three moves. Live.</h2>
          </div>
          <p className="lead">Simple by design. Fast by default.</p>
        </div>

        <div className="process">
          <div className="process__sticky reveal reveal--left">
            <div className="process__visual">
              <div className="process__visual-inner" aria-hidden="true">
                {VISUALS.map((Visual, index) => (
                  <div
                    className={`process__step-visual${active === index ? ' is-active' : ''}`}
                    key={STEPS[index].id}
                  >
                    <Visual />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="process__list">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`process__step${active === index ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
              >
                <span className="process__step-num">{step.id}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <svg
                    className="progress-line"
                    viewBox="0 0 100 2"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line className="progress-line__track" x1="0" y1="1" x2="100" y2="1" />
                    <line className="progress-line__fill" x1="0" y1="1" x2="100" y2="1" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

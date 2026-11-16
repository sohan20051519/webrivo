import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

const STATS = [
  { value: 120, suffix: '+', label: 'Projects shipped' },
  { value: 240, suffix: '%', label: 'Avg. traffic lift' },
  { value: 3, suffix: ' days', label: 'Typical launch' },
  { value: 4.9, suffix: '/5', label: 'Client rating', decimals: 1 },
];

function CountUp({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const tween = gsap.to(counter, {
        value,
        duration: 1.7,
        ease: 'power3.out',
        paused: true,
        onUpdate: () => setDisplay(counter.value),
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => tween.play(),
      });
    });

    return () => ctx.revert();
  }, [value]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString('en-IN');

  return (
    <span ref={ref} className="stat__num">
      {formatted}
      <em>{suffix}</em>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="stats reveal">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

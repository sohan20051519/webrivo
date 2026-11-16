import React from 'react';
import { Sparkles } from 'lucide-react';

const INDUSTRIES = ['Hotels', 'Clinics', 'Restaurants', 'Gyms', 'Salons', 'Retail', 'Studios', 'Cafés'];

export default function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {INDUSTRIES.map((item) => (
              <span className="marquee__item" key={`${group}-${item}`}>
                <Sparkles aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

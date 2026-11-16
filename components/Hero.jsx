import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="display">
            <span className="line">
              <span>Get found.</span>
            </span>
            <span className="line">
              <span className="outline">Get chosen.</span>
            </span>
          </h1>

          <p className="lead">Websites for local businesses. No setup fee, no surprises.</p>

          <a href="#contact" className="btn btn--primary btn--lg">
            Start a project
            <ArrowRight className="arrow" aria-hidden="true" />
          </a>
        </div>

        <div className="hero__visual">
          <a className="poster" href="#work" aria-label="See recent work">
            <span className="poster__word">Aurea</span>
          </a>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="display">Everything a local brand needs.</h2>
          </div>
          <p className="lead">One studio. One team. No handoffs.</p>
        </div>

        <div className="bento">
          <article className="bento-card bento-card--wide bento-card--accent reveal">
            <span className="bento-card__num">01 / Build</span>
            <h3>Websites</h3>
            <p>Fast, responsive, made to convert.</p>
            <div className="bento-card__visual">
              <div className="viz-code">
                <div>
                  <b>const</b> site = <i>build</i>({'{'}
                </div>
                <div>&nbsp;&nbsp;speed: <em>'100'</em>,</div>
                <div>&nbsp;&nbsp;seo: <em>'local'</em>,</div>
                <div>&nbsp;&nbsp;look: <em>'world-class'</em></div>
                <div>
                  {'}'});<span className="caret" aria-hidden="true" />
                </div>
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--narrow bento-card--dark reveal" data-delay="1">
            <span className="bento-card__num">02 / Find</span>
            <h3>Local SEO</h3>
            <p>Found first, on Maps and search.</p>
            <div className="bento-card__visual">
              <div className="viz-map">
                <span className="viz-map__ring" aria-hidden="true" />
                <span className="viz-map__pin" aria-hidden="true" />
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--third reveal" data-delay="1">
            <span className="bento-card__num">03 / Look</span>
            <h3>Brand</h3>
            <p>Colour, type, voice — all yours.</p>
            <div className="bento-card__visual">
              <div className="viz-swatches" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--third reveal" data-delay="2">
            <span className="bento-card__num">04 / Grow</span>
            <h3>Content</h3>
            <p>Words and images that sell.</p>
            <div className="bento-card__visual">
              <div className="viz-bars" aria-hidden="true">
                <i style={{ height: '46%' }} />
                <i style={{ height: '64%' }} />
                <i style={{ height: '38%' }} />
                <i style={{ height: '82%' }} />
                <i style={{ height: '58%' }} />
                <i style={{ height: '94%' }} />
                <i style={{ height: '70%' }} />
              </div>
            </div>
          </article>

          <article className="bento-card bento-card--third reveal" data-delay="3">
            <span className="bento-card__num">05 / Care</span>
            <h3>Support</h3>
            <p>Real humans, on call.</p>
            <div className="bento-card__visual">
              <div className="viz-chat" aria-hidden="true">
                <span className="viz-chat__msg viz-chat__msg--out">Site is live.</span>
                <span className="viz-chat__msg viz-chat__msg--in">That was fast.</span>
                <span className="viz-chat__msg viz-chat__msg--out">Any time.</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

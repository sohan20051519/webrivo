import React, { useState, useRef } from "react";
import {
  Globe,
  Smartphone,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Instagram,
  Play,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";
import "./ServicesBento.css";

// Bento Card with Mouse-Tracking Spotlight
function BentoCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bento-card-spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(221, 227, 213, 0.45), transparent 65%)`,
        }}
      />
      {children}
    </article>
  );
}

export default function ServicesBento() {
  return (
    <section className="bento-section ht-grainy" data-sec="services" id="services" aria-label="Our Services">
      {/* Tape transition connection */}
      <div className="ht-join ht-join-masking" aria-hidden="true">
        <i className="ht-join-in" />
      </div>

      {/* Header */}
      <div className="bento-head">
        <div className="bento-label-wrap">
          <div className="bento-label-tag">
            <span className="bento-badge-pulse" />
            03 &mdash; What we do
          </div>
        </div>

        <div className="bento-head-row">
          <h2 className="bento-title">
            Everything
            <br />
            you need.
          </h2>
          <div className="bento-subtitle-wrap">
            <p className="bento-subtitle">
              Four services. One team. Built for local businesses that want to be found, chosen and remembered.
            </p>
          </div>
        </div>
      </div>

      {/* Master 12-Column Bento Grid */}
      <div className="bento-grid">
        {/* ==========================================================================
            CARD 01: Website Development (Span 4)
            ========================================================================== */}
        <BentoCard className="bento-col-4">
          <div className="bento-card-header">
            <span className="bento-tag-pill">
              <Globe size={11} /> Web Presence
            </span>
            <span className="bento-card-num">01</span>
          </div>

          <div className="bento-card-info">
            <h3 className="bento-card-title">Website Development</h3>
            <p className="bento-card-desc">
              Fast, findable sites that turn visitors into customers.
            </p>
          </div>

          <ul className="bento-items-list">
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Landing pages &amp; multi-page websites</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Responsive, mobile-first design</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Hosting, maintenance &amp; domain</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Local SEO setup</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Google Business Profile integration</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Booking &amp; appointment systems</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Payment gateway integration</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Admin &amp; analytics dashboards</span>
            </li>
          </ul>
        </BentoCard>

        {/* ==========================================================================
            CARD 02: App Development (Span 4)
            ========================================================================== */}
        <BentoCard className="bento-col-4">
          <div className="bento-card-header">
            <span className="bento-tag-pill">
              <Smartphone size={11} /> Apps &amp; PWAs
            </span>
            <span className="bento-card-num">02</span>
          </div>

          <div className="bento-card-info">
            <h3 className="bento-card-title">App Development</h3>
            <p className="bento-card-desc">
              Simple, useful apps that work everywhere.
            </p>
          </div>

          <ul className="bento-items-list">
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Responsive apps / PWAs</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Core screens &amp; user flows</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Hosting &amp; maintenance</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Updates &amp; support</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <Zap size={13} color="#10b981" />
              <span>Works 100% offline with service worker</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <Sparkles size={13} color="#10b981" />
              <span>1-tap install to home screen</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Zero 30% App Store fees</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Instant cloud sync &amp; notifications</span>
            </li>
          </ul>
        </BentoCard>

        {/* ==========================================================================
            CARD 03: Digital Catalogue Designing (Span 4)
            ========================================================================== */}
        <BentoCard className="bento-col-4">
          <div className="bento-card-header">
            <span className="bento-tag-pill">
              <BookOpen size={11} /> Digital Catalogue
            </span>
            <span className="bento-card-num">03</span>
          </div>

          <div className="bento-card-info">
            <h3 className="bento-card-title">Digital Catalogue Designing</h3>
            <p className="bento-card-desc">
              Show your range beautifully, on any screen.
            </p>
          </div>

          <ul className="bento-items-list">
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Product catalogue design</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Mobile-friendly layouts</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Hosted &amp; shareable catalogues</span>
            </li>
            <li className="bento-item-pill">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Content updates</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <Zap size={13} color="#10b981" />
              <span>Direct WhatsApp order &amp; share links</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <Sparkles size={13} color="#10b981" />
              <span>Printable QR codes for counters</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>High-res product visual cards</span>
            </li>
            <li className="bento-item-pill bento-item-highlight">
              <CheckCircle2 size={13} className="bento-check-svg" />
              <span>Instant price &amp; menu updates</span>
            </li>
          </ul>
        </BentoCard>

        {/* ==========================================================================
            CARD 04: Digital Marketing (Span 12 - Full Width Bottom Deck)
            ========================================================================== */}
        <BentoCard className="bento-col-12">
          <div className="bento-card-header">
            <span className="bento-tag-pill">
              <TrendingUp size={11} /> Marketing &amp; Growth
            </span>
            <span className="bento-card-num">04</span>
          </div>

          <div className="bento-card-info">
            <h3 className="bento-card-title">Digital Marketing</h3>
            <p className="bento-card-desc">
              Get seen, get talked about, get chosen.
            </p>
          </div>

          {/* 3 Balanced Sub-Bento Columns */}
          <div className="bento-subgrid-3">
            {/* Group 1: Social Media Management */}
            <div className="bento-subcard">
              <div className="bento-subcard-header">
                <Instagram size={13} />
                <span>Social Media Management</span>
              </div>
              <ul className="bento-subcard-items">
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Client-provided videos and images</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Instagram account management</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Uploading posts and reels</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Caption writing</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Hashtag research</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Post scheduling</span>
                </li>
              </ul>
            </div>

            {/* Group 2: Content Creation & Management */}
            <div className="bento-subcard">
              <div className="bento-subcard-header">
                <Play size={13} />
                <span>Content Creation &amp; Mgmt</span>
              </div>
              <ul className="bento-subcard-items">
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>AI video generation</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Video editing</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Post and image creation</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Content planning</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Caption writing &amp; hashtags</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Instagram account management</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Posting and scheduling</span>
                </li>
              </ul>
            </div>

            {/* Group 3: Meta Ads Management */}
            <div className="bento-subcard">
              <div className="bento-subcard-header">
                <Sliders size={13} />
                <span>Meta Ads Management</span>
              </div>
              <ul className="bento-subcard-items">
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Instagram Ads</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Facebook Ads</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Ad campaign setup</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Target audience selection</span>
                </li>
                <li className="bento-subcard-item">
                  <CheckCircle2 size={12} />
                  <span>Ad performance monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

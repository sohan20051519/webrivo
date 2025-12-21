import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef(null);
  const cardLeftRef = useRef(null);
  const cardRightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5);
      const yNorm = (clientY / window.innerHeight - 0.5);

      // Move Title slightly
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${xNorm * 15}px, ${yNorm * 15}px)`;
      }

      // Parallax for 3D Cards (Move opposite and more intensely)
      if (cardLeftRef.current) {
        cardLeftRef.current.style.transform = `translate(${-xNorm * 40}px, ${-yNorm * 40}px) rotateY(12deg) rotateX(5deg)`;
      }
      if (cardRightRef.current) {
        cardRightRef.current.style.transform = `translate(${-xNorm * 50}px, ${-yNorm * 30}px) rotateY(-12deg) rotateX(5deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center md:pt-20 overflow-hidden perspective-container">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg z-0 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      {/* 3D Floating Elements (Desktop Only) - Z-Index 10 (Background Layer) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-10">

        {/* Left Card: Vendor Scouted - Pushed further left */}
        <div
          ref={cardLeftRef}
          className="absolute top-1/4 left-[5%] w-64 p-4 rounded-2xl glass-panel border-l-4 border-l-emerald-500 shadow-2xl animate-float-3d transition-transform duration-100 ease-out"
          style={{ transform: 'rotateY(12deg) rotateX(5deg)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Scouted</div>
              <div className="text-white font-bold">City Gym & Spa</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/40 rounded-lg p-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs text-red-200">No Website Detected</span>
          </div>
        </div>

        {/* Right Card: Success/Launch - Pushed further right */}
        <div
          ref={cardRightRef}
          className="absolute bottom-1/4 right-[5%] w-72 p-5 rounded-2xl glass-panel border-r-4 border-r-teal-500 shadow-2xl animate-float-3d-delayed transition-transform duration-100 ease-out"
          style={{ transform: 'rotateY(-12deg) rotateX(5deg)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Status</div>
              <div className="text-white font-bold text-lg">Website Live</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>

          {/* Mock Chart */}
          <div className="flex items-end gap-1 h-12 mb-2">
            {[40, 65, 45, 80, 60, 90, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-teal-500/50 to-emerald-400/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="text-right text-xs text-emerald-300 font-medium">+240% Local Traffic</div>
        </div>

      </div>

      {/* Content Container - Z-Index 30 (Foreground Layer) */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider">Webrivo Agency</span>
        </div>

        {/* Main Title */}
        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6 transition-transform duration-100 ease-out">
          <span className="block text-white">Empowering Local</span>
          <span className="block text-gradient-accent">Vendors Globally.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
          As a premier <strong>Digital Transformation Agency</strong>, we bridge the gap between local businesses and the global market.
          Our <strong>Web Design</strong> & SEO experts scout the best local vendors and transform them into
          powerful online brands.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="#contact" className="group relative px-8 py-4 rounded-full bg-white text-neutral-950 font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
            <span className="relative z-10 group-hover:text-emerald-600 transition-colors">Start Transformation</span>
            <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>

          <a href="#process" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:border-white/30">
            How We Work
          </a>
        </div>
      </div>

      {/* Marquee - Z-Index 20 (Middle Layer) */}
      <div className="absolute bottom-0 w-full py-6 border-y border-white/5 bg-neutral-950/50 backdrop-blur-sm overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              {['HOTELS', 'HOSPITALS', 'RETAIL SHOPS', 'RESTAURANTS', 'CLINICS', 'GYMS', 'SALONS'].map((text) => (
                <span key={text} className="text-2xl font-display font-bold text-transparent stroke-text opacity-30" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
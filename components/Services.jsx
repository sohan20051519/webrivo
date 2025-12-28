import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Services() {
  useScrollReveal();

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            We Build More Than Websites. <br />
            <span className="text-neutral-500">We Architect Digital Growth.</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Large Card - Removed blur and glass effects to fix border artifact */}
          <div
            className="md:col-span-2 row-span-1 rounded-3xl bg-neutral-900/30 border border-white/5 p-8 relative overflow-hidden group reveal-on-scroll transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Custom Web Development</h3>
                <p className="text-neutral-400 max-w-sm">Tailor-made solutions for hotels, hospitals, and retail. Fast, secure, and SEO-optimized from day one.</p>
              </div>
              <div className="self-end">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
            {/* Abstract UI Mockup */}
            <div className="absolute right-[-20px] bottom-[-40px] w-64 h-48 bg-neutral-900 rounded-tl-xl border border-white/10 p-4 opacity-80 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-transform duration-500">
              <div className="w-full h-4 bg-white/10 rounded mb-3"></div>
              <div className="flex gap-2">
                <div className="w-1/3 h-24 bg-white/5 rounded"></div>
                <div className="w-2/3 h-24 bg-white/5 rounded"></div>
              </div>
            </div>
          </div>

          {/* Tall Card - Removed blur and glass effects to fix border artifact */}
          <div
            className="md:col-span-1 row-span-2 rounded-3xl bg-neutral-900/30 border border-white/5 p-8 relative overflow-hidden group reveal-on-scroll reveal-delay-200 transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-bl from-teal-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-6 text-teal-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Dedicated Tele-Support</h3>
              <p className="text-neutral-400 mb-8">Our team doesn't just build; we connect. We handle the initial outreach, explaining the value of digital presence to local vendors in their language.</p>

              <div className="mt-auto space-y-3">
                {['Local Language Support', '24/7 Availability', 'Vendor Onboarding'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="md:col-span-1 row-span-1 rounded-3xl glass-panel p-8 group hover:bg-white/5 transition-colors reveal-on-scroll reveal-delay-100">
            <h3 className="text-xl font-bold text-white mb-2">Google Maps SEO</h3>
            <p className="text-sm text-neutral-400">We optimize your listing so locals find you first.</p>
            <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-3/4 animate-pulse"></div>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="md:col-span-1 row-span-1 rounded-3xl glass-panel p-8 group hover:bg-white/5 transition-colors reveal-on-scroll reveal-delay-300">
            <h3 className="text-xl font-bold text-white mb-2">Brand Identity</h3>
            <p className="text-sm text-neutral-400">Logo, colors, and voice that speak to your community.</p>
            <div className="mt-6 flex items-center justify-between">
              {/* Color Palette Preview */}
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-emerald-500 shadow-lg"></div>
                <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-teal-400 shadow-lg"></div>
                <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-blue-500 shadow-lg"></div>
              </div>
              {/* Typography Preview */}
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 font-serif text-xl italic text-white/80">
                Aa
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import React from 'react';

export default function ImpactStack() {
  const cards = [
    {
      id: 1,
      title: "Hyper-Local Targeting",
      subtitle: "Dominate Your Neighborhood",
      description: "We don't just build websites; we build digital beacons. Our SEO strategies are hyper-focused on your specific pincode, ensuring that when locals search for services, you are the first name they see.",
      color: "from-emerald-500 to-emerald-700",
      bg: "bg-neutral-900",
      border: "border-emerald-500/20",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    },
    {
      id: 2,
      title: "World-Class Engineering",
      subtitle: "Speed That Converts",
      description: "Local doesn't mean low quality. We bring Silicon Valley standards to your business. 99.9% uptime, sub-second load times, and bank-grade security come standard with every Webrivo project.",
      color: "from-teal-500 to-teal-700",
      bg: "bg-neutral-900",
      border: "border-teal-500/20",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      )
    },
    {
      id: 3,
      title: "24/7 Growth Engine",
      subtitle: "Business While You Sleep",
      description: "Your physical shop closes at 9 PM. Your digital shop never closes. Capture leads, book appointments, and answer queries automatically, 24 hours a day, 365 days a year.",
      color: "from-sky-500 to-blue-700",
      bg: "bg-neutral-900",
      border: "border-sky-500/20",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      )
    }
  ];

  return (
    <section className="relative py-24 bg-neutral-950" id="vendors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Why Top Vendors <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Choose Webrivo</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We combine local understanding with global technical standards to deliver results that actually impact your bottom line.
          </p>
        </div>

        {/* Stack Container */}
        <div className="relative flex flex-col gap-8 md:gap-0">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className={`sticky top-24 md:top-32 lg:top-40 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl border ${card.border} shadow-2xl transition-transform duration-500`}
              style={{ 
                backgroundColor: '#0a0a0a', // Solid background to hide cards behind
                backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.03), transparent)',
                zIndex: index + 1,
                // Subtle scale effect for stacking
                transformOrigin: 'top center'
              }}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  {card.icon}
                </div>
                <div>
                  <h4 className={`text-sm font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${card.color} mb-2`}>
                    {card.subtitle}
                  </h4>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  {card.description}
                </p>
                <div className="pt-4">
                  <button className="text-white text-sm font-semibold border-b border-white/20 pb-1 hover:border-white transition-colors">
                    Learn more about {card.title.split(' ')[0]} &rarr;
                  </button>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full md:h-[400px] rounded-2xl overflow-hidden relative group">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Abstract Visuals based on index */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {index === 0 && (
                     // Map / Location Visual
                     <div className="relative w-48 h-48">
                        <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-[spin-slow_10s_linear_infinite]"></div>
                        <div className="absolute inset-4 border border-emerald-500/20 rounded-full"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse"></div>
                        </div>
                        {/* Radar Scan */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent w-full h-full animate-[spin_3s_linear_infinite] rounded-full origin-center mask-image-radar"></div>
                     </div>
                  )}
                  {index === 1 && (
                    // Code / Speed Visual
                    <div className="relative w-64 h-40 bg-neutral-900/50 backdrop-blur-md rounded-lg border border-teal-500/20 p-4 flex flex-col gap-3 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                      </div>
                      <div className="h-2 bg-teal-500/20 rounded w-3/4"></div>
                      <div className="h-2 bg-teal-500/20 rounded w-1/2"></div>
                      <div className="h-2 bg-teal-500/20 rounded w-5/6"></div>
                      <div className="mt-auto flex justify-between items-center text-xs text-teal-400 font-mono">
                        <span>Lighthouse Score</span>
                        <span className="font-bold">100/100</span>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    // Growth / Chart Visual
                    <div className="flex items-end gap-3 h-48 w-64 px-4 pb-4 border-b border-l border-sky-500/20">
                      {[30, 45, 35, 60, 50, 80, 100].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-sky-900/50 to-sky-500 rounded-t-sm transition-all duration-700 hover:opacity-100 opacity-70"
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
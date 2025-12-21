import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Process() {
  useScrollReveal();

  const steps = [
    {
      id: '01',
      title: 'Scout & Identify',
      description: 'Our data team uses advanced mapping to locate high-potential local vendors, hospitals, and shops near you.',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: '02',
      title: 'Connect & Consult',
      description: 'Our professional tele-callers reach out to understand your business needs and propose a digital strategy.',
      icon: (
        <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      id: '03',
      title: 'Build & Launch',
      description: 'Our dev team crafts a stunning, high-performance website tailored to your brand, launching you to the world.',
      icon: (
        <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="process" className="py-24 relative bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            From Local Map to <span className="text-gradient-accent">Global App</span>.
          </h2>
          <p className="text-neutral-400 max-w-xl">
            Our streamlined process ensures that no business is left behind in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`group relative p-8 rounded-3xl glass-panel hover:bg-white/5 transition-all duration-500 reveal-on-scroll reveal-delay-${(index + 1) * 100}`}
            >
              {/* Connector Line (Desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="text-5xl font-display font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
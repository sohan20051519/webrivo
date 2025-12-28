import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Services from './components/Services';
import ImpactStack from './components/ImpactStack';
import Pricing from './components/Pricing';
import Calculator from './components/Calculator';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 selection:bg-emerald-500/30">

      {/* Global Noise Overlay */}
      <div className="bg-noise"></div>

      <Header />

      <main>
        <Hero />
        <Process />
        <ImpactStack />
        <Services />
        <Pricing />
        <Calculator />
        <Contact />


        {/* Simple Call to Action Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Ready to take your business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Online?</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-10">
              Our team is ready to find you, call you, and build for you.
            </p>
            <a href="#contact" className="inline-block px-10 py-4 rounded-full bg-white text-neutral-950 font-bold text-lg hover:bg-emerald-50 transition-all hover:scale-105 shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)]">
              Get Your Website Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
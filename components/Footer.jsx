import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-neutral-950 pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[15vw] font-display font-bold text-white whitespace-nowrap leading-none">
          WEBRIVO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://xnlmfbnwyqxownvhsqoz.supabase.co/storage/v1/object/public/files/ChatGPT_Image_Dec_21__2025__02_21_07_PM-removebg-preview.png"
                alt="Webrivo Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-neutral-400 max-w-sm mb-6">
              Connecting local vendors to the digital future. We scout, we call, we build.
            </p>

          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Local SEO</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Vendor Consulting</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Digital Branding</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:webrivo.official@gmail.com" className="hover:text-white transition-colors">webrivo.official@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <svg className="w-4 h-4 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div className="flex flex-col gap-1">
                  <a href="tel:+918050130969" className="hover:text-white transition-colors">+91 80501 30969</a>
                  <a href="tel:+919113253754" className="hover:text-white transition-colors">+91 91132 53754</a>
                  <a href="tel:+916366610809" className="hover:text-white transition-colors">+91 63666 10809</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-neutral-600">
          <p>&copy; 2024 Webrivo Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
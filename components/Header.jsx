import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Process', 'Services', 'Pricing', 'Vendors', 'Contact'];

  return (
    <>
      <header
        className={`fixed z-50 left-0 right-0 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled ? 'top-4' : 'top-0'}
        `}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled
              ? 'w-[95%] md:w-auto md:min-w-[600px] bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full py-2 md:py-2 px-4 md:px-6'
              : 'w-full max-w-7xl px-4 py-4 md:px-6 md:py-6 bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="https://xnlmfbnwyqxownvhsqoz.supabase.co/storage/v1/object/public/files/ChatGPT_Image_Dec_21__2025__02_21_07_PM-removebg-preview.png"
              alt="Webrivo Logo"
              className={`
                object-contain transition-all duration-500
                ${scrolled ? 'h-10 md:h-12 w-auto' : 'h-12 md:h-20 w-auto'}
              `}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${scrolled
                    ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                    : 'text-neutral-300 hover:text-white'
                  }
                `}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={`
                hidden md:flex px-5 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 items-center
                ${scrolled
                  ? 'bg-white text-neutral-950 hover:bg-emerald-50'
                  : 'bg-white/10 text-white border border-white/10 hover:bg-white hover:text-neutral-950'
                }
              `}
            >
              Get Started
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            >
              <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`
            absolute top-full left-0 right-0 mt-2 mx-2 p-2 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 origin-top shadow-2xl
            ${mobileMenuOpen ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}
          `}>
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-white text-neutral-950 font-bold text-center hover:bg-emerald-50 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
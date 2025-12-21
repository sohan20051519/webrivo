import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Pricing() {
  useScrollReveal();

  const plans = [
    {
      id: 1,
      name: "Basic Presence",
      price: "₹2,999 – ₹4,999",
      frequency: "One-time",
      badge: "Fast seller",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
      accent: "emerald",
      description: "Best for shops, salons, and clinics starting out.",
      features: [
        "1-page website",
        "Mobile-friendly design",
        "Call & WhatsApp button",
        "Google Maps location",
        "Delivery in 3 days"
      ]
    },
    {
      id: 2,
      name: "Business Booster",
      price: "₹7,999 – ₹12,999",
      frequency: "One-time",
      badge: "Most sold ⭐",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/20",
      accent: "blue",
      description: "Complete digital solution for growing businesses.",
      features: [
        "5-page website",
        "Services & About pages",
        "Contact form integration",
        "SEO basics setup",
        "Google Business Profile optimization"
      ]
    },
    {
      id: 3,
      name: "Premium Growth",
      price: "₹19,999+",
      frequency: "One-time",
      badge: "Enterprise",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/20",
      accent: "purple",
      description: "Advanced features for high-volume businesses.",
      features: [
        "Online booking / enquiry system",
        "Payment gateway integration",
        "Custom Admin panel",
        "Priority 24/7 support",
        "Advanced Analytics"
      ]
    }
  ];

  const addons = [
    { name: "Website Maintenance", price: "₹999/mo", icon: "🛠️" },
    { name: "Google Ranking Setup", price: "₹1,999", icon: "📈" },
    { name: "WhatsApp Automation", price: "₹999", icon: "💬" },
    { name: "Extra Language", price: "₹2,999", icon: "🌐" }
  ];

  return (
    <section id="pricing" className="py-24 relative bg-neutral-950 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Pricing</span>.
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Choose the perfect package to launch your digital journey. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`
                relative flex flex-col p-8 rounded-3xl glass-panel border border-white/5 transition-all duration-500 group hover:-translate-y-2
                ${index === 1 ? 'bg-white/[0.03] border-blue-500/30 shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)]' : 'hover:border-white/20'}
                reveal-on-scroll reveal-delay-${(index + 1) * 100}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border backdrop-blur-md ${plan.badgeColor} shadow-lg`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-neutral-400 mb-6 min-h-[40px]">{plan.description}</p>
                <div className="flex items-end gap-2">
                  <span className={`text-3xl font-display font-bold text-${plan.accent}-400`}>{plan.price}</span>
                </div>
                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{plan.frequency}</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-8"></div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className={`w-5 h-5 flex-shrink-0 text-${plan.accent}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className={`
                w-full py-4 rounded-xl font-bold text-sm transition-all duration-300
                ${index === 1 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }
              `}>
                Choose {plan.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="reveal-on-scroll">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white">🔥 Add-ons</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((addon, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">{addon.icon}</div>
                <h4 className="text-white font-medium mb-1">{addon.name}</h4>
                <p className="text-emerald-400 font-bold text-sm">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
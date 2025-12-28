import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Check, Plus, Globe, Server, Shield, MessageCircle, BarChart, ShoppingCart, Zap, Layout, Clock, FileText } from 'lucide-react';

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        basePrice: 2999,
        description: 'Startup Essentials',
        included: ['landing_page_1', 'mobile_design', 'delivery_3_day', 'whatsapp_link'],
        accent: 'emerald',
        gradient: 'from-emerald-400 to-teal-500'
    },
    {
        id: 'business',
        name: 'Business',
        basePrice: 7999,
        description: 'Growth & SEO',
        included: ['site_5_page', 'seo_core', 'mobile_design', 'whatsapp_link'],
        accent: 'blue',
        gradient: 'from-blue-400 to-indigo-500'
    },
    {
        id: 'premium',
        name: 'Premium',
        basePrice: 19999,
        popular: true,
        description: 'Full Suite',
        included: ['site_5_page', 'booking_system', 'payment_gateway', 'admin_dashboard', 'seo_core', 'mobile_design', 'whatsapp_link', 'google_maps'],
        accent: 'purple',
        gradient: 'from-purple-400 to-pink-500'
    },
    {
        id: 'custom',
        name: 'Custom',
        basePrice: 0,
        description: 'Build from Scratch',
        included: [],
        accent: 'orange',
        gradient: 'from-orange-400 to-red-500'
    }
];

// Master list of all possible features (Included or Upgradable)
const ALL_FEATURES = [
    // Display-only / Base features
    { id: 'landing_page_1', label: '1-Page Landing', price: 0, icon: <FileText size={16} /> },
    { id: 'delivery_3_day', label: '3-Day Delivery', price: 0, icon: <Clock size={16} /> },

    // Upgradable Features
    { id: 'mobile_design', label: 'Mobile Design', price: 499, icon: <Layout size={16} /> },
    { id: 'whatsapp_link', label: 'Website Link', price: 499, icon: <MessageCircle size={16} /> },
    { id: 'google_maps', label: 'Google Maps', price: 499, icon: <Globe size={16} /> },
    { id: 'site_5_page', label: '5-Page Site', price: 1499, icon: <Layout size={16} /> },
    { id: 'seo_core', label: 'SEO Core', price: 1499, icon: <BarChart size={16} /> },
    { id: 'gbp_optimization', label: 'GBP Optimization', price: 1499, icon: <Globe size={16} /> },
    { id: 'booking_system', label: 'Booking System', price: 2499, icon: <ShoppingCart size={16} /> },
    { id: 'payment_gateway', label: 'Payment Gateway', price: 2999, icon: <Shield size={16} /> },
    { id: 'admin_dashboard', label: 'Admin Dashboard', price: 1999, icon: <BarChart size={16} /> },
    { id: 'priority_support', label: 'Priority Support', price: 999, icon: <Zap size={16} /> },
];

const ADDONS = [
    { id: 'maintenance', label: 'Maintenance', price: 499, sub: '/mo' },
    { id: 'wa_automation', label: 'WA Automation', price: 499 },
    { id: 'rank_setup', label: 'Rank Setup', price: 999 },
    { id: 'multilingual', label: 'Multilingual', price: 1499 },
];

const DOMAINS = [
    { id: 'none', label: 'No Domain', price: 0 },
    { id: 'com', label: '.com', price: 2500 },
    { id: 'in', label: '.in', price: 2000 },
    { id: 'org', label: '.org', price: 2000 },
    { id: 'xyz', label: '.xyz', price: 2000 },
];

export default function Calculator() {
    useScrollReveal();

    const [selectedPlanId, setSelectedPlanId] = useState('business');
    const [selectedUpgrades, setSelectedUpgrades] = useState(new Set());
    const [selectedAddons, setSelectedAddons] = useState(new Set());
    const [selectedDomain, setSelectedDomain] = useState('none');

    // New state for booking modal and form handling
    const [isBooking, setIsBooking] = useState(false);
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    // Reset upgrades when plan changes
    useEffect(() => {
        setSelectedUpgrades(new Set());
    }, [selectedPlanId]);

    // Listen for plan switch events from Pricing component
    useEffect(() => {
        const handlePlanSwitch = (e) => {
            if (e.detail && ['basic', 'business', 'premium', 'custom'].includes(e.detail)) {
                setSelectedPlanId(e.detail);
            }
        };
        window.addEventListener('switchPlan', handlePlanSwitch);
        return () => window.removeEventListener('switchPlan', handlePlanSwitch);
    }, []);

    const toggleUpgrade = (featureId) => {
        setSelectedUpgrades(prev => {
            const next = new Set(prev);
            if (next.has(featureId)) next.delete(featureId);
            else next.add(featureId);
            return next;
        });
    };

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev => {
            const next = new Set(prev);
            if (next.has(addonId)) next.delete(addonId);
            else next.add(addonId);
            return next;
        });
    };

    const selectedPlan = PLANS.find(p => p.id === selectedPlanId);

    // Calculate Costs
    let upgradesCost = 0;
    selectedUpgrades.forEach(fid => {
        const f = ALL_FEATURES.find(feat => feat.id === fid);
        if (f) upgradesCost += f.price;
    });

    let addonsCost = 0;
    selectedAddons.forEach(aid => {
        const a = ADDONS.find(add => add.id === aid);
        if (a) addonsCost += a.price;
    });

    const domainCost = DOMAINS.find(d => d.id === selectedDomain)?.price || 0;
    const totalCost = selectedPlan.basePrice + upgradesCost + addonsCost + domainCost;

    // Derive lists for display
    const includedFeaturesList = selectedPlan.included
        .map(id => ALL_FEATURES.find(f => f.id === id))
        .filter(Boolean);

    const availableUpgradesList = ALL_FEATURES.filter(f =>
        !selectedPlan.included.includes(f.id) && f.price > 0 // Only show items not included and that have a price (excludes base items like 1-page landing from upgrades if not appropriate)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formspree.io/f/xlgrlddg", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                // Optional: reset after some time
                setTimeout(() => {
                    // Reset form and close modal logic could go here, 
                    // but usually keeping the success message is better until user closes it.
                }, 3000);
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    const closeBooking = () => {
        setIsBooking(false);
        setFormStatus('idle'); // Reset status when closing
    };

    return (
        <section id="calculator" className="py-20 relative bg-neutral-950 overflow-hidden min-h-screen flex flex-col justify-center border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="w-full max-w-[1400px] mx-auto px-4 relative z-10">

                {/* Compact Header */}
                <div className="text-center mb-10 reveal-on-scroll">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Perfect Plan</span>
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
                        Select a tier and enable the features you really need.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* LEFT COLUMN: Controls */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* 1. Plans Row */}
                        <div className="reveal-on-scroll">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {PLANS.map((plan) => {
                                    const isSelected = selectedPlanId === plan.id;
                                    return (
                                        <button
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            className={`
                        relative p-4 rounded-xl border text-left transition-all duration-300 group
                        ${isSelected
                                                    ? `bg-${plan.accent}-500/10 border-${plan.accent}-500/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] ring-1 ring-${plan.accent}-500/30`
                                                    : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/5'
                                                }
                      `}
                                        >
                                            {plan.popular && (
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
                                                    Popular
                                                </span>
                                            )}
                                            <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                                                {plan.name}
                                            </h4>
                                            <p className="text-[10px] text-neutral-500 truncate mb-2">{plan.description}</p>
                                            <div className="text-lg font-display font-bold text-white">
                                                ₹{plan.basePrice.toLocaleString()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Middle Section: Included vs Upgrades */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-on-scroll reveal-delay-100">

                            {/* SECTION A: INCLUDED IN SELECTED PLAN */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Check size={14} className="text-emerald-500" /> Included in {selectedPlan.name}
                                </h3>

                                {includedFeaturesList.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {includedFeaturesList.map((feature) => (
                                            <div key={feature.id} className="flex items-center gap-3 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                                <div className="text-emerald-300">
                                                    {feature.icon}
                                                </div>
                                                <span className="text-xs font-medium text-emerald-100">
                                                    {feature.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-neutral-500 text-xs italic">
                                        Base Custom plan has no pre-included features.<br />Add upgrades to build your site.
                                    </div>
                                )}
                            </div>

                            {/* SECTION B: CORE UPGRADES */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Plus size={14} className="text-blue-500" /> Core Upgrades
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {availableUpgradesList.map((feature) => {
                                        const isSelected = selectedUpgrades.has(feature.id);

                                        return (
                                            <div
                                                key={feature.id}
                                                onClick={() => toggleUpgrade(feature.id)}
                                                className={`
                          flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all duration-200
                          ${isSelected
                                                        ? 'bg-blue-500/10 border-blue-500/40'
                                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                                                    }
                        `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-neutral-600'}`}>
                                                        {isSelected && <Check size={10} />}
                                                    </div>
                                                    <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                                                        {feature.label}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-400">
                                                    +₹{feature.price}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* 3. Bottom Section: Add-ons & Domains */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-on-scroll reveal-delay-200">

                            {/* Add-ons */}
                            <div>
                                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Zap size={14} className="text-purple-500" /> Optional Add-ons
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {ADDONS.map((addon) => {
                                        const isSelected = selectedAddons.has(addon.id);
                                        return (
                                            <div
                                                key={addon.id}
                                                onClick={() => toggleAddon(addon.id)}
                                                className={`
                              flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${isSelected
                                                        ? 'bg-purple-500/10 border-purple-500/40'
                                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                                                    }
                            `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`
                                w-3 h-3 rounded flex items-center justify-center border transition-colors
                                ${isSelected
                                                            ? 'bg-purple-500 border-purple-500 text-white'
                                                            : 'border-neutral-600 bg-transparent'
                                                        }
                              `}>
                                                        {isSelected && <Check size={8} strokeWidth={4} />}
                                                    </div>
                                                    <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                                                        {addon.label}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-400">
                                                    +₹{addon.price}{addon.sub || ''}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Domains */}
                            <div>
                                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Globe size={14} className="text-orange-500" /> Domain Registration
                                    <span className="ml-auto text-[10px] text-neutral-500 normal-case">(Per Year/Renewal)</span>
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-3 gap-2">
                                    {DOMAINS.map((domain) => {
                                        const isSelected = selectedDomain === domain.id;
                                        return (
                                            <button
                                                key={domain.id}
                                                onClick={() => setSelectedDomain(domain.id)}
                                                className={`
                              flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200
                              ${isSelected
                                                        ? 'bg-orange-500/10 border-orange-500/50'
                                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                                                    }
                            `}
                                            >
                                                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                                                    {domain.label}
                                                </span>
                                                <span className="text-[10px] mt-1 font-bold text-emerald-400">
                                                    {domain.price === 0 ? '--' : `₹${domain.price}`}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Summary */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-6">
                            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                                {/* Background Glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>

                                <h3 className="text-xl font-display font-bold text-white mb-6">Estimate Summary</h3>

                                {/* Line Items */}
                                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
                                        <span className="text-white font-medium">{selectedPlan.name} Plan</span>
                                        <span className="text-white">₹{selectedPlan.basePrice.toLocaleString()}</span>
                                    </div>

                                    {/* Selected Upgrades */}
                                    {Array.from(selectedUpgrades).map(fid => {
                                        const f = ALL_FEATURES.find(feat => feat.id === fid);
                                        return (
                                            <div key={fid} className="flex justify-between items-center text-xs text-neutral-400">
                                                <span className="flex items-center gap-1"><Plus size={10} /> {f.label}</span>
                                                <span>₹{f.price.toLocaleString()}</span>
                                            </div>
                                        );
                                    })}

                                    {/* Add-ons */}
                                    {Array.from(selectedAddons).map(aid => {
                                        const a = ADDONS.find(add => add.id === aid);
                                        return (
                                            <div key={aid} className="flex justify-between items-center text-xs text-purple-300">
                                                <span className="flex items-center gap-1"><Plus size={10} /> {a.label}</span>
                                                <span>₹{a.price.toLocaleString()}</span>
                                            </div>
                                        );
                                    })}

                                    {/* Domain */}
                                    {selectedDomain !== 'none' && (
                                        <div className="flex justify-between items-center text-xs text-orange-300">
                                            <span className="flex items-center gap-1"><Globe size={10} /> {DOMAINS.find(d => d.id === selectedDomain).label}</span>
                                            <span>₹{DOMAINS.find(d => d.id === selectedDomain).price.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="pt-4 border-t border-white/10 mb-6">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-sm text-neutral-400">Total Estimate</span>
                                        <span className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                            ₹{totalCost.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-right text-[10px] text-neutral-500">One-time + recurring add-ons if any</p>
                                </div>

                                <button
                                    onClick={() => setIsBooking(true)}
                                    className="block w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-center text-sm shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Book with This Plan
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Booking Modal */}
            {isBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeBooking}></div>
                    <div className="relative bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <button
                            onClick={closeBooking}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white"
                        >
                            ✕
                        </button>

                        {formStatus === 'success' ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="text-emerald-500 w-8 h-8" strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                                <p className="text-neutral-400 text-sm">
                                    Thanks for reaching out, {selectedPlan.name} team will contact you shortly.
                                </p>
                                <button
                                    onClick={closeBooking}
                                    className="mt-6 px-6 py-2 rounded-lg bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-white mb-2">Complete Your Booking</h3>
                                <p className="text-sm text-neutral-400 mb-6">Enter your details to receive the official quotation.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Hidden Fields for Context - Note: FormData handles these automatically if they are valid inputs */}
                                    <input type="hidden" name="_subject" value={`New Quote Request: ${selectedPlan.name} Plan`} />
                                    <input type="hidden" name="plan" value={selectedPlan.name} />
                                    <input type="hidden" name="total_estimate" value={totalCost} />
                                    <input type="hidden" name="upgrades" value={Array.from(selectedUpgrades).join(', ')} />
                                    <input type="hidden" name="addons" value={Array.from(selectedAddons).join(', ')} />
                                    <input type="hidden" name="domain" value={selectedDomain} />

                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Email <span className="text-neutral-500">(Optional)</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    {formStatus === 'error' && (
                                        <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {formStatus === 'submitting' ? 'Sending...' : 'Send Request'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

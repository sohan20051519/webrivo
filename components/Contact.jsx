import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
    useScrollReveal();
    const [state, handleSubmit] = useForm("xlgrlddg");

    return (
        <section id="contact" className="py-24 relative bg-neutral-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Text Side */}
                    <div className="reveal-on-scroll">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Let's Build Your <span className="text-emerald-400">Digital Empire</span>.
                        </h2>
                        <p className="text-neutral-400 text-lg mb-8">
                            Ready to take your business to the next level? Fill out the form or give us a call. We are ready to listen.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm text-neutral-500">Call Us</div>
                                    <div className="text-white font-bold text-lg">+91 8050130969</div>
                                    <div className="text-white font-bold text-lg">+91 9113253754</div>
                                    <div className="text-white font-bold text-lg">+91 6366610809</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <div className="text-sm text-neutral-500">Email Us</div>
                                    <div className="text-white font-bold text-lg">webrivo.official@gmail.com</div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl reveal-on-scroll reveal-delay-200 relative min-h-[500px] flex items-center">
                        {state.succeeded ? (
                            <div className="text-center w-full py-10">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white mb-4">Message Sent!</h3>
                                <p className="text-neutral-400 max-w-sm mx-auto">
                                    Thanks for reaching out! our team will contact you shortly to transform your business.
                                </p>
                            </div>
                        ) : (
                            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2" htmlFor="firstName">First Name</label>
                                        <input id="firstName" name="firstName" type="text" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" placeholder="John" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2" htmlFor="lastName">Last Name</label>
                                        <input id="lastName" name="lastName" type="text" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" placeholder="Doe" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2" htmlFor="email">Email Address</label>
                                    <input id="email" name="email" type="email" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" placeholder="john@example.com" required />
                                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2" htmlFor="phone">Phone Number</label>
                                    <input id="phone" name="phone" type="tel" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" placeholder="+91 98765 43210" required />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2" htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="4" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none" placeholder="Tell us about your business..." required></textarea>
                                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                                </div>

                                <button type="submit" disabled={state.submitting} className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                    {state.submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

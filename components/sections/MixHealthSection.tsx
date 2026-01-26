import React from 'react';
import { Milk, Sparkles, Zap, Leaf, ArrowRight, X, FlaskConical } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MixHealthSection = () => {
    return (
        <React.Fragment>
            {/* SLIDE 1: BRAND INTRO (Dark Mode) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-[#050a14] text-white flex items-center justify-center snap-center overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-[#00F0FF]/10"></div>

                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-full">
                                    <FlaskConical size={24} className="text-[#00F0FF]" />
                                </div>
                                <span className="text-[#00F0FF] font-bold uppercase tracking-[0.3em] text-xs">Division</span>
                            </div>

                            <ScrollReveal>
                                <h2 className="text-[15vw] md:text-9xl font-black impact-font text-white leading-[0.8] mb-6">
                                    MYX.
                                </h2>
                                <p className="text-2xl md:text-4xl text-white/60 font-light mb-10">
                                    Nutrition Optimized for <span className="text-white font-bold">Recovery</span>.
                                </p>
                            </ScrollReveal>

                            <div className="h-px w-24 bg-[#00F0FF] mb-10"></div>

                            <div className="flex gap-12 text-sm font-bold uppercase tracking-widest text-white/40">
                                <div className="flex items-center gap-3"><Zap size={16} className="text-[#00F0FF]" /> Metabolic Support</div>
                                <div className="flex items-center gap-3"><Leaf size={16} className="text-[#00F0FF]" /> Pure Ingredients</div>
                            </div>
                        </div>

                        {/* Image Side - Abstract/Scientific */}
                        <div className="relative h-[50vh] md:h-[70vh] w-full hidden md:block">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050a14] to-transparent z-10"></div>
                            <img
                                src="/proteina personalizata2.jpg"
                                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 mask-image-gradient"
                                alt="MYX Concept"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDE 2: PRODUCT DETAILS (Light Mode) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-white text-black flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 md:px-24 py-24">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Text Content */}
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">The Science</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-slate-900">
                                POTENȚIAL.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#00F0FF]">AMPLIFICAT.</span>
                            </h2>

                            <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">
                                Antrenamentul EMS și nutriția MYX funcționează în sinergie perfectă. Nu sunt două direcții separate, ci două puteri care se completează pentru a-ți accelera rezultatele.
                            </p>

                            <div className="grid gap-6">
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-5 hover:shadow-lg transition-all duration-300">
                                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit text-[#008080]"><Milk size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-slate-800">Iso-Whey MYX</h4>
                                        <p className="text-sm text-slate-500">Absorbție ultra-rapidă. Zero zahăr. Ideal imediat după efort.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-5 hover:shadow-lg transition-all duration-300">
                                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit text-[#008080]"><Zap size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-slate-800">Energy Matrix</h4>
                                        <p className="text-sm text-slate-500">Electroliți și BCAA pentru hidratare celulară și focus mental.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Visual Side */}
                        <div className="relative aspect-[4/5] lg:h-[70vh] flex items-center justify-center">
                            <div className="absolute inset-0 bg-slate-50 rounded-[3rem] transform rotate-3"></div>
                            <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100">
                                <img
                                    src="/proteina personalizata2.jpg"
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                    alt="MYX Nutrition Product"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-10 left-10">
                                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lab Verified</span>
                                        </div>
                                        <p className="text-slate-900 font-bold text-xl impact-font">PURE FORMULA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

import React from 'react';
import { Milk, Sparkles, Zap, Leaf, ArrowRight, X, FlaskConical } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MixHealthSection = () => {
    return (
        <React.Fragment>
            {/* SLIDE 1: BRAND INTRO (Aurora Theme) - MYX NUTRITION */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-transparent text-white flex items-center justify-center snap-center overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[#00F0FF]/5"></div>

                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center py-8 lg:py-[5vh] relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-full">
                                    <FlaskConical size={24} className="text-[#00F0FF]" />
                                </div>
                                <span className="text-[#00F0FF] font-bold uppercase tracking-[0.3em] text-xs">Suplimente Premium</span>
                            </div>

                            <ScrollReveal>
                                <h2 className="text-[12vw] md:text-[min(10vw,150px)] font-black impact-font text-white leading-[0.8] mb-4">
                                    MYX.
                                </h2>
                                <p className="text-xl md:text-3xl text-white/60 font-light mb-6">
                                    Nutriție Optimizată pentru <span className="text-white font-bold">Performanță</span>.
                                </p>
                            </ScrollReveal>

                            <div className="h-px w-16 bg-[#00F0FF] mb-6"></div>

                            <div className="flex gap-8 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40">
                                <div className="flex items-center gap-2"><Zap size={14} className="text-[#00F0FF]" /> Energy Matrix</div>
                                <div className="flex items-center gap-2"><Leaf size={14} className="text-[#00F0FF]" /> Pure Ingredients</div>
                            </div>
                        </div>

                        {/* Image Side - Abstract/Scientific */}
                        <div className="relative h-[40vh] md:h-[60vh] w-full hidden md:block">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
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

            {/* SLIDE 2: PRODUCT DETAILS (Aurora Theme) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-transparent text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 md:px-24 py-8 lg:py-[5vh]">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Text Content */}
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Divizia de Nutriție</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tighter text-white uppercase impact-font">
                                FORMULA.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3A86FF] to-[#00F0FF]">AVANSATĂ.</span>
                            </h2>

                            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-medium">
                                Gama MYX este complet separată de serviciile EMS și reprezintă standardul nostru în suplimente nutritive. Create în laborator pentru a susține efortul fizic.
                            </p>

                            <div className="grid gap-4 lg:gap-6">
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex gap-4 hover:border-[#00F0FF]/30 transition-all duration-300 backdrop-blur-md">
                                    <div className="p-2.5 bg-white/5 rounded-xl shadow-sm h-fit text-[#00F0FF] transition-colors"><Milk size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-base md:text-lg uppercase mb-1 text-white">Iso-Whey MYX</h4>
                                        <p className="text-[11px] md:text-sm text-white/40">Izolat proteic pur. Absorbție rapidă. Zero adaosuri inutile.</p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex gap-4 hover:border-[#008080]/30 transition-all duration-300 backdrop-blur-md">
                                    <div className="p-2.5 bg-white/5 rounded-xl shadow-sm h-fit text-[#00F0FF] transition-colors"><Zap size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-base md:text-lg uppercase mb-1 text-white">Energy Matrix</h4>
                                        <p className="text-[11px] md:text-sm text-white/40">Complex de aminoacizi și electroliți pentru hidratare.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Visual Side */}
                        <div className="relative aspect-[4/5] lg:h-[70vh] flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#00F0FF]/5 rounded-[3rem] transform rotate-3"></div>
                            <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-black/20 border border-white/10">
                                <img
                                    src="/proteina personalizata2.jpg"
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-80"
                                    alt="MYX Nutrition Product"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-10 left-10">
                                    <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Lab Verified</span>
                                        </div>
                                        <p className="text-white font-bold text-xl impact-font uppercase">PURE FORMULA</p>
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

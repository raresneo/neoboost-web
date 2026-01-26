import React from 'react';
import { Milk, Sparkles, Zap, Leaf, ArrowRight, X, FlaskConical } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MixHealthSection = () => {
    return (
        <React.Fragment>
            {/* SLIDE 1: BRAND INTRO (Dark Mode) - MYX NUTRITION */}
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
                                <span className="text-[#00F0FF] font-bold uppercase tracking-[0.3em] text-xs">Suplimente Premium</span>
                            </div>

                            <ScrollReveal>
                                <h2 className="text-[15vw] md:text-9xl font-black impact-font text-white leading-[0.8] mb-6">
                                    MYX.
                                </h2>
                                <p className="text-2xl md:text-4xl text-white/60 font-light mb-10">
                                    Nutriție Optimizată pentru <span className="text-white font-bold">Performanță</span>.
                                </p>
                            </ScrollReveal>

                            <div className="h-px w-24 bg-[#00F0FF] mb-10"></div>

                            <div className="flex gap-12 text-sm font-bold uppercase tracking-widest text-white/40">
                                <div className="flex items-center gap-3"><Zap size={16} className="text-[#00F0FF]" /> Energy Matrix</div>
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

            {/* SLIDE 2: PRODUCT DETAILS (Aurora Theme) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-transparent text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 md:px-24 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text Content */}
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Divizia de Nutriție</span>
                            </div>

                            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white uppercase impact-font">
                                FORMULA.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3A86FF] to-[#00F0FF]">AVANSATĂ.</span>
                            </h2>

                            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-12 font-medium">
                                Gama MYX este complet separată de serviciile EMS și reprezintă standardul nostru în suplimente nutritive. Create în laborator pentru a susține efortul fizic, indiferent de tipul de antrenament.
                            </p>

                            <div className="grid gap-4 lg:gap-6">
                                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex gap-5 hover:border-[#00F0FF]/30 transition-all duration-300 backdrop-blur-md">
                                    <div className="p-3 bg-white/5 rounded-xl shadow-sm h-fit text-[#00F0FF]"><Milk size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-white">Iso-Whey MYX</h4>
                                        <p className="text-sm text-white/40">Izolat proteic pur. Absorbție rapidă. Zero adaosuri inutile.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex gap-5 hover:border-[#008080]/30 transition-all duration-300 backdrop-blur-md">
                                    <div className="p-3 bg-white/5 rounded-xl shadow-sm h-fit text-[#00F0FF]"><Zap size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-white">Energy Matrix</h4>
                                        <p className="text-sm text-white/40">Complex de aminoacizi și electroliți pentru hidratare și focus.</p>
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

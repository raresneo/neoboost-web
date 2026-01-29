import React from 'react';
import { Milk, Sparkles, Zap, Leaf, ArrowRight, X, FlaskConical } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MixHealthSection = () => {
    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar overscroll-x-contain">
            {/* SLIDE 1: BRAND INTRO (Aurora Theme) - NEO NUTRITION */}
            <div className="w-[100vw] min-h-screen shrink-0 relative bg-transparent text-white flex items-center justify-center snap-center overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5"></div>

                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center py-20 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-[#3A86FF]/10 border border-[#3A86FF]/20 rounded-full">
                                    <FlaskConical size={24} className="text-[#3A86FF]" />
                                </div>
                                <span className="text-[#3A86FF] font-black uppercase tracking-[0.3em] text-xs">Nutriție Inteligentă</span>
                            </div>

                            <ScrollReveal>
                                <h2 className="text-[12vw] md:text-[min(10vw,150px)] font-bold font-display text-white leading-[0.8] mb-4 uppercase italic">
                                    NEO.<br />
                                    <span className="text-[#3A86FF]">BOOST.</span>
                                </h2>
                                <p className="text-xl md:text-3xl text-white/60 font-light mb-6">
                                    Suplimente Personalizate pentru <span className="text-white font-bold">Rezultate Maxime</span>.
                                </p>
                            </ScrollReveal>

                            <div className="h-px w-16 bg-[#3A86FF] mb-6"></div>

                            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-[0.1em] text-white/40">
                                <div className="flex items-center gap-3"><Zap size={18} className="text-[#3A86FF]" /> Absorbție cu 40% mai rapidă</div>
                                <div className="flex items-center gap-3"><Leaf size={18} className="text-[#3A86FF]" /> Ingrediente Pure, Fără Zahăr</div>
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="relative aspect-square md:h-[60vh] hidden md:block">
                            <div className="absolute -inset-10 bg-[#3A86FF]/20 blur-[100px] rounded-full"></div>
                            <img
                                src="/proteinapersonalizata.jpg"
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(58,134,255,0.3)]"
                                alt="NeoBoost Nutrition"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDE 2: PRODUCT DETAILS */}
            <div className="w-[100vw] min-h-screen shrink-0 relative bg-transparent text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 md:px-24 py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Text Content */}
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Personalized Protein</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[0.9] tracking-tighter text-white uppercase font-display italic">
                                PROTEINĂ.<br />
                                <span className="text-[#3A86FF]">PERSONALIZATĂ.</span>
                            </h2>

                            <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-8">
                                La NeoBoost, nutriția nu este "la pachet". Oferim suplimente adaptate profilului tău metabolic pentru a accelera refacerea musculară și arderea grăsimilor.
                            </p>

                            <div className="grid gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4 hover:border-[#3A86FF]/30 transition-all duration-300">
                                    <div className="p-3 bg-[#3A86FF]/10 rounded-xl text-[#3A86FF] h-fit"><Milk size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-white font-display">Neo ISO-Whey</h4>
                                        <p className="text-sm text-white/40 leading-relaxed">Izolat proteic de cea mai înaltă puritate. Ideal pentru recuperare post-EMS și menținerea masei musculare.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4 hover:border-[#3A86FF]/30 transition-all duration-300">
                                    <div className="p-3 bg-[#3A86FF]/10 rounded-xl text-[#3A86FF] h-fit"><Zap size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase mb-1 text-white font-display">Avantaje Neo</h4>
                                        <p className="text-sm text-white/40 leading-relaxed">Îndulcit natural, fără gluten, cu enzime digestive pentru o asimilare perfectă fără balonare.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Visual Side */}
                        <div className="relative aspect-[4/5] lg:h-[70vh] flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#3A86FF]/5 rounded-[3rem] transform rotate-3"></div>
                            <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-[var(--bg-secondary)] border border-white/10 p-8">
                                <img
                                    src="/proteina personalizata2.jpg"
                                    className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                                    alt="Personalized Nutrition"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-12 left-12">
                                    <div className="bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                                        <p className="text-white font-bold text-xl font-display uppercase tracking-widest">ECO-FRIENDLY & PURE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

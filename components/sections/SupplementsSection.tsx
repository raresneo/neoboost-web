import React from 'react';
import { Milk, Sparkles, Zap, Leaf } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const SupplementsSection = () => {
    return (
        <section className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <ScrollReveal>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Leaf className="text-[#3A86FF]" size={24} />
                                <span className="text-[#3A86FF] font-bold uppercase tracking-widest text-xs">Nutriție de Precizie</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase mb-8 leading-tight">
                                NU DOAR ANTRENAMENT.<br />
                                <span className="text-[#3A86FF]">REGENERARE TOTALĂ.</span>
                            </h2>

                            <p className="text-white/70 text-lg leading-relaxed mb-10">
                                La NeoBoost, abordăm transformarea corpului tău holistic. De aceea, completăm antrenamentele EMS MYX cu o linie de suplimente personalizate, create pentru a accelera recuperarea și a maximiza rezultatele.
                            </p>

                            <div className="space-y-6">
                                <div className="glass-block p-6 rounded-2xl border border-white/10 hover:border-[#3A86FF]/30 transition-all flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#3A86FF] shrink-0">
                                        <Milk size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg uppercase mb-2">Shake-uri Proteice Personalizate</h4>
                                        <p className="text-sm text-white/50">Formule adaptate obiectivului tău: Izolat proteic pentru slăbire sau Gainer complex pentru masă musculară.</p>
                                    </div>
                                </div>

                                <div className="glass-block p-6 rounded-2xl border border-white/10 hover:border-[#3A86FF]/30 transition-all flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#3A86FF] shrink-0">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg uppercase mb-2">Ingrediente Premium</h4>
                                        <p className="text-sm text-white/50">Fără zahăr adăugat, fără fillere inutile. Doar nutrienți esențiali care susțin refacerea fibrei musculare după impulsurile EMS.</p>
                                    </div>
                                </div>

                                <div className="glass-block p-6 rounded-2xl border border-white/10 hover:border-[#3A86FF]/30 transition-all flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#3A86FF] shrink-0">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg uppercase mb-2">Metabolism Boost</h4>
                                        <p className="text-sm text-white/50">Îmbogățite cu complexe de vitamine și minerale care susțin metabolismul activat de tehnologia MYX.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Column: Image Visual */}
                    <ScrollReveal delay={200}>
                        <div className="relative aspect-square md:aspect-[4/5]">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden border-none gradient-border-spin p-0">
                                {/* Using the user's uploaded "proteina personalizata" image */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-cyan-500/30 to-blue-900/30 mix-blend-overlay z-20 pointer-events-none"></div>
                                <img
                                    src="/proteina personalizata2.jpg"
                                    alt="Suplimente Personalizate NeoBoost Oradea"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 -left-4 md:-left-8 bg-black/80 backdrop-blur-md border border-[#3A86FF]/30 p-4 rounded-xl shadow-2xl z-30 flex items-center gap-4 animate-float">
                                <div className="text-3xl">🧬</div>
                                <div>
                                    <div className="text-[#3A86FF] font-black uppercase text-xs tracking-widest">Bio-Hacking</div>
                                    <div className="text-white font-bold">Nutriție Avansată</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};

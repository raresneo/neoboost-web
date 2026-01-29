import React from 'react';
import { History, Zap, CheckCircle2, Quote, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { AnimatedGraphic } from '../AnimatedGraphic';

import { BioDecryption } from '../ui/BioDecryption';
import { EMS_MILESTONES } from '../../constants';

// --- EMSEducation Component ---
export const EMSEducation = () => {
    return (
        <section id="metoda" className="py-20 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                {/* Section Header */}
                <ScrollReveal className="text-center mb-20">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase mb-4">Istorie & Tehnologie</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic">
                        CUM <span className="text-[#3A86FF]">FUNCȚIONEAZĂ?</span>
                    </h2>
                </ScrollReveal>

                {/* History Stages */}
                <div className="grid md:grid-cols-4 gap-8 mb-32 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block"></div>

                    {[
                        { year: "1780", title: "GENEZA", desc: "Luigi Galvani descoperă bioelectricitatea. Începutul studiului impulsurilor nervoase.", icon: <History size={20} /> },
                        { year: "1960", title: "ȘTIINȚA", desc: "Cercetătorii ruși folosesc EMS pentru atleții olimpici, obținând creșteri de 40% în forță.", icon: <Zap size={20} /> },
                        { year: "2010", title: "STANDARD", desc: "Apar primele sisteme comerciale, dar limitate de cabluri și necesitatea apei.", icon: <Target size={20} /> },
                        { year: "2024+", title: "REVOLUȚIA", desc: "NeoBoost introduce Drysuit Wireless: libertate totală fără apă sau fire.", icon: <CheckCircle2 size={20} />, isNeo: true }
                    ].map((stage, i) => (
                        <ScrollReveal key={stage.year} delay={i * 100}>
                            <div className={`relative p-8 rounded-2xl border ${stage.isNeo ? 'bg-[#3A86FF]/10 border-[#3A86FF]/30 shadow-[0_0_30px_rgba(58,134,255,0.1)]' : 'bg-white/5 border-white/10'} hover:translate-y--2 transition-all duration-500`}>
                                <div className={`w-12 h-12 rounded-full mb-6 flex items-center justify-center ${stage.isNeo ? 'bg-[#3A86FF] text-black' : 'bg-white/5 text-[#3A86FF]'}`}>
                                    {stage.icon}
                                </div>
                                <span className={`text-4xl font-display font-bold block mb-2 ${stage.isNeo ? 'text-[#3A86FF]' : 'text-white/20'}`}>{stage.year}</span>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase">{stage.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{stage.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Equipment Showcase */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[#3A86FF]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                src="/powerbox_real.jpg"
                                alt="Echipament NeoBoost EMS"
                                className="w-full h-auto rounded-[2rem] border border-white/10 shadow-2xl relative z-10"
                            />
                            <div className="absolute bottom-8 left-8 z-20">
                                <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                                    <p className="text-[#3A86FF] font-display font-bold text-3xl uppercase">Drysuit Wireless</p>
                                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Tehnologie de ultimă generație</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 uppercase">ECHIPAMENTUL <span className="text-[#3A86FF]">NOSTRU</span></h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Folosim cele mai avansate sisteme Wireless care îți permit o <strong className="text-white">mobilitate 100%</strong>. Fără cabluri care să te limiteze, antrenamentul devine dinamic, interactiv și mult mai plăcut.
                            </p>
                        </div>

                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] shrink-0 mt-1">✓</div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">MOBILITATE FĂRĂ FIRE</h4>
                                    <p className="text-white/40 text-sm">Transfer de date prin Bluetooth ultra-rapid pentru o libertate de mișcare totală în studio.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] shrink-0 mt-1">✓</div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">COSTUM USCAT (DRYSUIT)</h4>
                                    <p className="text-white/40 text-sm">Nu necesită umezire. Te echipezi rapid și începi antrenamentul într-un mediu igienic și confortabil.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] shrink-0 mt-1">✓</div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">OPȚIUNE FĂRĂ COSTUM</h4>
                                    <p className="text-white/40 text-sm">Dacă preferi antrenamentele funcționale clasice, avem echipament dedicat și pentru sesiunile fără electrostimulare.</p>
                                </div>
                            </li>
                        </ul>

                        <div className="pt-6 border-t border-white/10">
                            <p className="text-white/50 text-sm mb-4">Disponibil în ambele locații:</p>
                            <div className="flex gap-4">
                                <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest">Hotel Ramada</span>
                                <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest">Sala GetFit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

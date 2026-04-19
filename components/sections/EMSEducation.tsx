import React from 'react';
import { History, Zap, CheckCircle2, Quote, Target, Smartphone, Layers, Battery } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { RevealText } from '../ui/RevealText';
import { AnimatedGraphic } from '../AnimatedGraphic';

import { BioDecryption } from '../ui/BioDecryption';
import { TypingHeading } from '../ui/TypingHeading';
import { EMS_MILESTONES } from '../../constants';

// --- EMSEducation Component ---
export const EMSEducation = () => {
    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-blue-600 font-black uppercase mb-4">Evoluția antrenamentului</p>
                    <RevealText
                        text="CUM FUNCȚIONEAZĂ MAGIA?"
                        as="h2"
                        mode="char"
                        stagger={0.03}
                        delay={0.1}
                        className="text-4xl md:text-6xl font-display font-bold uppercase italic"
                    />
                </div>

                {/* History Stages - Visual Timeline */}
                <div className="grid md:grid-cols-4 gap-6 mb-32 relative">
                    <div className="absolute top-[40%] left-0 w-full h-px bg-gray-200 -translate-y-1/2 hidden md:block z-0"></div>

                    {[
                        {
                            year: "1780",
                            title: "GENEZA",
                            desc: "Luigi Galvani descoperă bioelectricitatea. Începutul studiului impulsurilor nervoase. 🧪",
                            icon: <History size={20} />,
                            image: "/ems_1780.webp"
                        },
                        {
                            year: "1960",
                            title: "ȘTIINȚA",
                            desc: "Cercetătorii ruși folosesc EMS pentru atleții olimpici, obținând creșteri de 40% în forță. 🏅",
                            icon: <Zap size={20} />,
                            image: "/ems_1960_bw.webp"
                        },
                        {
                            year: "2010",
                            title: "STANDARD",
                            desc: "Apar primele sisteme comerciale, dar limitate de cabluri și necesitatea apei. ⚡",
                            icon: <Target size={20} />,
                            image: "/ems_2010_generated.webp"
                        },
                        {
                            year: "2024+",
                            title: "REVOLUȚIA",
                            desc: "NeoBoost introduce Drysuit Wireless: libertate totală fără apă sau fire. 🚀",
                            icon: <CheckCircle2 size={20} />,
                            isNeo: true,
                            image: "/neoboost_2024_pro.webp"
                        }
                    ].map((stage, i) => (
                        <ScrollReveal key={stage.year} delay={i * 100} className="relative z-10 h-full">
                            <div className={`group relative h-full rounded-2xl overflow-hidden border ${stage.isNeo ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-gray-100 hover:border-gray-300'} bg-gray-50 transition-all duration-500`}>
                                {/* Image Area */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent z-10"></div>
                                    <img
                                        src={stage.image}
                                        alt={stage.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${stage.isNeo ? '' : 'grayscale group-hover:grayscale-0'}`}
                                    />
                                    <div className={`absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center ${stage.isNeo ? 'bg-blue-600 text-white' : 'bg-white/80 backdrop-blur text-gray-900'}`}>
                                        {stage.icon}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 pt-2">
                                    <span className={`text-3xl font-display font-bold block mb-1 ${stage.isNeo ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-900 transition-colors'}`}>{stage.year}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{stage.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{stage.desc}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Tech Ecosystem - Bento Grid */}
                <div className="mb-20">
                    <div className="text-center mb-20 px-4">
                        <RevealText
                            text="TEHNOLOGIA DIN SPATELE REZULTATELOR."
                            as="h3"
                            mode="char"
                            stagger={0.02}
                            className="text-3xl md:text-5xl font-display font-bold text-gray-900 uppercase italic mb-8"
                        />
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            Am adus la Oradea cea mai nouă tehnologie wireless. Nu mai depinzi de cabluri care te blochează și nu mai îmbraci veste ude și reci. E doar cel mai inovator costum, tableta antrenorului și voința ta. 🚀
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* 1. THE BRAIN (PowerBox) */}
                        <ScrollReveal delay={0} className="lg:col-span-1">
                            <div className="h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col items-center text-center group transition-all overflow-hidden relative shadow-premium border border-white/10 hover:border-blue-500/30">
                                {/* Holographic Corner Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/40 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity z-20 text-blue-500">
                                    <Battery size={120} strokeWidth={0.5} />
                                </div>

                                {/* Video Container */}
                                <div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-0 bg-black/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent z-10 pointer-events-none"></div>
                                    <iframe
                                        src="https://www.youtube.com/embed/zelq4lbvDnw?autoplay=1&mute=1&controls=0&loop=1&playlist=zelq4lbvDnw&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3"
                                        title="PowerBox"
                                        className="absolute top-[40%] left-1/2 w-full aspect-[9/16] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.3] opacity-60 filter brightness-110 grayscale group-hover:grayscale-0 transition-all duration-1000"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        style={{ border: 0 }}
                                    />
                                </div>

                                <div className="relative z-20 mt-52 w-full flex flex-col items-center">
                                    <h4 className="text-4xl md:text-5xl font-black text-white uppercase mb-1 tracking-tighter drop-shadow-2xl">The PowerBox</h4>
                                    <p className="text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 drop-shadow-md">Creierul Sistemului</p>

                                    <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 mx-2 shadow-2xl relative overflow-hidden group-hover:border-blue-500/40 transition-all duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        <p className="text-zinc-100 text-sm leading-relaxed font-bold relative z-10">
                                            Cel mai mic și puternic generator EMS de pe piață.
                                            Transmisie Bluetooth 5.0 pentru libertate totală.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 mt-8">
                                        <span className="px-5 py-2 bg-blue-600 rounded-full text-[9px] font-black text-white border border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-widest translate-x-1">Wireless</span>
                                        <span className="px-5 py-2 bg-white/10 rounded-full text-[9px] font-black text-white border border-white/20 shadow-xl uppercase tracking-widest -translate-x-1">Ultra-Light</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 2. THE BODY (DrySuit) */}
                        <ScrollReveal delay={100} className="lg:col-span-1">
                            <div className="h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col items-center text-center group transition-all overflow-hidden relative shadow-premium border border-white/10 hover:border-blue-500/30">
                                {/* Holographic Corner Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/40 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity z-20 text-blue-500">
                                    <Layers size={120} strokeWidth={0.5} />
                                </div>

                                {/* Video Container */}
                                <div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-0 bg-black/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent z-10 pointer-events-none"></div>
                                    <iframe
                                        src="https://www.youtube.com/embed/Zm-QlF8dA4M?autoplay=1&mute=1&controls=0&loop=1&playlist=Zm-QlF8dA4M&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3"
                                        title="DrySuit"
                                        className="absolute top-1/2 left-1/2 w-full aspect-[9/16] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.3] opacity-60 filter brightness-110 grayscale group-hover:grayscale-0 transition-all duration-1000"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        style={{ border: 0 }}
                                    />
                                </div>

                                <div className="relative z-20 mt-52 w-full flex flex-col items-center">
                                    <h4 className="text-4xl md:text-5xl font-black text-white uppercase mb-1 tracking-tighter drop-shadow-2xl">The DrySuit</h4>
                                    <p className="text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 drop-shadow-md">Armura Ta</p>

                                    <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 mx-2 shadow-2xl relative overflow-hidden group-hover:border-blue-500/40 transition-all duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        <p className="text-zinc-100 text-sm leading-relaxed font-bold relative z-10">
                                            Nu necesită umezire. Material antibacterian.
                                            Se mulează perfect pe corp pentru libertate totală.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 mt-8">
                                        <span className="px-5 py-2 bg-blue-600 rounded-full text-[9px] font-black text-white border border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-widest translate-x-1">No Water</span>
                                        <span className="px-5 py-2 bg-white/10 rounded-full text-[9px] font-black text-white border border-white/20 shadow-xl uppercase tracking-widest -translate-x-1">Antibacterial</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 3. THE MIND (Control App) */}
                        <ScrollReveal delay={200} className="lg:col-span-1">
                            <div className="h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col items-center text-center group transition-all overflow-hidden relative shadow-premium border border-white/10 hover:border-blue-500/30">
                                {/* Holographic Corner Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/40 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity z-20 text-blue-500">
                                    <Smartphone size={120} strokeWidth={0.5} />
                                </div>

                                {/* Video Container */}
                                <div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-0 bg-black/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent z-10 pointer-events-none"></div>
                                    <iframe
                                        src="https://www.youtube.com/embed/HhxM2OteZNE?autoplay=1&mute=1&controls=0&loop=1&playlist=HhxM2OteZNE&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3"
                                        title="Control"
                                        className="absolute top-1/2 left-1/2 w-full aspect-[9/16] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.3] opacity-60 filter brightness-110 grayscale group-hover:grayscale-0 transition-all duration-1000"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        style={{ border: 0 }}
                                    />
                                </div>

                                <div className="relative z-20 mt-52 w-full flex flex-col items-center">
                                    <h4 className="text-4xl md:text-5xl font-black text-white uppercase mb-1 tracking-tighter drop-shadow-2xl">The Control</h4>
                                    <p className="text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 drop-shadow-md">Unitate de Comandă</p>

                                    <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 mx-2 shadow-2xl relative overflow-hidden group-hover:border-blue-500/40 transition-all duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        <p className="text-zinc-100 text-sm leading-relaxed font-bold relative z-10">
                                            Personalizare absolută a fiecărui impuls.
                                            Monitorizare în timp real și ajustare instantanee.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 mt-8">
                                        <span className="px-5 py-2 bg-blue-600 rounded-full text-[9px] font-black text-white border border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-widest translate-x-1">Cloud Data</span>
                                        <span className="px-5 py-2 bg-white/10 rounded-full text-[9px] font-black text-white border border-white/20 shadow-xl uppercase tracking-widest -translate-x-1">Precision UI</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                <div className="text-center pt-10 border-t border-[var(--border-subtle)]">
                    <p className="text-[var(--text-muted)] text-sm mb-4">Experimentează tehnologia NeoBoost în locațiile noastre: 📍</p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="https://maps.google.com/?q=Hotel+Ramada+Oradea+Calea+Aradului+9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-gray-50 rounded-full border border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-widest hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                        >
                            Hotel Ramada
                        </a>
                        <a
                            href="https://maps.google.com/?q=GetFit+Oradea+Strada+Clujului"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-gray-50 rounded-full border border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-widest hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                        >
                            Sala GetFit
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

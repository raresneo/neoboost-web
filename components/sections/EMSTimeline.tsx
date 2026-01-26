import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { AnimatedGraphic } from '../AnimatedGraphic';
import { ScrollReveal } from '../ui/ScrollReveal';
import { EMS_MILESTONES } from '../../constants';

// --- History Video Background Component ---
const HistoryVideoBackground = () => (
    <CinematicBackground image="/DSC04709.jpg" opacity={0.3} />
);

export const EMSTimeline = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Desktop: Transform vertical scroll to horizontal
    // We map 0-1 vertical progress to a percentage horizontal shift.
    // The amount of shift depends on content width. A rough estimate like -85% ensures we see the end.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        // Mobile: Normal section. Desktop: Tall section for scrolling space.
        <section
            id="istoric"
            ref={targetRef}
            className={`relative bg-[#050505] z-10 ${isMobile ? 'py-24' : 'h-[300vh]'}`}
        >
            {/* Sticky Container - Only sticky on Desktop */}
            <div className={`${isMobile ? 'block' : 'sticky top-0 h-screen flex items-center overflow-hidden'}`}>

                {/* Background is fixed/absolute behind content */}
                <div className="absolute inset-0 z-0">
                    <HistoryVideoBackground />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/80 pointer-events-none" />
                </div>

                {/* Content Container */}
                <motion.div
                    style={isMobile ? {} : { x }}
                    className={`relative z-10 flex ${isMobile ? 'flex-col gap-12 px-6' : 'flex-row gap-24 px-24 items-center'}`}
                >
                    {/* Intro / Titlu - Fixed Start Component */}
                    <ScrollReveal className={`flex-shrink-0 ${isMobile ? '' : 'w-[40vw]'} text-left`}>
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-12 h-px bg-[#3A86FF]"></div>
                            <span className="mono-font text-[9px] text-[#3A86FF] font-black tracking-[0.6em] uppercase">Evoluție Tehnologică</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black impact-font text-white leading-[0.8] mb-8">
                            EMS. <br />
                            <span className="text-[#3A86FF]">ISTORIC.</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-md leading-relaxed">
                            O călătorie de la prima scânteie a bioelectricității până la tehnologia wireless de astăzi.
                            Derulează pentru a descoperi.
                        </p>
                        {!isMobile && (
                            <div className="mt-12 flex items-center gap-4 text-white/30 text-xs uppercase tracking-widest font-bold animate-pulse">
                                <span>Scroll</span>
                                <div className="w-12 h-0.5 bg-white/20"></div>
                            </div>
                        )}
                    </ScrollReveal>

                    {/* Timeline Cards */}
                    {isMobile ? (
                        // -- MOBILE: Horizontal Slider Logic (Native) --
                        <div className="flex flex-col gap-10">
                            <ScrollReveal className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-8 -mx-6 px-6 no-scrollbar">
                                {EMS_MILESTONES.map((m, idx) => (
                                    <div key={idx} className="snap-center flex-shrink-0 w-[85vw] relative group">
                                        <div className="h-[450px] bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col relative overflow-hidden">
                                            {/* Background Image subtle */}
                                            {m.image && (
                                                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                                                    <img src={m.image} alt={m.title} className="w-full h-full object-cover grayscale" />
                                                </div>
                                            )}

                                            <div className="relative z-10 flex flex-col h-full justify-between">
                                                <div>
                                                    <div className={`text-6xl font-black impact-font mb-2 ${m.isNeo ? 'text-[#3A86FF]' : 'text-white/10'}`}>{m.year}</div>
                                                    <div className="w-full h-px bg-white/10 mb-8"></div>
                                                    <div className="mb-6">
                                                        <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 border ${m.isNeo ? 'bg-[#3A86FF]/20 border-[#3A86FF] text-[#3A86FF]' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                            {m.icon}
                                                        </div>
                                                        <h3 className="text-3xl font-black impact-font text-white uppercase leading-none">{m.title}</h3>
                                                    </div>
                                                    <p className="text-sm text-white/60 leading-relaxed font-light">{m.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollReveal>
                        </div>
                    ) : (
                        // -- DESKTOP: Horizontal Cards in Motion stream --
                        <>
                            {EMS_MILESTONES.map((m, idx) => (
                                <div key={idx} className="flex-shrink-0 w-[60vh] h-[70vh] relative group transition-all duration-500 hover:scale-105">
                                    <div className={`h-full bg-black/40 backdrop-blur-md border ${m.isNeo ? 'border-[#3A86FF]/50 shadow-[0_0_50px_rgba(58,134,255,0.1)]' : 'border-white/10'} rounded-3xl p-12 flex flex-col relative overflow-hidden`}>

                                        {/* Image BG */}
                                        {m.image && (
                                            <div className="absolute inset-0 z-0">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
                                                <img src={m.image} alt={m.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                                            </div>
                                        )}

                                        <div className="relative z-20 h-full flex flex-col justify-end">
                                            {/* Top Year - Faded */}
                                            <div className="absolute top-0 right-0">
                                                <span className={`text-[120px] font-black impact-font leading-none opacity-10 ${m.isNeo ? 'text-[#3A86FF]' : 'text-white'}`}>
                                                    {m.year}
                                                </span>
                                            </div>

                                            <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-8 border backdrop-blur-xl ${m.isNeo ? 'bg-[#3A86FF] text-black border-[#3A86FF]' : 'bg-white/10 text-white border-white/20'}`}>
                                                {m.icon}
                                            </div>

                                            <h3 className="text-5xl font-black impact-font text-white uppercase mb-6 leading-[0.9]">
                                                {m.title}
                                            </h3>

                                            <div className="h-1 w-20 bg-white/20 mb-6"></div>

                                            <p className="text-xl text-white/70 leading-relaxed font-light">
                                                {m.description}
                                            </p>

                                            {m.isNeo && (
                                                <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 bg-[#3A86FF]/20 border border-[#3A86FF]/50 rounded-lg backdrop-blur-md">
                                                    <Zap size={16} className="text-[#3A86FF] animate-pulse" />
                                                    <span className="text-xs font-bold text-[#3A86FF] uppercase tracking-widest">Tehnologie Prezentă</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Connecting Line (Idea) */}
                                    {idx < EMS_MILESTONES.length - 1 && (
                                        <div className="absolute top-1/2 -right-24 w-24 h-px bg-gradient-to-r from-white/20 to-transparent dashed-line"></div>
                                    )}
                                </div>
                            ))}
                            {/* Final Spacer */}
                            <div className="w-[20vw] flex-shrink-0"></div>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

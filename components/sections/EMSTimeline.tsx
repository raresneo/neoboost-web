import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Zap, CheckCircle2, Box, Layers, Tablet } from 'lucide-react';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { ScrollReveal } from '../ui/ScrollReveal';
import { EMS_MILESTONES } from '../../constants';

// --- History Video Background Component ---
const HistoryVideoBackground = () => (
    <CinematicBackground image="/DSC04709.jpg" opacity={0.2} />
);

export const EMSTimeline = () => {
    const targetRef = useRef<HTMLDivElement>(null); // For scroll tracking
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal scroll effect for desktop
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    // Separate history milestones from the Current Era (NeoBoost)
    const historyMilestones = EMS_MILESTONES.filter(m => !m.isNeo);
    const neoMilestone = EMS_MILESTONES.find(m => m.isNeo);

    return (
        <section
            id="istoric"
            ref={targetRef}
            className={`relative bg-[var(--bg-primary)] z-10 ${isMobile ? 'py-24' : 'h-[300vh]'}`}
        >
            <div className={`${isMobile ? 'block' : 'sticky top-0 h-screen flex items-center overflow-hidden'}`}>

                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <HistoryVideoBackground />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-80" />
                </div>

                <motion.div
                    style={isMobile ? {} : { x }}
                    className={`relative z-10 flex ${isMobile ? 'flex-col gap-16 px-6' : 'flex-row gap-24 px-24 items-center'}`}
                >
                    {/* 1. INTRO HEADER */}
                    <div className={`flex-shrink-0 ${isMobile ? '' : 'w-[30vw]'} text-left`}>
                        <ScrollReveal>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-12 h-px bg-[#3A86FF]"></div>
                                <span className="mono-font text-[9px] text-[#3A86FF] font-black tracking-[0.6em] uppercase">Evoluție Tehnologică</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] mb-8">
                                CUM <br /> <span className="text-[#3A86FF]">FUNCȚIONEAZĂ?</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-md leading-relaxed">
                                De la primele experimente din 1780 până la libertatea wireless de astăzi. O tehnologie perfecționată în secole de cercetare.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* 2. HISTORY CARDS (1780, 1960, 2010) */}
                    {historyMilestones.map((m, idx) => (
                        <div key={idx} className={`flex-shrink-0 ${isMobile ? 'w-full aspect-[4/5]' : 'w-[45vh] h-[65vh]'} relative group`}>
                            <ScrollReveal delay={idx * 100} className="h-full">
                                <div className="h-full bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden flex flex-col relative transition-transform hover:scale-[1.02] duration-500">

                                    {/* Image Area */}
                                    <div className="h-1/2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10"></div>
                                        <img
                                            src={m.image}
                                            alt={m.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-6 right-6 z-20">
                                            <span className="text-6xl md:text-8xl font-display font-bold text-white/10">{m.year}</span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="h-1/2 p-8 flex flex-col justify-between relative z-20 -mt-12">
                                        <div>
                                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 mb-6 text-white">
                                                {m.icon}
                                            </div>
                                            <h3 className="text-2xl font-display font-bold text-white uppercase mb-4 tracking-wide">{m.title}</h3>
                                            <p className="text-white/60 text-sm leading-relaxed font-light">{m.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}

                    {/* 3. THE REVOLUTION (2024+ / EQUIPMENT) - Grand Finale Card */}
                    {neoMilestone && (
                        <div className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-[80vw] h-[80vh]'} relative`}>
                            <ScrollReveal className="h-full">
                                <div className="h-full bg-gradient-to-br from-[#0a0a0a] to-black border border-[#3A86FF]/30 rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(58,134,255,0.15)] group">

                                    {/* Left: Image Showcase */}
                                    <div className="w-full md:w-1/2 relative h-[300px] md:h-full bg-[#3A86FF]/5">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10 hidden md:block"></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 md:hidden"></div>
                                        <img
                                            src={neoMilestone.image}
                                            alt="NeoBoost Equipment"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute top-10 left-10 z-20">
                                            <span className="text-7xl md:text-9xl font-display font-bold text-[#3A86FF]">2024+</span>
                                            <div className="text-white font-bold tracking-[0.5em] uppercase text-sm ml-2">Revoluția Wireless</div>
                                        </div>
                                    </div>

                                    {/* Right: Technical Breakdown */}
                                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-20">
                                        <div className="mb-10">
                                            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-4 leading-none">
                                                ECHIPAMENTUL <span className="text-[#3A86FF]">NOSTRU</span>
                                            </h3>
                                            <p className="text-white/70 text-lg font-light leading-relaxed">
                                                {neoMilestone.description}
                                            </p>
                                        </div>

                                        {/* Component Breakdown from 'details' */}
                                        <div className="space-y-8">
                                            {neoMilestone.details?.map((detail, idx) => (
                                                <div key={idx} className="flex gap-6 group/item">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-12 h-12 rounded-xl bg-[#3A86FF]/10 border border-[#3A86FF]/30 flex items-center justify-center text-[#3A86FF] group-hover/item:bg-[#3A86FF] group-hover/item:text-white transition-all duration-300 shadow-[0_0_15px_rgba(58,134,255,0.2)]">
                                                            {idx === 0 && <Box size={24} />}
                                                            {idx === 1 && <Layers size={24} />}
                                                            {idx === 2 && <Tablet size={24} />}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white uppercase mb-1">{detail.name}</h4>
                                                        <p className="text-white/50 text-sm leading-relaxed group-hover/item:text-white/80 transition-colors">
                                                            {detail.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
                                            <div className="px-4 py-2 rounded-lg bg-[#3A86FF]/10 border border-[#3A86FF]/20 text-[#3A86FF] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                <Zap size={14} />
                                                Tehnologie Symbiont 360
                                            </div>
                                            <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                <CheckCircle2 size={14} />
                                                Medical Approved
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </ScrollReveal>
                        </div>
                    )}

                    {/* Final Mobile Spacer */}
                    {isMobile && <div className="h-24"></div>}
                </motion.div>
            </div>
        </section>
    );
};

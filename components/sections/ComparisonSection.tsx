import React, { memo } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { GYM_VS_EMS } from '../../constants';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

// --- Evolution Video Background Component ---
const EvolutionVideoBackground = memo(() => (
    <CinematicBackground image="/DSC00193.webp" opacity={0.3} />
));

// --- New Competitive Comparison Section ---
const ComparisonSectionComponent = () => (
    <section className="py-20 md:py-32 bg-[var(--bg-primary)] relative z-10">
        <div className="container mx-auto px-6 md:px-24 relative z-10">
            <ScrollReveal>
                <div className="text-center mb-16 relative z-10">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-blue-600 font-bold uppercase mb-4">Sală vs NeoBoost</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] uppercase italic">
                        DE CE SĂ ALEGI EMS ÎN LOCUL <span className="text-blue-600">SĂLII CLASICE</span>
                    </h2>
                </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto">
                <div className="bg-[var(--bg-secondary)] rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[var(--border-subtle)] overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-12 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
                        <div className="col-span-12 md:col-span-4 p-6 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                            Criteriu
                        </div>
                        <div className="col-span-6 md:col-span-4 p-6 text-center text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] border-r border-[var(--border-subtle)] md:border-r-0">
                            Sală Tradițională 🏋️
                        </div>
                        <div className="col-span-6 md:col-span-4 p-6 text-center text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50/50">
                            NeoBoost EMS (Electrostimulare) ⚡
                        </div>
                    </div>

                    {/* Rows */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="divide-y divide-gray-100"
                    >
                        {GYM_VS_EMS.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                                className="grid grid-cols-12 group hover:bg-[var(--bg-primary)] transition-colors"
                            >

                                {/* Feature */}
                                <div className="col-span-12 md:col-span-4 p-6 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-[var(--text-primary)] text-sm">{item.feature}</span>
                                </div>

                                {/* Gym (Negative) */}
                                <div className="col-span-6 md:col-span-4 p-3 md:p-6 flex flex-col items-center justify-center border-r border-gray-100 md:border-r-0 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <span className="text-[var(--text-muted)] font-medium text-xs md:text-base line-through decoration-gray-300 relative z-10 text-center">
                                        {item.gym}
                                    </span>
                                </div>

                                {/* EMS (Positive) */}
                                <div className="col-span-6 md:col-span-4 p-3 md:p-6 flex flex-col items-center justify-center bg-blue-50/30 relative overflow-hidden">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Check size={20} className="text-green-600" />
                                    </div>
                                    <span className="text-blue-900 font-black text-xs md:text-lg text-center relative z-10">
                                        {item.ems}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Callout */}
                <ScrollReveal delay={300}>
                    <div className="mt-12 text-center">
                        <p className="text-[var(--text-secondary)] font-medium text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                            Timpul tău e valoros. De ce să pierzi ore întregi antrenându-te singur și ghicind ce exerciții funcționează, când poți avea un antrenor dedicat și un corp tonifiat în doar 30 de minute pe săptămână? ⏳
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            className="shadow-xl shadow-blue-500/20"
                        >
                            VREAU O SESIUNE DE TEST
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section >
);

export const ComparisonSection = memo(ComparisonSectionComponent);

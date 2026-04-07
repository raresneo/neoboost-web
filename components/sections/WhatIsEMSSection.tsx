import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScrollRevealText } from '../ui/ScrollRevealText';

import { TextScramble } from '../ui/TextScramble';
import { TypingHeading } from '../ui/TypingHeading';
import { TypingText } from '../ui/TypingText';

export const WhatIsEMSSection = () => {
    return (
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase mb-6">
                            <Zap size={14} />
                            <TextScramble text="Tehnologie Avansată" />
                        </div>

                        <div className="mb-8">
                            <TypingHeading
                                text="Ce este antrenamentul EMS NeoBoost în Oradea"
                                highlightText="NeoBoost"
                                highlightColor="text-blue-600"
                                className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight justify-start"
                            />
                        </div>

                        <div className="mb-12">
                            <ScrollRevealText
                                text="EMS (electrostimularea musculară) este o inovație prin care mușchii sunt activați profund prin impulsuri electrice controlate, în timp ce faci exerciții simple, ghidate de antrenor. În 20–30 de minute obții intensitatea unei sesiuni clasice mult mai lungi, fără să-ți pierzi orele libere în sală."
                                highlights={[
                                    { word: "EMS", icon: <Zap className="text-blue-600 w-6 h-6 inline ml-1 fill-current animate-pulse-fast" />, color: "#2563eb" },
                                    { word: "antrenor.", icon: <Users className="text-orange-500 w-6 h-6 inline ml-1" />, color: "#f97316" },
                                    { word: "30", color: "#16a34a" }
                                ]}
                                className="text-xl md:text-3xl font-display font-bold text-gray-500"
                            />
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 animate-float-slow">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <TypingHeading
                                        text="Nu pierzi timp, ci câștigi"
                                        className="text-xl font-display font-bold text-gray-900 mb-2 justify-start"
                                    />
                                    <TypingText
                                        text="30 de minute de antrenament continuu. Fără așteptat după aparate, fără pauze lungi. Vii, te antrenezi, pleci. ⚡"
                                        className="text-[var(--text-secondary)] leading-relaxed"
                                        delay={0.2}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 animate-float-medium">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <TypingHeading
                                        text="Antrenor alături de tine"
                                        className="text-xl font-display font-bold text-gray-900 mb-2 justify-start"
                                    />
                                    <TypingText
                                        text="Nu ești singur cu un aparat. Avem nevoie să știm cum te simți, cum respiri, ce doare. Luăm fiecare mișcare împreună. 🤝"
                                        className="text-[var(--text-secondary)] leading-relaxed"
                                        delay={0.4}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 animate-float-fast">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <TypingHeading
                                        text="Fără presiune pe genunchi"
                                        className="text-xl font-display font-bold text-gray-900 mb-2 justify-start"
                                    />
                                    <TypingText
                                        text="Dacă te dor genunchii sau spatele, aici poți construi forță fără să ridici greutăți. Articulațiile tale rămân în siguranță. 🛡️"
                                        className="text-[var(--text-secondary)] leading-relaxed"
                                        delay={0.6}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <Link to="/science">
                                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-[var(--accent-primary)]">
                                    VEZI EXPLICAȚIA ȘTIINȚIFICĂ &rarr;
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Image - Clean & Professional */}
                    <div className="relative lg:h-[600px] h-[400px] rounded-2xl overflow-hidden border border-[var(--border-subtle)] group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10"></div>
                        <img
                            src="/hero_user.webp"
                            alt="E M S Profesional"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Floating Stats Card in Image */}
                        <div className="absolute bottom-8 left-8 z-20 bg-[var(--bg-primary)]/90 backdrop-blur-md p-6 rounded-xl border border-[var(--border-subtle)] shadow-xl">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-display font-bold text-[var(--text-primary)]">30</span>
                                <div className="h-10 w-px bg-[var(--border-subtle)]"></div>
                                <div className="flex flex-col">
                                    <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">Minute ⏱️</span>
                                    <span className="text-[var(--text-muted)] text-xs">Durata Ședinței</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

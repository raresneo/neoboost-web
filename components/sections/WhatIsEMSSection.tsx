import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export const WhatIsEMSSection = () => {
    return (
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase mb-6">
                            <Zap size={14} />
                            <span>Tehnologie Avansată</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            De ce <span className="text-[var(--accent-primary)]">EMS?</span>
                        </h2>

                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                            Electro-Stimularea Musculară (EMS) este cea mai eficientă metodă de antrenament a secolului 21.
                            Activează 90% din musculatură simultan, oferind rezultate superioare în timp record.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">Eficiență Maximă</h3>
                                    <p className="text-[var(--text-muted)] leading-relaxed">
                                        Doar 30 de minute, o dată pe săptămână. Echivalentul a 4 ore de fitness convențional.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">Personal Training 1-la-1</h3>
                                    <p className="text-[var(--text-muted)] leading-relaxed">
                                        Antrenor dedicat care îți corectează postura și personalizează intensitatea fiecărui impuls.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">Zero Impact Articular</h3>
                                    <p className="text-[var(--text-muted)] leading-relaxed">
                                        Ideal pentru recuperare și prevenție. Protejează articulațiile și coloana vertebrală.
                                    </p>
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
                            src="/hero_user.jpg"
                            alt="Antrenament EMS Profesional"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Floating Stats Card in Image */}
                        <div className="absolute bottom-8 left-8 z-20 bg-[var(--bg-primary)]/80 backdrop-blur-md p-6 rounded-xl border border-[var(--border-visible)]">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-display font-bold text-white">30</span>
                                <div className="h-10 w-px bg-white/20"></div>
                                <div className="flex flex-col">
                                    <span className="text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase">Minute</span>
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

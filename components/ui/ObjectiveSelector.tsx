import React from 'react';
import { Button } from './Button';
import { Zap, Clock, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ObjectiveSelector = () => {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white">
            {/* --- VIDEO BACKGROUND --- */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-20"
                >
                    <source src="/neo-costum2-fara-text.mp4" type="video/mp4" />
                </video>
                {/* Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60"></div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Pills / Badges */}
                    <ScrollReveal>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <Badge icon={<Zap size={14} />} text="TEHNOLOGIE AVANSATĂ" />
                            <Badge icon={<Clock size={14} />} text="20 MIN WORKOUT" />
                            <Badge icon={<Activity size={14} />} text="90% ACTIVARE MUSCULARĂ" />
                        </div>
                    </ScrollReveal>

                    {/* Main Headlines */}
                    <ScrollReveal delay={100}>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-gray-900 mb-2 uppercase italic tracking-tight leading-none">
                            NU AI TIMP DE SALĂ?
                        </h2>
                        <div className="relative inline-block">
                            <h2 className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 uppercase italic tracking-tight drop-shadow-sm leading-none pb-2">
                                ZERO SCUZE.
                            </h2>
                            {/* Decorative underline/swosh could go here */}
                        </div>
                    </ScrollReveal>

                    {/* Description text */}
                    <ScrollReveal delay={200}>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                            Job, copii, cumpărături... și la sfârșit rămâi tu. Mereu ultimul pe listă.
                            Înțelegem. Aici, în <strong>30 de minute</strong>, îți lucrezi tot corpul -
                            fără febră musculară care te ține în pat a doua zi.
                            <span className="block mt-2 font-medium text-gray-800">
                                Antrenamente EMS Oradea care chiar funcționează pentru oameni ocupați 🚀.
                            </span>
                        </p>
                    </ScrollReveal>

                    {/* CTA Button */}
                    <ScrollReveal delay={300}>
                        <div className="flex justify-center">
                            <Button
                                variant="glow"
                                size="lg"
                                className="!text-lg !px-10 !py-6 shadow-xl shadow-blue-500/20"
                                onClick={() => window.open('https://wa.me/40769124019?text=Salut! Vreau să încerc o ședință gratuită (Zero Scuze).', '_blank')}
                            >
                                Vreau să încerc gratis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                        <p className="mt-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
                            * Prima ședință este Gratuită
                        </p>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};

// Helper Component for the Badges
const Badge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-800 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
        <span className="text-blue-600">{icon}</span>
        {text}
    </div>
);

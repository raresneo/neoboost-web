import React from 'react';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface NoSuitSectionProps {
    onOpenBooking: () => void;
}

export const NoSuitSection: React.FC<NoSuitSectionProps> = ({ onOpenBooking }) => {
    return (
        <section className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                <div className="glass-block rounded-3xl p-8 md:p-16 border border-white/10 relative overflow-hidden">

                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3A86FF]/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-center relative z-10">
                        <ScrollReveal>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <Dumbbell className="text-white" size={24} />
                                    </div>
                                    <span className="text-[#3A86FF] font-bold uppercase tracking-widest text-xs">Alternativă Flexible</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black impact-font text-white mb-6">
                                    Preferi fără costum? <br />
                                    <span className="text-gray-400">Antrenamente funcționale clasice, la fel de atent ghidate.</span>
                                </h2>

                                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8">
                                    Dacă preferi să începi fără costum sau ai recomandarea să eviți electrostimularea, la <strong>NeoBoost</strong> poți opta pentru antrenamente funcționale clasice. Lucrăm 1-la-1 sau în grupuri restrânse, folosind greutatea propriului corp și accesorii moderne (kettlebells, TRX, benzi elastice). Totul sub supravegherea atentă a antrenorilor noștri.
                                </p>

                                <p className="text-sm text-gray-500 font-medium italic border-l-2 border-[#3A86FF]/30 pl-4 mb-8">
                                    * Selectează opțiunea "Funcțional (Fără Costum)" în formularul de programare.
                                </p>

                                <button
                                    onClick={onOpenBooking}
                                    className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl transition-all duration-300 group"
                                >
                                    <span className="font-bold tracking-wide uppercase text-sm">Programează o ședință</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#3A86FF]" />
                                </button>
                            </div>
                        </ScrollReveal>

                        <div className="hidden lg:block relative h-full min-h-[400px]">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 group">
                                <img
                                    src="/functional_training.png"
                                    alt="Antrenament Funcțional NeoBoost"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#3A86FF] rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Antrenor Personal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

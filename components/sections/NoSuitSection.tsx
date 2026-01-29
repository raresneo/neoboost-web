import React from 'react';
import { Dumbbell, ArrowRight, Activity, HeartHandshake, BrainCircuit } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { DualToneImage } from '../ui/DualToneImage';

interface NoSuitSectionProps {
    onOpenBooking: () => void;
}

export const NoSuitSection: React.FC<NoSuitSectionProps> = ({ onOpenBooking }) => {
    return (
        <section className="py-20 md:py-32 bg-transparent border-y border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-24">
                <div className="glass-block rounded-[2.5rem] p-8 md:p-12 border border-white/10 relative overflow-hidden bg-[var(--bg-primary)]/40">

                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3A86FF]/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-center relative z-10">
                        <ScrollReveal>
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <Activity className="text-white" size={20} />
                                    </div>
                                    <span className="text-[#3A86FF] font-black uppercase tracking-[0.3em] text-[10px]">Kinetoterapie & Funcțional</span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase italic leading-tight">
                                    ANTRENAMENT <span className="text-[#3A86FF]">PERSONAL.</span><br />
                                    <span className="text-white/50">EXECUTAT CORECT.</span>
                                </h2>

                                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6 font-light">
                                    Nu este doar despre "tras de fiare". Este despre <strong>biomecanică, postură și siguranță</strong>.
                                    Combinăm expertiza în Kinetoterapie cu antrenamentul de forță pentru a corecta dezechilibrele, a preveni accidentările și a construi un corp funcțional, nu doar estetic.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="flex items-center gap-2 mb-2 text-[#3A86FF]">
                                            <BrainCircuit size={18} />
                                            <h4 className="font-bold text-xs uppercase tracking-wider">Corecție Posturală</h4>
                                        </div>
                                        <p className="text-white/60 text-xs leading-relaxed">
                                            Ideal pentru cei cu dureri de spate, viață sedentară sau istoric de accidentări. Învățăm corpul să se miște din nou corect.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="flex items-center gap-2 mb-2 text-green-400">
                                            <Dumbbell size={18} />
                                            <h4 className="font-bold text-xs uppercase tracking-wider">Forță & Hipertrofie</h4>
                                        </div>
                                        <p className="text-white/60 text-xs leading-relaxed">
                                            Antrenamente clasice (greutăți libere, aparate) adaptate 100% capacității tale, cu supraveghere constantă la fiecare repetiție.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-[#3A86FF]/20 hover:text-white transition-colors cursor-default">Fără Dureri de Spate</span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-[#3A86FF]/20 hover:text-white transition-colors cursor-default">Mobilitate</span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-[#3A86FF]/20 hover:text-white transition-colors cursor-default">Postură</span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-[#3A86FF]/20 hover:text-white transition-colors cursor-default">Kineto</span>
                                </div>

                                <button
                                    onClick={onOpenBooking}
                                    className="inline-flex items-center gap-3 bg-[#3A86FF] hover:bg-[#2563EB] text-white px-8 py-4 rounded-xl transition-all duration-300 group shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="font-black tracking-widest uppercase text-xs lg:text-sm">Vreau o Ședință de Probă</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[10px] text-gray-500 font-medium italic mt-4">
                                    * Disponibil la Hotel Ramada & Sala GetFit
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="hidden lg:block relative h-full min-h-[400px]">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 group">
                                <DualToneImage
                                    src="/DSC03989.jpg"
                                    alt="Kinetoterapie și Antrenament Funcțional Real"
                                    className="w-full h-full object-cover scale-100 group-hover:scale-105"
                                    intensity="none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none"></div>
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                                <div className="bg-black/60 backdrop-blur-md border border-[#3A86FF]/30 px-4 py-2 rounded-xl flex items-center justify-between">
                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Timp Alocat</span>
                                    <span className="text-[#3A86FF] text-xs font-black">45 - 60 MIN</span>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center justify-between">
                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Abordare</span>
                                    <span className="text-white/80 text-xs font-black">1-La-1 Personal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

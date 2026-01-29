import React from 'react';
import { ShieldCheck, HeartPulse, AlertTriangle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const SafetySection = () => {
    return (
        <section className="py-20 md:py-32 bg-transparent border-y border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <ShieldCheck className="text-[#3A86FF]" size={20} />
                            <span className="text-[#3A86FF] font-black uppercase tracking-[0.3em] text-[10px]">Siguranță & Eligibilitate</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic">
                            ELECTROSTIMULAREA <span className="text-[#3A86FF]">E PENTRU TINE?</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Suitable For */}
                    <ScrollReveal delay={100}>
                        <div className="h-full glass-block p-8 rounded-[2rem] border border-[#3A86FF]/20 hover:border-[#3A86FF]/50 transition-all flex flex-col bg-[var(--bg-primary)]/40 shadow-2xl">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] flex-shrink-0 rotate-3 shadow-[0_0_20px_rgba(58,134,255,0.2)]">
                                    <HeartPulse size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase font-display">ESTE PENTRU TINE DACĂ...</h3>
                            </div>
                            <ul className="space-y-6 text-white/80 flex-grow text-lg">
                                <li className="flex gap-4">
                                    <span className="text-[#3A86FF] font-black">✓</span>
                                    <span>Cauți o alternativă de sport <strong className="text-white">eficientă</strong> (30 min) care se integrează în programul tău.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-[#3A86FF] font-black">✓</span>
                                    <span>Vrei să îți <strong className="text-white">optimizezi performanța sportivă</strong> și compoziția corporală fără uzură articulară.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-[#3A86FF] font-black">✓</span>
                                    <span>Prețuiești <strong className="text-white">siguranța</strong> și vrei să lucrezi doar sub supravegherea unui specialist.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-[#3A86FF] font-black">✓</span>
                                    <span>Ești o persoană <strong className="text-white">asumată</strong>, dispusă să urmeze un protocol clar pentru rezultate garantate.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-[#3A86FF] font-black">✓</span>
                                    <span>Cauți rezultate vizibile rapid, dar înțelegi că <strong className="text-white">consecvența</strong> este cheia succesului.</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Not Suitable For */}
                    <ScrollReveal delay={200}>
                        <div className="h-full glass-block p-8 rounded-[2rem] border border-white/5 hover:border-red-500/20 transition-all flex flex-col bg-white/[0.02]">
                            <div className="flex items-center gap-5 mb-8 opacity-60">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 flex-shrink-0 -rotate-3">
                                    <AlertTriangle size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white/60 uppercase font-display">NU ESTE PENTRU TINE DACĂ...</h3>
                            </div>

                            {/* Medical Section */}
                            <div className="mb-6">
                                <p className="text-white/30 text-xs mb-3 uppercase tracking-widest font-bold border-b border-white/5 pb-2">Contraindicații Medicale</p>
                                <ul className="space-y-3 text-white/40 text-sm">
                                    <li className="flex gap-3 items-center">
                                        <span className="text-red-900/40 font-bold text-xs">✕</span>
                                        <span>Afecțiuni cardiace grave (ex: stimulator).</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <span className="text-red-900/40 font-bold text-xs">✕</span>
                                        <span>Sarcină, epilepsie sau tromboză.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Mindset Section */}
                            <div>
                                <p className="text-white/30 text-xs mb-3 uppercase tracking-widest font-bold border-b border-white/5 pb-2">Mindset & Atitudine</p>
                                <ul className="space-y-4 text-white/50 text-base italic">
                                    <li className="flex gap-4">
                                        <span className="text-red-900/60 font-bold">✕</span>
                                        <span>Cauți o <strong>"pastilă magică"</strong> sau rezultate miraculoase fără niciun efort personal.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-red-900/60 font-bold">✕</span>
                                        <span>Nu ești dispus(ă) să îți asumi <strong>responsabilitatea</strong> procesului și renunți la primul obstacol.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-red-900/60 font-bold">✕</span>
                                        <span>Nu poți respecta o programare și indicațiile antrenorului.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={300}>
                    <div className="mt-6 text-center max-w-2xl mx-auto">
                        <p className="text-white/50 text-[10px] md:text-xs italic border-l-2 border-[#3A86FF]/30 pl-4 py-1">
                            "În caz de dubiu, te rugăm să ne spui înainte de ședință – antrenorii noștri verifică mereu siguranța înainte de orice antrenament și adaptează intensitatea."
                        </p>
                    </div>
                </ScrollReveal>

                {/* EMS Tech Explanation Box */}
                <ScrollReveal delay={400}>
                    <div className="mt-8 glass-block p-6 rounded-2xl bg-[var(--bg-primary)]/50 border border-white/5">
                        <h4 className="text-base font-bold text-white mb-2">Cum funcționează tehnologia EMS?</h4>
                        <p className="text-white/60 leading-relaxed text-[10px] md:text-sm">
                            EMS (Electrostimulare Musculară) este o tehnologie care stimulează fibrele musculare prin impulsuri electrice controlate. Asta înseamnă că într-un antrenament de ~30 de minute poți obține un nivel de activare musculară similar cu o sesiune mult mai lungă în sala clasică. Toate ședințele sunt supravegheate 1 la 1, iar intensitatea este adaptată nivelului tău.
                        </p>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

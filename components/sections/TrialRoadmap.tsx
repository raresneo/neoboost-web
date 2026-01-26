import React from 'react';
import { UserCheck, Shirt, Zap, Droplets, ArrowDown } from 'lucide-react';
import { useDraggableScroll } from '../../lib/useDraggableScroll';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CinematicBackground } from '../backgrounds/CinematicBackground';

// --- Trial Video Background Component (Optimized) ---
const TrialVideoBackground = () => {
    return <CinematicBackground image="/DSC07054.jpg" opacity={0.3} />;
};

// --- Trial Roadmap Section ---
export const TrialRoadmap = () => {
    const roadmap = [
        { step: "01", title: "Discuție Obiective", desc: "Discutăm 5-10 min despre ce vrei să obții (slăbire, tonifiere, postură).", icon: <UserCheck size={20} /> },
        { step: "02", title: "Analiză & Echipare", desc: "Verificăm eligibilitatea pentru EMS și te echipăm cu costumul DrySuit.", icon: <Shirt size={20} /> },
        { step: "03", title: "Antrenament Test", desc: "Simți pe pielea ta cum lucrează fibra musculară în 15-20 min ghidate.", icon: <Zap size={20} /> },
        { step: "04", title: "Plan Personalizat", desc: "Primești o recomandare clară de pachet adaptat stilului tău de viață.", icon: <Droplets size={20} /> }
    ];

    const scrollRef = useDraggableScroll();

    return (
        <section className="py-8 lg:py-[5vh] bg-transparent border-y border-white/5 relative overflow-hidden h-full flex flex-col justify-center">

            <div className="container mx-auto px-6 md:px-24 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-4xl font-black impact-font text-white tracking-tight uppercase">CE SE ÎNTÂMPLĂ LA <span className="text-[#3A86FF]">ȘEDINȚA GRATUITĂ?</span></h2>
                        <p className="text-white/40 mt-2 mono-font text-[10px] tracking-widest uppercase">Simplu, rapid, profesionist.</p>
                        <p className="mt-4 text-white/70 italic text-xs md:text-sm max-w-xl mx-auto">
                            Nu te obligă la nimic. Dacă simți că nu e pentru tine, pleci doar cu experiența în plus și cu mai multă claritate.
                        </p>
                    </div>
                </ScrollReveal>

                <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing">
                    {roadmap.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100} className="min-w-[85vw] md:min-w-[300px] flex-shrink-0 snap-center">
                            <div className="relative p-6 sm:p-8 h-full glass-block bg-black/80 backdrop-blur-xl rounded-2xl group hover:border-[#3A86FF]/50 transition-all duration-500 border border-white/10 shadow-lg flex flex-col">
                                <div className="text-4xl font-black impact-font text-white/10 group-hover:text-[#3A86FF]/20 transition-colors mb-2">{item.step}</div>
                                <div className="text-[#3A86FF] mb-4 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(58,134,255,0.5)]">{item.icon}</div>
                                <h3 className="text-lg font-black impact-font text-white mb-1 uppercase">{item.title}</h3>
                                <p className="text-xs text-gray-300 font-medium leading-relaxed">{item.desc}</p>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-2 translate-y-1/2">
                                        <ArrowDown className="-rotate-90 text-white/5" size={20} />
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

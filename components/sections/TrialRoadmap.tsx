import React from 'react';
import { UserCheck, Shirt, Zap, Droplets, ArrowDown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CinematicBackground } from '../backgrounds/CinematicBackground';

// --- Trial Video Background Component (Optimized) ---
const TrialVideoBackground = () => {
    return <CinematicBackground image="/DSC07054.jpg" opacity={0.3} />;
};

// --- Trial Roadmap Section ---
export const TrialRoadmap = () => {
    const roadmap = [
        { step: "01", title: "Consiliere", desc: "Discutăm despre obiectivele tale și starea de sănătate.", icon: <UserCheck size={20} /> },
        { step: "02", title: "Echipare", desc: "Primești costumul Drysuit bio-optic pregătit special.", icon: <Shirt size={20} /> },
        { step: "03", title: "Activare", desc: "30 de minute de antrenament ghidat 1-la-1.", icon: <Zap size={20} /> },
        { step: "04", title: "Recuperare", desc: "Shake proteic și planificare pentru rezultate.", icon: <Droplets size={20} /> }
    ];

    return (
        <section className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">

            <div className="container mx-auto px-6 md:px-24 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black impact-font text-white tracking-tight uppercase">EXPERIENȚA <span className="text-[#3A86FF]">PRIMEI VIZITE.</span></h2>
                        <p className="text-white/40 mt-4 mono-font text-xs tracking-widest uppercase">Simplu, rapid, profesionist.</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roadmap.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100}>
                            <div className="relative p-6 sm:p-10 glass-block bg-black/80 backdrop-blur-xl rounded-2xl group hover:border-[#3A86FF]/50 transition-all duration-500 border border-white/10 shadow-lg">
                                <div className="text-5xl font-black impact-font text-white/10 group-hover:text-[#3A86FF]/20 transition-colors mb-4">{item.step}</div>
                                <div className="text-[#3A86FF] mb-6 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(58,134,255,0.5)]">{item.icon}</div>
                                <h3 className="text-xl font-black impact-font text-white mb-2 uppercase">{item.title}</h3>
                                <p className="text-sm text-gray-300 font-medium leading-relaxed">{item.desc}</p>
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

import React, { useState } from 'react';
import { UserCheck, Shirt, Zap, Droplets, ArrowDown, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const TrialRoadmap = () => {
    const [openStep, setOpenStep] = useState<number | null>(0);

    const toggleStep = (index: number) => {
        setOpenStep(openStep === index ? null : index);
    };

    const roadmap = [
        {
            step: "01",
            title: "Discuție & Obiective",
            subtitle: "Cunoaștere reciprocă",
            desc: "Totul începe cu o strângere de mână și o cafea (sau apă). Vrem să te cunoaștem.",
            icon: <UserCheck size={24} />,
            details: [
                "Discutăm despre istoricul tău sportiv și eventuale afecțiuni.",
                "Stabilim obiective clare: slăbire, tonifiere, sau dureri de spate.",
                "Îți explicăm cum funcționează tehnologia și la ce să te aștepți."
            ]
        },
        {
            step: "02",
            title: "Echipare & Pregătire",
            subtitle: "Pregătirea costumului DrySuit",
            desc: "Primești echipamentul nostru special pe sub costum. Totul este steril și pregătit pentru tine.",
            icon: <Shirt size={24} />,
            details: [
                "Te echipezi în vestiarul nostru privat.",
                "Îmbraci costumul DrySuit wireless – fără umezire, fără senzație de rece.",
                "Facem o calibrare ușoară pentru a ne asigura că simți stimulii corect pe fiecare grupă musculară."
            ]
        },
        {
            step: "03",
            title: "Antrenamentul Propriu-Zis",
            subtitle: "15-30 Minute de Activare",
            desc: "Partea distractivă! Trecem prin exerciții simple, ghidate, adaptate nivelului tău.",
            icon: <Zap size={24} />,
            details: [
                "Începem cu mișcări de bază pentru acomodare.",
                "Simți cum musculatura lucrează intens, deși efortul articular e minim.",
                "Antrenorul îți corectează postura în timp real.",
                "BONUS: Finalizăm cu un program de Masaj sau Drenaj Limfatic din costum, pentru recuperare și relaxare totală."
            ]
        },
        {
            step: "04",
            title: "Plan & Concluzii",
            subtitle: "Feedback și Pașii Următori",
            desc: "Discutăm cum te-ai simțit și îți recomandăm cel mai potrivit pachet pentru obiectivul tău.",
            icon: <Droplets size={24} />,
            details: [
                "Analizăm nivelul de energie post-antrenament.",
                "Îți propunem o frecvență optimă (ex: 2 ori pe săptămână).",
                "Dacă ți-a plăcut, stabilim împreună programul pentru săptămâna viitoare."
            ]
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-transparent border-y border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase italic">
                            CUM DECURGE <span className="text-[#3A86FF]">PRIMA ȘEDINȚĂ?</span>
                        </h2>
                        <p className="text-[#3A86FF] mt-4 mono-font text-xs tracking-[0.5em] uppercase font-black">Experiența NeoBoost</p>
                        <p className="mt-6 text-white/60 italic text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Simplu, relaxat și profesionist. Nu ești singur – suntem alături de tine la fiecare pas, de la intrare până la plecare.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    {roadmap.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100} className="w-full">
                            <div
                                onClick={() => toggleStep(idx)}
                                className={`
                                    relative p-6 sm:p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden group
                                    ${openStep === idx
                                        ? 'bg-[#3A86FF]/10 border-[#3A86FF]/50 shadow-[0_0_30px_rgba(58,134,255,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
                                `}
                            >
                                {/* Header Row */}
                                <div className="flex items-center justify-between gap-4 md:gap-8">
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className={`
                                            w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300
                                            ${openStep === idx ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-white/50 group-hover:text-white'}
                                        `}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xl md:text-2xl font-display font-bold uppercase transition-colors ${openStep === idx ? 'text-[#3A86FF]' : 'text-white/30'}`}>
                                                    {item.step}
                                                </span>
                                                <h3 className={`text-lg md:text-2xl font-bold uppercase transition-colors ${openStep === idx ? 'text-white' : 'text-white/80'}`}>
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className={`text-xs md:text-sm font-medium mt-1 transition-colors ${openStep === idx ? 'text-[#3A86FF]' : 'text-white/40'}`}>
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`p-2 rounded-full border transition-all duration-300 ${openStep === idx ? 'bg-[#3A86FF] border-[#3A86FF] rotate-180' : 'border-white/10 text-white/30'}`}>
                                        <ChevronDown size={20} className={openStep === idx ? 'text-white' : ''} />
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${openStep === idx ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/10' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-white/80 text-base leading-relaxed mb-6">
                                            {item.desc}
                                        </p>
                                        <ul className="space-y-3">
                                            {item.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="flex gap-3 text-white/60 text-sm md:text-base">
                                                    <CheckCircle2 size={18} className="text-[#3A86FF] shrink-0 mt-0.5" />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, Shirt, Zap, Droplets, ChevronDown, CheckCircle2, Trophy, ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TypingHeading } from '../ui/TypingHeading';

export const TrialRoadmap = () => {
    // We can use scroll-based activation or simple hover/click
    // For "Gamified", let's make it interactive on scroll or hover
    const [activeStep, setActiveStep] = useState(0);
    // Video ref logic removed as we switched to YouTube embed


    const roadmap = [
        {
            step: "01",
            title: "Discuție & Obiective",
            subtitle: "Cunoaștere Reciprocă",
            desc: "Totul începe cu o strângere de mână și o cafea (sau apă). Vrem să te cunoaștem și să îți înțelegem nevoile.",
            icon: <UserCheck size={24} />,
            color: "text-blue-500",
            bg: "bg-blue-500",
            video: "https://www.youtube.com/embed/Y_zssM6-qA0",
            articleLink: "/articol/motivatie-neurostiinta-obiective",
            articleTitle: "Motivație vs. Disciplină",
            details: [
                "Discutăm istoricul sportiv",
                "Stabilim obiective clare (slăbire, tonifiere)",
                "Explicăm tehnologia pe înțelesul tău"
            ]
        },
        {
            step: "02",
            title: "Echipare & Pregătire",
            subtitle: "Ready Player One",
            desc: "Primești echipamentul nostru special pe sub costum. Totul este steril, privat și pregătit doar pentru tine.",
            icon: <Shirt size={24} />,
            color: "text-indigo-500",
            bg: "bg-indigo-500",
            video: "https://www.youtube.com/embed/PeTYA8u9N5s",
            details: [
                "Vestiar privat & igienă maximă",
                "Costum DrySuit Wireless (Fără Apă)",
                "Calibrare personalizată a impulsurilor"
            ]
        },
        {
            step: "03",
            title: "Antrenament Activ",
            subtitle: "15-20 Minute de Foc",
            desc: "Partea distractivă! Trecem prin exerciții simple, ghidate, adaptate nivelului tău. Simți cum lucrează tot corpul.",
            icon: <Zap size={24} />,
            color: "text-orange-500",
            bg: "bg-orange-500",
            articleLink: "/articol/ems-vs-hiit-science",
            articleTitle: "EMS + HIIT: Combinația Perfectă",
            details: [
                "Exerciții simple, impact zero pe articulații",
                "Corectare posturală în timp real",
                "Activare musculară 90% din prima secundă"
            ]
        },
        {
            step: "04",
            title: "Relaxare & Masaj",
            subtitle: "Recovery Mode",
            desc: "După efort, urmează răsplata. 5-10 minute de masaj prin impulsuri sau drenaj limfatic direct din costum.",
            icon: <Droplets size={24} />,
            color: "text-cyan-500",
            bg: "bg-cyan-500",
            details: [
                "Eliminarea acidului lactic",
                "Relaxare musculară profundă",
                "Senzație de bine imediată"
            ]
        },
        {
            step: "05",
            title: "Plan & Concluzii",
            subtitle: "Level Up",
            desc: "Discutăm cum te-ai simțit, analizăm energia post-antrenament și stabilim planul pentru următoarea etapă.",
            icon: <Trophy size={24} />,
            color: "text-green-500",
            bg: "bg-green-500",
            details: [
                "Feedback imediat",
                "Recomandare pachet personalizat",
                "Stabilirea orarului săptămânal"
            ]
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100">
                            <ArrowRight size={14} />
                            <span>Roadmap</span>
                        </div>
                        <TypingHeading
                            text="CUM DECURGE O ȘEDINȚĂ DE 30 DE MINUTE"
                            highlightText="30 DE MINUTE"
                            highlightColor="text-blue-600"
                            className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight uppercase italic mb-6"
                        />
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                            De la prima intrare în studio până la senzația de după antrenament. Totul este gândit pentru a fi simplu, eficient și adaptat ritmului tău.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Vertical Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line (Desktop) / Left Line (Mobile) */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 md:-translate-x-1/2 rounded-full">
                        {/* Progress Line (Fill) - Static for now or animated on scroll could be added later */}
                        <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-blue-500 to-transparent opacity-50"></div>
                    </div>

                    {roadmap.map((item, idx) => (
                        <div key={idx} className={`relative flex flex-col md:flex-row gap-8 mb-16 md:mb-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Connector Node */}
                            <div className="absolute left-6 md:left-1/2 top-8 w-4 h-4 rounded-full border-[3px] border-white ring-4 ring-blue-50 bg-blue-500 shadow-md md:-translate-x-1/2 z-20 transform transition-transform hover:scale-125"></div>

                            {/* Empty Space for alignment */}
                            <div className="flex-1 hidden md:block"></div>

                            {/* Content Card */}
                            <div className="flex-1 md:pl-12 md:pr-0 pl-16">
                                <div className={`
                                    group relative bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-subtle)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30
                                    ${idx % 2 === 0 ? 'md:text-left' : 'md:text-left'}
                                `}>
                                    {/* Number Watermark */}
                                    <div className="absolute -top-6 -right-4 text-[80px] font-black text-gray-50 opacity-50 z-0 select-none font-display">
                                        {item.step}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl ${item.bg} bg-opacity-10 flex items-center justify-center mb-6`}>
                                            <div className={`${item.color}`}>{item.icon}</div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 uppercase font-display">{item.title}</h3>
                                        <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.color}`}>{item.subtitle}</p>

                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                                            {item.desc}
                                        </p>

                                        {/* Checklist */}
                                        <ul className="space-y-2">
                                            {item.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                                    <CheckCircle2 size={16} className={`${item.color} shrink-0 mt-0.5`} />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Video for Echipare step */}
                                        {item.video && (
                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-[9/16] relative">
                                                    {item.video.includes('youtube') ? (
                                                        <iframe
                                                            src={`${item.video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.video.split('/').pop()}&playsinline=1&rel=0`}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            style={{ border: 0 }}
                                                        />
                                                    ) : (
                                                        <video
                                                            src={item.video}
                                                            className="w-full h-full object-cover"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            poster="/logo_white.webp"
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2 text-center italic">
                                                    Echiparea durează sub 2 minute
                                                </p>
                                            </div>
                                        )}

                                        {/* Article Link Button */}
                                        {item.articleLink && (
                                            <div className="mt-4 text-center">
                                                <a
                                                    href={item.articleLink}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline decoration-2 underline-offset-4 transition-all"
                                                >
                                                    <span>Citește: {item.articleTitle || "Află mai multe"}</span>
                                                    <ArrowRight size={14} />
                                                </a>
                                            </div>
                                        )}

                                        {/* INJECTED REVIEW - Bortis Madalina */}
                                        {item.title === "Antrenament Activ" && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in-up">
                                                <div className="bg-[var(--bg-tertiary)]/30 p-4 rounded-2xl border border-[var(--active-item)]/30 relative">
                                                    <div className="absolute -top-3 -right-2 text-[var(--accent-primary)] bg-white rounded-full p-1 shadow-sm border border-gray-100 z-20">
                                                        <Quote size={16} fill="currentColor" />
                                                    </div>

                                                    {/* Video Player */}
                                                    {/* YouTube Embed for Bortis Madalina */}
                                                    <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-white/20 relative group aspect-[9/16]">
                                                        <iframe
                                                            src="https://www.youtube.com/embed/XFP4uZVMa8w?autoplay=0&controls=1&loop=1&playlist=XFP4uZVMa8w&playsinline=1&rel=0"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            title="Review Madalina Bortis"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            style={{ border: 0 }}
                                                        />
                                                    </div>

                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs uppercase shrink-0 border border-orange-200">
                                                            BM
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-700 text-sm italic font-medium mb-2 leading-relaxed">
                                                                "Sincer, nici nu-ți dai seama cât e de intens decât la final. Începe relaxat, pare simplu, dar crește progresiv... și te duce exact acolo unde ai nevoie."
                                                            </p>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Bortiș Mădălina</span>
                                                                <span className="text-[10px] text-orange-500 font-bold flex items-center gap-1">
                                                                    Client Verified <CheckCircle2 size={10} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* INJECTED REVIEW - Anca (Massage) */}
                                        {item.title === "Relaxare & Masaj" && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in-up">
                                                <div className="bg-[var(--bg-tertiary)]/30 p-4 rounded-2xl border border-[var(--active-item)]/30 relative">
                                                    <div className="absolute -top-3 -right-2 text-[var(--accent-primary)] bg-white rounded-full p-1 shadow-sm border border-gray-100 z-20">
                                                        <Quote size={16} fill="currentColor" />
                                                    </div>

                                                    {/* YouTube Embed for Anca Masaj */}
                                                    <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-white/20 relative group aspect-[9/16]">
                                                        <iframe
                                                            src="https://www.youtube.com/embed/Nh-DcuWCCmU?autoplay=1&mute=1&controls=0&loop=1&playlist=Nh-DcuWCCmU&playsinline=1&rel=0"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            title="Masaj Anca NeoBoost"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            style={{ border: 0, pointerEvents: 'none' }}
                                                        />
                                                    </div>

                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xs uppercase shrink-0 border border-cyan-200">
                                                            AM
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-700 text-sm italic font-medium mb-2 leading-relaxed">
                                                                "Masajul de după antrenament este exact recompensa pe care simt că o merit după un antrenament intens și eficient."
                                                            </p>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Anca M.</span>
                                                                <span className="text-[10px] text-cyan-500 font-bold flex items-center gap-1">
                                                                    Client Verified <CheckCircle2 size={10} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* INJECTED REVIEW - Plan & Concluzii */}
                                        {item.title === "Plan & Concluzii" && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in-up">
                                                <div className="bg-[var(--bg-tertiary)]/30 p-4 rounded-2xl border border-[var(--active-item)]/30 relative">

                                                    {/* Image */}
                                                    <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-white/20 relative group">
                                                        <img
                                                            src="/trainers_plan.webp"
                                                            alt="Antrenori NeoBoost Planificare"
                                                            className="w-full h-auto object-cover max-h-[250px]"
                                                        />
                                                    </div>

                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase shrink-0 border border-blue-200">
                                                            TEAM
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-700 text-sm font-medium mb-2 leading-relaxed">
                                                                Antrenorii colaborează pentru a crea planuri personalizate adaptate obiectivelor tale specifice.
                                                            </p>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Planificare & Strategie</span>
                                                                <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1">
                                                                    Expertiză Colectivă <CheckCircle2 size={10} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA at the end */}
                <ScrollReveal delay={400} className="text-center mt-12">
                    <p className="text-xl font-bold text-gray-900 mb-6">Ești pregătit să începi Level 1?</p>
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 transition-all">
                        Programare Gratuită
                    </button>
                </ScrollReveal>
            </div>
        </section>
    );
};

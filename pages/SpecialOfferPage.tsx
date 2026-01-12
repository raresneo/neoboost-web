import React, { useState } from 'react';
import {
    CheckCheck, Flame, Zap, ShieldCheck, ArrowRight, Star, AlertCircle, ChevronRight, MessageCircle, CreditCard
} from 'lucide-react';
import { QUARTERLY_PACKAGES, TESTIMONIALS, BRAND } from '../constants';
import { StepForm } from '../components/Forms/StepForm';
import { FormConfig } from '../components/Forms/types';

// --- Configuration for the Health/Lead Form ---
const HEALTH_FORM_CONFIG: FormConfig = {
    programId: "special-offer-lead",
    title: "Verificare Eligibilitate",
    whatsappTemplate: "Salut! Doresc oferta 3+1 Luni Cadou.\n\nPachet: {package}\nNume: {name}\nTelefon: {phone}\nObiectiv: {objective}\nProbleme Cardiace: {cardiac}\nEpilepsie: {epilepsy}\nAlte probleme: {issues}",
    steps: [
        {
            id: "objective",
            question: "Care este obiectivul tău principal?",
            type: "radio",
            options: ["Slăbire Rapidă", "Tonifiere Musculară", "Scăpare de Dureri Spate", "Creștere Masă Musculară"],
            subtext: "Ne ajută să îți recomandăm frecvența corectă."
        },
        {
            id: "cardiac",
            question: "Suferi de afecțiuni cardiace grave sau ai stimulator cardiac?",
            type: "radio",
            options: ["NU", "DA"],
            subtext: "EMS este contraindicat persoanelor cu stimulator cardiac."
        },
        {
            id: "epilepsy",
            question: "Suferi de epilepsie?",
            type: "radio",
            options: ["NU", "DA"],
            subtext: "Epilepsia este o contraindicație absolută pentru antrenamentul EMS."
        },
        {
            id: "issues",
            question: "Alte probleme de sănătate de care ar trebui să știm?",
            type: "textarea",
            placeholder: "Ex: Hernie de disc, operații recente, diabet...",
            required: false
        },
        {
            id: "name",
            question: "Cum te numesti?",
            type: "text",
            placeholder: "Nume și Prenume"
        },
        {
            id: "phone",
            question: "La ce număr te putem contacta?",
            type: "text",
            placeholder: "07XX XXX XXX"
        }
    ]
};

export const SpecialOfferPage: React.FC = () => {
    const [selectedFreq, setSelectedFreq] = useState<1 | 2 | 3 | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPackageTitle, setSelectedPackageTitle] = useState("");

    const filteredPackages = selectedFreq
        ? QUARTERLY_PACKAGES.filter(pkg => {
            if (selectedFreq === 1) return pkg.title.toLowerCase().includes("health");
            if (selectedFreq === 2) return pkg.title.toLowerCase().includes("sculpt");
            if (selectedFreq === 3) return pkg.title.toLowerCase().includes("master");
            return true;
        })
        : QUARTERLY_PACKAGES;

    const handleOpenForm = (pkgTitle: string) => {
        setSelectedPackageTitle(pkgTitle);
        setIsFormOpen(true);
    };

    const handleWhatsApp = (pkgTitle: string) => {
        const text = encodeURIComponent(`Salut! Sunt interesat de oferta Specială 3+1 pentru pachetul ${pkgTitle}. Vreau mai multe detalii.`);
        window.open(`https://wa.me/40770557342?text=${text}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#3A86FF] selection:text-black pb-20">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/DSC09363.jpg')] bg-cover bg-center opacity-30 blur-sm pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-[#3A86FF]/10 border border-[#3A86FF]/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#3A86FF] animate-pulse"></span>
                        <span className="text-[#3A86FF] text-[10px] font-black tracking-[0.2em] uppercase">Oferta Limitată 3+1</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black impact-font text-white mb-6 leading-[0.9] uppercase tracking-tighter">
                        SCHIMBĂ-ȚI <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>CORPUL COMPLET.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 font-medium max-w-2xl mx-auto mb-12 leading-relaxed uppercase tracking-wide">
                        Plătești 3 Luni de antrenament și primești <span className="text-white font-black border-b-2 border-[#3A86FF]">A 4-A LUNĂ CADOU</span>. Cadoul nostru pentru disciplina ta.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-12 py-5 bg-[#3A86FF] text-black font-black impact-font uppercase text-2xl rounded-none hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(58,134,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                        >
                            VEZI PACHETELE
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FILTER SECTION --- */}
            <section id="packages" className="py-20 px-6 md:px-12 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black impact-font uppercase mb-10 tracking-tight">Câte ședințe poți aloca săptămânal?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setSelectedFreq(selectedFreq === num ? null : num as 1 | 2 | 3)}
                                    className={`px-10 py-5 rounded-none border-2 transition-all duration-500 font-black uppercase tracking-widest text-sm flex items-center gap-4 ${selectedFreq === num
                                        ? 'bg-[#3A86FF] border-[#3A86FF] text-black scale-105 shadow-[0_0_30px_rgba(58,134,255,0.4)]'
                                        : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    <Zap size={20} className={selectedFreq === num ? 'fill-black' : ''} />
                                    {num} {num === 1 ? 'Ședință' : 'Ședințe'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- PACKAGE GRID (DESIGN FROM SCREENSHOT) --- */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, i) => {
                            const [mainSessions, bonusSessions] = pkg.sessionCount.split('+').map(s => s.trim().replace(' BONUS', ''));
                            const totalMonths = 4;
                            const paidMonths = 3;

                            return (
                                <div key={i} className="group relative bg-[#080808] border border-white/5 p-1 transition-all duration-700 hover:border-[#3A86FF]/30 flex flex-col min-h-[700px] overflow-hidden">

                                    {/* Large Background Identifier */}
                                    <div className="absolute -top-10 -right-10 text-[200px] font-black impact-font text-white/[0.03] pointer-events-none select-none leading-none group-hover:text-[#3A86FF]/[0.05] transition-colors duration-700">
                                        {mainSessions}
                                    </div>

                                    {/* Subtitle / Header */}
                                    <div className="px-8 pt-10 pb-6 relative z-10">
                                        <div className="text-[#3A86FF] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[#3A86FF]"></div>
                                            {paidMonths + 1} LUNI ({paidMonths} PLĂTITE + 1 CADOU)
                                        </div>

                                        <div className="flex items-end gap-2 mb-10">
                                            <span className="text-8xl font-black impact-font text-white leading-none tracking-tighter">{mainSessions}</span>
                                            <div className="flex flex-col mb-1">
                                                <span className="text-3xl font-black text-[#3A86FF] leading-none">+{bonusSessions}</span>
                                                <span className="text-[10px] font-black text-[#3A86FF] uppercase tracking-widest">BONUS</span>
                                            </div>
                                        </div>

                                        <h3 className="text-5xl font-black impact-font text-white mb-6 uppercase tracking-tight group-hover:text-[#3A86FF] transition-colors">
                                            {pkg.title.split(' (')[0]}
                                        </h3>

                                        <div className="bg-[#3A86FF]/5 border border-[#3A86FF]/20 px-6 py-3 mb-10 w-full">
                                            <span className="text-[10px] font-black text-[#3A86FF] uppercase tracking-[0.3em] flex items-center gap-2">
                                                <Star size={12} className="fill-[#3A86FF]" />
                                                {pkg.title.includes("Health") ? "SĂNĂTATE ȘI POSTURĂ" :
                                                    pkg.title.includes("Sculpt") ? "DEFINIRE ȘI TONIȚIERE" : "MASTER MAX PERFORMANCE"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="px-8 flex-grow relative z-10">
                                        <ul className="space-y-4 mb-12">
                                            {pkg.features.map((feat, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-wide">
                                                    <CheckCheck className="text-[#3A86FF] shrink-0" size={16} />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Price & Buttons */}
                                    <div className="px-8 pb-10 mt-auto relative z-10">
                                        <div className="flex items-start justify-between mb-10">
                                            <div className="flex flex-col">
                                                <span className="text-7xl font-black impact-font text-white leading-none tracking-tighter">
                                                    {pkg.price.replace(' RON', '').replace(' / lună', '')}
                                                </span>
                                                <span className="text-2xl font-black text-white tracking-widest mt-1">RON</span>
                                            </div>
                                            <span className="text-sm font-black text-[#3A86FF] uppercase tracking-widest mt-3">LEI</span>
                                        </div>

                                        <div className="grid gap-4">
                                            <button
                                                onClick={() => handleOpenForm(pkg.title)}
                                                className="w-full py-5 bg-[#3A86FF] text-black font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-300"
                                            >
                                                CUMPĂRĂ ACUM <CreditCard size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleWhatsApp(pkg.title)}
                                                className="w-full py-5 border border-white/10 text-white font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all duration-300"
                                            >
                                                CONTACT WHATSAPP <MessageCircle size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Animated background flare */}
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#3A86FF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- REVIEWS SECTION (Mentioned in audio) --- */}
            <section className="py-32 px-6 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#3A86FF] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Părerea clienților</span>
                        <h2 className="text-5xl font-black impact-font uppercase text-white">Rezultate care vorbesc.</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.slice(0, 3).map((t, i) => (
                            <div key={i} className="bg-white/5 p-10 border border-white/5 hover:border-[#3A86FF]/20 transition-all">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-[#3A86FF] text-[#3A86FF]" />)}
                                </div>
                                <p className="text-white/60 italic text-sm leading-relaxed mb-8">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full grayscale" />
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-sm">{t.name}</h4>
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FORM MODAL --- */}
            {isFormOpen && (
                <StepForm
                    config={{
                        ...HEALTH_FORM_CONFIG,
                        whatsappTemplate: HEALTH_FORM_CONFIG.whatsappTemplate.replace('{package}', selectedPackageTitle)
                    }}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

        </div>
    );
};

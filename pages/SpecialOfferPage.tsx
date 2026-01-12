import React, { useState } from 'react';
import {
    CheckCheck, Flame, Zap, ShieldCheck, ArrowRight, Star, AlertCircle, ChevronRight
} from 'lucide-react';
import { QUARTERLY_PACKAGES, TESTIMONIALS, BRAND } from '../constants';
import { StepForm } from '../components/Forms/StepForm';
import { FormConfig } from '../components/Forms/types';

// --- Configuration for the Health/Lead Form ---
const HEALTH_FORM_CONFIG: FormConfig = {
    programId: "special-offer-lead",
    title: "Verificare Eligibilitate",
    whatsappTemplate: "Salut! Doresc oferta 3+1 Luni Cadou.\n\nNume: {name}\nTelefon: {phone}\nObiectiv: {objective}\nProbleme Cardiace: {cardiac}\nEpilepsie: {epilepsy}\nAlte probleme: {issues}",
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

    // Filter logic: 
    // 1 session/week -> "12 + 4 BONUS" -> Health Pro
    // 2 sessions/week -> "24 + 8 BONUS" -> Sculpt Pro
    // 3 sessions/week -> "36 + 12 BONUS" -> Master Body
    const filteredPackages = selectedFreq
        ? QUARTERLY_PACKAGES.filter(pkg => {
            if (selectedFreq === 1) return pkg.title.includes("Health");
            if (selectedFreq === 2) return pkg.title.includes("Sculpt");
            if (selectedFreq === 3) return pkg.title.includes("Master");
            return true;
        })
        : QUARTERLY_PACKAGES;

    const handleOpenForm = (pkgTitle: string) => {
        setSelectedPackageTitle(pkgTitle);
        setIsFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#3A86FF] selection:text-black">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/DSC09363.jpg')] bg-cover bg-center opacity-20 blur-sm pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-[#3A86FF]/10 border border-[#3A86FF]/30 px-4 py-1 rounded-full mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#3A86FF] animate-pulse"></span>
                        <span className="text-[#3A86FF] text-xs font-bold tracking-widest uppercase">Oferta Limitată</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black impact-font text-white mb-6 leading-none uppercase">
                        Plătești 3 Luni <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-cyan-400">Primești 4.</span>
                    </h1>

                    <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                        Cel mai bun moment să începi transformarea. Alege pachetul trimestrial și îți oferim <strong>o lună întreagă CADOU</strong> pentru a-ți consolida rezultatele.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-[#3A86FF] text-black font-black impact-font uppercase text-xl rounded hover:scale-105 transition-transform shadow-[0_0_30px_rgba(58,134,255,0.4)]"
                        >
                            VREAU OFERTA
                        </button>
                        <p className="text-white/40 text-sm italic">
                            *Oferta valabilă pentru pachetele Quarterly (3 luni)
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FILTER & PACKAGES SECTION --- */}
            <section id="packages" className="py-24 px-6 md:px-12 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">

                    {/* Filters */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black impact-font uppercase mb-8">Câte ședințe poți face săptămânal?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setSelectedFreq(selectedFreq === num ? null : num as 1 | 2 | 3)}
                                    className={`px-8 py-4 rounded-xl border border-white/10 text-sm md:text-lg font-bold uppercase transition-all duration-300 flex items-center gap-3 ${selectedFreq === num
                                        ? 'bg-[#3A86FF] text-black shadow-lg scale-105 border-[#3A86FF]'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Zap size={20} className={selectedFreq === num ? 'fill-black' : ''} />
                                    {num} {num === 1 ? 'Ședință' : 'Ședințe'} / Săpt.
                                </button>
                            ))}
                        </div>
                        {selectedFreq && (
                            <button
                                onClick={() => setSelectedFreq(null)}
                                className="mt-6 text-white/30 text-xs hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all"
                            >
                                Arată Toate Pachetele
                            </button>
                        )}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, i) => (
                            <div key={i} className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:border-[#3A86FF]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(58,134,255,0.1)] flex flex-col">
                                {/* 3+1 Sticker */}
                                <div className="absolute -top-4 right-8 bg-[#3A86FF] text-black font-black text-xs px-4 py-2 rounded-full uppercase tracking-widest shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                                    3 + 1 Lună CADOU
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-3xl font-black impact-font italic text-white mb-2 uppercase">{pkg.title}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-[#3A86FF]">{pkg.price}</span>
                                        <span className="text-white/30 text-sm line-through decoration-[#3A86FF]/50 decoration-2">
                                            {parseInt(pkg.price.replace(/\D/g, '')) * 1.33} RON
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-wider">
                                        Economisești ~33%
                                    </p>
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white/60 text-xs uppercase font-bold">Total Sesiuni</span>
                                            <span className="text-[#3A86FF] font-black text-xl">{pkg.sessionCount}</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#3A86FF] h-full w-full animate-pulse"></div>
                                        </div>
                                        <p className="text-white/30 text-[10px] mt-2 text-right">Include bonusul de 1 lună</p>
                                    </div>

                                    <ul className="space-y-3">
                                        {pkg.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                                                <CheckCheck className="text-[#3A86FF] shrink-0 mt-0.5" size={16} />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handleOpenForm(pkg.title)}
                                    className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded transition-all hover:bg-[#3A86FF] group-hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    VREAU PACHETUL <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* --- BENEFITS SUMMARY --- */}
            <section className="py-20 px-6 bg-black border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl font-black impact-font uppercase mb-16 text-white">De ce alegi NeoBoost?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3A86FF]">
                                <Flame size={32} />
                            </div>
                            <h4 className="font-bold uppercase mb-2">Afterburn Effect</h4>
                            <p className="text-white/50 text-sm">Arzi calorii 48h după antrenament, chiar și în repaus.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3A86FF]">
                                <ShieldCheck size={32} />
                            </div>
                            <h4 className="font-bold uppercase mb-2">Zero Impact</h4>
                            <p className="text-white/50 text-sm">Protejează articulațiile și coloana. Ideal pentru recuperare.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3A86FF]">
                                <Zap size={32} />
                            </div>
                            <h4 className="font-bold uppercase mb-2">Doar 30 Minute</h4>
                            <p className="text-white/50 text-sm">Echivalentul a 90 de minute de sală clasică.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3A86FF]">
                                <Star size={32} />
                            </div>
                            <h4 className="font-bold uppercase mb-2">Premium Service</h4>
                            <p className="text-white/50 text-sm">Costum drysuit, duș privat, totul inclus.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECONDARY CTA: TRIAL --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#3A86FF] opacity-5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-black impact-font uppercase mb-6 text-white">Nu ești sigur încă?</h2>
                    <p className="text-lg text-white/60 mb-10">
                        Înțelegem. Dacă nu ai mai încercat EMS până acum, te invităm la o sesiune de probă gratuită.
                        Vei simți pe pielea ta cum lucrează 20 de grupe musculare simultan.
                    </p>
                    <button
                        onClick={() => { setSelectedPackageTitle("SEDINTA TEST (GRATUIT)"); setIsFormOpen(true); }}
                        className="px-10 py-4 border border-white/20 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest rounded transition-all"
                    >
                        Programează o Testare
                    </button>
                </div>
            </section>

            {/* --- FORM MODAL --- */}
            {isFormOpen && (
                <StepForm
                    config={{
                        ...HEALTH_FORM_CONFIG,
                        whatsappTemplate: HEALTH_FORM_CONFIG.whatsappTemplate + `\nPachet Dorit: ${selectedPackageTitle}`
                    }}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

        </div>
    );
};

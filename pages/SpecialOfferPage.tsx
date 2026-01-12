import React, { useState } from 'react';
import {
    CheckCheck, Flame, Zap, ShieldCheck, ArrowRight, Star, AlertCircle, ChevronRight, MessageCircle, CreditCard, Activity, HeartPulse, History, Target
} from 'lucide-react';
import { QUARTERLY_PACKAGES, TESTIMONIALS, BRAND } from '../constants';
import { StepForm } from '../components/Forms/StepForm';
import { FormConfig } from '../components/Forms/types';

// --- Improved Form Configuration with Contraindications & Experience ---
const HEALTH_FORM_CONFIG: FormConfig = {
    programId: "special-offer-lead",
    title: "Verificare Eligibilitate & Stil de Viață",
    whatsappTemplate: "Salut! Doresc oferta 3+1 Luni Cadou.\n\nPachet: {package}\nNume: {name}\nTelefon: {phone}\nObiectiv: {objective}\nFrecvență Sport: {sport_freq}\nTip Sport: {sport_type}\nExperiență EMS: {ems_exp}\nContraindicații: {contra}\nAlte probleme: {issues}",
    steps: [
        {
            id: "objective",
            question: "Care este obiectivul tău principal de transformare?",
            type: "radio",
            options: ["Slăbire & Definire", "Tonifiere & Forță", "Scăpare de Dureri Spate", "Creștere Masă Musculară"],
            subtext: "Ne ajută să calibrăm frecvența impulsurilor EMS."
        },
        {
            id: "sport_freq",
            question: "Cât de des faci mișcare în prezent?",
            type: "radio",
            options: ["Sedentar (0 ședințe)", "Ocazional (1-2 ședințe)", "Regulat (3+ ședințe)"],
            subtext: "Nu contează nivelul curent, adaptăm antrenamentul pe loc."
        },
        {
            id: "sport_type",
            question: "Ce tip de activitate sportivă preferi sau ai practicat?",
            type: "text",
            placeholder: "Ex: Fitness, Yoga, Alergare sau Nimic...",
            required: false
        },
        {
            id: "ems_exp",
            question: "Ai mai încercat antrenamentul EMS înainte?",
            type: "radio",
            options: ["NU - Va fi prima dată", "DA - Am mai făcut câteva ședințe", "Sunt Client Existent"],
            subtext: "EMS este diferit de orice alt tip de sport."
        },
        {
            id: "contra",
            question: "Există vreo contraindicație medicală majoră?",
            type: "radio",
            options: ["NU - Sunt apt pentru efort", "DA - Am anumite afecțiuni"],
            subtext: "Stimulator cardiac, epilepsie, sarcină sau tumori sunt contraindicații absolute."
        },
        {
            id: "issues",
            question: "Alte afecțiuni de care ar trebui să știm? (Opțional)",
            type: "textarea",
            placeholder: "Ex: Hernie de disc, diabet, tensiune mare, operații recente...",
            required: false,
            subtext: "Antrenorul va adapta programul în funcție de aceste detalii."
        },
        {
            id: "name",
            question: "Cum te numești?",
            type: "text",
            placeholder: "Nume și Prenume"
        },
        {
            id: "phone",
            question: "La ce număr te putem contacta pentru programare?",
            type: "text",
            placeholder: "07XX XXX XXX"
        }
    ]
};

export const SpecialOfferPage: React.FC = () => {
    const [selectedFreq, setSelectedFreq] = useState<1 | 2 | 3 | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [actionType, setActionType] = useState<'whatsapp' | 'purchase'>('whatsapp');
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    const filteredPackages = selectedFreq
        ? QUARTERLY_PACKAGES.filter(pkg => {
            if (selectedFreq === 1) return pkg.title.toLowerCase().includes("health");
            if (selectedFreq === 2) return pkg.title.toLowerCase().includes("sculpt");
            if (selectedFreq === 3) return pkg.title.toLowerCase().includes("master");
            return true;
        })
        : QUARTERLY_PACKAGES;

    const handleOpenForm = (pkg: any, type: 'whatsapp' | 'purchase') => {
        setSelectedPackage(pkg);
        setActionType(type);
        setIsFormOpen(true);
    };

    const handleStripeCheckout = async (answers: Record<string, string>) => {
        if (!selectedPackage) return;

        try {
            // Mocking the user session as null for guest checkout (as in existing logic)
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: selectedPackage.stripePriceId,
                    userId: null,
                    productName: `${selectedPackage.title} (Oferta Specială 3+1)`,
                    amount: selectedPackage.price.replace(/\D/g, ''),
                    interval: 'month',
                    intervalCount: 4, // 3 paid + 1 free usually handled by total price but here we set duration
                    isSpecialOffer: true,
                    meta: {
                        ...answers,
                        packageTitle: selectedPackage.title
                    }
                })
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`Eroare Stripe: ${data.error || 'Încearcă din nou.'}`);
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('A apărut o eroare de conexiune. Verifică WhatsApp pentru ajutor.');
        }
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
                        DISCIPLINA <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>SE PREMIAZĂ.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 font-medium max-w-2xl mx-auto mb-12 leading-relaxed uppercase tracking-wide">
                        Investește în tine 3 luni și noi îți oferim <span className="text-white font-black border-b-2 border-[#3A86FF]">A 4-A LUNĂ CADOU</span>. Schimbă-ți stilul de viață definitiv.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-12 py-5 bg-[#3A86FF] text-black font-black impact-font uppercase text-2xl rounded-none hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(58,134,255,0.3)]"
                        >
                            VREAU OFERTA
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FILTER SECTION --- */}
            <section id="packages" className="py-20 px-6 md:px-12 relative bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black impact-font uppercase mb-10 tracking-tight">Selectează frecvența dorită</h2>
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
                                    {num} {num === 1 ? 'Ședință' : 'Ședințe'} / săpt.
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, i) => {
                            const [mainSessions, bonusSessions] = pkg.sessionCount.split('+').map(s => s.trim().replace(' BONUS', ''));
                            const paidMonths = 3;

                            return (
                                <div key={i} className="group relative bg-[#080808] border border-white/5 p-1 transition-all duration-700 hover:border-[#3A86FF]/30 flex flex-col min-h-[720px] overflow-hidden">
                                    <div className="absolute -top-10 -right-10 text-[200px] font-black impact-font text-white/[0.03] pointer-events-none select-none leading-none group-hover:text-[#3A86FF]/[0.05] transition-colors duration-700">
                                        {mainSessions}
                                    </div>

                                    <div className="px-8 pt-10 pb-6 relative z-10">
                                        <div className="text-[#3A86FF] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[#3A86FF]"></div>
                                            OFERTĂ TRIMESTRIALĂ 3+1
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
                                    </div>

                                    <div className="px-8 flex-grow relative z-10">
                                        <ul className="space-y-4 mb-12">
                                            {pkg.features.map((feat, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-xs font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-widest leading-relaxed">
                                                    <CheckCheck className="text-[#3A86FF] shrink-0" size={16} />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="px-8 pb-10 mt-auto relative z-10">
                                        <div className="flex items-end justify-between mb-10">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-white/30 uppercase tracking-[0.2em] mb-2 line-through">
                                                    {(parseInt(pkg.price.replace(/\D/g, '')) * 1.33).toFixed(0)} LEI
                                                </span>
                                                <span className="text-7xl font-black impact-font text-white leading-none tracking-tighter">
                                                    {pkg.price.replace(' RON', '').replace(' / lună', '')}
                                                </span>
                                            </div>
                                            <span className="text-xl font-bold text-[#3A86FF] mb-1 tracking-widest uppercase">RON</span>
                                        </div>

                                        <div className="grid gap-4">
                                            <button
                                                onClick={() => handleOpenForm(pkg, 'purchase')}
                                                className="w-full py-5 bg-[#3A86FF] text-black font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-300"
                                            >
                                                CUMPĂRĂ ACUM <CreditCard size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenForm(pkg, 'whatsapp')}
                                                className="w-full py-5 border border-white/10 text-white font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all duration-300"
                                            >
                                                CONSULTANȚĂ WHATSAPP <MessageCircle size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#3A86FF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- REVIEWS --- */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                        <div className="max-w-2xl">
                            <span className="text-[#3A86FF] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">RECENZII REALE</span>
                            <h2 className="text-5xl md:text-7xl font-black impact-font uppercase text-white leading-none">Ce spun membrii <span className="text-[#3A86FF]">NEOBOOST</span>.</h2>
                        </div>
                        <div className="flex gap-4">
                            <Star size={24} className="fill-[#3A86FF] text-[#3A86FF]" />
                            <Star size={24} className="fill-[#3A86FF] text-[#3A86FF]" />
                            <Star size={24} className="fill-[#3A86FF] text-[#3A86FF]" />
                            <Star size={24} className="fill-[#3A86FF] text-[#3A86FF]" />
                            <Star size={24} className="fill-[#3A86FF] text-[#3A86FF]" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.slice(0, 3).map((t, i) => (
                            <div key={i} className="bg-[#0a0a0a] p-10 border border-white/5 relative overflow-hidden group">
                                <div className="absolute -top-6 -right-6 text-9xl text-white/[0.03] impact-font opacity-0 group-hover:opacity-100 transition-opacity">"</div>
                                <p className="text-white/60 italic text-sm leading-relaxed mb-8 relative z-10">"{t.text}"</p>
                                <div className="flex items-center gap-4 relative z-10">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-sm tracking-widest">{t.name}</h4>
                                        <span className="text-[10px] text-[#3A86FF] uppercase tracking-widest font-black">{t.role}</span>
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
                        whatsappTemplate: HEALTH_FORM_CONFIG.whatsappTemplate.replace('{package}', selectedPackage?.title || '')
                    }}
                    onClose={() => setIsFormOpen(false)}
                    submitLabel={actionType === 'purchase' ? 'Finalizează & Plătește' : 'Trimite pe WhatsApp'}
                    submitIcon={actionType === 'purchase' ? <CreditCard size={24} /> : <MessageCircle size={24} />}
                    onComplete={actionType === 'purchase' ? handleStripeCheckout : undefined}
                />
            )}

        </div>
    );
};

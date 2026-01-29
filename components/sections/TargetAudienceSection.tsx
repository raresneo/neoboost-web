import React, { useState } from 'react';
import { Trophy, Shield, Baby, Flame, CheckCircle2, XCircle, AlertTriangle, HeartPulse, BrainCircuit, Users, Activity, Armchair } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';

// Refined Categories
const AUDIENCE_CATEGORIES = [
    {
        id: 'everyone',
        label: 'Pentru Toată Lumea',
        icon: <Users size={20} />,
        title: "Eficiență Pură.",
        desc: "Într-o lume în care timpul este cel mai prețios activ, NeoBoost îți oferă rezultatele a 4 ore de antrenament convențional în doar 30 de minute. O dată pe săptămână. Ideal pentru stilul de viață modern, fără a sacrifica rezultatele.",
        highlight: "Timp câștigat: 3.5 ore / săptămână",
        color: "text-[#3A86FF]",
        bgGradient: "from-blue-500/20 to-blue-600/5"
    },
    {
        id: 'beginners',
        label: 'Începători & Lifestyle',
        icon: <Armchair size={20} />,
        title: "Start Sigur.",
        desc: "Nu ai mai făcut sport de mult? Perfect. Tehnologia EMS elimină complet riscul de accidentare cu greutăți. Îți construim fundația musculară de la zero, protejând articulațiile și coloana, într-un mediu privat și controlat.",
        highlight: "Zero presiune articulară",
        color: "text-green-400",
        bgGradient: "from-green-500/20 to-emerald-600/5"
    },
    {
        id: 'advanced',
        label: 'Avansați & Sportivi',
        icon: <Trophy size={20} />,
        title: "Performanță Pură.",
        desc: "Depășește plafonarea. EMS recrutează fibrele musculare rapide (Type II) greu accesibile antrenamentului convențional. Crește explozivitatea, forța și anduranța fără a adăuga stres mecanic suplimentar pe corp.",
        highlight: "Activare fibră Type II",
        color: "text-amber-400",
        bgGradient: "from-amber-500/20 to-orange-600/5"
    },
    {
        id: 'postnatal',
        label: 'Post-Natal (Mămici)',
        icon: <Baby size={20} />,
        title: "Recuperare Blândă.",
        desc: "Recapătă controlul asupra corpului tău. Protocol specializat pentru refacerea peretelui abdominal (diastază) și tonifiere pelviană. Un moment de respiro pentru tine, cu eficiență maximă pentru recuperare.",
        highlight: "Diastază Safe",
        color: "text-pink-400",
        bgGradient: "from-pink-500/20 to-rose-600/5"
    },
    {
        id: 'seniors',
        label: 'Seniori 50+',
        icon: <Shield size={20} />,
        title: "Vitalitate & Mobilitate.",
        desc: "Menține masa musculară și densitatea osoasă esențială pentru longevitate. Prevenim sarcopenia într-un mediu complet sigur pentru inimă și articulații, sub supraveghere atentă.",
        highlight: "Anti-Aging Muscular",
        color: "text-purple-400",
        bgGradient: "from-purple-500/20 to-indigo-600/5"
    },
    {
        id: 'medical',
        label: 'Medical & Recuperare',
        icon: <HeartPulse size={20} />,
        title: "Soluție Clinică.",
        desc: "Recomandat pentru dureri de spate și recuperare post-traumatică. Activăm musculatura profundă paravertebrală care stabilizează coloana. Ideal pentru pregătire pre-operatorie sau recuperare post-operatorie rapidă.",
        highlight: "Stabilizare Coloană",
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/20 to-blue-600/5"
    }
];

export const TargetAudienceSection = () => {
    const [activeTab, setActiveTab] = useState(AUDIENCE_CATEGORIES[0].id);
    const activeContent = AUDIENCE_CATEGORIES.find(c => c.id === activeTab) || AUDIENCE_CATEGORIES[0];

    return (
        <section id="profil-client" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-subtle)]">
            <div className="container mx-auto px-6 lg:px-24 relative z-10">

                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase mb-4">
                            <Users size={14} />
                            <span>Versatilitate</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            O Tehnologie. <span className="text-[var(--accent-primary)]">Soluții Infinite.</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg font-light">
                            EMS nu este doar "fitness". Este o unealtă de optimizare umană adaptată nevoilor tale specifice.
                        </p>
                    </div>
                </ScrollReveal>

                {/* --- VERTICAL TABS LAYOUT --- */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-32">

                    {/* LEFT: TABS */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-2">
                        {AUDIENCE_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border ${activeTab === cat.id ? 'bg-[var(--bg-tertiary)] border-[var(--accent-primary)] shadow-lg' : 'bg-transparent border-transparent hover:bg-[var(--bg-tertiary)]'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === cat.id ? `${cat.color} bg-[var(--bg-primary)]` : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)] bg-[var(--bg-secondary)]'}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className={`font-bold text-sm uppercase tracking-wide ${activeTab === cat.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'}`}>{cat.label}</h3>
                                </div>
                                {activeTab === cat.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse"></div>}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT: CONTENT PANEL */}
                    <div className="w-full lg:w-2/3">
                        <div className={`h-full min-h-[400px] rounded-[2rem] p-8 md:p-12 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative overflow-hidden transition-all duration-500 flex flex-col justify-center`}>

                            {/* Animated Background Gradient based on selection */}
                            <div className={`absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l ${activeContent.bgGradient} opacity-20 pointer-events-none blur-3xl transition-colors duration-700`}></div>

                            <div className="relative z-10 animate-fade-in-up key={activeTab}">
                                <div className={`inline-block mb-6 px-4 py-1.5 rounded-full bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] ${activeContent.color} text-xs font-bold uppercase tracking-widest`}>
                                    {activeContent.highlight}
                                </div>

                                <h3 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 leading-tight">
                                    {activeContent.title}
                                </h3>

                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 max-w-xl">
                                    {activeContent.desc}
                                </p>

                                <div className="flex gap-4">
                                    <Button variant="energy" onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Programează Consultanța
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ELIGIBILITY: IS FOR YOU / NOT FOR YOU (Refined) --- */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 border-t border-[var(--border-subtle)] pt-20">
                    <ScrollReveal delay={100} className="h-full">
                        <div className="group h-full p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--success)]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(37,211,102,0.1)] flex flex-col relative overflow-hidden">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--success)]/5 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                <div className="p-4 bg-[var(--success)]/10 text-[var(--success)] rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle2 size={28} />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">Profilul Ideal</h3>
                            </div>

                            <ul className="space-y-8 text-[var(--text-secondary)] relative z-10">
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">01.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Vrei să <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">maximizezi</strong> timpul. Ești ocupat, dar nu vrei să neglijezi sănătatea.</span>
                                </li>
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">02.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Cauți <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">calitate clinică</strong>, nu aglomerație. Apreciezi intimitatea și atenția 1-la-1.</span>
                                </li>
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">03.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Ești dispus să urmezi un <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">proces</strong>. Rezultatele vin din consecvență, nu din magie.</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} className="h-full">
                        <div className="group h-full p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--error)]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.1)] flex flex-col relative overflow-hidden">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--error)]/5 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                <div className="p-4 bg-[var(--error)]/10 text-[var(--error)] rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <AlertTriangle size={28} />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">Limitări & Contraindicații</h3>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="bg-[var(--glass-bg)]/5 rounded-2xl p-6 border border-[var(--border-subtle)]">
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
                                        <Shield size={12} /> Medical Absolut
                                    </p>
                                    <ul className="space-y-3 text-base text-[var(--text-secondary)] font-medium">
                                        <li className="flex items-center gap-3"><div className="w-2 h-2 bg-[var(--error)] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> Sarcina</li>
                                        <li className="flex items-center gap-3"><div className="w-2 h-2 bg-[var(--error)] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> Pacemaker / Stimulator cardiac</li>
                                        <li className="flex items-center gap-3"><div className="w-2 h-2 bg-[var(--error)] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> Epilepsie activă</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] font-bold mb-3 pl-1">De evitat dacă...</p>
                                    <p className="text-base text-[var(--text-secondary)] italic pl-4 border-l-2 border-[var(--text-muted)]">
                                        "Cauți soluții miraculoase peste noapte fără implicare. Noi oferim tehnologie de vârf, dar efortul îți aparține."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

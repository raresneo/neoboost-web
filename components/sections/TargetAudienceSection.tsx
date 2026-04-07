import React, { useState } from 'react';
import { Trophy, Shield, Baby, Flame, CheckCircle2, AlertTriangle, HeartPulse, Users, Armchair, Quote, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';

// Refined Categories with Social Proof
const AUDIENCE_CATEGORIES = [
    {
        id: 'everyone',
        label: 'Persoane Ocupate',
        icon: <Users size={20} />,
        title: "Timpul e limitat?",
        desc: "Pentru persoanele ocupate care nu au timp de ore lungi de sală. Vii 30 de minute, îți faci antrenamentul eficient și te întorci la viața ta.",
        highlight: "Maximă Eficiență",
        color: "text-[#3A86FF]",
        bgGradient: "from-blue-500/20 to-blue-600/5",
        testimonial: {
            name: "Andrei P.",
            role: "Antreprenor",
            quote: "Singura metodă prin care reușesc să fac sport constant cu programul meu nebun."
        }
    },
    {
        id: 'weightloss',
        label: 'Slăbire & Remodelare',
        icon: <Flame size={20} />,
        title: "Slăbești controlat.",
        desc: "Pentru cei care vor să slăbească și să își remodeleze corpul într-un mod sigur și structurat, fără epuizare inutilă.",
        highlight: "Remodelare Corporală",
        color: "text-amber-400",
        bgGradient: "from-amber-500/20 to-orange-600/5",
        testimonial: {
            name: "Maria C.",
            role: "Client",
            quote: "Am slăbit și corpul a prins o formă pe care nu o mai aveam de ani buni."
        }
    },
    {
        id: 'postnatal',
        label: 'Mămici',
        icon: <Baby size={20} />,
        title: "Revenire în formă.",
        desc: "Pentru mame care vor să revină în formă după sarcină, în siguranță, fără promisiuni nerealiste. Totul treptat, cu grijă pentru corp.",
        highlight: "Recuperare Post-Sarcină",
        color: "text-pink-400",
        bgGradient: "from-pink-500/20 to-rose-600/5",
        testimonial: {
            name: "Ioana S.",
            role: "Mămică",
            quote: "M-a ajutat enorm să îmi recapăt tonusul fără să simt că cedez fizic."
        }
    },
    {
        id: 'beginners',
        label: 'Sedentari',
        icon: <Armchair size={20} />,
        title: "Reintră în ritm.",
        desc: "Pentru persoanele sedentare care vor să reintre treptat în ritm, sprijinite și ghidate pas cu pas de un antrenor.",
        highlight: "Start Sigur",
        color: "text-green-400",
        bgGradient: "from-green-500/20 to-emerald-600/5",
        testimonial: {
            name: "Elena M.",
            role: "Client",
            quote: "Am început de la zero și m-am simțit extrem de în siguranță cu antrenorul."
        }
    },
    {
        id: 'toning',
        label: 'Tonus & Energie',
        icon: <Trophy size={20} />,
        title: "Fermitate în viața de zi cu zi.",
        desc: "Pentru cei care vor mai multă fermitate, tonus și energie. Antrenamentul EMS îți trezește musculatura și te face să te simți invincibil(ă).",
        highlight: "Energie Extra",
        color: "text-purple-400",
        bgGradient: "from-purple-500/20 to-indigo-600/5",
        testimonial: {
            name: "Radu T.",
            role: "Manager",
            quote: "Nivelul meu de energie s-a dublat de când vin aici."
        }
    }
];

import { TextScramble } from '../ui/TextScramble';

export const TargetAudienceSection = () => {
    const [activeTab, setActiveTab] = useState(AUDIENCE_CATEGORIES[0].id);
    const activeContent = AUDIENCE_CATEGORIES.find(c => c.id === activeTab) || AUDIENCE_CATEGORIES[0];

    return (
        <section id="profil-client" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden border-t border-[var(--border-subtle)]">
            <div className="container mx-auto px-6 lg:px-24 relative z-10">

                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                            <Users size={14} />
                            <TextScramble text="Versatilitate & Eficiență" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
                            Pentru cine este NeoBoost EMS
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg font-light">
                            EMS nu este doar "fitness". Este o terapie și un sport, o unealtă de optimizare umană adaptată nevoilor tale, indiferent de punctul de plecare. ✨
                        </p>
                    </div>
                </ScrollReveal>

                {/* --- VERTICAL TABS LAYOUT --- */}
                <ScrollReveal>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-32">

                        {/* LEFT: TABS */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-2">
                            {AUDIENCE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border ${activeTab === cat.id ? 'bg-[var(--bg-primary)] border-blue-600 shadow-md' : 'bg-transparent border-transparent hover:bg-[var(--bg-tertiary)]'}`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === cat.id ? `${cat.color} bg-white` : 'text-gray-400 group-hover:text-gray-900 bg-gray-100'}`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-sm uppercase tracking-wide ${activeTab === cat.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>{cat.label}</h3>
                                    </div>
                                    {activeTab === cat.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT: CONTENT PANEL */}
                        <div className="w-full lg:w-2/3">
                            <div className={`h-full min-h-[450px] rounded-[2.5rem] p-8 md:p-12 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-xl shadow-gray-100`}>

                                {/* Animated Background Gradient based on selection */}
                                <div className={`absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l ${activeContent.bgGradient} opacity-20 pointer-events-none blur-3xl transition-colors duration-700`}></div>

                                <div className="relative z-10 animate-fade-in-up key={activeTab}">
                                    <div className={`inline-block mb-6 px-4 py-1.5 rounded-full bg-white border border-gray-100 ${activeContent.color} text-xs font-bold uppercase tracking-widest shadow-sm`}>
                                        {activeContent.highlight}
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 leading-tight">
                                        {activeContent.title}
                                    </h3>

                                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-xl">
                                        {activeContent.desc}
                                    </p>

                                    {/* SOCIAL PROOF / TESTIMONIAL MINI CARD */}
                                    <div className="mb-0 p-4 bg-[var(--bg-primary)]/50 rounded-xl border border-[var(--border-subtle)] backdrop-blur-sm max-w-lg shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)] border border-[var(--border-subtle)] shrink-0 uppercase">
                                                {activeContent.testimonial.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[var(--text-primary)] text-sm font-bold">{activeContent.testimonial.name}</span>
                                                    <span className="text-[var(--text-muted)] text-xs">• {activeContent.testimonial.role}</span>
                                                </div>
                                                <p className="text-[var(--text-secondary)] text-sm italic">"{activeContent.testimonial.quote}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex gap-4 mt-8 md:mt-0">
                                    <Button variant="energy" onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Programează Consultanța
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

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
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">Este Pentru Tine?</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Profilul Ideal NeoBoost</p>
                                </div>
                            </div>

                            <ul className="space-y-6 text-[var(--text-secondary)] relative z-10">
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">01.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Vrei să <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">maximizezi</strong> rezultatele. Cauți eficiență absolută, nu să pierzi timpul.</span>
                                </li>
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">02.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Pui preț pe <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">sănătate</strong> pe termen lung (articulații, coloană).</span>
                                </li>
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">03.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Ești o persoană care caută <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">atenție personală</strong> și ghidaj profesionist constant.</span>
                                </li>
                                <li className="flex gap-5">
                                    <span className="text-[var(--success)] font-display font-bold text-xl opacity-80">04.</span>
                                    <span className="text-lg leading-relaxed text-[var(--text-primary)]/90">Ești dispus să urmezi un <strong className="text-[var(--text-primary)] font-bold border-b-2 border-[var(--success)]/30">proces</strong>. Transformarea cere disciplină, noi oferim unealta.</span>
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
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight">Nu este pentru oricine</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Când EMS nu este recomandat</p>
                                </div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="p-4 bg-[var(--warning)]/10 rounded-xl border border-[var(--warning)]/30">
                                    <p className="text-[var(--text-secondary)] mb-4 font-medium text-sm text-yellow-600">
                                        <em>Acest text trebuie validat intern cu protocolul MYX / medicul înainte de a fi finalizat.</em><br /><br />
                                        Antrenamentul EMS NU este recomandat în anumite situații medicale. Înainte să te programezi, este important să discuți cu medicul tău dacă:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></div>
                                            <span className="text-[var(--text-secondary)] text-sm">ai stimulator cardiac (pacemaker) sau alte dispozitive electronice implantate;</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></div>
                                            <span className="text-[var(--text-secondary)] text-sm">ai avut recent intervenții chirurgicale majore;</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></div>
                                            <span className="text-[var(--text-secondary)] text-sm">ai afecțiuni cardiace grave sau tulburări severe de ritm;</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></div>
                                            <span className="text-[var(--text-secondary)] text-sm">ești însărcinată sau alăptezi în primele luni (de detaliat intern);</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></div>
                                            <span className="text-[var(--text-secondary)] text-sm">ai alte probleme medicale serioase pentru care medicul nu recomandă efort fizic.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
                                        <Shield size={12} /> Mindset & Atitudine
                                    </p>
                                    <div className="space-y-3 pl-2 border-l-2 border-[var(--border-subtle)]">
                                        <div className="flex items-start gap-3">
                                            <span className="text-[var(--error)] font-bold text-lg leading-none">✕</span>
                                            <span className="text-[var(--text-secondary)] text-sm leading-tight">Cauți o <strong>"pastilă magică"</strong>. Noi oferim tehnologie, nu miracole fără efort.</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[var(--error)] font-bold text-lg leading-none">✕</span>
                                            <span className="text-[var(--text-secondary)] text-sm leading-tight">Nu ești dispus(ă) să îți asumi <strong>responsabilitatea</strong> procesului.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

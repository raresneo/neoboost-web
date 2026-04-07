import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TypingHeading } from '../ui/TypingHeading';
import { ShoppingBag, ChevronRight, User, Users, CheckCircle2, FlaskConical, Leaf, Database, Target, ExternalLink } from 'lucide-react';

const GOALS = [
    {
        id: 'muscle-boost',
        label: 'Muscle Blend',
        productName: 'MUSCLE BLEND FORMULA',
        description: 'Baza: Proteine din orez. Suplimentare: Creatină, BCAA. Proiectat pentru creștere musculară și recuperare rapidă.',
        benefits: ['Proteină din Orez', 'Creatină Monohidrată', 'Aminoacizi BCAA', '121.00 RON'],
        link: 'https://myx.health/proteins',
        textColor: 'text-blue-600',
        bg: 'bg-blue-600',
        border: 'border-blue-200',
        image: '/neoboost_muscle_boost.webp'
    },
    {
        id: 'endurance',
        label: 'Endurance',
        productName: 'ENDURANCE FORMULA',
        description: 'Baza: Proteine din cânepă. Suplimentare: Ovăz, Maca, Curcuma, Măceșe. Ideal pentru rezistență și energie susținută.',
        benefits: ['Proteină din Cânepă', 'Ovăz & Maca', 'Curcuma Anti-inflamator', '68.00 RON'],
        link: 'https://myx.health/proteins',
        textColor: 'text-red-600',
        bg: 'bg-red-600',
        border: 'border-red-200',
        image: '/neoboost_endurance.webp'
    },
    {
        id: 'wellness',
        label: 'Wellness',
        productName: 'WELLNESS FORMULA',
        description: 'Baza: Proteine din dovleac. Suplimentare: Spanac, Ghimbir, Ashwagandha, Probiotice. Echilibru, digestie și vitalitate.',
        benefits: ['Proteină din Dovleac', 'Spanac & Ghimbir', 'Ashwagandha', '84.00 RON'],
        link: 'https://myx.health/proteins',
        textColor: 'text-emerald-600',
        bg: 'bg-emerald-600',
        border: 'border-emerald-200',
        image: '/neoboost_wellness.webp'
    }
];

export const SupplementsSection = () => {
    const [activeTab, setActiveTab] = useState<'client' | 'ambassador'>('client');
    const [activeGoalIndex, setActiveGoalIndex] = useState(0);

    const activeGoal = GOALS[activeGoalIndex];

    const content = {
        ambassador: {
            title: "Devino Partener",
            subtitle: "Ambassador Program",
            description: "Ești antrenor sau pasionat de fitness? Alătură-te rețelei MYX Health prin NeoBoost și oferă clienților tăi cele mai bune suplimente personalizate.",
            benefits: [
                { title: "Oportunitate de Business", text: "Câștigă recomandând produse premium." },
                { title: "Board de Specialiști", text: "Acces la expertiza echipei noastre medicale." },
                { title: "Comunitate Exclusivă", text: "Evenimente și training-uri dedicate." }
            ],
            cta: "Aplică pe WhatsApp",
            whatsappMessage: "Salut! Doresc să devin Ambasador NeoBoost. Vreau să aflu mai multe detalii despre program.",
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden z-20">
            {/* Background elements - Lighter for Holo AI */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 blur-[120px] z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-red-50/50 blur-[120px] z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24 relative z-30">

                {/* HEADLINE */}
                <div className="text-center mb-20">
                    <ScrollReveal>
                        <p className="mono text-[10px] tracking-[0.5em] text-blue-600 font-black uppercase mb-4">Nutriție pe bune</p>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 uppercase italic mb-6">
                            MIXUL TĂU PROTEIC. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">PERSONALIZAT PENTRU TINE.</span>
                        </h2>
                        <div className="flex bg-gray-100 p-1 rounded-full w-fit mx-auto border border-gray-200 relative z-40 mb-8">
                            <button
                                onClick={() => setActiveTab('client')}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'client' ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <User size={16} /> CONCEPT
                            </button>
                            <button
                                onClick={() => setActiveTab('ambassador')}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'ambassador' ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Users size={16} /> PARTENER
                            </button>
                        </div>
                    </ScrollReveal>
                </div>

                {activeTab === 'client' ? (
                    <div className="space-y-20">

                        {/* 1. CONCEPT INTRO */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <ScrollReveal direction="left">
                                <h3 className="text-3xl font-display font-bold text-gray-900 uppercase mb-6">
                                    Fiecare corp este diferit. <br />
                                    <span className="text-gray-400">De ce suplimentele tale ar fi la fel?</span>
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Renunță la produsele generice. Cu NeoBoost și MYX, creăm un mix proteic unic,
                                    calibrat exact pe nevoile, gusturile și obiectivele tale metabolice.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                        <Leaf className="text-green-600" size={18} />
                                        <span className="text-sm font-bold text-gray-700">Vegan sau Whey</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                        <FlaskConical className="text-blue-600" size={18} />
                                        <span className="text-sm font-bold text-gray-700">Fără Gust Artificial</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                        <CheckCircle2 className="text-purple-600" size={18} />
                                        <span className="text-sm font-bold text-gray-700">Clean Label</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="right">
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl group">
                                    <img src="/supplements_hands_holding.webp" alt="Personalized Label Detail" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6">
                                        <p className="text-white font-mono text-xs uppercase tracking-widest mb-1">Produs Unicat</p>
                                        <p className="text-xl font-bold text-white">Configurat pentru Tine</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>



                        {/* CTA & GOAL SELECTOR */}
                        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-inner">
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-bold text-gray-900 uppercase mb-4">Configurează-ți Mixul Acum</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {GOALS.map((goal, idx) => (
                                        <button
                                            key={goal.id}
                                            onClick={() => setActiveGoalIndex(idx)}
                                            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${activeGoalIndex === idx
                                                ? `${goal.bg} text-white border-transparent shadow-md`
                                                : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                                }`}
                                        >
                                            {goal.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-black italic text-gray-900 leading-none">
                                        {activeGoal.productName}
                                    </h2>
                                    <p className="text-gray-600 text-base leading-relaxed border-l-2 border-gray-200 pl-4">
                                        {activeGoal.description}
                                    </p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {activeGoal.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircle2 size={16} className={activeGoal.textColor} />
                                                <span className="text-sm font-medium text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Video Player - Myx Scan Box */}
                                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg aspect-[9/16]">
                                        <iframe
                                            src="https://www.youtube.com/embed/OdH_c1UzdmA?autoplay=1&mute=1&loop=1&playlist=OdH_c1UzdmA&controls=0&showinfo=0&rel=0"
                                            title="Myx Scan Box"
                                            className="w-full h-full object-cover"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                    <a
                                        href={`https://wa.me/40769124019?text=${encodeURIComponent(`Salut! Sunt interesat de ${activeGoal.productName} (${activeGoal.label}). Aș dori o ofertă personalizată adaptată nevoilor mele.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-black uppercase tracking-wider text-white shadow-xl transition-all hover:scale-[1.02] ${activeGoal.bg}`}
                                    >
                                        Vreau Ofertă Personalizată <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    // === AMBASSADOR VIEW ===
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto bg-white border border-red-100 rounded-3xl overflow-hidden relative p-8 md:p-16 shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[80px] -z-0"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-red-600 text-sm font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <Users size={16} /> {content.ambassador.subtitle}
                                    </h3>
                                    <h2 className="text-4xl md:text-5xl font-black italic text-gray-900 mb-6 leading-tight">
                                        {content.ambassador.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        {content.ambassador.description}
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        {content.ambassador.benefits.map((item, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="mt-1 bg-red-50 p-1.5 rounded-full h-fit flex-shrink-0 border border-red-100">
                                                    <CheckCircle2 size={16} className="text-red-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-gray-900 font-bold text-sm mb-1">{item.title}</h4>
                                                    <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href={`https://wa.me/40769124019?text=${encodeURIComponent(content.ambassador.whatsappMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-red-500/20 text-white bg-red-600 hover:bg-red-500"
                                    >
                                        {content.ambassador.cta} <ChevronRight size={18} />
                                    </a>
                                </div>
                                <div className="relative w-full aspect-[9/16] max-w-[300px] mx-auto rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-gray-900">
                                    <iframe
                                        src="https://www.youtube.com/embed/O4dhwYsZPdM?autoplay=1&mute=1&loop=1&playlist=O4dhwYsZPdM&controls=0&showinfo=0&rel=0"
                                        title="Myx Stop Effect"
                                        className="w-full h-full object-cover"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                )}

            </div>
        </section>
    );
};

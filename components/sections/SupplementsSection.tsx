import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { DualToneImage } from '../ui/DualToneImage';
import { ShoppingBag, ChevronRight, User, Users, CheckCircle2, FlaskConical, Target, ExternalLink } from 'lucide-react';

const GOALS = [
    {
        id: 'muscle-boost',
        label: 'Muscle Blend',
        productName: 'MUSCLE BLEND FORMULA',
        description: 'Baza: Proteine din orez. Suplimentare: Creatină, BCAA. Proiectat pentru creștere musculară și recuperare rapidă.',
        benefits: ['Proteină din Orez', 'Creatină Monohidrată', 'Aminoacizi BCAA', '121.00 RON'],
        link: 'https://myx.health/proteins',
        color: 'text-blue-500',
        bg: 'bg-blue-500',
        image: '/neoboost_muscle_boost.png'
    },
    {
        id: 'endurance',
        label: 'Endurance',
        productName: 'ENDURANCE FORMULA',
        description: 'Baza: Proteine din cânepă. Suplimentare: Ovăz, Maca, Curcuma, Măceșe. Ideal pentru rezistență și energie susținută.',
        benefits: ['Proteină din Cânepă', 'Ovăz & Maca', 'Curcuma Anti-inflamator', '68.00 RON'],
        link: 'https://myx.health/proteins',
        color: 'text-red-500',
        bg: 'bg-red-500',
        image: '/neoboost_endurance.png'
    },
    {
        id: 'wellness',
        label: 'Wellness',
        productName: 'WELLNESS FORMULA',
        description: 'Baza: Proteine din dovleac. Suplimentare: Spanac, Ghimbir, Ashwagandha, Probiotice. Echilibru, digestie și vitalitate.',
        benefits: ['Proteină din Dovleac', 'Spanac & Ghimbir', 'Ashwagandha', '84.00 RON'],
        link: 'https://myx.health/proteins',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500',
        image: '/neoboost_wellness.png'
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
        <section className="py-24 bg-black relative overflow-hidden z-20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-[120px] z-0"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-red-900/10 blur-[120px] z-0"></div>

            <div className="container mx-auto px-6 md:px-24 relative z-30">

                {/* HEADLINE */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <div className="flex bg-white/5 p-1 rounded-full w-fit mx-auto border border-white/10 relative z-40 mb-8">
                            <button
                                onClick={() => setActiveTab('client')}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'client' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <User size={16} /> CLIENT
                            </button>
                            <button
                                onClick={() => setActiveTab('ambassador')}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'ambassador' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Users size={16} /> PARTENER
                            </button>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Product Viz */}
                    <ScrollReveal direction="left" className="relative group">
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-8">

                            {/* Product Image */}
                            <div className="relative w-3/4 h-3/4 z-10 transition-transform duration-500 group-hover:scale-105">
                                <img
                                    src={activeTab === 'client' ? activeGoal.image : "/neoboost_supplements.png"}
                                    alt={activeTab === 'client' ? activeGoal.productName : "MYX Ambassador Kit"}
                                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                />
                            </div>

                            {/* Dynamic Glow based on Goal */}
                            <div className={`absolute inset-0 opacity-20 blur-3xl rounded-full scale-75 z-0 transition-colors duration-500 ${activeTab === 'client' ? activeGoal.bg.replace('bg-', 'bg-') : 'bg-red-600'}`}></div>

                            {/* Floating Badges */}
                            <div className="absolute top-6 left-6 z-20">
                                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                                    <FlaskConical size={14} className={activeTab === 'client' ? activeGoal.color : 'text-red-500'} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-white">
                                        {activeTab === 'client' ? 'Formulă Personalizată' : 'Business Kit'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Controls & Info */}
                    <ScrollReveal direction="right">

                        {activeTab === 'client' ? (
                            // === CLIENT VIEW ===
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-blue-500 text-sm font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <Target size={16} /> Alege Obiectivul Tău
                                    </h3>

                                    {/* GOAL SELECTOR */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {GOALS.map((goal, idx) => (
                                            <button
                                                key={goal.id}
                                                onClick={() => setActiveGoalIndex(idx)}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${activeGoalIndex === idx
                                                    ? `${goal.bg} text-white border-transparent shadow-[0_0_15px_rgba(58,134,255,0.3)]`
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                                                    }`}
                                            >
                                                {goal.label}
                                            </button>
                                        ))}
                                    </div>

                                    <h2 className={`text-4xl md:text-5xl font-black italic text-white mb-4 leading-none transition-all duration-300`}>
                                        {activeGoal.productName}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
                                        {activeGoal.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {activeGoal.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <CheckCircle2 size={18} className={activeGoal.color} />
                                            <span className="text-sm font-medium text-gray-200">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Target className="text-blue-500" size={18} />
                                        Personalizare Totală
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Putem personaliza proteina exact <strong>după gustul și nevoile tale</strong>.
                                        Nu ești sigur ce să alegi? Scrie-ne și configurăm mixul perfect pentru tine.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <a
                                        href={`https://wa.me/40769124019?text=${encodeURIComponent(`Salut! Sunt interesat de ${activeGoal.productName} (${activeGoal.label}). Aș dori o ofertă personalizată adaptată nevoilor mele.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-wider text-white shadow-xl transition-all hover:scale-[1.02] ${activeGoal.bg}`}
                                    >
                                        Comandă Personalizat (WhatsApp) <ExternalLink size={18} />
                                    </a>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center sm:text-left mt-4">
                                    * Vei discuta direct cu un specialist NeoBoost pentru configurarea produsului.
                                </p>
                            </div>
                        ) : (
                            // === AMBASSADOR VIEW ===
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-red-500 text-sm font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <Users size={16} /> {content.ambassador.subtitle}
                                    </h3>
                                    <h2 className="text-4xl md:text-5xl font-black italic text-white mb-6 leading-tight">
                                        {content.ambassador.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        {content.ambassador.description}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {content.ambassador.benefits.map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="mt-1 bg-white/5 p-1.5 rounded-full h-fit flex-shrink-0 border border-white/10">
                                                <CheckCircle2 size={16} className="text-red-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <a
                                        href={`https://wa.me/40769124019?text=${encodeURIComponent(content.ambassador.whatsappMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-red-900/20 text-white bg-red-600 hover:bg-red-500"
                                    >
                                        {content.ambassador.cta} <ChevronRight size={18} />
                                    </a>
                                </div>
                            </div>
                        )}


                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};

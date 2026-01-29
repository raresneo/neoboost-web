import React, { useState } from 'react';
import { Flame, Dumbbell, Zap, HeartPulse, ChevronRight, Calculator, Calendar } from 'lucide-react';
import { Button } from './Button';

interface ObjectiveOption {
    id: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    color: string;
    gradient: string;
}

const OBJECTIVES: ObjectiveOption[] = [
    {
        id: 'weight-loss',
        icon: <Flame size={24} />,
        title: 'SLĂBIRE RAPIDĂ',
        desc: 'Arde calorii accelerat',
        color: 'text-orange-500',
        gradient: 'from-orange-500 to-red-600'
    },
    {
        id: 'toning',
        icon: <Dumbbell size={24} />,
        title: 'TONIFIERE',
        desc: 'Definește musculatura',
        color: 'text-blue-500',
        gradient: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'energy',
        icon: <Zap size={24} />,
        title: 'ENERGIE',
        desc: 'Boost de vitalitate',
        color: 'text-yellow-400',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        id: 'recovery',
        icon: <HeartPulse size={24} />,
        title: 'RECUPERARE',
        desc: 'Elimină durerile',
        color: 'text-green-500',
        gradient: 'from-green-500 to-emerald-600'
    }
];

export const ObjectiveSelector = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelected(id);
        // Optional: Scroll to offer or show specific modal
        // For now we just highlight selection
    };

    return (
        <section className="py-24 relative z-30 -mt-10 mb-10">
            <div className="container mx-auto px-4">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl">

                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-50"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent-primary)]/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Care este obiectivul tău principal?</h2>
                    <p className="text-[var(--text-secondary)] mb-10">Alege o opțiune pentru a primi recomandarea personalizată.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {OBJECTIVES.map((obj) => (
                            <button
                                key={obj.id}
                                onClick={() => handleSelect(obj.id)}
                                className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left hover:-translate-y-1 ${selected === obj.id
                                    ? `bg-[var(--bg-tertiary)] border-transparent shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-2 ring-offset-2 ring-offset-[var(--bg-secondary)] ring-${obj.color.split('-')[1]}-500`
                                    : 'bg-[var(--bg-primary)]/50 border-[var(--border-subtle)] hover:border-[var(--border-visible)]'
                                    }`}
                            >
                                {/* Gradient Background on Hover/Active */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${obj.gradient} opacity-0 ${selected === obj.id ? 'opacity-10' : 'group-hover:opacity-5'} transition-opacity`}></div>

                                <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--bg-primary)] border border-white/5 ${selected === obj.id ? obj.color : 'text-gray-400 group-hover:text-white'} transition-colors`}>
                                    {obj.icon}
                                </div>
                                <h3 className={`font-display font-bold text-sm uppercase tracking-wider mb-1 ${selected === obj.id ? 'text-white' : 'text-gray-300'}`}>{obj.title}</h3>
                                <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">{obj.desc}</p>
                            </button>
                        ))}
                    </div>

                    {/* Result Action Area */}
                    <div className={`transition-all duration-500 ${selected ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale blur-[2px] pointer-events-none'}`}>
                        <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-[var(--bg-primary)] p-4 pr-6 rounded-2xl border border-[var(--border-visible)]">
                            <div className="flex items-center gap-3 px-4">
                                <Calculator className="text-[var(--accent-primary)]" />
                                <div className="text-left">
                                    <div className="text-xs text-[var(--text-muted)] uppercase font-bold">Recomandarea Noastră</div>
                                    <div className="text-sm text-white font-bold">Ședință Trial + Analiză Corporală</div>
                                </div>
                            </div>
                            <div className="h-px md:h-10 w-full md:w-px bg-white/10"></div>
                            <Button variant="energy" size="md" className="w-full md:w-auto" onClick={() => window.open(`https://wa.me/40769124019?text=Salut! Am ales obiectivul ${OBJECTIVES.find(o => o.id === selected)?.title} și vreau o programare.`, '_blank')}>
                                Programează Gratuit <ChevronRight size={16} className="ml-1" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

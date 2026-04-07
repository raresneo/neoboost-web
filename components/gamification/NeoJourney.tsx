import React, { useState } from 'react';
import { CheckCircle, Circle, MapPin, Award } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

interface JourneyStep {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
}

export const NeoJourney = () => {
    const { completedMissions, level } = useGamification();

    // Dynamic Journey Data based on Context
    const steps: JourneyStep[] = [
        {
            id: 1,
            title: 'Misiunea 1: Inițierea',
            description: 'Explorează site-ul și descoperă tehnologia.',
            status: completedMissions.includes('mission-1') ? 'completed' : 'current'
        },
        {
            id: 2,
            title: 'First Spark',
            description: 'Programează și finalizează primul antrenament.',
            status: completedMissions.includes('mission-1') ? (level >= 2 ? 'completed' : 'current') : 'locked'
        },
        {
            id: 3,
            title: 'Adaptare',
            description: 'Primele 4 sesiuni. Corpul se obișnuiește.',
            status: level >= 2 ? (level >= 3 ? 'completed' : 'current') : 'locked'
        },
        {
            id: 4,
            title: 'Constanță',
            description: 'Routine check: 10 sesiuni completate.',
            status: 'locked'
        },
        {
            id: 5,
            title: 'Metamorfoză',
            description: 'Rezultate vizibile. Tonifiere accentuată.',
            status: 'locked'
        },
        {
            id: 6,
            title: 'Neo Master',
            description: 'Nivel maxim. Legendă locală.',
            status: 'locked'
        },
    ];

    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <section className="py-8">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <MapPin className="text-red-500" /> Călătoria Ta
            </h3>

            <div className="relative pl-8 border-l-2 border-zinc-800 space-y-12">
                {steps.map((step, index) => {
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    const isLocked = step.status === 'locked';

                    return (
                        <div
                            key={step.id}
                            className={`relative transition-all duration-300 ${isLocked ? 'opacity-50' : 'opacity-100'}`}
                            onMouseEnter={() => setHoveredStep(step.id)}
                            onMouseLeave={() => setHoveredStep(null)}
                        >
                            {/* Connector Node */}
                            <div className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 transition-all duration-500 z-10 
                                ${isCompleted ? 'bg-green-500 border-green-900' : ''}
                                ${isCurrent ? 'bg-blue-500 border-blue-900 animate-pulse' : ''}
                                ${isLocked ? 'bg-zinc-900 border-zinc-700' : ''}
                            `}>
                                {isCompleted && <CheckCircle size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                            </div>

                            {/* Node Glow for Current */}
                            {isCurrent && (
                                <div className="absolute -left-[49px] top-[-7px] w-10 h-10 bg-blue-500/30 rounded-full blur-md animate-pulse"></div>
                            )}

                            {/* Content Card */}
                            <div className={`bg-[var(--bg-tertiary)] p-6 rounded-2xl border transition-all duration-300 
                                ${isCurrent ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-[var(--border-subtle)]'}
                                ${!isLocked && hoveredStep === step.id ? 'transform translate-x-2' : ''}
                            `}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className={`text-lg font-bold ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                                        {step.title}
                                    </h4>
                                    {isCompleted && <span className="text-xs text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded">COMPLETAT</span>}
                                    {isCurrent && <span className="text-xs text-blue-500 font-mono bg-blue-500/10 px-2 py-1 rounded">ÎN PROGRES</span>}
                                    {isLocked && <span className="text-xs text-zinc-500 font-mono"><Award size={14} /></span>}
                                </div>
                                <p className="text-[var(--text-secondary)] text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

import React, { useState } from 'react';
import { Zap, Target, UserCheck, TrendingUp, HeartPulse, Activity } from 'lucide-react';
import { AnimatedGraphic } from '../AnimatedGraphic';

// --- Objectives with Session Slider ---
export const ObjectivesWithSlider = () => {
    const [sessions, setSessions] = useState(2);

    // Beneficii bazate pe EMS_OBJECTIVES cu scalare în funcție de ședințe
    const objectives = [
        { title: "Slăbire & Metabolism", base: 40, max: 95, icon: <Zap size={16} /> },
        { title: "Tonifiere Musculară", base: 35, max: 90, icon: <Target size={16} /> },
        { title: "Sănătatea Coloanei", base: 30, max: 85, icon: <UserCheck size={16} /> },
        { title: "Performanță Atletică", base: 25, max: 80, icon: <TrendingUp size={16} /> },
        { title: "Reducere Dureri Spate", base: 35, max: 88, icon: <HeartPulse size={16} /> },
        { title: "Recuperare Medicală", base: 20, max: 75, icon: <Activity size={16} /> }
    ];

    const getScaledValue = (base: number, max: number) => {
        const multipliers = { 1: 0.35, 2: 0.7, 3: 1 };
        const multiplier = multipliers[sessions as keyof typeof multipliers];
        return Math.round(base + (max - base) * multiplier);
    };

    const sessionLabels = {
        1: { title: "MENȚINERE", color: "text-white/50" },
        2: { title: "OPTIMAL", color: "text-[#3A86FF]" },
        3: { title: "INTENSIV", color: "text-[#3A86FF]" }
    };

    const currentLabel = sessionLabels[sessions as keyof typeof sessionLabels];

    return (
        <div className="sticky top-40 glass p-8 md:p-12">
            <AnimatedGraphic type="muscle" className="h-48 w-full mb-8" />
            {/* Header */}
            <div className="mb-8">
                <h4 className="text-2xl font-display font-bold text-white mb-2">OBIECTIVE ȘI REZULTATE</h4>
                <p className="text-sm text-white/30 font-light italic">Ajustează intensitatea pentru a vedea impactul.</p>
            </div>

            {/* Session Slider */}
            <div className="mb-10 p-6 glass-dark">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="mono-font text-[8px] text-white/30 uppercase tracking-widest mb-1">Ședințe / Săptămână</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-display font-bold text-[#3A86FF]">{sessions}</span>
                            <span className="mono-font text-[10px] text-white/20">× 30 min</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-xl font-display font-bold ${currentLabel.color}`}>{currentLabel.title}</p>
                    </div>
                </div>

                {/* Slider Track */}
                <div className="relative py-4">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full">
                        <div
                            className="h-full bg-[#3A86FF] shadow-[0_0_15px_#3A86FF] rounded-full transition-all duration-500"
                            style={{ width: `${((sessions - 1) / 2) * 100}%` }}
                        />
                    </div>

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
                        {[1, 2, 3].map((step) => (
                            <button
                                key={step}
                                onClick={() => setSessions(step)}
                                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-[9px] font-black ${sessions >= step
                                    ? 'bg-[#3A86FF] border-[#3A86FF] text-black shadow-[0_0_15px_rgba(0,255,136,0.5)]'
                                    : 'bg-[var(--bg-primary)] border-white/20 text-white/30 hover:border-white/40'
                                    }`}
                            >
                                {step}
                            </button>
                        ))}
                    </div>

                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        value={sessions}
                        onChange={(e) => setSessions(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            {/* Dynamic Objectives */}
            <div className="space-y-6">
                {objectives.map((obj, idx) => {
                    const scaledValue = getScaledValue(obj.base, obj.max);
                    return (
                        <div key={idx} className="group/item transition-all duration-500 hover:translate-x-1">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="text-[#3A86FF] group-hover/item:scale-110 transition-transform duration-300">{obj.icon}</div>
                                    <span className="mono-font text-[9px] uppercase tracking-widest text-white/60 font-bold group-hover/item:text-[#3A86FF] transition-colors">{obj.title}</span>
                                </div>
                                <span className="mono-font text-[10px] text-[#3A86FF] font-black transition-all duration-500">
                                    {scaledValue}%
                                </span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3A86FF]/40 to-[#3A86FF] transition-all duration-700 ease-out"
                                    style={{ width: `${scaledValue}%`, boxShadow: '0 0 8px rgba(0,255,136,0.3)' }}
                                />
                                <div
                                    className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-fast"
                                    style={{ animationDelay: `${idx * 0.3}s` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Note */}
            <div className="mt-10 pt-6 border-t border-white/5">
                <div className="flex gap-3 items-center mb-4">
                    <Zap size={12} className="text-[#3A86FF]" />
                    <p className="text-[9px] mono-font text-white/30 uppercase tracking-widest font-bold">Protocol NeoBoost Oradea</p>
                </div>
                <p className="text-[10px] text-white/20 leading-relaxed italic">
                    *Rezultatele cu {sessions} {sessions === 1 ? 'ședință' : 'ședințe'}/săpt. Vizibile în 4-8 săptămâni.
                </p>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Clock, Battery, ArrowRight, Zap } from 'lucide-react';

export const TimeSavedCalculator = () => {
    // Inputs
    const [gymSessionsPerWeek, setGymSessionsPerWeek] = useState(3);
    const [hoursPerSession, setHoursPerSession] = useState(1.5); // Includes commute etc

    // NeoBoost Constants
    const neoBoostTimePerSession = 0.75; // 45 min total (30 min workout + 15 prep/shower)
    const neoBoostSessionsPerWeek = 2; // Optimal

    // Calculations
    const currentTotalHours = gymSessionsPerWeek * hoursPerSession;
    const neoBoostTotalHours = neoBoostSessionsPerWeek * neoBoostTimePerSession;
    const hoursSavedPerWeek = Math.max(0, currentTotalHours - neoBoostTotalHours);
    const hoursSavedPerYear = hoursSavedPerWeek * 52;
    const daysSavedPerYear = (hoursSavedPerYear / 24).toFixed(1);

    return (
        <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-subtle)] relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)]">
                        <Clock size={20} />
                    </div>
                    <h3 className="text-xl font-bold uppercase text-white">Calculator Timp</h3>
                </div>

                <div className="space-y-6 mb-8">
                    {/* Input 1: Sessions */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <label className="text-[var(--text-secondary)]">Câte antrenamente faci pe săptămână?</label>
                            <span className="font-bold text-white">{gymSessionsPerWeek}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="7"
                            step="1"
                            value={gymSessionsPerWeek}
                            onChange={(e) => setGymSessionsPerWeek(Number(e.target.value))}
                            className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full appearance-none cursor-pointer accent-[var(--accent-primary)]"
                        />
                    </div>

                    {/* Input 2: Duration */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <label className="text-[var(--text-secondary)]">Durata totală (drum + antrenament + duș)?</label>
                            <span className="font-bold text-white">{hoursPerSession} ore</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="0.5"
                            value={hoursPerSession}
                            onChange={(e) => setHoursPerSession(Number(e.target.value))}
                            className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full appearance-none cursor-pointer accent-[var(--accent-primary)]"
                        />
                    </div>
                </div>

                {/* Result Box */}
                <div className="bg-gradient-to-br from-[var(--bg-tertiary)] to-black rounded-2xl p-6 border border-[var(--border-subtle)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none"></div>

                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Timp Câștigat / An</div>
                            <div className="text-4xl font-display font-bold text-white">
                                {Number(daysSavedPerYear) > 0 ? daysSavedPerYear : 0} <span className="text-lg text-[var(--text-secondary)] font-sans">Zile</span>
                            </div>
                        </div>
                        <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        Cu NeoBoost, câștigi echivalentul a <strong className="text-white">{Math.round(hoursSavedPerWeek)} ore libere</strong> în fiecare săptămână pentru familie, hobby-uri sau relaxare.
                    </p>
                </div>
            </div>
        </div>
    );
};

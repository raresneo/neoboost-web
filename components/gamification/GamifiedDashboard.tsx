import React, { useEffect } from 'react';
import { LevelProgress } from './LevelProgress';
import { UserBadge } from './UserBadge';
import { useGamification } from '../../context/GamificationContext';
import { Trophy, Dumbbell, Flame, Calendar, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';

export const GamifiedDashboard = () => {
    const { xp, level, activeMission, completedMissions } = useGamification();

    // Derived Data
    const userName = 'Campioanule'; // Could be fetched from Auth if integrated
    const userInitial = userName.substring(0, 1).toUpperCase();

    const nextLevelXP = level * 1000;
    const rankTitle = level < 2 ? "Novice" : level < 5 ? "Apprentice" : "Elite";

    const animatedXP = useCountUp(xp);

    const badges = [
        { id: 1, title: 'Primul Pas', desc: 'Ai finalizat primul antrenament EMS.', icon: <Dumbbell size={18} />, locked: !completedMissions.includes('mission-1'), progress: completedMissions.includes('mission-1') ? 100 : 0 },
        { id: 2, title: 'On Fire', desc: 'Menține o serie de 3 antrenamente săptămânale.', icon: <Flame size={18} />, locked: true, progress: 30 },
        { id: 3, title: 'Early Bird', desc: 'Antrenează-te dimineața (08:00 - 10:00).', icon: <Calendar size={18} />, locked: true, progress: 0 },
        { id: 4, title: 'Champion', desc: 'Atinge nivelul 10.', icon: <Trophy size={18} />, locked: level < 10, progress: (level / 10) * 100 },
    ];

    return (
        <section className="py-12 md:py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-red-500 rounded-full blur-[3px] animate-bounce delay-700"></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-pulse delay-300"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                            <div className="w-full h-full rounded-full bg-zinc-900 border-2 border-transparent overflow-hidden flex items-center justify-center relative group cursor-pointer">
                                <span className="text-2xl font-bold text-white relative z-10">{userInitial}</span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white">Salut, {userName}!</h2>
                            <p className="text-[var(--text-muted)] flex items-center gap-2 justify-center md:justify-start">
                                Ești pe cale să devii o legendă.
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Progress & Stats */}
                    <ScrollReveal className="lg:col-span-2 space-y-8">
                        <div className="bg-[var(--bg-primary)] p-6 md:p-8 rounded-3xl border border-[var(--border-subtle)] shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                            <div className="relative z-10">
                                <LevelProgress
                                    level={level}
                                    currentXP={animatedXP}
                                    nextLevelXP={nextLevelXP}
                                    rankTitle={rankTitle}
                                />
                            </div>

                            {/* Decorative background blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700"></div>
                        </div>

                        {/* Recent Activity / Next Quest */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-[var(--bg-tertiary)] p-6 rounded-2xl border border-[var(--border-subtle)] hover:scale-[1.02] transition-transform">
                                <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                                    <Flame className="text-orange-500" /> Streak Actual
                                </h4>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-black text-white">1</span>
                                    <span className="text-[var(--text-muted)] mb-1">zi (Start bun!)</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
                                <div className="relative z-10">
                                    <h4 className="flex items-center gap-2 text-white font-bold mb-2">
                                        <Star className="text-yellow-400" /> Următoarea Misiune
                                    </h4>
                                    {activeMission ? (
                                        <>
                                            <p className="text-sm font-bold text-white mb-1">{activeMission.title}</p>
                                            <p className="text-xs text-blue-100 mb-3">{activeMission.description}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-blue-100 mb-3">Toate misiunile completate momentan!</p>
                                    )}
                                    <button className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-white/20">
                                        Vezi Detalii
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Column: Badges */}
                    <ScrollReveal delay={200} className="bg-[var(--bg-primary)] p-6 rounded-3xl border border-[var(--border-subtle)] h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Colecția Ta</h3>
                            <span className="text-xs text-[var(--text-muted)]">
                                {badges.filter(b => !b.locked).length} / {badges.length} Deblocate
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {badges.map(badge => (
                                <UserBadge
                                    key={badge.id}
                                    title={badge.title}
                                    description={badge.desc}
                                    icon={badge.icon}
                                    isLocked={badge.locked}
                                    progress={badge.progress}
                                />
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

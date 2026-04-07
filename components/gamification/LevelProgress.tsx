import React from 'react';
import { Zap } from 'lucide-react';

interface LevelProgressProps {
    level: number;
    currentXP: number;
    nextLevelXP: number;
    rankTitle: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
    level,
    currentXP,
    nextLevelXP,
    rankTitle
}) => {
    const progressPercentage = Math.min(100, (currentXP / nextLevelXP) * 100);

    return (
        <div className="w-full">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Nivelul {level}</span>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {rankTitle}
                    </h3>
                </div>
                <div className="text-right">
                    <span className="text-sm font-mono font-bold text-white">{currentXP}</span>
                    <span className="text-xs text-[var(--text-muted)]"> / {nextLevelXP} XP</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden shadow-inner border border-zinc-700">
                {/* Glowing Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>

                {/* Active Progress */}
                <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transition-all duration-1000 ease-out flex items-center justify-end pr-1"
                    style={{ width: `${progressPercentage}%` }}
                >
                    <div className="w-1.5 h-full bg-white/50 blur-[1px]"></div>
                </div>
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                <span className="flex items-center gap-1"><Zap size={10} className="text-blue-500" /> Novice</span>
                <span className="flex items-center gap-1">Expert <Zap size={10} className="text-red-500" /></span>
            </div>
        </div>
    );
};

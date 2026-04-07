import React from 'react';
import { Lock, Star } from 'lucide-react';

interface UserBadgeProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    isLocked?: boolean;
    progress?: number; // 0 to 100
}

export const UserBadge: React.FC<UserBadgeProps> = ({
    title,
    description,
    icon,
    isLocked = false,
    progress
}) => {
    return (
        <div className={`relative group p-[1px] rounded-2xl transition-all duration-300 ${isLocked ? 'opacity-50 grayscale' : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'}`}>
            {/* Holographic Border Gradient */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${isLocked ? 'from-zinc-700 to-zinc-800' : 'from-blue-400 via-purple-500 to-red-500'} opacity-100`}></div>

            {/* Inner Card Content */}
            <div className={`relative h-full bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center text-center border border-white/5 overflow-hidden`}>

                {/* Holographic Shine Effect (Unlocked Only) */}
                {!isLocked && (
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-20 pointer-events-none"></div>
                )}

                <div className={`mb-3 p-3 rounded-full flex items-center justify-center ${isLocked ? 'bg-zinc-800 text-zinc-500' : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 group-hover:text-white transition-colors'}`}>
                    {isLocked ? <Lock size={18} /> : (icon || <Star size={20} />)}
                </div>

                <h4 className={`font-bold text-sm mb-1 ${isLocked ? 'text-zinc-500' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all'}`}>{title}</h4>
                <p className="text-[10px] text-[var(--text-muted)] leading-tight">{description}</p>

                {/* Progress Bar (if applicable) */}
                {typeof progress === 'number' && !isLocked && progress < 100 && (
                    <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
                    </div>
                )}

                {!isLocked && (
                    <div className="absolute top-2 right-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] animate-pulse"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

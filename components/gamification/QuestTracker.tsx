import React, { useEffect, useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Trophy, CheckCircle, Zap, Crosshair } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const QuestTracker = () => {
    const { activeMission, xp, notifications } = useGamification();
    const [isOpen, setIsOpen] = useState(true);

    if (!activeMission) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* XP Notifications Area */}
            <div className="mb-4 space-y-2 w-full flex flex-col items-end">
                <AnimatePresence>
                    {notifications.map((note, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            className="bg-zinc-900/80 backdrop-blur-md border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center gap-2"
                        >
                            <Zap size={14} className="animate-pulse" />
                            {note}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Quest Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className={`pointer-events-auto bg-zinc-900/90 backdrop-blur-lg border border-blue-500/30 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'w-80' : 'w-16 h-16 rounded-full cursor-pointer hover:scale-110'}`}
                onClick={() => !isOpen && setIsOpen(true)}
            >
                {isOpen ? (
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Crosshair size={12} /> Active Mission
                                </h4>
                                <h3 className="text-white font-bold leading-tight mt-1">{activeMission.title}</h3>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                x
                            </button>
                        </div>

                        <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                            {activeMission.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                            <div
                                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${(activeMission.currentStep / activeMission.totalSteps) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400 font-mono">
                                Step {activeMission.currentStep}/{activeMission.totalSteps}
                            </span>
                            <span className="text-yellow-400 font-bold flex items-center gap-1">
                                <Trophy size={10} /> {activeMission.xpReward} XP Reward
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600/20 text-blue-400 relative">
                        <Crosshair size={24} />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

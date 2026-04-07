import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Preloader Component ---
export const Preloader = ({ onFinish }: { onFinish: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const criticalAssets = [
            '/logo_white.webp',
            '/DSC00193.webp',
            '/DSC00223.webp',
            '/DSC00205.webp',
            '/DSC04717.webp',
            '/ramada.webp',
            '/getfit.webp',
        ];

        let loadedCount = 0;
        const total = criticalAssets.length;
        const startTime = Date.now();

        // Helper to update progress fairly
        const updateProgress = () => {
            loadedCount++;
            const ratio = Math.min(loadedCount / total, 1);

            if (loadedCount === total) {
                // Done loading
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 800 - elapsed);
                setTimeout(() => setProgress(100), remaining);
            } else {
                // Map progress to 0-90%
                setProgress(ratio * 90);
            }
        };

        // Start loading
        criticalAssets.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Don't block on error
        });

        // Failsafe: Force finish after 2.5s
        const timeout = setTimeout(() => {
            setProgress(100);
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // Watch progress to trigger finish
    useEffect(() => {
        if (progress >= 100) {
            // Smooth small delay before unmounting
            const t = setTimeout(() => {
                onFinish();
            }, 500);
            return () => clearTimeout(t);
        }
    }, [progress, onFinish]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3A86FF] opacity-10 blur-[120px] rounded-full animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Pulsing Logo */}
                <div className="relative mb-8 p-4">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <img
                            src="/logo_white.webp"
                            alt="NeoBoost"
                            className="w-32 h-auto object-contain md:w-40"
                            style={{ width: '150px', maxWidth: '80vw', height: 'auto' }}
                        />
                    </motion.div>
                </div>

                {/* Minimal Text Status */}
                <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] text-[#3A86FF] tracking-[0.3em] uppercase animate-pulse">
                        Loading Experience
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

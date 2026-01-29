import React, { useState, useEffect } from 'react';

// --- Preloader Component ---
export const Preloader = ({ onFinish }: { onFinish: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Preload critical images during the loading screen
    useEffect(() => {
        const criticalImages = [
            '/logo_white.png',
            '/DSC00193.jpg',
            '/DSC00223.jpg',
            '/DSC00205.jpg',
            '/DSC04717.jpg',
            '/DSC01081.jpg',
            '/ramada.jpg',
            '/getfit.jpg',
            '/64f5f987-9c1e-43a8-8bdd-0d6d735fefa0.png'
        ];
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsFading(true);
                    setTimeout(onFinish, 150); // Ultra-fast fade
                    return 100;
                }
                return prev + Math.random() * 45; // Ultra fast progress
            });
        }, 40); // Super fast interval
        return () => clearInterval(interval);
    }, [onFinish]);

    if (!isFading && progress >= 100) return null;

    return (
        <div className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center transition-opacity duration-200 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="relative">
                <div className="absolute inset-0 bg-[#3A86FF] blur-[80px] opacity-30"></div>
                <img src="/logo_white.png" alt="NeoBoost Loading" className="w-20 h-20 md:w-28 md:h-28 object-contain animate-pulse" />
            </div>
            <div className="mt-6 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#3A86FF] transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="mt-3 mono-font text-white/60 text-[9px] tracking-[0.3em] uppercase">
                Se încarcă... {Math.min(100, Math.floor(progress))}%
            </div>
        </div>
    );
};

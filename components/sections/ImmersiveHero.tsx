import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, Star, CheckCircle2, ArrowDown, Activity, Battery, Timer } from 'lucide-react';
import { Button } from '../ui/Button';
import { BRAND } from '../../constants';
// import { DualToneImage } from '../ui/DualToneImage'; // Not used in this concept

export const ImmersiveHero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Custom CSS for floating animation
    const floatingAnimation = `
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        @keyframes float-fast {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
    `;

    return (
        <div className="relative min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--bg-primary)] mt-[72px]">
            <style>{floatingAnimation}</style>

            {/* Background Visual - Video with Overlay - INSTANT LOAD */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    // @ts-ignore
                    webkit-playsinline="true"
                    poster="/DSC00193.jpg"
                    className="w-full h-full object-cover brightness-[0.6]"
                >
                    <source src="/neo-costum2-fara-text.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="absolute inset-0 z-10 bg-black/50"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/10 rounded-full blur-[100px] pointer-events-none z-10 animate-pulse"></div>

            {/* Content */}
            <div className={`relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                {/* TECH TAGS - Top Row */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <Zap size={14} className="text-[#00FF88]" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Tehnologie EMS Wireless</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <Timer size={14} className="text-[#00D9FF]" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">30 Min Workout</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <Activity size={14} className="text-[#3A86FF]" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">90% Activare Musculară</span>
                    </div>
                </div>

                {/* 3D FLOATING ELEMENTS (Simulated with Social Proof Avatars) */}
                <div className="absolute w-full h-full pointer-events-none top-0 left-0 hidden lg:block">
                    {/* Floating Element 1 (Left) */}
                    <div className="absolute left-0 top-1/3 animate-float-medium">
                        <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-visible)] p-3 rounded-2xl shadow-2xl flex items-center gap-3 w-48">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">MT</div>
                            <div>
                                <div className="text-xs font-bold text-white">Maria T.</div>
                                <div className="text-[10px] text-[#00FF88] font-bold uppercase">-4kg în 30 de zile</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Element 2 (Right) */}
                    <div className="absolute right-0 top-1/4 animate-float-slow">
                        <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-visible)] p-3 rounded-2xl shadow-2xl flex items-center gap-3 w-48">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">AP</div>
                            <div>
                                <div className="text-xs font-bold text-white">Alex P.</div>
                                <div className="text-[10px] text-[#3A86FF] font-bold uppercase">Back Pain Relief</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Element 3 (Bottom Left) */}
                    <div className="absolute left-10 bottom-20 animate-float-fast">
                        <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-visible)] p-2 rounded-xl shadow-lg inline-flex items-center gap-2">
                            <Battery size={16} className="text-green-400" /> <span className="text-[10px] font-bold text-white">Boost de Energie</span>
                        </div>
                    </div>
                </div>


                {/* CENTRAL HERO CONTENT */}
                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold text-white mb-8 leading-[0.9] tracking-tighter uppercase relative z-20 drop-shadow-2xl">
                    Antrenamentul<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">Viitorului.</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] via-[#00D9FF] to-[#00FF88]">Azi.</span>
                </h1>

                <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Transformare corporală completă în Oradea. Fără ore pierdute la sală. Doar știință, tehnologie și rezultate.
                </p>

                {/* Energy Button */}
                <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button
                        variant="energy"
                        size="lg"
                        className="px-12 py-6 text-lg min-w-[280px]"
                        onClick={() => window.location.href = `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez ședința gratuită.`}
                    >
                        Rezervă Ședința Gratuită
                    </Button>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Locuri limitate săptămâna aceasta</p>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30 opacity-50 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('beneficii')?.scrollIntoView({ behavior: 'smooth' })}>
                <ArrowDown size={24} className="text-white" />
            </div>
        </div>
    );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Timer, ShoppingBag, Clock, Rocket, Target, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TypewriterText } from '../ui/TypewriterText';
import { ScrollRevealText } from '../ui/ScrollRevealText';
import { triggerConfetti } from '../ui/ConfettiTrigger';
import { BRAND } from '../../constants';
import { RevealText } from '../ui/RevealText';
// import { DualToneImage } from '../ui/DualToneImage'; // Not used in this concept

export const ImmersiveHero = ({ onOpenBooking }: { onOpenBooking?: () => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.2]);

    useEffect(() => {
        setIsLoaded(true);
        // Delay video load until page is interactive
        const timer = setTimeout(() => setVideoLoaded(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // ... (animations stay same) ...
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
        <div ref={heroRef} className="relative min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--bg-primary)] mt-[72px]">
            <style>{floatingAnimation}</style>

            {/* Background Video with Parallax - Lazy Loaded */}
            <motion.div
                style={{ y: yParallax, opacity: opacityParallax }}
                className="absolute -inset-y-[15%] inset-x-0 z-0 bg-black origin-center will-change-transform"
            >
                {videoLoaded && (
                    <iframe
                        src="https://www.youtube.com/embed/h6UWL9F-m8g?autoplay=1&mute=1&controls=0&loop=1&playlist=h6UWL9F-m8g&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
                        title="Hero Video"
                        className="absolute top-1/2 left-1/2 w-full aspect-[9/16] -translate-x-1/2 -translate-y-1/2 object-cover opacity-60 filter contrast-110 scale-[1.35] pointer-events-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{ border: 0 }}
                    />
                )}
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-[var(--bg-primary)]/40"></div>
            </motion.div>

            {/* Ambient Glow - Reduced blur for performance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100 to-red-100 rounded-full blur-[60px] pointer-events-none z-10 opacity-40"></div>

            {/* Content — always visible immediately */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">

                {/* TECH TAGS - Top Row */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <Timer size={14} className="text-[#00D9FF]" />
                        <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-widest uppercase">Efect Intens în 30 Min</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <Target size={14} className="text-[#00FF88]" />
                        <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-widest uppercase">Program Personalizat</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                        <UserCheck size={14} className="text-[#3A86FF]" />
                        <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-widest uppercase">Ghidaj 1-la-1 cu Antrenor</span>
                    </div>
                </div>


                {/* CENTRAL HERO CONTENT */}
                <div className="flex flex-col items-center max-w-5xl mx-auto">
                    <RevealText
                        text="ANTRENAMENTUL VIITORULUI."
                        as="h1"
                        mode="char"
                        stagger={0.03}
                        delay={0.5}
                        className="font-display font-black text-white text-5xl md:text-8xl lg:text-[7rem] leading-[0.85] tracking-tighter uppercase drop-shadow-sm justify-center italic mb-8"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
                        className="text-center"
                    >
                        <p className="text-xl md:text-2xl text-white/80 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                            Descoperă tehnologia <span className="text-white font-bold border-b-2 border-brand/50">Wireless EMS</span> în Oradea.
                            20 de minute pentru rezultate vizibile, fără efortul inutil al antrenamentelor clasice.
                        </p>
                    </motion.div>
                </div>

                <ScrollReveal delay={200}>
                    <div className="mb-12 max-w-4xl mx-auto relative group">
                        {/* Shadow box for better readability on video */}
                        <div className="absolute -inset-4 bg-white/5 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <ScrollRevealText
                            text="Timpul tău este prețios. De aceea, la NeoBoost îți oferim ședințe EMS 1-la-1, ghidate pas cu pas de antrenor. Obții rezultate vizibile, energie și un tonus de invidiat, fără să pierzi ore întregi la sală. Doar tu, antrenorul și 30 de minute de impact maxim."
                            highlights={[
                                { word: "prețios.", icon: <Star className="text-amber-500 w-6 h-6 inline ml-1" />, color: "#f59e0b" },
                                { word: "antrenor.", icon: <UserCheck className="text-blue-500 w-6 h-6 inline ml-1" />, color: "#3b82f6" },
                                { word: "vizibile,", icon: <TrendingDown className="text-emerald-500 w-6 h-6 inline ml-1" />, color: "#10b981" },
                                { word: "sală.", icon: <Clock className="text-rose-500 w-6 h-6 inline ml-1" />, color: "#f43f5e" },
                                { word: "maxim.", icon: <Zap className="text-orange-500 w-6 h-6 inline ml-1" />, color: "#f97316" }
                            ]}
                            className="text-xl md:text-3xl font-display font-bold text-white/90 leading-relaxed justify-center drop-shadow-sm"
                        />
                    </div>
                </ScrollReveal>

                {/* Energy Button */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Button
                        variant="energy"
                        size="lg"
                        className="px-8 py-5 text-base md:text-lg min-w-[280px]"
                        onClick={() => {
                            triggerConfetti();
                            if (onOpenBooking) onOpenBooking();
                            else window.open(`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez o ședință EMS de 30 de minute.`, '_blank');
                        }}
                    >
                        Programează o ședință de 30 minute
                    </Button>
                    <button
                        className="px-8 py-5 rounded-full bg-white text-gray-900 font-bold text-sm md:text-base min-w-[280px] shadow-lg border border-white/30 hover:bg-gray-50 transition-all"
                        onClick={() => {
                            window.open(`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Aș vrea o discuție de 10 minute să văd dacă antrenamentul EMS mi se potrivește.`, '_blank');
                        }}
                    >
                        Află dacă ți se potrivește
                    </button>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30 opacity-50 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('beneficii')?.scrollIntoView({ behavior: 'smooth' })}>
                <ArrowDown size={24} className="text-[var(--text-muted)]" />
            </div>
        </div>
    );
};

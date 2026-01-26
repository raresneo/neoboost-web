import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, Star, CheckCircle2, ArrowDown } from 'lucide-react';
import { HeroCarousel } from '../backgrounds/HeroCarousel';
import { MagneticButton } from '../ui/MagneticButton';
import { BioDecryption } from '../ui/BioDecryption';
import { BRAND } from '../../constants';

// --- Immersive Morph Hero ---
export const ImmersiveHero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-transparent py-20">

            {/* Background Visual - Carousel */}
            <HeroCarousel />
            <div className="absolute inset-0 z-10 bg-black/20 md:bg-black/10 backdrop-blur-[1px]"></div>
            {/* Content */}
            <div className={`relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} pt-32`}>

                {/* Brand Logo - Visual Only */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#3A86FF]/10 electric-glow pointer-events-none blur-3xl opacity-50"></div>
                    <div className="text-[16vw] md:text-[10vw] font-black impact-font leading-[0.85] tracking-tighter select-none text-white uppercase relative z-10 px-4 heading-glow glitch-hover">
                        NEOBOOST
                    </div>
                </div>

                {/* Headline & Subheadline - SEO Optimized */}
                <div className="mb-10">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
                        Antrenament EMS în Oradea pentru <br className="hidden md:block" />
                        <span className="text-[#3A86FF]">slăbire și tonifiere rapidă.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed readable-text">
                        Antrenamente de <span className="text-white font-medium">doar <BioDecryption text="30" /> de minute</span>, de 1–2 ori pe săptămână, cu <span className="text-white font-medium">antrenor dedicat</span> și costum EMS de ultimă generație – în studio-ul NeoBoost EMS din Oradea.
                    </p>
                </div>

                {/* 2 CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                    <MagneticButton
                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez prima ședință.`}
                        className="bg-[#3A86FF] text-black px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-black impact-font tracking-tight hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:shadow-[0_0_50px_rgba(0,245,255,0.7)] active:scale-95 inline-flex items-center gap-3"
                    >
                        <MessageCircle size={22} />
                        PROGRAMEAZĂ PRIMA ȘEDINȚĂ
                    </MagneticButton>

                    <a
                        href="#metoda"
                        className="border-2 border-white/30 text-white px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold impact-font tracking-tight hover:bg-white/10 hover:border-white/50 transition-all inline-flex items-center gap-3"
                    >
                        <Zap size={20} />
                        AFLĂ CUM FUNCȚIONEAZĂ EMS
                    </a>
                </div>

                {/* Social Proof Bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/60 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                        <span><strong className="text-white"><BioDecryption text="4.9" /></strong> pe Google</span>
                    </div>
                    <div className="w-px h-5 bg-white/20 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-[#3A86FF]" />
                        <span><strong className="text-white"><BioDecryption text="500+" /></strong> clienți activi</span>
                    </div>
                    <div className="w-px h-5 bg-white/20 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-[#3A86FF]" />
                        <span><strong className="text-white"><BioDecryption text="3000+" /></strong> ședințe EMS</span>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <ArrowDown size={20} className="text-[#3A86FF]" />
            </div>
        </div>
    );
};

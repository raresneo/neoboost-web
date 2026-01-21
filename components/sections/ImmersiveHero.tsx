import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, Star, CheckCircle2, ArrowDown } from 'lucide-react';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { MagneticButton } from '../ui/MagneticButton';
import { BioDecryption } from '../ui/BioDecryption';
import { BRAND } from '../../constants';

// --- Immersive Morph Hero ---
export const ImmersiveHero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const fallbackImage = "/DSC03919.jpg";

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black py-20">

            {/* Background Visual */}
            <div className="absolute inset-0 z-0">
                <CinematicBackground image={fallbackImage} opacity={0.5} />
            </div>
            {/* Content */}
            <div className={`relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} pt-32`}>

                {/* Brand Logo */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#3A86FF]/10 electric-glow pointer-events-none blur-3xl opacity-50"></div>
                    <h1 className="text-[16vw] md:text-[10vw] font-black impact-font leading-[0.85] tracking-tighter select-none text-white uppercase relative z-10 px-4 heading-glow glitch-hover">
                        NEOBOOST
                    </h1>
                </div>

                {/* Headline & Subheadline */}
                <div className="mb-10">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        Antrenament EMS Premium în Oradea
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed readable-text">
                        Slăbire, tonus muscular și postură mai bună în doar <span className="text-[#3A86FF] font-semibold">30 de minute pe săptămână</span>.
                    </p>
                </div>

                {/* 2 CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                    <MagneticButton
                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez o probă gratuită EMS.`}
                        className="bg-[#3A86FF] text-black px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-black impact-font tracking-tight hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:shadow-[0_0_50px_rgba(0,245,255,0.7)] active:scale-95 inline-flex items-center gap-3"
                    >
                        <MessageCircle size={22} />
                        PROBĂ GRATUITĂ
                    </MagneticButton>

                    <a
                        href="#abonamente"
                        className="border-2 border-white/30 text-white px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold impact-font tracking-tight hover:bg-white/10 hover:border-white/50 transition-all inline-flex items-center gap-3"
                    >
                        <Zap size={20} />
                        VEZI ABONAMENTE
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

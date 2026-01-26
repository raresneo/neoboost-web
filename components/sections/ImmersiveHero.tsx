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
                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto">
                        Slăbești și te tonifiezi în doar 30 de minute <br className="hidden md:block" />
                        <span className="text-[#3A86FF]">cu antrenamente EMS și Nutriție MYX.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed readable-text mb-8">
                        Programe gândite pentru oameni ocupați din Oradea care vor rezultate vizibile, fără ore pierdute la sală.
                    </p>

                    {/* Quick Benefits Bullets */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10 text-left md:text-center text-sm md:text-base text-white/70">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#3A86FF]" />
                            <span>Ai program încărcat și nu ai timp de sală.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#3A86FF]" />
                            <span>Vrei rezultate rapide fără cardio nesfârșit.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#3A86FF]" />
                            <span>Ghidaj 1-la-1, nu ești niciodată singur.</span>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center gap-6 mb-10">
                    <MagneticButton
                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez ședința gratuită.`}
                        className="bg-[#3A86FF] text-black px-10 py-5 text-xl font-black impact-font tracking-tight hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:shadow-[0_0_50px_rgba(0,245,255,0.7)] active:scale-95 inline-flex items-center gap-3 w-full md:w-auto justify-center"
                    >
                        <MessageCircle size={24} />
                        PROGRAMEAZĂ ȘEDINȚA TA GRATUITĂ
                    </MagneticButton>

                    <div className="text-white/40 text-sm font-medium">
                        Peste <strong>500+ clienți</strong> au testat deja EMS la NeoBoost Oradea.
                    </div>

                    <a
                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}`}
                        className="text-white/60 text-sm hover:text-white underline decoration-white/30 hover:decoration-white transition-all"
                    >
                        Preferi să ne scrii? Contactează-ne pe WhatsApp
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

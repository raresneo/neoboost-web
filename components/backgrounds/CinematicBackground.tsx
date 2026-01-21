import React from 'react';

// Reusable Cinematic Background Component
export const CinematicBackground: React.FC<{ image: string; opacity?: number }> = ({ image, opacity = 0.4 }) => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        {/* DESKTOP ONLY: Cinematic Image with B&W Filter */}
        <div
            className="hidden md:block absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear transform scale-100 hover:scale-110 will-change-transform grayscale contrast-[1.1] brightness-[0.85] sepia-[0.1]"
            style={{ backgroundImage: `url(${image})`, opacity: opacity }}
        ></div>

        {/* MOBILE: Clean Dark Background (No Image) */}
        <div className="md:hidden absolute inset-0 bg-[#050505]"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
        {/* Subtle grid only on desktop to keep mobile standard super clean */}
        <div className="hidden md:block absolute inset-0 bg-grid-white/[0.02]"></div>
    </div>
);

// --- Benefits Video Background Component (Optimized) ---
export const BenefitsVideoBackground = () => <CinematicBackground image="/DSC00193.jpg" opacity={0.5} />;
export const BiohackVideoBackground = () => <CinematicBackground image="/DSC00223.jpg" opacity={0.4} />;
export const TechnologyVideoBackground = () => <CinematicBackground image="/DSC00205.jpg" opacity={0.3} />;
export const ProgramsVideoBackground = () => <CinematicBackground image="/DSC04717.jpg" opacity={0.4} />;

// --- New Backgrounds ---
export const EvolutionVideoBackground = () => <CinematicBackground image="/DSC00193.jpg" opacity={0.3} />;
export const HistoryVideoBackground = () => <CinematicBackground image="/DSC04709.jpg" opacity={0.3} />;
export const TrialVideoBackground = () => <CinematicBackground image="/DSC07054.jpg" opacity={0.3} />;

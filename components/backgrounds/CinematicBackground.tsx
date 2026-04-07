import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Reusable Cinematic Background Component
export const CinematicBackground: React.FC<{ image: string; opacity?: number }> = ({ image, opacity = 0.4 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Moves image from -15% to 15% of its height as user scrolls past the section
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <div ref={ref} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            {/* DESKTOP ONLY: Cinematic Image with Parallax */}
            <motion.div
                className="hidden md:block absolute -inset-y-[20%] inset-x-0 bg-cover bg-center grayscale contrast-[1.1] brightness-[0.85] sepia-[0.1] will-change-transform"
                style={{ backgroundImage: `url(${image})`, opacity: opacity, y: yParallax }}
            ></motion.div>

            {/* MOBILE: Clean Dark Background (No Image) */}
            <div className="md:hidden absolute inset-0 bg-[#050505]"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
            {/* Subtle grid only on desktop to keep mobile standard super clean */}
            <div className="hidden md:block absolute inset-0 bg-grid-white/[0.02]"></div>
        </div>
    );
};

// --- Benefits Video Background Component (Optimized) ---
export const BenefitsVideoBackground = () => <CinematicBackground image="/DSC00193.webp" opacity={0.5} />;
export const BiohackVideoBackground = () => <CinematicBackground image="/DSC00223.webp" opacity={0.4} />;
export const TechnologyVideoBackground = () => <CinematicBackground image="/DSC00205.webp" opacity={0.3} />;
export const ProgramsVideoBackground = () => <CinematicBackground image="/DSC04717.webp" opacity={0.4} />;

// --- New Backgrounds ---
export const EvolutionVideoBackground = () => <CinematicBackground image="/DSC00193.webp" opacity={0.3} />;
export const HistoryVideoBackground = () => <CinematicBackground image="/DSC04709.webp" opacity={0.3} />;
export const TrialVideoBackground = () => <CinematicBackground image="/DSC07054.webp" opacity={0.3} />;

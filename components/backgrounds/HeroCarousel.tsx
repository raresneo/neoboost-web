import React, { useState, useEffect } from 'react';
import { DualToneImage } from '../ui/DualToneImage';

const HERO_IMAGES = [
    "/DSC03903.jpg", // Wide shot gym
    "/DSC04717.jpg", // Premium context
    "/DSC00438.jpg", // Active training
    "/Cems1.jpg",    // Tech focus
    "/DSC03919.jpg"  // Fallback/Original
];

export const HeroCarousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black select-none pointer-events-none">
            {HERO_IMAGES.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out will-change-opacity
                    ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <DualToneImage
                        src={img}
                        alt="NeoBoost Atmosphere"
                        className="w-full h-full object-cover scale-105"
                        intensity="strong" // Stronger effect for Hero to set the mood
                    />
                </div>
            ))}

            {/* Overlay Gradient for Text Readability - Minimalist */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-20"></div>

            {/* Subtle Grid - Minimalist approach (reduced opacity) */}
            <div className="absolute inset-0 bg-grid-white/[0.015] z-20"></div>
        </div>
    );
};

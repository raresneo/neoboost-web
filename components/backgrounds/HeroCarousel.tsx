import React, { useState, useEffect } from 'react';

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
        <div className="absolute inset-0 z-0 overflow-hidden bg-transparent select-none pointer-events-none">
            {HERO_IMAGES.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out will-change-opacity
                    ${index === currentImageIndex ? 'opacity-50 scale-105' : 'opacity-0 scale-100'}`}
                    style={{
                        backgroundImage: `url(${img})`,
                        transitionProperty: 'opacity, transform',
                        transitionDuration: '2000ms, 10000ms' // Long slow zoom effect
                    }}
                />
            ))}

            {/* Overlay Gradient for Text Readability - Minimalist */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90"></div>

            {/* Subtle Grid - Minimalist approach (reduced opacity) */}
            <div className="absolute inset-0 bg-grid-white/[0.015]"></div>
        </div>
    );
};

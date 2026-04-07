import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(0, 240, 255, 0.15)", // Default to Cyan glow for premium feel
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { spotlightColor?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || !overlayRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update Spotlight Position directly
        overlayRef.current.style.opacity = '1';
        overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;

        // Tilt Calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        divRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        props.onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (overlayRef.current) {
            overlayRef.current.style.opacity = '0';
        }
        if (divRef.current) {
            divRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
        props.onMouseLeave?.(e);
    };

    return (
        <div
            ref={divRef}
            {...props}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden transition-all duration-300 ease-out will-change-transform shadow-premium hover:shadow-premium-hover ring-1 ring-black/5 ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div
                ref={overlayRef}
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0 mix-blend-soft-light"
                style={{
                    background: `radial-gradient(600px circle at 0px 0px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {/* Subtle inner glass reflection */}
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-glass opacity-50 z-20"></div>
            <div className="relative z-10">{children}</div>
        </div>
    );
};

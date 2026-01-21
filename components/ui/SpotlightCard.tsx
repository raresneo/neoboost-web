import React, { useState, useRef } from 'react';

export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(0, 240, 255, 0.15)", // Default to Cyan glow for premium feel
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { spotlightColor?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
        props.onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpacity(0);
        props.onMouseLeave?.(e);
    };

    return (
        <div
            ref={divRef}
            {...props}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

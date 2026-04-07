import React, { useState, useEffect, useRef } from 'react';

export const BioDecryption = ({ text, className = "", revealSpeed = 50 }: { text: string; className?: string; revealSpeed?: number }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let iteration = 0;

        const startScramble = () => {
            clearInterval(interval);
            iteration = 0;

            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            // Keep spaces or special chars stable sometimes
                            if (char === " ") return " ";
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2; // Slower reveal for dramatic effect
            }, revealSpeed);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startScramble();
                // Optional: disconnect if we only want it to run once. 
                // Keeping it connected re-runs it on scroll which is cool.
            }
        }, { threshold: 0.5 });

        if (elementRef.current) observer.observe(elementRef.current);

        // Also trigger on hover
        if (isHovered) startScramble();

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, [text, revealSpeed, isHovered]);

    return (
        <span
            ref={elementRef}
            className={`inline-block mono-font ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    );
};

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    text: string | string[];
    speed?: number;
    delay?: number;
    cursor?: boolean;
    className?: string;
    loop?: boolean;
    pauseBetweenLoops?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 50,
    delay = 0,
    cursor = true,
    className = "",
    loop = false,
    pauseBetweenLoops = 2000
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    // Normalize text to array
    const textArray = Array.isArray(text) ? text : [text];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let currentIndex = 0;
        let timeoutId: NodeJS.Timeout;
        const currentString = textArray[currentTextIndex];

        // Initial delay before typing starts
        const startTyping = () => {
            setIsTyping(true);

            const typeChar = () => {
                if (currentIndex < currentString.length) {
                    setDisplayedText(currentString.substring(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(typeChar, speed + (Math.random() * 20 - 10)); // Humanize speed slightly
                } else {
                    setIsTyping(false);
                    if (loop) {
                        timeoutId = setTimeout(() => {
                            // Clear text and move to next string or restart
                            setDisplayedText('');
                            setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                        }, pauseBetweenLoops);
                    }
                }
            };

            typeChar();
        };

        timeoutId = setTimeout(startTyping, delay);

        return () => clearTimeout(timeoutId);
    }, [hasStarted, currentTextIndex, text, speed, delay, loop, pauseBetweenLoops]);

    return (
        <span ref={elementRef} className={className}>
            {displayedText}
            {cursor && (
                <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-baseline ${isTyping ? 'animate-pulse' : 'animate-blink'}`}></span>
            )}
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
            `}</style>
        </span>
    );
};

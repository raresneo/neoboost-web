import React, { useState, useEffect, useRef } from 'react';

export const StaggeredText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
            {text.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-[0.2em] whitespace-nowrap overflow-hidden align-bottom">
                    <span
                        className={`inline-block transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}
                        style={{ transitionDelay: `${delay + wIdx * 20}ms` }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
};

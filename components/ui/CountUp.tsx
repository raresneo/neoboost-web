import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
    start: number;
    end: number;
    duration?: number;
    decimalPlaces?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
    start,
    end,
    duration = 2000,
    decimalPlaces = 1,
    suffix = '',
    prefix = '',
    className = ''
}) => {
    const [count, setCount] = useState(start);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only trigger once
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutExpo)
            const ease = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

            const currentCount = start + (end - start) * ease(percentage);
            setCount(currentCount);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, start, end, duration]);

    return (
        <span ref={countRef} className={className}>
            {prefix}{count.toFixed(decimalPlaces)}{suffix}
        </span>
    );
};

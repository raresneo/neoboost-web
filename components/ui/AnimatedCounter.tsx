import React, { useState, useEffect, useRef } from 'react';
import { sharedObserver, observerCallbacks } from '../../lib/observer';

export const AnimatedCounter: React.FC<{ value: number; duration?: number; suffix?: string; delay?: number }> = ({ value, duration = 2000, suffix = "", delay = 0 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleIntersect = (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                sharedObserver.unobserve(element);
                observerCallbacks.delete(element);
            }
        };

        observerCallbacks.set(element, handleIntersect);
        sharedObserver.observe(element);

        return () => {
            observerCallbacks.delete(element);
            sharedObserver.unobserve(element);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const startTime = performance.now() + delay;

        const animate = (currentTime: number) => {
            if (currentTime < startTime) {
                requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4); // Quartic ease out
            const currentCount = easedProgress * value;

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, value, duration, delay]);

    const decimals = value % 1 !== 0 ? 1 : 0;
    return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

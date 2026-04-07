import React, { useState, useEffect, useRef } from 'react';
import { sharedObserver, observerCallbacks } from '../../lib/observer';

export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Callback that handles the intersection logic
        const handleIntersect = (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Once visible, we don't need to observe it anymore for this simple reveal effect
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

    return (
        <div ref={ref} className={`scroll-reveal will-change-scroll ${isVisible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

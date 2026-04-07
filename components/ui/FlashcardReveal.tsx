import React, { useState, useEffect, useRef } from 'react';
import { sharedObserver, observerCallbacks } from '../../lib/observer';

interface FlashcardRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'left' | 'right' | 'bottom' | 'top';
}

export const FlashcardReveal: React.FC<FlashcardRevealProps> = ({
    children,
    className = "",
    delay = 0,
    direction = 'bottom'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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

    const getTransform = () => {
        if (isVisible) return 'translate3d(0, 0, 0)';
        switch (direction) {
            case 'left': return 'translate3d(-50px, 0, 0)';
            case 'right': return 'translate3d(50px, 0, 0)';
            case 'top': return 'translate3d(0, -50px, 0)';
            case 'bottom': default: return 'translate3d(0, 50px, 0)';
        }
    };

    const style: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform'
    };

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
};

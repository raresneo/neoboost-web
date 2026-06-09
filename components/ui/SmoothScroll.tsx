import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Respect reduced motion, and allow ?nosmooth for debugging/native scroll.
        if (typeof window !== 'undefined') {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const noSmooth = new URLSearchParams(window.location.search).has('nosmooth');
            if (reduce || noSmooth) return;
        }

        const lenis = new Lenis({
            duration: 0.55,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 2,
            syncTouch: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

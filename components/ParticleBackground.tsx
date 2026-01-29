import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollRef = useRef({ y: 0, speed: 0, lastY: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - scrollRef.current.lastY;
            // Smoothly update speed (simple damping could be added if needed, but direct mapping feels responsive)
            scrollRef.current.speed = delta;
            scrollRef.current.lastY = currentY;
            scrollRef.current.y = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Reset speed when scroll stops
        const interval = setInterval(() => {
            if (window.scrollY === scrollRef.current.lastY) {
                scrollRef.current.speed *= 0.9; // Decay speed
                if (Math.abs(scrollRef.current.speed) < 0.1) scrollRef.current.speed = 0;
            }
        }, 50);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = -1000;
        let mouseY = -1000;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setSize();
        window.addEventListener('resize', setSize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Flake config
        const particleCount = Math.min(40, Math.floor(width / 15)); // Reduced count for performance
        const particles: { x: number; y: number; dx: number; dy: number; size: number; alpha: number; wobble: number; wobbleSpeed: number }[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                dx: (Math.random() - 0.5) * 0.3,
                dy: Math.random() * 0.5 + 0.2, // Slower base fall speed for floaty feel
                size: Math.random() * 2.5 + 0.5, // Varied sizes, slightly smaller avg
                alpha: Math.random() * 0.4 + 0.1, // More subtle
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.005
            });
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Influence of scroll
            const scrollForce = scrollRef.current.speed * 0.2; // Reduced scroll influence

            particles.forEach((p) => {
                p.x += p.dx + Math.sin(p.wobble) * 0.3;

                // Adjust for scroll speed
                p.y += p.dy - scrollForce;

                p.wobble += p.wobbleSpeed;

                // Mouse interaction repulsion - Simplify calculations?
                // Kept simple enough.

                // Wrap around
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y > height + 10) p.y = -10;
                if (p.y < -10) p.y = height + 10;

                // Draw Flake (Soft circle)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                // Removed shadowBlur for performance
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
};

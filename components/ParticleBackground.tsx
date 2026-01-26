import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = -100;
        let mouseY = -100;

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

        // Particles config
        const particleCount = Math.min(80, Math.floor(width / 10)); // Slightly more dense
        const particles: { x: number; y: number; dx: number; dy: number; size: number; alpha: number; originalX?: number; originalY?: number }[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                dx: (Math.random() - 0.5) * 0.3, // Slow drift
                dy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5, // Smaller, sharper dots
                alpha: Math.random() * 0.4 + 0.1
            });
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update particles
            particles.forEach((p) => {
                p.x += p.dx;
                p.y += p.dy;

                // Mouse interaction (repel)
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 2;
                    p.y -= Math.sin(angle) * force * 2;
                }

                // Wrap around
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Draw particle (Gray Flake)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 200, ${p.alpha})`; // Gray/White flakes
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

    return <canvas ref={canvasRef} className="fixed inset-0 z-[0] pointer-events-none opacity-40 mix-blend-screen" />;
};

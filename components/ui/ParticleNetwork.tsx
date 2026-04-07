import React, { useEffect, useRef } from 'react';

export const ParticleNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDisabled, setIsDisabled] = React.useState(false);

    useEffect(() => {
        // Initial check
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsDisabled(true);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const properties = {
            bgColor: 'rgba(10, 10, 10, 1)',
            particleColor: 'rgba(58, 134, 255, 0.5)',
            particleRadius: 3,
            particleCount: 60,
            lineLength: 150,
            particleSpeed: 0.5,
        };

        class Particle {
            x: number;
            y: number;
            velocityX: number;
            velocityY: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
                this.velocityY = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
            }

            position() {
                this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
                this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
                this.x += this.velocityX;
                this.y += this.velocityY;
            }

            reDraw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }
        }

        const reDrawBackground = () => {
            ctx.fillStyle = properties.bgColor;
            ctx.clearRect(0, 0, w, h);
        };

        const drawLines = () => {
            let x1, y1, x2, y2, length, opacity;
            for (const i in particles) {
                for (const j in particles) {
                    x1 = particles[i].x;
                    y1 = particles[i].y;
                    x2 = particles[j].x;
                    y2 = particles[j].y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                    if (length < properties.lineLength) {
                        opacity = 1 - length / properties.lineLength;
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(58, 134, 255, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        };

        const reDrawParticles = () => {
            for (const i in particles) {
                particles[i].position();
                particles[i].reDraw();
            }
        };

        const loop = () => {
            reDrawBackground();
            reDrawParticles();
            drawLines();
            requestAnimationFrame(loop);
        };

        const init = () => {
            for (let i = 0; i < properties.particleCount; i++) {
                particles.push(new Particle());
            }
            loop();
        };

        init();

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    if (isDisabled) return null;

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />;
};

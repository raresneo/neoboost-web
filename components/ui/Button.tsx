import React, { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill' | 'energy' | 'vibrant' | 'holo';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] text-white hover:brightness-105 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.4)] rounded-full font-bold tracking-[0.05em] uppercase text-xs transition-all duration-500",
            secondary: "bg-white/50 backdrop-blur-md text-[var(--text-primary)] hover:bg-white shadow-premium border border-white/20 rounded-full font-bold tracking-wide transition-all duration-500",
            outline: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black rounded-full font-bold tracking-wide transition-all duration-500",
            ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)] rounded-full font-medium transition-colors duration-300",
            pill: "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-full hover:brightness-110 shadow-premium hover:shadow-[0_10px_20px_rgba(59,130,246,0.2)] font-bold transition-all duration-300",
            energy: "bg-[#FF5C00] text-white hover:bg-[#FF7A00] shadow-[0_10px_30px_rgba(255,92,0,0.2)] hover:shadow-[0_20px_40px_rgba(255,92,0,0.3)] rounded-full font-black uppercase tracking-widest transition-all duration-500",
            vibrant: "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 text-white font-bold hover:brightness-110 shadow-premium rounded-full border border-white/20 transition-all duration-300",
            holo: "bg-white/5 backdrop-blur-xl shadow-glass border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 rounded-full transition-all duration-500",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
            icon: "p-3",
        };

        const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

        const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
            const button = event.currentTarget;
            const rect = button.getBoundingClientRect();
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;
            const x = event.clientX - rect.left - radius;
            const y = event.clientY - rect.top - radius;

            const newRipple = { x, y, id: Date.now() };
            setRipples((prev) => [...prev, newRipple]);
        };

        // --- Magnetic Effect ---
        const refElement = useRef<HTMLButtonElement>(null);
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
        const magneticX = useSpring(x, springConfig);
        const magneticY = useSpring(y, springConfig);

        const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            const element = refElement.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
            if (!element) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;

            // Only pull if close enough (optional range check, but usually works on hover)
            x.set(distanceX * 0.2); // Pull strength
            y.set(distanceY * 0.2);
        };

        const handleMagneticLeave = () => {
            x.set(0);
            y.set(0);
        };
        // -----------------------

        return (
            <motion.button
                ref={refElement}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} relative overflow-hidden`}
                disabled={disabled || isLoading}
                style={{ x: magneticX, y: magneticY }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onMouseMove={(e) => {
                    handleMagneticMove(e);
                    // Add existing ripple logic if needed or separate
                }}
                onMouseLeave={(e) => {
                    handleMagneticLeave();
                    // Add existing props.onMouseLeave logic
                }}
                onClick={(e) => {
                    addRipple(e as any);
                    props.onClick?.(e as any);
                }}
                {...(props as any)}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin relative z-10" />}
                {!isLoading && leftIcon && <motion.span layout className="mr-2 relative z-10">{leftIcon}</motion.span>}
                <span className="relative z-10">{children}</span>
                {!isLoading && rightIcon && <motion.span layout className="ml-2 relative z-10">{rightIcon}</motion.span>}

                {/* Ripple Container */}
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        onAnimationEnd={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: 200,
                            height: 200,
                        }}
                        className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    />
                ))}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill' | 'energy';
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
            primary: "bg-[var(--accent-primary)] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] active:translate-y-0 rounded-lg",
            secondary: "bg-transparent border border-[var(--border-visible)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] rounded-lg",
            ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg",
            pill: "bg-gradient-to-r from-[#3A86FF] to-[#8B5CF6] text-white rounded-full hover:brightness-110 hover:scale-105 shadow-lg",
            energy: "bg-gradient-to-br from-[#3A86FF] via-[#00D9FF] to-[#00FF88] text-black font-bold hover:brightness-110 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] shadow-[0_0_20px_rgba(58,134,255,0.3)] border-0",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
            icon: "p-3",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

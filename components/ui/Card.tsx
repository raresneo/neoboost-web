import React from 'react';

type CardVariant = 'standard' | 'glass' | 'bordered';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'standard', hoverEffect = false, children, ...props }, ref) => {

        const baseStyles = "rounded-[var(--radius-lg)] transition-all duration-300 overflow-hidden";

        const variants = {
            standard: "bg-[var(--bg-secondary)] border border-[var(--border-subtle)]",
            glass: "bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]",
            bordered: "bg-transparent border border-[var(--border-visible)]",
        };

        const hoverStyles = hoverEffect
            ? "hover:border-[var(--accent-primary)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            : "";

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

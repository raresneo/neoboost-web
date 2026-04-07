import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-[var(--text-muted)] text-sm mb-2 font-medium">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] px-4 py-3.5 
            text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-300
            focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(58,134,255,0.2)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-[var(--error)]' : ''}
            ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-[var(--error)]">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

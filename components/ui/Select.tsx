import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-[var(--text-muted)] text-sm mb-2 font-medium">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={`w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] px-4 py-3.5 
              text-[var(--text-primary)] outline-none transition-all duration-300 appearance-none cursor-pointer
              focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(58,134,255,0.2)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-[var(--error)]' : ''}
              ${className}`}
                        {...props}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                        <ChevronDown size={20} />
                    </div>
                </div>
                {error && <p className="mt-1 text-xs text-[var(--error)]">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";

import React, { useState } from 'react';
import { BenefitModal } from '../ui/BenefitModal';
import { UNIFIED_BENEFITS } from '../../constants';
// import { Card } from '../ui/Card'; // Using standard div with new classes for custom hover behavior similar to Card but specific to this grid

export const BenefitsGrid = () => {
    const [selectedBenefit, setSelectedBenefit] = useState<typeof UNIFIED_BENEFITS[0] | null>(null);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {UNIFIED_BENEFITS.map((benefit, i) => (
                    <div
                        key={benefit.id}
                        onClick={() => setSelectedBenefit(benefit)}
                        className="group relativebg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] rounded-[var(--radius-xl)] p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-[var(--bg-secondary)]"
                    >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-primary)] mb-6 transition-colors group-hover:bg-[var(--accent-primary)] group-hover:text-white border border-[var(--border-subtle)] group-hover:border-transparent">
                            {benefit.icon}
                        </div>

                        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                            {benefit.title}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
                            {benefit.desc}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)] mt-auto">
                            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider group-hover:text-white transition-colors">
                                Vezi Detalii
                            </span>
                            <span className="text-[var(--accent-primary)] text-xl leading-none group-hover:translate-x-1 transition-transform">
                                &rarr;
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <BenefitModal
                isOpen={!!selectedBenefit}
                onClose={() => setSelectedBenefit(null)}
                benefit={selectedBenefit}
            />
        </>
    );
};

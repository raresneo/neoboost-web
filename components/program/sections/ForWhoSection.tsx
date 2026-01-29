import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ForWhoSectionProps {
    ideal: string[];
    notFor: string[];
}

export const ForWhoSection: React.FC<ForWhoSectionProps> = ({ ideal, notFor }) => {
    return (
        <section className="py-20">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6">
                    PENTRU CINE ESTE PROGRAMUL?
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Ideal For */}
                <div className="glass-block p-10 border-[#3A86FF]/20 rounded-3xl">
                    <h3 className="text-2xl font-display font-bold uppercase text-[#3A86FF] mb-8 flex items-center gap-3">
                        <CheckCircle2 size={28} />
                        IDEAL PENTRU
                    </h3>
                    <ul className="space-y-4">
                        {ideal.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-white/80 leading-relaxed">
                                <CheckCircle2 size={20} className="text-[#3A86FF] flex-shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Not For */}
                <div className="glass-block p-10 border-red-500/20 rounded-3xl">
                    <h3 className="text-2xl font-display font-bold uppercase text-red-400 mb-8 flex items-center gap-3">
                        <XCircle size={28} />
                        NU ESTE PENTRU
                    </h3>
                    <ul className="space-y-4">
                        {notFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-white/80 leading-relaxed">
                                <XCircle size={20} className="text-red-400 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

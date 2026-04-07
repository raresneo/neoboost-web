import React from 'react';
import { Zap } from 'lucide-react';

export const HiitEffectAnimation: React.FC<{ data: { cardio: string, muscle: string, metabolic: string } }> = ({ data }) => {

    return (
        <div className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                        <Zap size={14} className="fill-brand" />
                        Tehnologie Bio-Hibrid
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black font-display text-gray-900 uppercase mb-6 tracking-tight">
                        Efectul Sinergic
                    </h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Metoda NeoBoost combină stimularea electrică cu efortul mecanic pentru o transformare totală.
                    </p>
                </div>

                {/* Infographic Only */}
                <div className="max-w-lg mx-auto">
                    <img
                        src="/bio-hybrid-journey.webp"
                        alt="Efectul Sinergic - Cardio, Musculatură, Metabolism - Sistemul Bio-Hibrid NeoBoost"
                        className="w-full h-auto"
                    />
                </div>

            </div>
        </div>
    );
};

import React from 'react';

export const HabitLoopAnimation: React.FC<{ data: { cue: string, craving: string, response: string, reward: string } }> = ({ data }) => {

    return (
        <div className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h3 className="text-3xl md:text-5xl font-black font-display text-gray-900 uppercase mb-6 tracking-tight">
                        Bucla Atomică NeoBoost
                    </h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Cum transformăm antrenamentul într-un automatism folosind neuroștiința.
                    </p>
                </div>

                {/* Infographic Image */}
                <div className="max-w-2xl mx-auto">
                    <img
                        src="/bucla-atomica.webp"
                        alt="Bucla Atomică NeoBoost - Semnal, Rutină, Recompensă, Nevoie - Habit Loop"
                        className="w-full h-auto rounded-2xl"
                    />
                </div>

            </div>
        </div>
    );
};

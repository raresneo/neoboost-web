import React from 'react';
import { GamifiedDashboard } from '../components/gamification/GamifiedDashboard';
import { NeoJourney } from '../components/gamification/NeoJourney';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const ProfilePage = () => {
    return (
        <div className="pt-[72px] min-h-screen bg-white">
            {/* Gamified Dashboard Section */}
            <GamifiedDashboard />

            {/* Journey Section */}
            <section className="py-12 md:py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <ScrollReveal>
                            <h2 className="text-3xl font-bold uppercase text-gray-900 mb-6">
                                Călătoria Ta <span className="text-blue-500">NeoBoost</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                Fiecare pas contează. Urmărește-ți progresul de la prima scânteie până la transformarea completă.
                                Deblochează noi etape prin constanță și dedicare.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h4 className="text-gray-900 font-bold mb-2">Sfatul Antrenorului</h4>
                                <p className="text-sm text-gray-500 italic">
                                    "Ești în faza de Adaptare. Este normal să simți febră musculară. Hidratează-te bine și nu sări peste sesiunea de recuperare!"
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <NeoJourney />
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

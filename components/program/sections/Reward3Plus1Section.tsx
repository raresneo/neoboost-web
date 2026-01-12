import React from 'react';
import { Gift, CheckCircle2 } from 'lucide-react';

interface Reward3Plus1SectionProps {
    enabled: boolean;
    conditions: string[];
    description: string;
}

export const Reward3Plus1Section: React.FC<Reward3Plus1SectionProps> = ({
    enabled,
    conditions,
    description
}) => {
    if (!enabled) return null;

    return (
        <section className="py-20">
            <div className="relative overflow-hidden rounded-[3rem] border-4 border-[#3A86FF] bg-gradient-to-br from-[#3A86FF]/10 via-black to-black p-12 md:p-16">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A86FF]/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F5FF]/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Gift size={48} className="text-[#3A86FF]" />
                        <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter text-white">
                            RECOMPENSA 3+1<br />
                            <span className="text-[#3A86FF]">LUNĂ CADOU</span>
                        </h2>
                    </div>

                    <p className="text-xl text-white/90 leading-relaxed mb-10 max-w-3xl">
                        {description}
                    </p>

                    <div className="glass-block p-8 border-[#3A86FF]/30 rounded-2xl">
                        <h3 className="text-2xl font-black impact-font uppercase text-[#3A86FF] mb-6">
                            CONDIȚII PENTRU RECOMPENSĂ:
                        </h3>
                        <ul className="space-y-4">
                            {conditions.map((condition, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-white/90 text-lg leading-relaxed">
                                    <CheckCircle2 size={24} className="text-[#3A86FF] flex-shrink-0 mt-1" />
                                    <span>{condition}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 p-6 bg-[#3A86FF]/10 border border-[#3A86FF]/30 rounded-xl">
                        <p className="text-center text-white/80 italic">
                            💪 Recompensăm disciplina și rezultatele, nu doar promisiunile!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

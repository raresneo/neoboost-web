import React from 'react';
import { Dumbbell, Clock, Zap } from 'lucide-react';

interface WorkoutDetailsSectionProps {
    duration: string;
    frequency: string;
    format: string;
    structure: string[];
}

export const WorkoutDetailsSection: React.FC<WorkoutDetailsSectionProps> = ({
    duration,
    frequency,
    format,
    structure
}) => {
    return (
        <section className="py-20">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-black impact-font uppercase tracking-tighter mb-6">
                    CUM SUNT ANTRENAMENTELE?
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                    <Clock size={32} className="text-[#3A86FF] mx-auto mb-4" />
                    <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Durată</div>
                    <div className="text-2xl font-bold text-white">{duration}</div>
                </div>

                <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                    <Dumbbell size={32} className="text-[#3A86FF] mx-auto mb-4" />
                    <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Frecvență</div>
                    <div className="text-2xl font-bold text-white">{frequency}</div>
                </div>

                <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                    <Zap size={32} className="text-[#3A86FF] mx-auto mb-4" />
                    <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Format</div>
                    <div className="text-xl font-bold text-white">{format}</div>
                </div>
            </div>

            <div className="glass-block p-10 border-[#3A86FF]/20 rounded-3xl">
                <h3 className="text-2xl font-black impact-font uppercase text-white mb-6">
                    STRUCTURA ANTRENAMENTELOR
                </h3>
                <ul className="space-y-4">
                    {structure.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-white/80 text-lg leading-relaxed">
                            <Zap size={20} className="text-[#3A86FF] flex-shrink-0 mt-1" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

import React from 'react';
import { Trophy, Zap, Crown } from 'lucide-react';
import { USER_JOURNEY } from '../../constants';
import { ScrollReveal } from '../ui/ScrollReveal';

export const GamifiedJourneySection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Evoluția Ta</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 uppercase">
                            Roadmap către <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Level 10</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
                            Transformarea nu se întâmplă peste noapte. Uite cum arată parcursul tău la NeoBoost.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-0.5 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-50 md:-translate-x-1/2"></div>

                    <div className="flex flex-col gap-12 md:gap-24">
                        {USER_JOURNEY.map((step, idx) => (
                            <ScrollReveal key={idx} delay={idx * 150} direction={idx % 2 === 0 ? 'left' : 'right'}>
                                <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Number/Icon Marker */}
                                    <div className={`absolute top-0 left-0 md:relative md:top-auto md:left-auto flex-shrink-0 w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 
                                        ${idx === 0 ? 'bg-blue-100 text-blue-600' :
                                            idx === 1 ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-purple-100 text-purple-600'}`}>
                                        <span className="font-display font-bold text-lg">{idx + 1}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 ml-20 md:ml-0">
                                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 relative group overflow-hidden">

                                            {/* Decorative Background Blob */}
                                            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500
                                                ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-yellow-500' : 'bg-purple-500'}`}></div>

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block
                                                            ${idx === 0 ? 'text-blue-600' : idx === 1 ? 'text-yellow-600' : 'text-purple-600'}`}>
                                                            {step.duration}
                                                        </span>
                                                        <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">{step.title}</h3>
                                                    </div>
                                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm
                                                        ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                                                        {step.level}
                                                    </div>
                                                </div>

                                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 font-medium">
                                                    {step.description}
                                                </p>

                                                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                                    <div className="p-2 rounded-full bg-gray-50 text-gray-400">
                                                        <Trophy size={16} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase block">Reward</span>
                                                        <span className="text-xs font-bold text-[var(--text-primary)]">{step.reward}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

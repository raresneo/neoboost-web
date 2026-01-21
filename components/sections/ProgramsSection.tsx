import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, MoveUpRight, Baby, Users, Dumbbell, Calendar, Crown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ProgramsVideoBackground } from '../backgrounds/CinematicBackground';
import { PROGRAMS } from '../../constants';

// --- Programs Grid Section ---
export const ProgramsSection = () => {

    const getIcon = (iconId: string) => {
        switch (iconId) {
            case 'zap': return <Zap size={80} className="text-white" />;
            case 'baby': return <Baby size={80} className="text-white" />;
            case 'users': return <Users size={80} className="text-white" />;
            case 'muscle': return <Dumbbell size={80} className="text-white" />;
            case 'calendar': return <Calendar size={80} className="text-white" />;
            case 'target': return <Target size={80} className="text-white" />;
            case 'crown': return <Crown size={80} className="text-white" />;
            default: return <Zap size={80} className="text-white" />;
        }
    };

    return (
        <section id="programe" className="pt-32 md:pt-40 pb-32 md:pb-60 bg-[#050505] relative z-20 border-t border-white/5 overflow-hidden scroll-mt-20">
            <ProgramsVideoBackground />
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Target className="text-[#3A86FF]" size={20} />
                                <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Start Your Journey</span>
                            </div>
                            <h2 className="text-7xl md:text-9xl font-black impact-font text-white uppercase leading-[0.8] heading-glow">
                                PROGRAME <br /><span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>ACTIVE.</span>
                            </h2>
                        </div>
                        <p className="text-gray-200 max-w-md text-right text-sm font-medium leading-relaxed hidden md:block readable-text bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                            Alege programul care se potrivește obiectivelor tale. Fie că vrei slăbire, tonifiere sau performanță, avem o structură dedicată.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {PROGRAMS.map((prog, i) => (
                        <ScrollReveal key={prog.id} delay={i * 100}>
                            <Link
                                to={`/program/${prog.id}`}
                                className="group relative h-full bg-[#0a0a0a] border border-white/5 hover:border-[#3A86FF]/40 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col rounded-[2rem] shadow-2xl block"
                            >
                                {/* Image Section */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={prog.image}
                                        alt={prog.title}
                                        className="absolute inset-0 w-full h-full object-cover reveal-color transform transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>

                                    <div className={`absolute top-6 left-6 z-10 ${prog.tagColor || 'bg-[#3A86FF]'} text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
                                        {prog.tag}
                                    </div>
                                    <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-xl px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 rounded-full">
                                        {prog.duration}
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-1 relative z-10 -mt-8 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a] backdrop-blur-md rounded-t-[2rem]">
                                    <div className="mb-6">
                                        <span className="text-[10px] text-[#3A86FF] font-black uppercase tracking-[0.2em] block mb-2">
                                            IDEAL: {prog.idealFor}
                                        </span>
                                        <h3 className="text-4xl font-black impact-font text-white mb-3 group-hover:text-[#3A86FF] transition-colors leading-none uppercase tracking-tighter">
                                            {prog.title}
                                        </h3>
                                    </div>

                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-8 border-l-2 border-[#3A86FF] pl-4">
                                        {prog.subtitle}
                                    </p>

                                    <p className="text-white/40 text-sm leading-relaxed mb-10 flex-grow overflow-hidden line-clamp-4">
                                        {prog.description}
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-[8px] uppercase text-white/20 font-black tracking-[0.2em] block mb-1">Rezultat</span>
                                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                                    {prog.benefit}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-[#3A86FF]/20 group-hover:text-[#3A86FF] transition-all duration-500">
                                                {getIcon(prog.iconId || 'zap')}
                                            </div>
                                        </div>

                                        <div
                                            className="w-full py-4 bg-white/5 hover:bg-[#3A86FF] hover:text-black text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 rounded-xl border border-white/10 group-hover:border-[#3A86FF]/30"
                                        >
                                            EXPLOREAZĂ <MoveUpRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

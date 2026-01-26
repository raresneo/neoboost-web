import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Target, Zap, MoveUpRight, Baby, Users, Dumbbell, Calendar, Crown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ProgramsVideoBackground } from '../backgrounds/CinematicBackground';
import { PROGRAMS } from '../../constants';
import { useStripeCheckout } from '../../lib/useStripeCheckout';
import { Session } from '@supabase/supabase-js';
import { useDraggableScroll } from '../../lib/useDraggableScroll';

// ... Inside component
export const ProgramsSection = () => {
    const { session } = useOutletContext<{ session: Session | null }>();
    const { handleCheckout, isLoading } = useStripeCheckout();
    const scrollRef = useDraggableScroll();

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
        <section id="programe" className="py-24 md:py-32 bg-transparent relative z-20 border-t border-white/5 scroll-mt-20">

            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Target className="text-[#3A86FF]" size={20} />
                                <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Începe Transformarea</span>
                            </div>
                            <h2 className="text-7xl md:text-9xl font-black impact-font text-white uppercase leading-[0.8] heading-glow">
                                ALEGE <br /><span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>OBIECTIVUL.</span>
                            </h2>
                        </div>
                        <p className="text-gray-200 max-w-md text-right text-sm font-medium leading-relaxed hidden md:block readable-text bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                            Fie că vrei să slăbești, să scapi de dureri sau să crești masa musculară, avem un plan exact pentru tine.
                        </p>
                    </div>
                </ScrollReveal>

                <div ref={scrollRef} className="flex gap-6 md:gap-10 overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing">
                    {PROGRAMS.map((prog, i) => (
                        <ScrollReveal key={prog.id} delay={i * 100} className="min-w-[85vw] md:min-w-[400px] flex-shrink-0 snap-center">
                            <div className="group relative h-full bg-[#0a0a0a] border-none hover:border-none transition-all duration-700 cursor-default overflow-hidden flex flex-col rounded-[2rem] shadow-2xl block gradient-border-spin">
                                {/* Image Section - Link to details */}
                                <Link to={`/program/${prog.id}`} className="relative h-72 overflow-hidden block cursor-pointer rounded-t-[2rem]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-blue-900/40 mix-blend-overlay z-20 pointer-events-none"></div>
                                    <img
                                        src={prog.image}
                                        alt={prog.title}
                                        className="absolute inset-0 w-full h-full object-cover reveal-color transform transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 z-20"></div>

                                    <div className={`absolute top-6 left-6 z-10 ${prog.tagColor || 'bg-[#3A86FF]'} text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
                                        {prog.tag}
                                    </div>
                                    <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-xl px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 rounded-full">
                                        {prog.duration}
                                    </div>
                                </Link>

                                <div className="p-6 md:p-10 landscape:p-6 flex flex-col flex-1 relative z-10 -mt-4 md:-mt-8 landscape:-mt-4 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a] backdrop-blur-md rounded-t-[2rem]">
                                    <div className="mb-4 md:mb-6 landscape:mb-4">
                                        <span className="text-[10px] text-[#3A86FF] font-black uppercase tracking-[0.2em] block mb-2">
                                            OBIECTIV: {prog.idealFor}
                                        </span>
                                        <Link to={`/program/${prog.id}`}>
                                            <h3 className="text-3xl md:text-4xl landscape:text-3xl font-black impact-font text-white mb-2 md:mb-3 landscape:mb-2 group-hover:text-[#3A86FF] transition-colors leading-none uppercase tracking-tighter cursor-pointer hover:underline decoration-[#3A86FF] decoration-2 underline-offset-4">
                                                {prog.title}
                                            </h3>
                                        </Link>
                                    </div>

                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-4 md:mb-8 landscape:mb-4 border-l-2 border-[#3A86FF] pl-4">
                                        {prog.subtitle}
                                    </p>

                                    <p className="text-white/40 text-sm leading-relaxed mb-4 md:mb-6 landscape:mb-4 flex-grow overflow-hidden line-clamp-3 md:line-clamp-4 landscape:line-clamp-3">
                                        {prog.description}
                                    </p>

                                    {/* Price Display */}
                                    {prog.price && (
                                        <div className="mb-4 md:mb-6 landscape:mb-4 flex items-center gap-2">
                                            <span className="text-2xl font-black text-white">{prog.price}</span>
                                            {prog.stripePriceId && <span className="text-xs text-[#3A86FF] font-bold uppercase tracking-wider bg-[#3A86FF]/10 px-2 py-1 rounded">Online</span>}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4 md:pt-8 landscape:pt-4 border-t border-white/5 flex flex-col gap-4 md:gap-6 landscape:gap-4">
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

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link
                                                to={`/program/${prog.id}`}
                                                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center rounded-xl border border-white/10"
                                            >
                                                Detalii
                                            </Link>

                                            {prog.stripePriceId ? (
                                                <button
                                                    onClick={() => handleCheckout(prog.stripePriceId!, prog.price!, prog.title, session)}
                                                    disabled={isLoading}
                                                    className="w-full py-4 bg-[#3A86FF] hover:bg-[#3A86FF]/90 text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)]"
                                                >
                                                    {isLoading ? '...' : 'Alege'} <MoveUpRight size={14} />
                                                </button>
                                            ) : (
                                                <a
                                                    href={`https://wa.me/40769124019?text=Salut! Vreau detalii despre programul ${prog.title}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full py-4 bg-[#3A86FF] hover:bg-[#3A86FF]/90 text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                                                >
                                                    Cere Ofertă <MoveUpRight size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

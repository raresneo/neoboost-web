
import React, { useState, useEffect, useRef } from 'react';
import { MoveUpRight, Target, History, Users, Quote, Star, MessageCircle, Cpu } from 'lucide-react';
import { BRAND } from '../constants';

interface ProgramModalProps {
    program: any;
    onClose: () => void;
    FORM_CONFIGS: any;
    StepForm: any;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose, FORM_CONFIGS, StepForm }) => {
    const [isApplying, setIsApplying] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsApplying(false);
        if (program) {
            // Robust scroll lock
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100vw'; // Ensure full width
            document.body.style.overflow = 'hidden'; // Force hidden
            document.documentElement.style.overflow = 'hidden'; // Also lock html

            if ((window as any).lenis) (window as any).lenis.stop();
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            if ((window as any).lenis) (window as any).lenis.start();
        };
    }, [program]);

    // Handle outside click
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!program) return null;

    const formConfig = FORM_CONFIGS[program.id];

    if (isApplying && formConfig) {
        return <StepForm config={formConfig} onClose={onClose} programId={program.id} />;
    }

    const mockBeforeAfter = program.id === 'fit-mamma' ? '/transformation_female_v2.png' : '/transformation_male_v2.png';

    const trainers = [
        { name: "Rareș", role: "Fondator / Head Trainer", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&h=200&auto=format&fit=crop" },
        { name: "Ionuț", role: "EMS Specialist", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&h=200&auto=format&fit=crop" },
        { name: "Alex", role: "Performance Coach", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=200&auto=format&fit=crop" },
        { name: "Rareș Silvasan", role: "Kineto & EMS Expert", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=200&h=200&auto=format&fit=crop" }
    ];

    const getHeroImage = (id: string) => {
        switch (id) {
            case 'kickstart': return '/Cems2.jpg';
            case 'fit-mamma': return '/Cems1.jpg';
            case '8-week-transform': return '/Cems3.jpg';
            case 'toning': return '/Cems1.jpg';
            case 'performance': return '/Cems3.jpg';
            default: return program.image;
        }
    };

    const calendlyLink = "https://calendly.com/neoboost-oradea/30min";

    const renderContent = (content: string) => {
        const cleanContent = content.replace(/\[LINK FORMULAR\]/g, "");
        return cleanContent.split('\n\n').map((para, idx) => {
            const isListItem = para.startsWith('✔️') || para.startsWith('❌');
            if (para.includes('[WHATSAPP_LINK]')) {
                return (
                    <div key={idx} className="py-8">
                        <a
                            href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să aflu mai multe despre programul ${program.title}.`}
                            target="_blank"
                            className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold font-display text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
                        >
                            <MessageCircle size={24} />
                            DISCUTĂ CU NOI PE WHATSAPP
                        </a>
                    </div>
                );
            }
            return (
                <div key={idx} className={isListItem ? 'bg-white/5 p-8 rounded-2xl border-l-4 border-[#3A86FF]/40 shadow-xl' : 'space-y-4'}>
                    {para.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className="mb-2 last:mb-0 leading-relaxed font-light">{line}</p>
                    ))}
                </div>
            );
        });
    };
    return (
        <div
            className={`fixed inset-0 z-[99999] flex flex-col bg-[var(--bg-primary)]/60 backdrop-blur-sm transition-all duration-300 ${program ? 'opacity-100 visible' : 'opacity-0 invisible'} h-[100dvh] w-screen overflow-hidden overscroll-none`}
            onClick={handleOutsideClick}
        >
            {/* Header - Fixed Height for Mobile Visibility */}
            <div className="flex-none h-20 md:h-24 flex items-center justify-between px-6 md:px-10 border-b border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-3xl z-[100000]">
                <button
                    onClick={onClose}
                    className="relative overflow-hidden flex items-center gap-3 text-[#3A86FF] hover:text-black bg-transparent hover:bg-[#3A86FF] transition-all px-6 py-3 rounded-lg border border-[#3A86FF]/30 hover:border-[#3A86FF] text-xs font-black uppercase tracking-[0.2em] group shadow-[0_0_15px_rgba(58,134,255,0.1)] hover:shadow-[0_0_30px_rgba(58,134,255,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <MoveUpRight size={16} className="rotate-[225deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                        ÎNAPOI
                    </span>
                </button>
                <h3 className="font-display font-bold text-lg md:text-2xl text-white uppercase tracking-tighter truncate max-w-[50%]">{program.title}</h3>
                <div className="w-[80px] hidden md:block"></div>
            </div>

            {/* Main Content Area - Scrollable */}
            <div
                ref={modalRef}
                className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar bg-[var(--bg-primary)] mx-auto w-full max-w-5xl"
                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
                <div className="container mx-auto max-w-5xl px-6 py-10 md:py-20 text-white">

                    {/* 1. Hero */}
                    <div className="relative mb-20 rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-[21/9] group shadow-[0_0_50px_rgba(0,245,255,0.05)]">
                        <img
                            src={getHeroImage(program.id)}
                            alt={program.title}
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3000ms] hi-fi-image grayscale hover:grayscale-0 duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10">
                            <span className="mono-font text-[10px] text-[#3A86FF] font-black uppercase tracking-[0.5em] mb-4 block">{program.tag}</span>
                            <h2 className="text-5xl md:text-8xl font-display font-bold uppercase leading-none tracking-tighter">{program.title}</h2>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 mb-32">
                        <div className="lg:col-span-8 space-y-16">
                            <section>
                                <div className="flex items-center gap-6 mb-10">
                                    <Target size={32} className="text-[#3A86FF]" />
                                    <h4 className="text-3xl font-display font-bold uppercase italic tracking-wider">Impactul Programului</h4>
                                </div>
                                <div className="text-white/60 text-lg font-light leading-relaxed space-y-10">
                                    {renderContent(program.content)}
                                </div>
                            </section>

                            {/* Tehnologia Section */}
                            <section>
                                <div className="flex items-center gap-6 mb-10">
                                    <Cpu size={32} className="text-[#3A86FF]" />
                                    <h4 className="text-3xl font-display font-bold uppercase italic tracking-wider">Tehnologia NeoBoost</h4>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                                    <div className="aspect-square">
                                        <img src="/Cems1.jpg" alt="EMS Suit Detail" className="w-full h-full object-cover hi-fi-image" />
                                    </div>
                                    <div className="p-10 space-y-6">
                                        <h5 className="text-2xl font-display font-bold uppercase text-white italic">Costumul Tehnic Pro</h5>
                                        <p className="text-white/60 font-light leading-relaxed">
                                            Vei folosi exact acest echipament profesional de ultimă generație. Drysuit-ul nostru este antibacterian, ultra-ușor și permite o libertate de mișcare totală, oferind în același timp o contracție musculară mult mai precisă și profundă decât sistemele clasice.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {['Wireless', 'Drysuit Tech', 'Anti-Bacterial', 'Full Mobility'].map(tag => (
                                                <span key={tag} className="text-[9px] font-black text-[#3A86FF] border border-[#3A86FF]/30 px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Transformation Gallery */}
                            <section>
                                <div className="flex items-center gap-6 mb-10">
                                    <History size={32} className="text-[#3A86FF]" />
                                    <h4 className="text-3xl font-display font-bold uppercase italic tracking-wider">Rezultate Vizibile</h4>
                                </div>
                                <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
                                    <img src={mockBeforeAfter} alt="Before After" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 hi-fi-image" />
                                    <div className="p-8 bg-[var(--bg-primary)]/40 backdrop-blur-md border-t border-white/5 text-center">
                                        <p className="mono-font text-[11px] text-[#3A86FF] uppercase tracking-[0.4em] font-black">
                                            Evoluție Recomandată după protocolul NeoBoost Oradea
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4 h-fit lg:sticky lg:top-10">
                            <div className="glass-block p-10 border-[#3A86FF]/20 space-y-8 rounded-[2rem] shadow-2xl">
                                <div>
                                    <span className="text-[10px] font-black text-[#3A86FF] uppercase tracking-[0.4em] block mb-4">Focus Obiectiv</span>
                                    <div className="font-bold font-display text-4xl uppercase italic text-white leading-none">{program.benefit}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-[#3A86FF] uppercase tracking-[0.4em] block mb-4">Durată Estimată</span>
                                    <div className="font-bold font-display text-4xl uppercase italic text-white leading-none">{program.duration}</div>
                                </div>
                                <hr className="border-white/10" />
                                <div className="space-y-4">
                                    <a
                                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să rezerv un loc pentru programul ${program.title}.`}
                                        target="_blank"
                                        className="w-full bg-[#3A86FF] text-black py-7 font-bold font-display text-2xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(0,245,255,0.4)] text-center block hover:scale-[1.02] transition-transform"
                                    >
                                        REZERVĂ UN LOC
                                    </a>
                                    <a
                                        href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să discutăm despre programul ${program.title}.`}
                                        target="_blank"
                                        className="w-full border border-[#25D366]/50 text-[#25D366] py-5 font-bold font-display text-xl uppercase tracking-[0.1em] text-center block hover:bg-[#25D366]/5 transition-colors"
                                    >
                                        DISCUTĂ CU NOI
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <Users size={32} className="text-[#3A86FF]" />
                            <h4 className="text-4xl md:text-6xl font-display font-bold uppercase mt-0 italic tracking-tighter">ANTRENORII TĂI.</h4>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {trainers.map((t, idx) => (
                                <div key={idx} className="group overflow-hidden rounded-[1.5rem] bg-[var(--bg-primary)] border border-white/5 hover:border-[#3A86FF]/40 transition-all duration-500">
                                    <div className="aspect-square relative overflow-hidden">
                                        <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    <div className="p-8 relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                                        <h5 className="font-bold font-display text-2xl leading-none mb-1 text-white">{t.name.toUpperCase()}</h5>
                                        <span className="text-[10px] text-[#3A86FF] font-black uppercase tracking-widest">{t.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

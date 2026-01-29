import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle2, FlaskConical, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BenefitModalProps {
    isOpen: boolean;
    onClose: () => void;
    benefit: {
        title: string;
        image: string;
        icon: React.ReactNode;
        desc: string;
        content: {
            intro: string;
            science: string;
            mechanisms: string[];
            expectations: string;
        };
        cta: string;
    } | null;
}

export const BenefitModal: React.FC<BenefitModalProps> = ({ isOpen, onClose, benefit }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleClickOutside = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleCTA = () => {
        onClose();
        const contactSection = document.getElementById('contact-info');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isOpen || !benefit) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className="bg-[var(--bg-secondary)] border border-[#3A86FF]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-[0_0_50px_rgba(58,134,255,0.15)] animate-in zoom-in-95 duration-300 flex flex-col md:flex-row"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white/50 hover:text-white md:hidden"
                >
                    <X size={20} />
                </button>

                {/* Left Side - Image */}
                <div className="w-full md:w-2/5 relative h-48 md:h-auto shrink-0">
                    <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-6 left-6 md:hidden">
                        <div className="w-12 h-12 rounded-xl bg-[#3A86FF]/20 backdrop-blur-sm flex items-center justify-center text-[#3A86FF] border border-[#3A86FF]/20">
                            {React.cloneElement(benefit.icon as React.ReactElement, { size: 24 })}
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 p-6 md:p-10 text-left relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors hidden md:block"
                    >
                        <X size={24} />
                    </button>

                    <div className="hidden md:flex w-14 h-14 rounded-2xl bg-[#3A86FF]/10 items-center justify-center text-[#3A86FF] mb-6 border border-[#3A86FF]/20">
                        {React.cloneElement(benefit.icon as React.ReactElement, { size: 28 })}
                    </div>

                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase mb-4 leading-tight">
                        {benefit.title}
                    </h3>

                    <p className="text-white/80 text-lg leading-relaxed mb-8 font-light">
                        {benefit.content.intro}
                    </p>

                    <div className="space-y-6 mb-10">
                        {/* Science Box */}
                        <div className="bg-blue-900/10 p-5 rounded-2xl border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2 text-blue-400">
                                <FlaskConical size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest">Știința din spate</span>
                            </div>
                            <p className="text-blue-100/80 text-sm leading-relaxed">
                                {benefit.content.science}
                            </p>
                        </div>

                        {/* Mechanisms */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-3 opacity-70">Mecanisme de Acțiune</h4>
                            <ul className="space-y-3">
                                {benefit.content.mechanisms.map((mech, i) => (
                                    <li key={i} className="flex gap-3 text-white/70 text-sm items-start">
                                        <CheckCircle2 size={16} className="text-[#3A86FF] shrink-0 mt-0.5" />
                                        <span>{mech}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Expectations */}
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                            <Target size={20} className="text-green-400 shrink-0 mt-1" />
                            <div>
                                <span className="block text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Rezultate Așteptate</span>
                                <p className="text-white/60 text-sm italic">
                                    "{benefit.content.expectations}"
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCTA}
                        className="w-full bg-[#3A86FF] hover:bg-[#2563EB] text-white font-black uppercase py-4 rounded-xl tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                        {benefit.cta} <ArrowRight size={18} />
                    </button>

                    <p className="text-center text-white/20 text-[10px] mt-4 uppercase tracking-widest">
                        Programare Rapidă • Consultanță Gratuită
                    </p>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { Target, CheckCheck, CreditCard, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { NeoPackage, BRAND } from '../../constants';
// import { Profile } from '../../lib/supabase'; // Removed unused import

// --- Package Card ---
export const PackageCard: React.FC<{ pkg: NeoPackage; i: number; user: any; onOpenAuth: () => void; onCheckout: (pkg: NeoPackage) => void }> = ({ pkg, i, user, onOpenAuth, onCheckout }) => {
    return (
        <ScrollReveal delay={i * 100}>
            <div className={`group relative p-8 md:p-12 border transition-all duration-700 h-full flex flex-col justify-between overflow-hidden cursor-default ${pkg.isPremium ? 'bg-black text-white shadow-2xl border-[#3A86FF]/50 shadow-[#3A86FF]/10' : 'bg-[#0a0a0a] text-white border-white/5 hover:border-[#3A86FF]/30'}`}>

                {/* Animated Background Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                {/* Recomandat Badge */}
                {pkg.isRecommended && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#3A86FF] text-black text-[9px] font-black uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)] z-20">
                        ⭐ FAVORIT
                    </div>
                )}

                <div className="absolute -top-12 -left-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 pointer-events-none text-[#3A86FF]">
                    <span className="text-[280px] font-black impact-font leading-none">{pkg.sessionCount}</span>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <span className="mono-font text-[9px] font-bold text-[#3A86FF]/40 uppercase tracking-[0.4em]">{pkg.duration}</span>
                        <div className="text-right">
                            {pkg.sessionCount.includes('+') ? (
                                <div className="flex flex-col items-end">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black impact-font text-white leading-none">{pkg.sessionCount.split('+')[0]}</span>
                                        <span className="text-3xl font-black impact-font text-[#3A86FF] leading-none">+{pkg.sessionCount.split('+')[1]}</span>
                                    </div>
                                    <span className="text-[8px] mono-font text-[#3A86FF] uppercase font-black tracking-widest block mt-1">Ședințe (Bonus Inclus)</span>
                                </div>
                            ) : (
                                <>
                                    <span className="block text-5xl font-black impact-font text-[#3A86FF] leading-none text-glow">{pkg.sessionCount}</span>
                                    <span className="text-[8px] mono-font opacity-40 uppercase font-bold tracking-widest block mt-1">Ședințe</span>
                                </>
                            )}
                        </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black impact-font mb-6 transition-colors group-hover:text-[#3A86FF] leading-none uppercase">{pkg.title}</h3>

                    {/* Ideal For Label */}
                    {pkg.idealFor && (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider mb-8 bg-[#3A86FF]/10 text-[#3A86FF] border border-[#3A86FF]/20`}>
                            <Target size={12} />
                            {pkg.idealFor}
                        </div>
                    )}

                    <div className="space-y-4 mb-12">
                        {pkg.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/90">
                                <CheckCheck size={14} className="text-[#3A86FF]" /> {f}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-8 flex flex-col gap-4 border-t border-white/5">
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black impact-font text-white">{pkg.price}</span>
                            <span className="mono-font text-[10px] text-[#3A86FF] font-black tracking-widest">LEI</span>
                        </div>
                        {pkg.pricePerSession && (
                            <p className="mono-font text-[11px] mt-2 text-white/30 italic">
                                ≈ {pkg.pricePerSession} lei / ședință
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => onCheckout(pkg)}
                            className="group/btn relative flex items-center justify-between p-5 bg-[#3A86FF] text-black overflow-hidden transition-all duration-500 shadow-[0_0_25px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] glitch-hover"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                            <span className="relative z-10 text-[11px] font-black tracking-[0.2em] uppercase">
                                CUMPĂRĂ ACUM
                            </span>
                            <CreditCard size={20} className="relative z-10" />
                        </button>

                        <a
                            href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez pachetul ${pkg.title}.`}
                            target="_blank"
                            className="flex items-center justify-between p-5 border border-white/10 text-white/50 hover:text-white hover:border-[#3A86FF]/50 transition-all duration-500"
                        >
                            <span className="text-[11px] font-black tracking-[0.2em] uppercase">CONTACT WHATSAPP</span>
                            <MessageCircle size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

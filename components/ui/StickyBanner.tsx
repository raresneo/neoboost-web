import React from 'react';
import { Zap } from 'lucide-react';

// --- Sticky "20 Minute" Banner ---
export const StickyBanner = () => (
    <div className="fixed bottom-0 left-0 w-full bg-[#3A86FF] text-black py-3 z-[90] overflow-hidden whitespace-nowrap border-t border-black/10 shadow-[0_-10px_40px_rgba(0,255,136,0.3)]">
        <div className="flex items-center justify-around gap-10 animate-marquee">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-10">
                    <Zap size={14} className="fill-current" />
                    <span className="font-display font-bold text-sm md:text-base tracking-widest uppercase">DOAR 30 MINUTE / MINIM 1 ȘEDINȚĂ SĂPTĂMÂNAL</span>
                    <span className="mono-font text-[10px] font-bold opacity-40 uppercase tracking-widest px-4 border-x border-black/20">Opțiuni flexibile pentru rezultate accelerate</span>
                </div>
            ))}
        </div>
    </div>
);

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '../../constants';

const WA_LINK = `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(
    'Salut! Vreau să programez prima ședință EMS gratuită.'
)}`;

export const StickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > 500);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrie-ne pe WhatsApp"
            className={`fixed bottom-24 right-4 z-[90] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe57] active:scale-95 md:right-6 md:px-5 md:py-3.5 xl:bottom-6
            ${isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'}`}
        >
            <MessageCircle size={20} className="fill-white" />
            <span className="hidden sm:inline">Rezervă gratuit</span>
        </a>
    );
};

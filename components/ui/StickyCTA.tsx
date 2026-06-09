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
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrie-ne pe WhatsApp"
            className={`fixed bottom-6 right-6 z-[60] hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe57] md:flex ${isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'}`}
        >
            <MessageCircle size={18} className="fill-white" />
            Rezervă gratuit
        </a>
    );
};

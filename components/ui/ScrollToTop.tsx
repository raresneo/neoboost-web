import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

// --- Scroll to Top Button Component ---
export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggle = () => setIsVisible(window.scrollY > 500);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-32 right-6 z-[90] p-4 bg-[#3A86FF] text-black rounded-full shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(58,134,255,0.6)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
            <ArrowDown size={20} className="rotate-180" />
        </button>
    );
};

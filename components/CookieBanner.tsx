import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('neoboost_cookie_consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('neoboost_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[200] bg-black/90 backdrop-blur-md border-t border-[#3A86FF]/20 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-slideUp">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white/80 text-sm font-light max-w-2xl text-center md:text-left">
                    <p>
                        Folosim cookie-uri pentru a îmbunătăți experiența ta pe site-ul NeoBoost. Continuarea navigării implică acceptarea politicii noastre.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAccept}
                        className="bg-[#3A86FF] text-black px-8 py-3 rounded-lg font-black impact-font uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(58,134,255,0.3)] transition-all transform hover:-translate-y-0.5"
                    >
                        ACCEPTĂ
                    </button>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { CheckCheck } from 'lucide-react';

// --- Payment Success Modal ---
export const PaymentSuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-[var(--bg-primary)]/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
            <div className="relative glass-block p-10 max-w-md text-center border-[#3A86FF] shadow-[0_0_50px_rgba(0,245,255,0.3)] rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#3A86FF]/10 to-transparent pointer-events-none rounded-2xl"></div>
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#3A86FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3A86FF] shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                        <CheckCheck size={40} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4 uppercase">PLATA CONFIRMATĂ!</h2>
                    <p className="text-white/60 mb-8 font-light leading-relaxed">Abonamentul tău a fost activat cu succes. Vei primi factura și confirmarea pe email.</p>
                    <button onClick={onClose} className="bg-[#3A86FF] text-black px-8 py-3 font-bold font-display tracking-widest uppercase hover:scale-105 transition-transform shadow-lg w-full rounded">
                        ÎNȚELES
                    </button>
                </div>
            </div>
        </div>
    );
};

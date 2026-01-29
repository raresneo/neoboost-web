import React from 'react';
import { Calendar, MoveRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export const QuickBookingCTA = () => {
    const { onOpenBooking } = useOutletContext<any>();

    return (
        <div className="mt-12 flex flex-col items-center">
            <button
                onClick={onOpenBooking}
                className="group relative px-8 py-4 bg-[#3A86FF] text-black font-black uppercase tracking-widest rounded-full flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(58,134,255,0.4)]"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <Calendar size={20} />
                <span className="relative z-10 text-sm">Programează o ședință de probă</span>
                <MoveRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="mt-4 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">Gratuit în limita locurilor disponibile</p>
        </div>
    );
};

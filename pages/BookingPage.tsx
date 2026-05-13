import React from 'react';
import { Link } from 'react-router-dom';
import { BookingCalendar } from '../components/BookingCalendar';
import { ArrowLeft } from 'lucide-react';

export const BookingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col">
            {/* Minimal header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                    <ArrowLeft size={14} />
                    NeoBoost
                </Link>
                <img src="/logo_white.webp" alt="NeoBoost" className="h-7 w-auto object-contain" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">EMS Studio · Oradea</div>
            </header>

            {/* Booking content */}
            <main className="flex-1 flex flex-col items-center justify-start py-6 px-4">
                <div className="w-full max-w-5xl">
                    <div className="text-center mb-6">
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Rezervare Rapidă</p>
                        <h1 className="text-2xl md:text-3xl font-black text-white uppercase italic">
                            Programează-ți Ședința
                        </h1>
                    </div>
                    <BookingCalendar onClose={() => window.location.href = '/'} />
                </div>
            </main>
        </div>
    );
};

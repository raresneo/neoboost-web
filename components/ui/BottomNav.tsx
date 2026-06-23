import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, User, HelpCircle, Zap } from 'lucide-react';

interface BottomNavProps {
    onOpenBooking: () => void;
    onOpenAuth: () => void;
    onOpenQuiz: () => void;
    user: any;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenBooking, onOpenAuth, onOpenQuiz, user }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const itemBase =
        'flex flex-col items-center gap-1 px-2 py-1.5 text-[10px] font-medium transition-colors duration-150 active:scale-95';

    const goLocations = () => {
        const el = document.getElementById('locatii');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#locatii';
    };

    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full pb-[env(safe-area-inset-bottom)] xl:hidden">
            <div className="flex items-center justify-around border-t border-[var(--border-subtle)] bg-[var(--glass-bg)] px-1.5 py-2 backdrop-blur-xl">
                {/* Home */}
                <Link
                    to="/"
                    className={`${itemBase} ${isActive('/') ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}
                >
                    <Home size={21} strokeWidth={isActive('/') ? 2.5 : 2} />
                    Acasă
                </Link>

                {/* Locations */}
                <button onClick={goLocations} className={`${itemBase} text-[var(--text-muted)]`}>
                    <MapPin size={21} strokeWidth={2} />
                    Locații
                </button>

                {/* CENTER — primary booking CTA */}
                <button
                    onClick={onOpenBooking}
                    className="group -mt-7 flex flex-col items-center"
                    aria-label="Rezervă ședința gratuită"
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)] text-white shadow-[var(--shadow-lg)] transition-transform duration-150 group-active:scale-90">
                        <Zap size={26} className="fill-current" strokeWidth={2} />
                    </span>
                    <span className="mt-1 text-[10px] font-bold text-[var(--text-primary)]">Rezervă</span>
                </button>

                {/* Quiz — replace WhatsApp */}
                <button
                    onClick={onOpenQuiz}
                    className={`${itemBase} text-[var(--text-muted)]`}
                    aria-label="Află pachetul potrivit"
                >
                    <HelpCircle size={21} strokeWidth={2} className="text-[var(--accent-primary)]" />
                    <span className="text-[var(--accent-primary)]">Ce pachet?</span>
                </button>

                {/* Profile / Auth */}
                {user ? (
                    <Link
                        to="/profile"
                        className={`${itemBase} ${isActive('/profile') ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}
                    >
                        <User size={21} strokeWidth={isActive('/profile') ? 2.5 : 2} />
                        Profil
                    </Link>
                ) : (
                    <button onClick={onOpenAuth} className={`${itemBase} text-[var(--text-muted)]`}>
                        <User size={21} strokeWidth={2} />
                        Cont
                    </button>
                )}
            </div>
        </nav>
    );
};

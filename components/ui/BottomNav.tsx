import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, MapPin, Zap, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==============================================
// ⚡ INTERACTIVE BOTTOM NAV WITH PERSONALITY ⚡
// Thor-themed with Mjolnir booking button,
// lightning sparks, and playful micro-interactions
// ==============================================

interface BottomNavProps {
    onOpenBooking: () => void;
    onOpenAuth: () => void;
    user: any;
}

// --- Lightning Spark Particle ---
const LightningSpark: React.FC<{ x: number; y: number; onDone: () => void }> = ({ x, y, onDone }) => {
    useEffect(() => {
        const timer = setTimeout(onDone, 800);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div className="fixed pointer-events-none z-[200]" style={{ left: x - 30, top: y - 30 }}>
            {/* Multiple electric particles radiating outward */}
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const dist = 18 + Math.random() * 14;
                return (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            left: 30, top: 30,
                            background: i % 2 === 0 ? '#3B82F6' : '#FBBF24',
                            boxShadow: i % 2 === 0 ? '0 0 6px #3B82F6' : '0 0 6px #FBBF24',
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                            x: Math.cos(angle) * dist,
                            y: Math.sin(angle) * dist,
                            opacity: 0,
                            scale: 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                );
            })}
            {/* Mini lightning bolt */}
            <motion.svg
                viewBox="0 0 20 20"
                className="absolute w-6 h-6"
                style={{ left: 27, top: 27 }}
                initial={{ opacity: 1, scale: 1.5, rotate: -10 }}
                animate={{ opacity: 0, scale: 0, rotate: 20 }}
                transition={{ duration: 0.6 }}
            >
                <path d="M10 2 L7 9 L11 9 L8 18 L14 8 L10 8 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.5" />
            </motion.svg>
        </div>
    );
};

// --- Mjolnir SVG for center button ---
const MjolnirIcon = () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
        {/* Hammer head */}
        <rect x="6" y="4" width="16" height="10" rx="3" fill="white" />
        <rect x="8" y="6" width="12" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
        {/* Nordic engravings */}
        <path d="M10 7 L10 11" stroke="rgba(59,130,246,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M14 7 L14 11" stroke="rgba(59,130,246,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M18 7 L18 11" stroke="rgba(59,130,246,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        {/* Handle */}
        <rect x="12" y="14" width="4" height="8" rx="1" fill="white" />
        {/* Handle wrapping */}
        <line x1="12.5" y1="16" x2="15.5" y2="16" stroke="rgba(146,64,14,0.5)" strokeWidth="0.8" />
        <line x1="12.5" y1="18.5" x2="15.5" y2="18.5" stroke="rgba(146,64,14,0.5)" strokeWidth="0.8" />
        {/* Bottom pommel */}
        <circle cx="14" cy="23" r="2" fill="white" fillOpacity="0.8" />
    </svg>
);

// --- Ambient Lightning Effect (subtle bg animation) ---
const AmbientLightning = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-3xl">
        {/* Left electric arc */}
        <motion.div
            className="absolute left-[15%] top-0 w-px h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), transparent)' }}
            animate={{ opacity: [0, 0.6, 0], scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />
        {/* Right electric arc */}
        <motion.div
            className="absolute right-[15%] top-0 w-px h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(251,191,36,0.3), transparent)' }}
            animate={{ opacity: [0, 0.5, 0], scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 7, delay: 2 }}
        />
    </div>
);

// --- Main Bottom Nav ---
export const BottomNav: React.FC<BottomNavProps> = ({ onOpenBooking, onOpenAuth, user }) => {
    const location = useLocation();
    const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
    const [hammerSmash, setHammerSmash] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const sparkIdRef = useRef(0);

    const isActive = (path: string) => location.pathname === path;

    // Emit sparks on tap
    const emitSpark = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const id = ++sparkIdRef.current;
        setSparks(prev => [...prev, { id, x: clientX, y: clientY }]);
    }, []);

    const removeSpark = useCallback((id: number) => {
        setSparks(prev => prev.filter(s => s.id !== id));
    }, []);

    // Hammer smash animation for booking button
    const handleBookingClick = useCallback((e: React.MouseEvent) => {
        emitSpark(e);
        setHammerSmash(true);
        // Haptic-like visual feedback
        setTimeout(() => setHammerSmash(false), 400);
        setTimeout(() => onOpenBooking(), 200);
    }, [onOpenBooking, emitSpark]);

    // Menu item tap with personality
    const handleItemTap = useCallback((label: string, e: React.MouseEvent) => {
        emitSpark(e);
        setActiveItem(label);
        setTimeout(() => setActiveItem(null), 600);
    }, [emitSpark]);

    return (
        <>
            {/* Spark particles layer */}
            <AnimatePresence>
                {sparks.map(spark => (
                    <LightningSpark key={spark.id} x={spark.x} y={spark.y} onDone={() => removeSpark(spark.id)} />
                ))}
            </AnimatePresence>

            {/* Bottom Nav Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 pb-safe-bottom xl:hidden pointer-events-none md:pointer-events-auto">
                <div className="relative bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-t border-blue-100/50 rounded-t-3xl shadow-[0_-4px_30px_rgba(59,130,246,0.08)] pointer-events-auto">

                    <AmbientLightning />

                    <div className="relative flex items-center justify-around px-2 py-3">

                        {/* Home */}
                        <Link
                            to="/"
                            onClick={(e) => handleItemTap('Home', e)}
                            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive('/') ? 'text-blue-600' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                        >
                            <motion.div
                                animate={activeItem === 'Home' ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
                            </motion.div>
                            <span className="text-[10px] font-medium">Home</span>
                            {isActive('/') && (
                                <motion.div
                                    className="absolute -bottom-0.5 w-6 h-0.5 bg-blue-500 rounded-full"
                                    layoutId="navIndicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                        </Link>

                        {/* Locations */}
                        <button
                            onClick={(e) => {
                                handleItemTap('Locații', e as any);
                                const el = document.getElementById('locatii');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    window.location.href = '/#locatii';
                                }
                            }}
                            className="flex flex-col items-center gap-1 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                        >
                            <motion.div
                                animate={activeItem === 'Locații' ? {
                                    y: [0, -8, 0],
                                    scale: [1, 1.2, 1],
                                } : {}}
                                transition={{ duration: 0.5, type: "spring" }}
                            >
                                <MapPin size={22} strokeWidth={2} />
                            </motion.div>
                            <span className="text-[10px] font-medium">Locații</span>
                        </button>

                        {/* CENTER — CALENDAR BOOKING BUTTON */}
                        <div className="-mt-8 relative">
                            {/* Electric aura ring */}
                            <motion.div
                                className="absolute -inset-2 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent, rgba(59,130,246,0.3), transparent, rgba(251,191,36,0.2), transparent)',
                                }}
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Pulse ring */}
                            <motion.div
                                className="absolute -inset-3 rounded-full border-2 border-blue-400/20"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <motion.button
                                onClick={handleBookingClick}
                                className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 text-white shadow-[0_4px_25px_rgba(59,130,246,0.5)] touch-manipulation overflow-hidden"
                                animate={hammerSmash ? {
                                    scale: [1, 0.9, 1.1, 1],
                                    rotate: [0, -5, 5, 0],
                                } : {}}
                                transition={{ duration: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {/* Inner glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

                                {/* Calendar Icon with Check */}
                                <div className="relative z-10">
                                    <CalendarCheck size={28} strokeWidth={2} className="drop-shadow-sm" />
                                </div>

                                {/* Impact flash on click */}
                                <AnimatePresence>
                                    {hammerSmash && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-white"
                                            initial={{ opacity: 0.8 }}
                                            animate={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <span className="block text-center text-[10px] font-bold text-[var(--text-secondary)] mt-1">Rezervă</span>
                        </div>

                        {/* Science / Știință */}
                        <Link
                            to="/science"
                            onClick={(e) => handleItemTap('Știință', e)}
                            className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive('/science') ? 'text-blue-600' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                        >
                            <motion.div
                                animate={activeItem === 'Știință' ? {
                                    scale: [1, 1.4, 1],
                                    rotate: [0, 180, 360],
                                } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <Zap size={22} strokeWidth={isActive('/science') ? 2.5 : 2} />
                            </motion.div>
                            <span className="text-[10px] font-medium">Știință</span>
                        </Link>

                        {/* Profile / Auth */}
                        <button
                            onClick={(e) => {
                                handleItemTap('Cont', e);
                                if (!user) onOpenAuth();
                            }}
                            className="flex flex-col items-center gap-1 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                        >
                            <motion.div
                                animate={activeItem === 'Cont' ? {
                                    y: [0, -5, 0],
                                    rotate: [0, 10, -10, 0],
                                } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                {user ? (
                                    <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-blue-600' : ''}`}>
                                        <div className={`w-6 h-6 rounded-full p-[1px] ${isActive('/profile') ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-gray-800">
                                                RP
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-medium">Profil</span>
                                    </Link>
                                ) : (
                                    <>
                                        <User size={22} strokeWidth={2} />
                                    </>
                                )}
                            </motion.div>
                            {!user && <span className="text-[10px] font-medium">Cont</span>}
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

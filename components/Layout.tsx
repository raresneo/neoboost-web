import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';

// --- Components ---
import { Navbar } from './ui/Navbar';
import { BottomNav } from './ui/BottomNav';
import { QuickNav } from './ui/QuickNav';
import { Preloader } from './ui/Preloader';
import { ScrollToTop } from './ui/ScrollToTop';
import { StickyCTA } from './ui/StickyCTA';
import { AmbientAudio } from './AmbientAudio';
import { ParticleBackground } from './ParticleBackground';
import { CookieBanner } from './CookieBanner';
import { SEO } from './SEO';
import { CustomCursor } from './ui/CustomCursor';
import { FilmGrain } from './ui/FilmGrain';
import { SocialProofToast } from './ui/SocialProofToast';
import { QuizModal } from './ui/QuizModal';

// --- Modals ---
import { LocationModal } from './modals/LocationModal';
import { PaymentSuccessModal } from './modals/PaymentSuccessModal';
import { BookingModal } from './BookingModal';
import { AuthModal } from './Auth/AuthModal';

// --- Utils ---
import { supabase } from '../lib/supabase';
import { LOCATIONS } from '../constants';

const trackEvent = (action: string, params: any) => {
    // Placeholder for analytics
    console.log('Track:', action, params);
};

export const Layout: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    // Theme State - Smart Auto-Switching
    // Default: Light mode during day (06:00 - 17:00), Dark mode otherwise (17:01 - 05:59)
    // Users can manually toggle, and preference overrides time.
    const [isLight, setIsLight] = useState(() => {
        // 1. Check if user has a manual preference saved
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme) {
            return savedTheme === 'light';
        }

        // 2. Default to Dark Mode (False) always
        return false;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
    }, [isLight]);

    // Auth State
    const [session, setSession] = useState<Session | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Modal States
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<typeof LOCATIONS[0] | null>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    // Audio State
    const [isMuted, setIsMuted] = useState(false);

    // Supabase Auth
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Check for success payment
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment_success')) {
            setShowSuccessModal(true);
            trackEvent('Purchase', {
                currency: 'RON',
                value: 0
            });
            // Replace URL to remove param
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, []);

    // Handle incoming hash on load
    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.substring(1);
            setTimeout(() => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, [location.hash]);

    const handleOpenLocation = (loc: typeof LOCATIONS[0]) => {
        setSelectedLocation(loc);
        setIsLocationModalOpen(true);
    };

    const isSpecialPage = location.pathname.startsWith('/science') || location.pathname.startsWith('/legal') || location.pathname.startsWith('/articol');

    return (
        <div className="relative min-h-screen selection:bg-[#3A86FF] selection:text-black pb-[80px] xl:pb-0">
            <CustomCursor />
            <FilmGrain />
            <SocialProofToast />
            {/* Default Global SEO - Pages can override */}
            <SEO
                title="NeoBoost — Transformare Corporală EMS Fitness Oradea"
                description="Studio EMS Premium Oradea. Antrenamente de 30 minute cu tehnologie wireless Drysuit."
                canonical="/"
            />

            <AmbientAudio isMuted={isMuted} />
            <ParticleBackground />

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className={`absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-40 ${isLight ? 'bg-blue-500/10 mix-blend-multiply' : 'bg-blue-500/15 mix-blend-screen'}`} />
                <div className={`absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-40 ${isLight ? 'bg-orange-500/10 mix-blend-multiply' : 'bg-indigo-500/15 mix-blend-screen'}`} />
            </div>

            {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}

            {!isLoading && (
                <>
                    {!isSpecialPage && (
                        <>
                            <Navbar
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                user={session?.user}
                                onOpenAuth={() => setIsAuthOpen(true)}
                                onOpenBooking={() => setIsBookingOpen(true)}
                                isLight={isLight}
                                setIsLight={setIsLight}
                            />
                            {/* Render BottomNav on Mobile Only */}
                            <BottomNav
                                onOpenBooking={() => setIsBookingOpen(true)}
                                onOpenAuth={() => setIsAuthOpen(true)}
                                onOpenQuiz={() => setIsQuizOpen(true)}
                                user={session?.user}
                            />
                        </>
                    )}

                    <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
                    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
                    <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
                    <LocationModal
                        location={selectedLocation}
                        isOpen={isLocationModalOpen}
                        onClose={() => {
                            setIsLocationModalOpen(false);
                            setSelectedLocation(null);
                        }}
                    />
                    <ScrollToTop />
                    <StickyCTA />
                    <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
                    <CookieBanner />

                    <main className="flex-1 relative">
                        <QuickNav />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                className="w-full h-full"
                            >
                                <Outlet context={{
                                    session,
                                    onOpenAuth: () => setIsAuthOpen(true),
                                    onOpenBooking: () => setIsBookingOpen(true),
                                    onOpenLocation: handleOpenLocation,
                                    isLight,
                                    isMuted
                                }} />
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </>
            )}
        </div>
    );
};

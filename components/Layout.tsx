
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Session } from '@supabase/supabase-js';

// --- Components ---
import { Navbar } from './ui/Navbar';
import { Preloader } from './ui/Preloader';
import { ScrollToTop } from './ui/ScrollToTop';
import { AmbientAudio } from './AmbientAudio';
import { ParticleBackground } from './ParticleBackground';
import { CookieBanner } from './CookieBanner';
import { SEO } from './SEO';

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
    const [isLoading, setIsLoading] = useState(false); // DEBUG: Disabled preloader

    // Theme State
    const [isLight, setIsLight] = useState(false);
    useEffect(() => {
        if (isLight) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [isLight]);

    // Auth State
    const [session, setSession] = useState<Session | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Modal States
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
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

    // Handle incoming hash on load (delegating smooth scroll logic to SmoothScroll context if needed, but simple element.scrollIntoView works too if native smooth scroll is off, but here we just rely on standard behavior or add a simple effect)
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

    const isSpecialPage = location.pathname.startsWith('/science') || location.pathname.startsWith('/legal');

    return (
        <div className="relative min-h-screen bg-black selection:bg-[#3A86FF] selection:text-black">
            {/* Default Global SEO - Pages can override */}
            <SEO
                title="NeoBoost — Bio-Electric Performance Oradea"
                description="Studio EMS Premium Oradea. Antrenamente de 20 minute cu tehnologie wireless Drysuit."
                canonical="/"
            />

            <AmbientAudio isMuted={isMuted} />
            <ParticleBackground />

            {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}

            {!isLoading && (
                <>
                    {!isSpecialPage && (
                        <Navbar
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                            user={session?.user}
                            onOpenAuth={() => setIsAuthOpen(true)}
                            onOpenBooking={() => setIsBookingOpen(true)}
                            isLight={isLight}
                            setIsLight={setIsLight}
                        />
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
                    <CookieBanner />

                    {/* Outlet for Pages */}
                    <Outlet context={{
                        session,
                        onOpenAuth: () => setIsAuthOpen(true),
                        onOpenBooking: () => setIsBookingOpen(true),
                        onOpenLocation: handleOpenLocation
                    }} />
                </>
            )}
        </div>
    );
};

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

import { ImmersiveHero } from '../components/sections/ImmersiveHero';
import { Benefits, Comparison, HowItWorks, Pricing, Locations, Faq, FinalCta } from '../components/home';
import { Footer } from '../components/Footer';

export const HomePage = () => {
    const { session, onOpenBooking, onOpenLocation } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
        onOpenLocation: (loc: any) => void;
    }>();

    return (
        <main id="home" className="relative min-h-screen bg-[var(--bg-primary)]">
            <ImmersiveHero onOpenBooking={onOpenBooking} />
            <Benefits />
            <Comparison />
            <HowItWorks />
            <Pricing session={session} onOpenBooking={onOpenBooking} />
            <Locations onOpenLocation={onOpenLocation} />
            <Faq />
            <FinalCta onOpenBooking={onOpenBooking} />
            <Footer />
        </main>
    );
};

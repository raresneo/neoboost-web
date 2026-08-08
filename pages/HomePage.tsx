import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

import { ImmersiveHero } from '../components/sections/ImmersiveHero';
import { Benefits, Comparison, HowItWorks, Locations, Faq, FinalCta, StatsMarquee } from '../components/home';
import { PricingSection } from '../components/home/PricingSection';
import { Footer } from '../components/Footer';

export const HomePage = () => {
    const { onOpenBooking, onOpenLocation } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
        onOpenLocation: (loc: any) => void;
    }>();

    return (
        <main id="home" className="relative min-h-screen bg-[var(--bg-primary)]">
            <ImmersiveHero onOpenBooking={onOpenBooking} />
            <StatsMarquee />
            <Benefits />
            <Comparison />
            <HowItWorks />
            <PricingSection onOpenBooking={onOpenBooking} />
            <Locations onOpenLocation={onOpenLocation} />
            <Faq />
            <FinalCta onOpenBooking={onOpenBooking} />
            <Footer />
        </main>
    );
};

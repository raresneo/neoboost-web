import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

import { CinematicHero } from '../components/cinematic/CinematicHero';
import { Benefits, Comparison, HowItWorks, Locations, Faq, FinalCta, StatsMarquee } from '../components/home';
import { PricingSection } from '../components/home/PricingSection';
import { Footer } from '../components/Footer';

/**
 * Home cinematic: hero de 15 secunde peste o lume 3D care rămâne în spatele
 * întregii pagini. La scroll camera zboară înainte prin porți, iar secțiunile
 * (transparente pe home, vezi styles/cinematic.css) se înclină spre vizitator.
 */
export const HomePage = () => {
    const { onOpenBooking, onOpenLocation } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
        onOpenLocation: (loc: any) => void;
    }>();

    return (
        <main id="home" className="nb-cinematic-home relative min-h-screen">
            <CinematicHero onOpenBooking={onOpenBooking} />
            <div className="relative z-10">
                <StatsMarquee />
                <Benefits />
                <Comparison />
                <HowItWorks />
                <PricingSection onOpenBooking={onOpenBooking} />
                <Locations onOpenLocation={onOpenLocation} />
                <Faq />
                <FinalCta onOpenBooking={onOpenBooking} />
                <Footer />
            </div>
        </main>
    );
};

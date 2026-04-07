import React from 'react';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { Footer } from '../components/Footer';
import { QuickBookingCTA } from '../components/ui/QuickBookingCTA';

export const ProgramsPage = () => {
    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white min-h-screen pt-20">
            {/* We might need to render Navbar here if it's not in Layout for this route, 
                but based on App.tsx, Layout wraps everything. So just content. */}

            <ProgramsSection />

            <div className="container mx-auto px-6 py-20">
                <QuickBookingCTA />
            </div>

            <Footer />
        </main>
    );
};

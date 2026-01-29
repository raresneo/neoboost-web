import React from 'react';
import { TeamSection } from '../components/sections/TeamSection';
import { Navbar } from '../components/ui/Navbar'; // Assuming we want the navbar here too if not in layout
import { Footer } from '../components/Footer'; // And footer
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const TeamPage = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-32 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-24 mb-16 text-center">
                <ScrollReveal>
                    <h1 className="text-6xl md:text-8xl font-black impact-font uppercase leading-none mb-6">
                        CUNOAȘTE-NE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">ECHIPA</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Oamenii din spatele tehnologiei. Profesioniști dedicați evoluției tale.
                    </p>
                </ScrollReveal>
            </div>

            {/* Reuse the TeamSection, but maybe we want to render it slightly differently? 
                The TeamSection component has its own 'CINE SUNTEM NOI' header. 
                We might want to hide that if we use it here, or just let it be. 
                For now, let's just render it. 
            */}
            <TeamSection />

            <Footer />
        </div>
    );
};

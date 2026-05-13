import { AboutSection } from '../components/sections/AboutSection';
import { TeamSection } from '../components/sections/TeamSection';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const TeamPage = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-32 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-24 mb-16 text-center">
                <ScrollReveal>
                    <h1 className="text-6xl md:text-8xl font-black impact-font uppercase leading-none mb-6">
                        CUNOAȘTE-NE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">ECHIPA</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Oamenii din spatele tehnologiei. Profesioniști dedicați evoluției tale.
                    </p>
                </ScrollReveal>
            </div>

            {/* NEW: About / Manifesto Section */}
            <AboutSection />

            {/* Existing Team Grid */}
            <TeamSection />



            <Footer />
        </div>
    );
};

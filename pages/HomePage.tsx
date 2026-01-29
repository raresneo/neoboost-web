import React, { useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

// --- Modules/Types ---
import { LOCATIONS, FAQS, TESTIMONIALS } from '../constants';
import { useStripeCheckout } from '../lib/useStripeCheckout';

// --- UI Components ---
import { FAQItem } from '../components/ui/FAQItem';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Footer } from '../components/Footer';
import { BioDecryption } from '../components/ui/BioDecryption';
import { AnimatedGraphic } from '../components/AnimatedGraphic';

// --- Iconic Lucide ---
import { Zap, HeartPulse, Target, TrendingUp, Clock, UserCheck, ShieldCheck, Layers, ArrowRight, Droplets } from 'lucide-react';

// --- Sections ---
import { ImmersiveHero } from '../components/sections/ImmersiveHero';
import { WhatIsEMSSection } from '../components/sections/WhatIsEMSSection';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { EMSEducation } from '../components/sections/EMSEducation';
import { TransformationSection } from '../components/sections/TransformationSection';
import { SafetySection } from '../components/sections/SafetySection';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { NoSuitSection } from '../components/sections/NoSuitSection';
import { ScienceSolutionsSection } from '../components/sections/ScienceSolutionsSection';
import { TrialRoadmap } from '../components/sections/TrialRoadmap';
import { SupplementsSection } from '../components/sections/SupplementsSection';
import { TeamSection } from '../components/sections/TeamSection';
import { TargetAudienceSection } from '../components/sections/TargetAudienceSection';
import { BenefitsGrid } from '../components/sections/BenefitsGrid';
import { QuickBookingCTA } from '../components/ui/QuickBookingCTA';

// --- UI ---
import { FlashcardReveal } from '../components/ui/FlashcardReveal';
import { ObjectiveSelector } from '../components/ui/ObjectiveSelector';

// Asset Maps
const locationImages = [
    '/ramada.jpg',
    '/getfit.jpg'
];

export const HomePage = () => {
    const navigate = useNavigate();
    const { session, onOpenBooking, onOpenLocation } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
        onOpenLocation: (loc: any) => void;
    }>();

    return (
        <main className="relative bg-transparent min-h-screen">
            {/* HERO */}
            <ImmersiveHero />

            {/* INTERACTIVE OBJECTIVE SELECTOR (Holo Style) */}
            <FlashcardReveal direction="bottom">
                <ObjectiveSelector />
            </FlashcardReveal>

            {/* WHAT IS EMS */}
            <FlashcardReveal direction="bottom">
                <WhatIsEMSSection />
            </FlashcardReveal>

            {/* TARGET AUDIENCE - NEW */}
            <TargetAudienceSection />

            {/* BENEFITS SECTION */}
            <section id="beneficii" className="py-20 md:py-32 relative border-t border-white/5 z-10 scroll-mt-24">
                <div className="container mx-auto px-6 md:px-24">
                    <FlashcardReveal direction="left">
                        <div className="text-center mb-20">
                            <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase mb-4 text-glow-subtle">Efecte Validate</p>
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase italic text-glow">
                                BENEFICII <span className="text-[#3A86FF]">REALE.</span>
                            </h2>
                        </div>
                    </FlashcardReveal>

                    <BenefitsGrid />

                    <QuickBookingCTA />
                </div>
            </section>

            {/* COMPARISON */}
            <section id="comparatie" className="relative scroll-mt-24">
                <FlashcardReveal direction="right">
                    <ComparisonSection />
                </FlashcardReveal>
                <div className="container mx-auto px-6">
                    <QuickBookingCTA />
                </div>
            </section>

            {/* SAFETY */}
            <section id="safety" className="relative scroll-mt-24">
                <FlashcardReveal direction="left">
                    <SafetySection />
                </FlashcardReveal>
            </section>

            {/* NO SUIT OPTION */}
            <section id="no-suit" className="relative scroll-mt-24">
                <FlashcardReveal direction="bottom">
                    <NoSuitSection onOpenBooking={onOpenBooking} />
                </FlashcardReveal>
            </section>



            {/* ROADMAP */}
            <FlashcardReveal direction="right">
                <TrialRoadmap />
            </FlashcardReveal>

            {/* PROGRAMS & PRICING */}
            <FlashcardReveal direction="bottom">
                <ProgramsSection />
            </FlashcardReveal>

            {/* EDUCATION */}
            <section id="metoda" className="relative scroll-mt-24">
                <FlashcardReveal direction="left">
                    <EMSEducation />
                </FlashcardReveal>
                <div className="container mx-auto px-6">
                    <QuickBookingCTA />
                </div>
            </section>

            {/* SUPPLEMENTS */}
            <section id="nutritie" className="relative scroll-mt-24">
                <FlashcardReveal direction="right">
                    <SupplementsSection />
                </FlashcardReveal>
            </section>

            {/* TRANSFORMATIONS & REVIEWS */}
            <section id="rezultate" className="relative scroll-mt-24">
                <FlashcardReveal direction="bottom">
                    <TransformationSection />
                </FlashcardReveal>
                <div className="pb-20 container mx-auto px-6">
                    <QuickBookingCTA />
                </div>
            </section>

            {/* TEAM / ABOUT US */}
            <section id="echipa" className="relative scroll-mt-24">
                <FlashcardReveal direction="left">
                    <TeamSection />
                </FlashcardReveal>
            </section>

            {/* LOCATIONS & FAQ (INFO SLIDE EQUIVALENT) */}
            <section id="contact-info" className="py-20 md:py-32 border-t border-white/5 bg-transparent relative z-10 scroll-mt-24">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* LOCATIONS */}
                        <FlashcardReveal direction="left">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black impact-font text-white mb-10 uppercase italic text-glow">Locații <span className="text-[#3A86FF]">NeoBoost.</span></h2>
                                <div className="grid gap-6">
                                    {LOCATIONS.map((loc, i) => (
                                        <div key={i} onClick={() => onOpenLocation(loc)} className="cursor-pointer group flex gap-6 items-center bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#3A86FF]/50 transition-all hover:bg-white/[0.08]">
                                            <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                <img src={locationImages[i]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={loc.name} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-white uppercase impact-font text-glow-subtle">{loc.name}</h3>
                                                <p className="text-white/50 text-sm mt-1">{loc.address}</p>
                                                <div className="mt-3 text-[#3A86FF] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    Vezi detalii <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FlashcardReveal>

                        {/* FAQ */}
                        <FlashcardReveal direction="right">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black impact-font text-white mb-10 uppercase italic text-glow">Întrebări <span className="text-[#3A86FF]">Frecvente.</span></h2>
                                <div className="space-y-4">
                                    {FAQS.map((faq, i) => (
                                        <FAQItem key={i} item={faq} i={i} />
                                    ))}
                                </div>
                            </div>
                        </FlashcardReveal>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

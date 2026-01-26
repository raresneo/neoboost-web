import React, { useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

// --- Modules/Types ---
import { LOCATIONS, FAQS, TESTIMONIALS } from '../constants';
import { useStripeCheckout } from '../lib/useStripeCheckout';

// --- UI Components ---
import { FAQItem } from '../components/ui/FAQItem';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Footer } from '../components/ui/Footer';
import { BioDecryption } from '../components/ui/BioDecryption';
import { AnimatedGraphic } from '../components/visuals/AnimatedGraphic';

// --- Iconic Lucide ---
import { Zap, HeartPulse, Target, TrendingUp, Clock, UserCheck, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

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

// Asset Maps
const locationImages = [
    '/ramada.jpg',
    '/getfit.jpg'
];

export default function HomePage() {
    const navigate = useNavigate();
    const { session, onOpenBooking, onOpenLocation } = useOutletContext<{
        session: Session | null;
        onOpenBooking: () => void;
        onOpenLocation: (loc: any) => void;
    }>();

    const [activeGraphic, setActiveGraphic] = useState<'energy' | 'muscle' | 'tech'>('energy');

    return (
        <main className="relative bg-transparent min-h-screen">
            {/* HERO */}
            <ImmersiveHero />

            {/* WHAT IS EMS */}
            <WhatIsEMSSection />

            {/* BENEFITS SECTION */}
            <section id="pentru-cine" className="py-20 md:py-32 relative border-t border-white/5">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="text-center mb-16">
                        <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase mb-4">Ce Câștigi</p>
                        <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase italic">
                            Beneficii <span className="text-[#3A86FF]">reale</span>, nu promisiuni
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="grid md:grid-cols-2 gap-6">
                            <SpotlightCard
                                onMouseEnter={() => setActiveGraphic('energy')}
                                onClick={() => navigate('/science/slabire-rapida')}
                                className="p-8 h-full glass-block group cursor-pointer border-[#3A86FF]/10 hover:border-[#3A86FF]/40"
                                spotlightColor="rgba(58, 134, 255, 0.15)"
                            >
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#3A86FF] group-hover:bg-[#3A86FF] group-hover:text-black transition-all">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-2xl font-black impact-font mb-2 text-white uppercase">SLĂBIRE RAPIDĂ</h3>
                                <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-4 italic">Arzi 500+ Kcal în 30 min</p>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    Metabolism accelerat timp de 72h. Ideal pentru scădere în greutate sănătoasă.
                                </p>
                                <div className="flex items-center gap-2 text-[#3A86FF] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Află mai multe <ArrowRight size={14} />
                                </div>
                            </SpotlightCard>

                            <SpotlightCard
                                onMouseEnter={() => setActiveGraphic('muscle')}
                                onClick={() => navigate('/science/dureri-spate')}
                                className="p-8 h-full glass-block group cursor-pointer border-[#3A86FF]/10 hover:border-[#3A86FF]/40"
                                spotlightColor="rgba(58, 134, 255, 0.15)"
                            >
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#3A86FF] group-hover:bg-[#3A86FF] group-hover:text-black transition-all">
                                    <HeartPulse size={24} />
                                </div>
                                <h3 className="text-2xl font-black impact-font mb-2 text-white uppercase">SĂNĂTATE SPATE</h3>
                                <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-4 italic">Postură corectată</p>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    Elimină durerile prin întărirea musculaturii paravertebrale profunde.
                                </p>
                                <div className="flex items-center gap-2 text-[#3A86FF] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Află mai multe <ArrowRight size={14} />
                                </div>
                            </SpotlightCard>

                            <SpotlightCard
                                onMouseEnter={() => setActiveGraphic('muscle')}
                                onClick={() => navigate('/science/tonifiere')}
                                className="p-8 h-full glass-block group cursor-pointer border-[#3A86FF]/10 hover:border-[#3A86FF]/40"
                                spotlightColor="rgba(58, 134, 255, 0.15)"
                            >
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#3A86FF] group-hover:bg-[#3A86FF] group-hover:text-black transition-all">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-2xl font-black impact-font mb-2 text-white uppercase">TONIFIERE</h3>
                                <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-4 italic">Definiție & Fermitate</p>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    Activare musculară de 90% pentru un corp sculptat și piele fermă.
                                </p>
                                <div className="flex items-center gap-2 text-[#3A86FF] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Află mai multe <ArrowRight size={14} />
                                </div>
                            </SpotlightCard>

                            <SpotlightCard
                                onMouseEnter={() => setActiveGraphic('tech')}
                                onClick={() => navigate('/science/forta-performanta')}
                                className="p-8 h-full glass-block group cursor-pointer border-[#3A86FF]/10 hover:border-[#3A86FF]/40"
                                spotlightColor="rgba(58, 134, 255, 0.15)"
                            >
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#3A86FF] group-hover:bg-[#3A86FF] group-hover:text-black transition-all">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-2xl font-black impact-font mb-2 text-white uppercase">PERFORMANȚĂ</h3>
                                <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-4 italic">Rezultate Sportive</p>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    Crește forța și explozivitatea fără a uza articulațiile.
                                </p>
                                <div className="flex items-center gap-2 text-[#3A86FF] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Află mai multe <ArrowRight size={14} />
                                </div>
                            </SpotlightCard>
                        </div>

                        <div className="hidden lg:block sticky top-32 h-[500px]">
                            <div className="relative w-full h-full glass-block p-4 border-[#3A86FF]/20 bg-black/20">
                                <AnimatedGraphic
                                    type={activeGraphic}
                                    bgImage={activeGraphic === 'energy' ? '/ems_training_1.jpg' : activeGraphic === 'muscle' ? '/ems_training_2.jpg' : '/ems_training_3.jpg'}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <ComparisonSection />

            {/* SAFETY */}
            <SafetySection />

            {/* NO SUIT OPTION */}
            <NoSuitSection onOpenBooking={onOpenBooking} />

            {/* SCIENCE & SOLUTIONS */}
            <ScienceSolutionsSection />

            {/* ROADMAP */}
            <TrialRoadmap />

            {/* PROGRAMS & PRICING */}
            <ProgramsSection />

            {/* EDUCATION */}
            <EMSEducation />

            {/* TRANSFORMATIONS & REVIEWS */}
            <TransformationSection />

            {/* LOCATIONS & FAQ (INFO SLIDE EQUIVALENT) */}
            <section id="contact-info" className="py-20 md:py-32 border-t border-white/5 bg-transparent">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* LOCATIONS */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black impact-font text-white mb-10 uppercase italic">Locații.</h2>
                            <div className="grid gap-6">
                                {LOCATIONS.map((loc, i) => (
                                    <div key={i} onClick={() => onOpenLocation(loc)} className="cursor-pointer group flex gap-6 items-center bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#3A86FF]/50 transition-all hover:bg-white/[0.08]">
                                        <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0 border border-white/10">
                                            <img src={locationImages[i]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={loc.name} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase impact-font">{loc.name}</h3>
                                            <p className="text-white/50 text-sm mt-1">{loc.address}</p>
                                            <div className="mt-3 text-[#3A86FF] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                Vezi detalii <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black impact-font text-white mb-10 uppercase italic">Întrebări.</h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <FAQItem key={i} item={faq} i={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

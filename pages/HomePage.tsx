
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, MoveUpRight, Zap, Target, HeartPulse, TrendingUp } from 'lucide-react';

// --- Sections ---
import { ImmersiveHero } from '../components/sections/ImmersiveHero';
import { BenefitArticlesSection } from '../components/sections/BenefitArticlesSection'; // Note: Not used directly in new Home? Wait, it was imported in App.tsx but seemingly unused in the main render block? 
// Checking App.tsx trace... It was imported but I don't see <BenefitArticlesSection /> in the `activeView !== 'science' ...` block. 
// Ah, `ComparisonSection` etc are there.
// Let's re-read the App.tsx render block in my head.
// Line 625: <EMSProtocolSubsection />
// Line 629: <ComparisonSection />
// Line 631: <ScienceSolutionsSection />
// Line 633: <TrialRoadmap />
// Line 635: <ProgramsSection />
// Line 637: <EMSTimeline />
// Line 639: <EMSEducation />
// Line 597: TECH_COMPONENTS...
// Line 374: BenefitsVideoBackground...
// It seems `BenefitArticlesSection` was NOT used in the Home view in the provided snippet?
// Wait, looking at line 16 of App.tsx: import { BenefitArticlesSection } ...
// Maybe it was used inside `activeView === 'science'` ? No, `SciencePage` is used there.
// I will keep it if it's needed, otherwise drop.

import { EMSProtocolSubsection } from '../components/sections/EMSProtocolSubsection';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { ScienceSolutionsSection } from '../components/sections/ScienceSolutionsSection';
import { TrialRoadmap } from '../components/sections/TrialRoadmap';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { EMSTimeline } from '../components/sections/EMSTimeline';
import { EMSEducation } from '../components/sections/EMSEducation';
import { TransformationSection } from '../components/sections/TransformationSection';
import { WhatIsEMSSection } from '../components/sections/WhatIsEMSSection';
import { NoSuitSection } from '../components/sections/NoSuitSection';

// --- UI Components ---
import { PackageCard } from '../components/ui/PackageCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { FAQItem } from '../components/ui/FAQItem';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { StaggeredText } from '../components/ui/StaggeredText';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { BioDecryption } from '../components/ui/BioDecryption';
import { AnimatedGraphic } from '../components/AnimatedGraphic';
import { StickyBanner } from '../components/ui/StickyBanner';

import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

// --- Backgrounds ---
import { BenefitsVideoBackground, BiohackVideoBackground } from '../components/backgrounds/CinematicBackground';

// --- Visuals ---
import { TiltImage } from '../components/visuals/TechVisuals';

// --- Constants ---
import { BRAND, BENEFITS, MONTHLY_PACKAGES, QUARTERLY_PACKAGES, LOCATIONS, FAQS, TECH_COMPONENTS, TESTIMONIALS, NeoPackage } from '../constants';

//Ctx Type
import { Session } from '@supabase/supabase-js';

type OutletContextType = {
    session: Session | null;
    onOpenAuth: () => void;
    onOpenBooking: () => void;
    onOpenLocation: (location: typeof LOCATIONS[0]) => void;
};

export const HomePage: React.FC = () => {
    const { session, onOpenAuth, onOpenLocation, onOpenBooking } = useOutletContext<OutletContextType>();
    const navigate = useNavigate();

    const [activeGraphic, setActiveGraphic] = useState<'muscle' | 'energy' | 'tech'>('muscle');
    const [activeBenefit, setActiveBenefit] = useState(0);
    const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'quarterly'>('monthly');

    const currentPackages = pricingPeriod === 'monthly' ? MONTHLY_PACKAGES : QUARTERLY_PACKAGES;

    // locationImages setup
    const locationImages = [
        "/ramada.jpg",
        "/getfit.jpg"
    ];

    const handleCheckout = async (pkg: NeoPackage) => {
        try {
            const price = parseInt(pkg.price.replace(/\D/g, ''));
            const isQuarterly = pricingPeriod === 'quarterly';
            const intervalCount = isQuarterly ? 3 : 1;

            const apiUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    priceId: pkg.stripePriceId,
                    amount: price,
                    productName: `${pkg.title} (${pricingPeriod === 'monthly' ? 'Lunar' : '3 Luni'})`,
                    interval: 'month',
                    intervalCount: intervalCount
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server status ${res.status}: ${errorText.substring(0, 50)}`);
            }

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`Eroare Stripe: ${data.error || 'Serverul nu a returnat un URL valid.'}`);
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            const msg = err.message || 'Verifică conexiunea la internet.';
            alert(`Eroare conexiune: ${msg}`);
        }
    };

    return (
        <>
            <SEO
                title="Bio-Electric Performance"
                description="NeoBoost EMS Oradea. Antrenamente de 30 min = 4 ore de sală. Tehnologie EMS wireless Neo Boost pentru slăbire și tonifiere rapidă."
                canonical="/"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FAQS.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                }}
            />
            <ImmersiveHero />
            <WhatIsEMSSection />

            {/* ===== PENTRU CINE ESTE NEOBOOST ===== */}
            <section id="pentru-cine" className="pt-24 md:pt-32 pb-20 md:pb-32 bg-[#030303] relative z-10 overflow-hidden scroll-mt-20">
                <BenefitsVideoBackground />
                <div className="container mx-auto px-6 md:px-24 relative z-10">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-4">Ce Poți Obține</p>
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white">
                                Beneficii <span className="text-[#3A86FF]">reale</span>, nu promisiuni
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="grid md:grid-cols-2 gap-6 order-2 lg:order-1">
                            {/* Benefit 1 - Slăbire */}
                            <ScrollReveal delay={0}>
                                <SpotlightCard
                                    onMouseEnter={() => setActiveGraphic('energy')}
                                    onClick={() => navigate('/science')}
                                    className={`p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'energy' ? 'bg-[#0a0a0a] border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                    spotlightColor="rgba(0, 240, 255, 0.2)"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors ${activeGraphic === 'energy' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                        <Zap size={28} />
                                    </div>
                                    <h3 className={`text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'energy' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>SLĂBIRE RAPIDĂ</h3>
                                    <p className="text-[#3A86FF] text-xs font-bold uppercase tracking-wider mb-3">Fără dietă extremă</p>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                        Arzi până la <span className="text-white font-bold"><BioDecryption text="500 kcal" /></span> în <BioDecryption text="30 min" className="text-white font-bold" /> și activezi metabolismul pentru încă 48h (efect afterburn).
                                    </p>
                                    <div className="flex items-center gap-2 text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                                        Vezi explicația științifică <MoveUpRight size={12} />
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>

                            {/* Benefit 2 - Dureri de Spate */}
                            <ScrollReveal delay={100}>
                                <SpotlightCard
                                    onMouseEnter={() => setActiveGraphic('muscle')}
                                    onClick={() => navigate('/science')}
                                    className={`p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'muscle' ? 'bg-[#0a0a0a] border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                    spotlightColor="rgba(0, 240, 255, 0.2)"
                                >
                                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#3A86FF] text-white text-[8px] font-black uppercase tracking-wider rounded">Popular</div>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors ${activeGraphic === 'muscle' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                        <HeartPulse size={28} />
                                    </div>
                                    <h3 className={`text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'muscle' ? 'text-white' : 'text-white group-hover:text-white'}`}>ADIO DURERI DE SPATE</h3>
                                    <p className="text-[#3A86FF] text-xs font-bold uppercase tracking-wider mb-3">Fără frică de mișcare</p>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                        Clienții noștri spun că după 6-8 ședințe pot sta la birou fără durere lombară.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                                        Cum funcționează, pas cu pas <MoveUpRight size={12} />
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>

                            {/* Benefit 3 - Tonifiere */}
                            <ScrollReveal delay={200}>
                                <SpotlightCard
                                    onMouseEnter={() => setActiveGraphic('muscle')}
                                    onClick={() => navigate('/science')}
                                    className={`p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'muscle' ? 'bg-[#0a0a0a] border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                    spotlightColor="rgba(0, 240, 255, 0.2)"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors ${activeGraphic === 'muscle' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                        <Target size={28} />
                                    </div>
                                    <h3 className={`text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'muscle' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>TONIFIERE</h3>
                                    <p className="text-[#3A86FF] text-xs font-bold uppercase tracking-wider mb-3">Fără rușine la sală</p>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                        Musculatura se activează 90% simultan. Rezultate vizibile în 4-8 săptămâni.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                                        Ce înseamnă „tonifiere” în realitate <MoveUpRight size={12} />
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>

                            {/* Benefit 4 - Performanță */}
                            <ScrollReveal delay={300}>
                                <SpotlightCard
                                    onMouseEnter={() => setActiveGraphic('tech')}
                                    onClick={() => navigate('/science')}
                                    className={`p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'tech' ? 'bg-[#0a0a0a] border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                    spotlightColor="rgba(0, 240, 255, 0.2)"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors ${activeGraphic === 'tech' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                        <TrendingUp size={28} />
                                    </div>
                                    <h3 className={`text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'tech' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>FORȚĂ & PERFORMANȚĂ</h3>
                                    <p className="text-[#3A86FF] text-xs font-bold uppercase tracking-wider mb-3">Fără risc de accidentare</p>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                        Recrutare rapidă a fibrelor musculare, creștere forță fără stres articular.
                                    </p>
                                    <div className="flex items-center gap-2 text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                                        Protocolul care reduce riscul <MoveUpRight size={12} />
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        </div>

                        {/* Interactive Graphic Display */}
                        <div className="hidden lg:block sticky top-32 order-1 lg:order-2 h-[600px]">
                            <div className="relative w-full h-full glass-block p-2 border-[#3A86FF]/20 bg-black/40">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3A86FF] to-transparent opacity-50"></div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className={`w-2 h-2 rounded-full ${activeGraphic === 'energy' ? 'bg-[#3A86FF] animate-pulse' : 'bg-white/10'}`}></div>
                                    <div className={`w-2 h-2 rounded-full ${activeGraphic === 'muscle' ? 'bg-[#3A86FF] animate-pulse' : 'bg-white/10'}`}></div>
                                    <div className={`w-2 h-2 rounded-full ${activeGraphic === 'tech' ? 'bg-[#3A86FF] animate-pulse' : 'bg-white/10'}`}></div>
                                </div>
                                <div className="absolute bottom-6 left-6 z-10">
                                    <h4 className="text-white font-black impact-font text-2xl uppercase mb-1">
                                        {activeGraphic === 'energy' ? 'Metabolism' : activeGraphic === 'muscle' ? 'Activare' : 'Precizie'}
                                    </h4>
                                    <p className="text-white/40 text-xs mono-font">
                                        {activeGraphic === 'energy' ? 'Analiză consum caloric' : activeGraphic === 'muscle' ? 'Harta musculară' : 'Sincronizare impulsuri'}
                                    </p>
                                </div>
                                <AnimatedGraphic
                                    type={activeGraphic}
                                    bgImage={
                                        activeGraphic === 'energy' ? '/ems_training_1.jpg' :
                                            activeGraphic === 'muscle' ? '/ems_training_2.jpg' :
                                                '/ems_training_3.jpg'
                                    }
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="metoda" className="pt-28 md:pt-40 pb-24 md:pb-40 bg-[#020202] relative z-10 overflow-hidden scroll-mt-20">
                <BiohackVideoBackground />
                <div className="container mx-auto px-6 md:px-24 relative z-20">
                    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">

                        {/* LEFT COLUMN - Interactive Visual Display */}
                        <div className="order-2 lg:order-1 relative lg:sticky lg:top-32 h-[500px] md:h-[600px]">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700">
                                {/* Dynamic Visual content based on activeBenefit */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Visual 0: Drysuit -> Tech Graphic */}
                                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeBenefit === 0 ? 'opacity-100' : 'opacity-0'}`}>
                                        <AnimatedGraphic type="tech" bgImage="/drysuit_pro.png" className="w-full h-full" />
                                        <div className="absolute bottom-10 left-10 text-4xl font-black text-white mix-blend-overlay opacity-50">DRYSUIT</div>
                                    </div>

                                    {/* Visual 1: Wireless -> Energy Graphic */}
                                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeBenefit === 1 ? 'opacity-100' : 'opacity-0'}`}>
                                        <AnimatedGraphic type="energy" bgImage="/powerbox_pro_v2.jpg" className="w-full h-full" />
                                        <div className="absolute bottom-10 left-10 text-4xl font-black text-white mix-blend-overlay opacity-50">WIRELESS</div>
                                    </div>

                                    {/* Visual 2: Control -> Muscle Graphic */}
                                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeBenefit === 2 ? 'opacity-100' : 'opacity-0'}`}>
                                        <AnimatedGraphic type="muscle" bgImage="/control_app_pro.png" className="w-full h-full" />
                                        <div className="absolute bottom-10 left-10 text-4xl font-black text-white mix-blend-overlay opacity-50">CONTROL</div>
                                    </div>

                                    {/* Visual 3: Hygiene -> Tech Graphic (Tinted) */}
                                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeBenefit === 3 ? 'opacity-100' : 'opacity-0'}`}>
                                        <AnimatedGraphic type="tech" bgImage="/drysuit_rack.png" className="w-full h-full" />
                                        <div className="absolute bottom-10 left-10 text-4xl font-black text-white mix-blend-overlay opacity-50">PURE</div>
                                    </div>

                                    {/* Fallback Overlay text */}
                                    <div className="absolute top-10 right-10 mono-font text-[#3A86FF] tracking-widest text-xs font-bold bg-black/50 px-3 py-1 rounded-full border border-[#3A86FF]/20">
                                        FIG. {activeBenefit + 1}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Text List */}
                        <div className="order-1 lg:order-2 space-y-2">
                            <ScrollReveal>
                                <p className="mono-font text-[9px] tracking-[0.6em] text-[#3A86FF] font-bold uppercase mb-8">Protocol NeoBoost</p>
                                <h2 className="text-5xl md:text-7xl font-black impact-font text-white leading-[0.9] mb-12">
                                    TEHNOLOGIE EMS <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] via-[#00F0FF] to-[#3A86FF] bg-[200%_auto] animate-gradient">
                                        &amp; BIO-TECH.
                                    </span>
                                </h2>
                            </ScrollReveal>

                            <div className="space-y-4">
                                {BENEFITS.map((b, i) => (
                                    <SpotlightCard
                                        key={i}
                                        onMouseEnter={() => setActiveBenefit(i)}
                                        className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 ease-out relative overflow-hidden ${activeBenefit === i ? 'bg-[#3A86FF] border border-[#3A86FF] shadow-[0_0_30px_rgba(58,134,255,0.3)]' : 'glass-block'}`}
                                        spotlightColor="rgba(58, 134, 255, 0.25)"
                                    >
                                        <div className="flex items-start gap-6 relative z-10">
                                            <div className={`p-3 rounded-lg transition-colors duration-300 ${activeBenefit === i ? 'bg-black/20 text-white' : 'bg-white/5 text-[#3A86FF]'}`}>
                                                {b.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-bold uppercase mb-2 transition-colors duration-300 ${activeBenefit === i ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                                    {b.title}
                                                </h3>
                                                <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeBenefit === i ? 'text-white/90' : 'text-white/50 group-hover:text-white/70'}`}>
                                                    {b.description}
                                                </p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                {/* Separation Line / Flow Connector */}
                <div className="w-px h-32 bg-gradient-to-b from-[#3A86FF]/0 via-[#3A86FF]/50 to-[#3A86FF]/0 mx-auto my-24 hidden lg:block"></div>

                <div className="container mx-auto px-6 md:px-24 relative z-10">

                    <div className="space-y-48">
                        {TECH_COMPONENTS.map((comp, idx) => (
                            <div key={comp.id} className={`grid lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <ScrollReveal className={`${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                    <div className={`relative aspect-video overflow-visible border-none group`}>
                                        <TiltImage
                                            src={comp.image}
                                            alt={comp.title}
                                            isPowerBox={comp.id === 'powerbox'}
                                            isControlApp={comp.id === 'control'}
                                            isDrysuit={['drysuit', 'costum', 'ems-suit'].some(id => comp.id.includes(id))}
                                        />
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal delay={200} className={`space-y-8 ${idx % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                                    <h3 className="text-5xl md:text-7xl font-black impact-font text-white bg-black/20 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">{comp.title}</h3>
                                    <p className={`text-lg text-gray-200 font-medium leading-relaxed max-w-xl bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 ${idx % 2 !== 0 ? 'ml-auto' : ''}`}>{comp.description}</p>
                                    <div className={`flex flex-wrap gap-2 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                                        {comp.features.map(f => (
                                            <span key={f} className="px-4 py-1.5 border border-white/20 bg-black/60 text-[8px] mono-font uppercase tracking-widest text-white/80 font-bold">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </div>
                        ))}
                    </div>

                    <EMSProtocolSubsection />
                </div>
            </section>

            <ComparisonSection />
            <NoSuitSection onOpenBooking={onOpenBooking} />

            <ScienceSolutionsSection />

            <TrialRoadmap />

            <ProgramsSection />

            {/* <EMSTimeline /> - Removed as duplicate/legacy */}
            <EMSEducation />

            <TransformationSection />

            <section id="recenzii" className="py-24 md:py-60 bg-[#030303] relative z-10 overflow-hidden scroll-mt-20">
                <div className="container mx-auto px-6 md:px-24">
                    <ScrollReveal className="mb-24 md:mb-40">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-12 h-px bg-[#3A86FF]"></div>
                            <span className="mono-font text-[9px] text-[#3A86FF] font-black tracking-[0.6em] uppercase">Experiența Clienților</span>
                        </div>
                        <h2 className="text-7xl md:text-[14vw] font-black impact-font text-white leading-[0.75] tracking-tighter">POVEȘTI.<br /><span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>DE SUCCES.</span></h2>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <TestimonialCard key={i} testimonial={t} i={i} />
                        ))}
                    </div>

                    {/* CTA After Testimonials */}
                    <ScrollReveal delay={400}>
                        <div className="mt-16 text-center">
                            <p className="text-white/50 text-lg mb-6">Vrei și tu rezultate similare?</p>
                            <a
                                href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Am văzut recenziile și vreau să aflu mai multe despre EMS.`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-3 bg-[#3A86FF] text-black px-8 py-4 text-lg font-black impact-font hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.4)]"
                            >
                                <MessageCircle size={20} />
                                SCRIE-NE PE WHATSAPP
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section id="abonamente" className="pt-28 md:pt-40 pb-24 md:pb-60 bg-black text-white relative z-20 rounded-t-[5vw] overflow-hidden scroll-mt-20">
                <div className="absolute inset-0 grid-bg opacity-30"></div>
                <div className="container mx-auto px-6 md:px-24 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
                        <ScrollReveal>
                            <div className="text-7xl md:text-[14vw] font-black impact-font leading-[0.7] tracking-tighter heading-glow">
                                <StaggeredText text="TARIFE." />
                            </div>
                            <p className="text-[#3A86FF]/50 text-base font-bold tracking-[0.3em] mt-8 border-l-2 border-[#3A86FF]/20 pl-6 uppercase">Program de transformare accelerată.</p>
                        </ScrollReveal>

                        <ScrollReveal delay={200} className="w-full lg:w-auto">
                            <div className="relative p-1.5 bg-white/5 border border-white/10 rounded-full flex gap-1 w-fit">
                                <button onClick={() => setPricingPeriod('monthly')} className={`relative z-10 px-10 py-3.5 text-[10px] font-black tracking-widest uppercase transition-all duration-700 rounded-full ${pricingPeriod === 'monthly' ? 'text-black' : 'text-white/40'}`}>LUNAR</button>
                                <button onClick={() => setPricingPeriod('quarterly')} className={`relative z-10 px-10 py-3.5 text-[10px] font-black tracking-widest uppercase transition-all duration-700 rounded-full ${pricingPeriod === 'quarterly' ? 'text-black' : 'text-white/40'}`}>3 LUNI</button>
                                <div className={`absolute top-1.5 bottom-1.5 bg-[#3A86FF] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(0,245,255,0.4)]`} style={{ left: pricingPeriod === 'monthly' ? '6px' : 'calc(50% + 1px)', width: 'calc(50% - 7px)' }} />
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        {currentPackages.map((pkg, i) => (
                            <PackageCard
                                key={`${pricingPeriod}-${i}`}
                                pkg={pkg}
                                i={i}
                                user={session?.user}
                                onOpenAuth={onOpenAuth}
                                onCheckout={handleCheckout}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="locatii" className="py-24 md:py-60 bg-black relative z-10 scroll-mt-20">
                <div className="container mx-auto px-6 md:px-24">
                    <ScrollReveal>
                        <div className="text-7xl md:text-[12vw] font-black impact-font text-white leading-none mb-24 uppercase">
                            <StaggeredText text="LOCAȚII." />
                        </div>
                    </ScrollReveal>
                    <div className="grid lg:grid-cols-2 gap-24">
                        {LOCATIONS.map((loc, i) => (
                            <ScrollReveal key={i} delay={i * 200}>
                                <div
                                    onClick={() => onOpenLocation(loc)}
                                    className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                                >
                                    <div className="relative aspect-video overflow-hidden mb-10 border border-white/10 group-hover:border-white/40 transition-all duration-700 rounded-2xl">
                                        <img
                                            src={locationImages[i]}
                                            alt={loc.name}
                                            loading="lazy"
                                            decoding="async"
                                            className={`w-full h-full object-cover transition-all duration-1000 object-center`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>

                                        {/* Hover CTA Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-sm">
                                            <div className="text-center">
                                                <MessageCircle size={48} className="text-[#3A86FF] mx-auto mb-4 animate-bounce" />
                                                <p className="text-white font-black text-xl uppercase tracking-wider">Vezi mai multe</p>
                                                <p className="text-white/60 text-sm mt-2">Galerie & Programare</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black impact-font text-white mb-4 group-hover:text-[#3A86FF] transition-colors">{loc.name}</h3>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4 text-white/30 mono-font text-[10px] uppercase tracking-widest font-bold">
                                            <Target size={14} className="text-[#3A86FF]" /> {loc.address}
                                        </div>
                                        <p className="text-white/20 text-sm font-light leading-relaxed max-w-sm">{loc.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="py-24 md:py-60 bg-[#050505] relative z-10 scroll-mt-20">
                <div className="container mx-auto px-6 md:px-24">
                    <ScrollReveal>
                        <div className="flex flex-col items-center mb-24">
                            <div className="flex items-center gap-4 mb-6">
                                <MessageCircle className="text-[#3A86FF]" size={20} />
                                <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Informații Tehnice</span>
                            </div>
                            <h2 className="text-7xl md:text-9xl font-black impact-font text-white text-center">ÎNTREBĂRI.</h2>
                        </div>
                    </ScrollReveal>
                    <div className="max-w-3xl mx-auto border-t border-white/5">
                        {FAQS.map((faq, i) => (
                            <FAQItem key={i} item={faq} i={i} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <button
                onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/\s/g, '')}`, '_blank')}
                className="fixed bottom-24 right-6 z-[90] w-12 h-12 md:w-14 md:h-14 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-500 bg-black/50 backdrop-blur-md rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                aria-label="Contact WhatsApp"
            >
                <MessageCircle size={24} />
            </button>

            <StickyBanner />
        </>
    );
};

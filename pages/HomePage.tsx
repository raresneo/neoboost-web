
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, MoveUpRight, Zap, Target, HeartPulse, TrendingUp } from 'lucide-react';

// --- Sections ---
import { ImmersiveHero } from '../components/sections/ImmersiveHero';
// BenefitArticlesSection removed (unused here)

import { WhatIsEMSSection } from '../components/sections/WhatIsEMSSection';
import { MixHealthSection } from '../components/sections/MixHealthSection';

// Lazy Load heavy sections below the fold
const ComparisonSection = React.lazy(() => import('../components/sections/ComparisonSection').then(module => ({ default: module.ComparisonSection })));
const ScienceSolutionsSection = React.lazy(() => import('../components/sections/ScienceSolutionsSection').then(module => ({ default: module.ScienceSolutionsSection })));
const TrialRoadmap = React.lazy(() => import('../components/sections/TrialRoadmap').then(module => ({ default: module.TrialRoadmap })));
const ProgramsSection = React.lazy(() => import('../components/sections/ProgramsSection').then(module => ({ default: module.ProgramsSection })));
const EMSEducation = React.lazy(() => import('../components/sections/EMSEducation').then(module => ({ default: module.EMSEducation })));
const TransformationSection = React.lazy(() => import('../components/sections/TransformationSection').then(module => ({ default: module.TransformationSection })));
const NoSuitSection = React.lazy(() => import('../components/sections/NoSuitSection').then(module => ({ default: module.NoSuitSection })));
const SafetySection = React.lazy(() => import('../components/sections/SafetySection').then(module => ({ default: module.SafetySection })));

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

    // --- Scroll Logic ---
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isVerticallyScrollable = (element: HTMLElement) => {
            return element.scrollHeight > element.clientHeight;
        };

        const handleWheel = (e: WheelEvent) => {
            // Check if we are hovering over a scrollable element
            const path = e.composedPath();
            let isOverScrollable = false;

            for (const node of path) {
                if (node instanceof HTMLElement && node !== container) {
                    const style = window.getComputedStyle(node);
                    const canScrollVertically = (style.overflowY === 'auto' || style.overflowY === 'scroll') && node.scrollHeight > node.clientHeight;

                    if (canScrollVertically) {
                        // Check bounds with a small tolerance
                        const atBottom = Math.abs(node.scrollHeight - node.scrollTop - node.clientHeight) < 2;
                        const atTop = node.scrollTop <= 1;

                        if (e.deltaY > 0 && !atBottom) {
                            isOverScrollable = true;
                            break;
                        } else if (e.deltaY < 0 && !atTop) {
                            isOverScrollable = true;
                            break;
                        }
                    }
                }
                if (node === container) break;
            }

            if (isOverScrollable) return; // Let native vertical scroll happen

            // Otherwise, hijack for horizontal
            // Check if it's a "touchpad" smooth scroll vs a "mouse" clicky wheel?
            // Hard to detect perfectly, but we can just map delta.
            e.preventDefault();

            // "Efect scrol viteza" - slightly higher multiplier + smoothing via CSS scroll-behavior
            const velocity = 2.5;
            container.scrollLeft += e.deltaY * velocity;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        // Clean up
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const scrollNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
        }
    };

    return (
        <>
            <SEO
                title="Antrenamente EMS și Nutriție MYX în Oradea – slăbești și te tonifiezi în 30 de minute | Neo-BOOST"
                description="NeoBoost EMS Oradea. Antrenamente de 30 min = 4 ore de sală. Tehnologie EMS wireless și Nutriție MYX pentru slăbire și tonifiere rapidă."
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

            {/* HORIZONTAL WRAPPER */}
            <div ref={containerRef} className="flex flex-row h-screen w-max overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">

                {/* HERO - Full Width */}
                <div className="w-[100vw] h-full shrink-0 relative overflow-hidden snap-center">
                    <ImmersiveHero />

                    {/* Hero Specific Hint - Initial Guide */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2 animate-pulse text-white/50">
                        <div className="flex items-center gap-4">
                            <span className="mono-font text-[10px] uppercase tracking-[0.2em]">{activeGraphic === 'tech' ? 'SWIPE' : 'SCROLL'}</span>
                            <div className="w-12 h-px bg-white/30"></div>
                            <span className="mono-font text-[10px] uppercase tracking-[0.2em]">&gt;&gt;&gt;</span>
                        </div>
                    </div>
                </div>

                {/* What Is EMS */}
                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent">
                    <WhatIsEMSSection />
                </div>

                {/* Benefits / Pentru Cine - with custom bg/styling preservation */}
                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent relative z-10">
                    <section id="pentru-cine" className="py-12 md:py-24 relative min-h-full">
                        <div className="container mx-auto px-6 md:px-24 relative z-10">
                            <div className="text-center mb-12">
                                <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-4">Ce Câștigi</p>
                                <h2 className="text-4xl md:text-6xl font-black impact-font text-white">
                                    Beneficii <span className="text-[#3A86FF]">reale</span>, nu promisiuni
                                </h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 items-start">
                                <div className="grid md:grid-cols-2 gap-4 lg:gap-6 order-2 lg:order-1">
                                    {/* Benefit 1 */}
                                    <SpotlightCard
                                        onMouseEnter={() => setActiveGraphic('energy')}
                                        onClick={() => navigate('/science')}
                                        className={`p-6 lg:p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'energy' ? 'bg-black/40 border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                        spotlightColor="rgba(0, 240, 255, 0.2)"
                                    >
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mb-4 lg:mb-6 transition-colors ${activeGraphic === 'energy' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                            <Zap size={24} />
                                        </div>
                                        <h3 className={`text-xl lg:text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'energy' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>SLĂBIRE RAPIDĂ</h3>
                                        <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-2 lg:mb-3">Fără dietă extremă</p>
                                        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 flex-grow font-medium">
                                            Arzi până la <span className="text-white font-bold"><BioDecryption text="500 kcal" /></span> în <BioDecryption text="30 min" className="text-white font-bold" />.
                                        </p>
                                    </SpotlightCard>
                                    {/* ... rest of cards similarly optimized to take less height/padding ... */}
                                    {/* Benefit 2 */}
                                    <SpotlightCard
                                        onMouseEnter={() => setActiveGraphic('muscle')}
                                        onClick={() => navigate('/science')}
                                        className={`p-6 lg:p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'muscle' ? 'bg-black/40 border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                        spotlightColor="rgba(0, 240, 255, 0.2)"
                                    >
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mb-4 lg:mb-6 transition-colors ${activeGraphic === 'muscle' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                            <HeartPulse size={24} />
                                        </div>
                                        <h3 className={`text-xl lg:text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'muscle' ? 'text-white' : 'text-white group-hover:text-white'}`}>ADIO DURERI</h3>
                                        <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-2 lg:mb-3">Spate protejat</p>
                                        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 flex-grow font-medium">
                                            Soluție dovedită pentru dureri lombare și postură incorectă.
                                        </p>
                                    </SpotlightCard>

                                    {/* Benefit 3 */}
                                    <SpotlightCard
                                        onMouseEnter={() => setActiveGraphic('muscle')}
                                        onClick={() => navigate('/science')}
                                        className={`p-6 lg:p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'muscle' ? 'bg-black/40 border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                        spotlightColor="rgba(0, 240, 255, 0.2)"
                                    >
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mb-4 lg:mb-6 transition-colors ${activeGraphic === 'muscle' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                            <Target size={24} />
                                        </div>
                                        <h3 className={`text-xl lg:text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'muscle' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>TONIFIERE</h3>
                                        <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-2 lg:mb-3">Fermitate</p>
                                        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 flex-grow font-medium">
                                            Activare musculară profundă pentru un corp definit.
                                        </p>
                                    </SpotlightCard>

                                    {/* Benefit 4 */}
                                    <SpotlightCard
                                        onMouseEnter={() => setActiveGraphic('tech')}
                                        onClick={() => navigate('/science')}
                                        className={`p-6 lg:p-8 h-full transition-all duration-500 group block cursor-pointer flex flex-col rounded-2xl relative overflow-hidden ${activeGraphic === 'tech' ? 'bg-black/40 border border-[#3A86FF] shadow-lg shadow-[#3A86FF]/10' : 'glass-block'}`}
                                        spotlightColor="rgba(0, 240, 255, 0.2)"
                                    >
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mb-4 lg:mb-6 transition-colors ${activeGraphic === 'tech' ? 'bg-[#3A86FF] text-white' : 'bg-white/10 text-[#3A86FF] group-hover:bg-[#3A86FF]/20'}`}>
                                            <TrendingUp size={24} />
                                        </div>
                                        <h3 className={`text-xl lg:text-2xl font-black impact-font mb-2 transition-colors ${activeGraphic === 'tech' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>PERFORMANȚĂ</h3>
                                        <p className="text-[#3A86FF] text-[10px] font-bold uppercase tracking-wider mb-2 lg:mb-3">Fără risc</p>
                                        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 flex-grow font-medium">
                                            Crește forța și explozivitatea fără a uzura articulațiile.
                                        </p>
                                    </SpotlightCard>
                                </div>
                                <div className="hidden lg:block sticky top-32 order-1 lg:order-2 h-[400px]">
                                    {/* Reduced Interactive Graphic - Kept simpler for Horizontal View */}
                                    <div className="relative w-full h-full glass-block p-2 border-[#3A86FF]/20 bg-black/20">
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
                </div>

                <React.Suspense fallback={<div className="w-[100vw] h-full shrink-0 flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#3A86FF] border-t-transparent rounded-full animate-spin"></div></div>}>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><SafetySection /></div>
                </React.Suspense>

                {/* MYX SECTION - Full Screen Expandable (Eager) */}
                <MixHealthSection />

                {/* Method Section - Custom Wrap */}
                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar relative z-10 transition-all bg-transparent">
                    <section id="metoda" className="pt-20 md:pt-32 pb-20 md:pb-32 bg-transparent relative z-10 overflow-hidden">
                        <div className="container mx-auto px-6 md:px-24">
                            {/* Simplified Method Layout for Horizontal consistency */}
                            <div className="flex flex-col gap-10">
                                <ScrollReveal>
                                    <h2 className="text-5xl md:text-7xl font-black impact-font text-white leading-[0.9]">
                                        TEHNICĂ. <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] via-[#00F0FF] to-[#3A86FF]">AVANSATĂ.</span>
                                    </h2>
                                </ScrollReveal>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {BENEFITS.map((b, i) => (
                                        <div key={i} className="glass-block p-6 rounded-xl border border-white/5 bg-black/10">
                                            <div className="text-[#3A86FF] mb-4">{b.icon}</div>
                                            <h3 className="text-white font-bold uppercase mb-2">{b.title}</h3>
                                            <p className="text-white/60 text-sm">{b.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <React.Suspense fallback={<div className="w-[100vw] h-full shrink-0 flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#3A86FF] border-t-transparent rounded-full animate-spin"></div></div>}>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><ComparisonSection /></div>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><NoSuitSection onOpenBooking={onOpenBooking} /></div>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><ScienceSolutionsSection /></div>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><TrialRoadmap /></div>

                    {/* Programs - Might need width adjustment if cards are too cramped. Using 100vw for now */}
                    <div className="min-w-[100vw] w-fit h-full shrink-0 overflow-y-auto custom-scrollbar px-6 md:px-24 flex items-center justify-center snap-center bg-transparent">
                        <ProgramsSection />
                    </div>

                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><EMSEducation /></div>
                    <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent"><TransformationSection /></div>
                </React.Suspense>

                {/* Reviews */}
                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent flex flex-col justify-center">
                    <section id="recenzii" className="py-8 lg:py-[5vh] bg-transparent relative z-10">
                        <div className="container mx-auto px-6 md:px-24">
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white mb-8">RECENZII.</h2>
                            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                                {TESTIMONIALS.slice(0, 4).map((t, i) => (
                                    <TestimonialCard key={i} testimonial={t} i={i} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Pricing - Wrapped */}
                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent flex flex-col justify-center">
                    <section id="abonamente" className="py-8 lg:py-[5vh] relative z-20">
                        <div className="container mx-auto px-6 md:px-24">
                            <div className="mb-8">
                                <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase">TARIFE.</h2>
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => setPricingPeriod('monthly')} className={`px-6 py-2 rounded-full font-bold uppercase ${pricingPeriod === 'monthly' ? 'bg-[#3A86FF] text-black' : 'bg-white/10 text-white'}`}>Lunar</button>
                                    <button onClick={() => setPricingPeriod('quarterly')} className={`px-6 py-2 rounded-full font-bold uppercase ${pricingPeriod === 'quarterly' ? 'bg-[#3A86FF] text-black' : 'bg-white/10 text-white'}`}>3 Luni</button>
                                </div>
                            </div>
                            <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-6">
                                {currentPackages.map((pkg, i) => (
                                    <PackageCard key={`${pricingPeriod}-${i}`} pkg={pkg} i={i} user={session?.user} onOpenAuth={onOpenAuth} onCheckout={handleCheckout} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent flex flex-col justify-center">
                    <section id="locatii" className="py-8 lg:py-[5vh] relative z-10">
                        <div className="container mx-auto px-6 md:px-24">
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white mb-8 uppercase">LOCAȚII.</h2>
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                                {LOCATIONS.map((loc, i) => (
                                    <div key={i} onClick={() => onOpenLocation(loc)} className="cursor-pointer group">
                                        <div className="aspect-video relative rounded-2xl overflow-hidden mb-6 border border-white/10">
                                            <img src={locationImages[i]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={loc.name} />
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                                        </div>
                                        <h3 className="text-3xl font-black text-white">{loc.name}</h3>
                                        <p className="text-white/50">{loc.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="w-[100vw] h-full shrink-0 overflow-y-auto custom-scrollbar bg-transparent flex flex-col justify-center">
                    <section id="faq" className="py-8 lg:py-[5vh]">
                        <div className="container mx-auto px-6 md:px-24">
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white mb-8 text-center uppercase">ÎNTREBĂRI.</h2>
                            <div className="max-w-3xl mx-auto">
                                {FAQS.map((faq, i) => (
                                    <FAQItem key={i} item={faq} i={i} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>

            </div>
            {/* END HORIZONTAL WRAPPER */}

            {/* --- FIXED NAVIGATION ARROWS --- */}
            {/* Right Arrow - Always enticing user to scroll right */}
            <div
                onClick={scrollNext}
                className="fixed top-1/2 right-4 -translate-y-1/2 z-[60] cursor-pointer hidden md:flex flex-col items-center gap-2 group"
            >
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-[#3A86FF] flex items-center justify-center shadow-[0_0_20px_rgba(58,134,255,0.4)] group-hover:scale-110 group-hover:bg-[#3A86FF] group-hover:text-black transition-all duration-300">
                    <MoveUpRight size={24} className="text-[#3A86FF] group-hover:text-black rotate-45 transition-colors" />
                </div>
                <span className="text-[9px] mono-font text-[#3A86FF] group-hover:text-white font-bold uppercase tracking-widest -rotate-90 origin-center translate-y-8 transition-colors">NEXT</span>
            </div>

            {/* Left Hint - Appears visually to balance */}
            <div
                onClick={scrollPrev}
                className="fixed top-1/2 left-4 -translate-y-1/2 z-[60] cursor-pointer hidden md:flex flex-col items-center gap-2 group opacity-50 hover:opacity-100 transition-opacity"
            >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                    <MoveUpRight size={16} className="text-white group-hover:text-black -rotate-[135deg] transition-colors" />
                </div>
            </div>

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

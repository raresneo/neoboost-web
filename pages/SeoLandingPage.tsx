import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO_PAGES, SeoPageConfig } from '../lib/seo_pages';
import { SEO } from '../components/SEO';
import { ImmersiveHero } from '../components/sections/ImmersiveHero';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { EMSTimeline } from '../components/sections/EMSTimeline';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { TrialRoadmap } from '../components/sections/TrialRoadmap';
import { StickyBanner } from '../components/ui/StickyBanner';
import { PackageCard } from '../components/ui/PackageCard';
// Prețuri aliniate la GymOS (MONTHLY_PACKAGES din constants avea Progress 710 în loc de 750)
import { MONTHLY_PACKAGES_SYNCED as MONTHLY_PACKAGES } from '../lib/offer3plus1';
import { MoveUpRight, MessageCircle } from 'lucide-react';

export const SeoLandingPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Find the matching config
    const pageConfig = SEO_PAGES.find(p => p.slug === slug);

    useEffect(() => {
        if (!pageConfig) {
            // Redirect home for unknown slugs — prevents "page not found" on scroll
            navigate('/', { replace: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pageConfig, navigate]);

    // While redirecting, render nothing
    if (!pageConfig) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <SEO
                title={pageConfig.title}
                description={pageConfig.description}
                canonical={`/${pageConfig.slug}`}
                // Combine main keyword with secondary ones
                keywords={[pageConfig.keyword, ...(pageConfig.secondaryKeywords || []), "EMS Oradea", "NeoBoost"]}
                // Inject specific Schema based on intent?
                jsonLd={
                    pageConfig.intent === 'local' ? {
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "NeoBoost EMS Oradea",
                        "description": pageConfig.description,
                        "url": `https://neo-boost.com/${pageConfig.slug}`,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Oradea"
                        }
                    } : undefined
                }
            />

            {/* --- LAYOUT SWITCHER --- */}

            {/* 1. LOCAL INTENT LAYOUT (Trust, Location, General Info) */}
            {pageConfig.intent === 'local' && (
                <>
                    <ImmersiveHero />
                    <div className="container mx-auto px-6 py-12 text-center relative z-10">
                        <div className="inline-block px-4 py-2 border border-[var(--accent-primary)]/30 rounded-full bg-[var(--bg-secondary)] mb-6">
                            <span className="font-mono text-[var(--accent-primary)] font-medium uppercase tracking-widest text-xs">
                                {pageConfig.keyword}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display uppercase max-w-4xl mx-auto mb-8 text-[var(--text-primary)]">
                            Antrenament EMS în <span className="text-[var(--accent-primary)]">Oradea</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
                            Descoperă cum tehnologia NeoBoost îți poate transforma corpul chiar aici, în orașul tău.
                            Studio privat, vestiare individuale și parcare gratuită.
                        </p>
                    </div>

                    <ComparisonSection />
                    <EMSTimeline />
                    <ProgramsSection />
                </>
            )}

            {/* 2. COMMERCIAL INTENT LAYOUT (Pricing, Offers, Conversion) */}
            {pageConfig.intent === 'commercial' && (
                <>
                    <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                        <div className="inline-block px-4 py-2 border border-[var(--success)]/30 rounded-full bg-[var(--bg-secondary)] mb-6">
                            <span className="font-mono text-[var(--success)] font-medium uppercase tracking-widest text-xs">
                                Ofertă Limitată
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display uppercase text-[var(--text-primary)] mb-8">
                            {pageConfig.title}
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12">
                            {pageConfig.description}
                        </p>

                        {/* Quick Pricing Grid for conversion */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                            {MONTHLY_PACKAGES.slice(0, 3).map((pkg: any, i: number) => (
                                <PackageCard
                                    key={i}
                                    pkg={pkg}
                                    i={i}
                                    onOpenAuth={() => window.open(`https://wa.me/40769124019?text=Vreau oferta ${pkg.title}`, '_blank')}
                                    onCheckout={() => window.open(`https://wa.me/40769124019?text=Vreau oferta ${pkg.title}`, '_blank')}
                                />
                            ))}
                        </div>
                    </div>
                    <TrialRoadmap />
                </>
            )}

            {/* 3. INFORMATIONAL INTENT LAYOUT (Article style, Education) */}
            {pageConfig.intent === 'informational' && (
                <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                    <button onClick={() => navigate('/')} className="text-[var(--accent-primary)] flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                        <MoveUpRight size={16} className="rotate-[225deg]" />
                        <span className="font-mono font-medium uppercase tracking-widest text-xs">Înapoi la Home</span>
                    </button>

                    <h1 className="text-4xl md:text-6xl font-bold font-display uppercase mb-8 leading-tight text-[var(--text-primary)]">
                        {pageConfig.title}
                    </h1>

                    <div className="max-w-none space-y-6">
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            {pageConfig.description}
                        </p>
                        <p className="text-[var(--text-secondary)]">
                            Tehnologia EMS (Electrical Muscle Stimulation) este o inovație care permite antrenarea completă a corpului în doar 30 de minute.
                            La NeoBoost Oradea, folosim sistemul Wireless DrySuit, care elimină necesitatea umezirii costumului și oferă o igienă impecabilă.
                        </p>

                        <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-12 mb-6">De ce să alegi NeoBoost?</h3>
                        <ul className="list-disc pl-6 space-y-4 text-[var(--text-secondary)]">
                            <li><strong className="text-[var(--text-primary)]">Timp Câștigat:</strong> 30 minute intense în loc de ore pierdute la sală.</li>
                            <li><strong className="text-[var(--text-primary)]">Protecție Articulară:</strong> Lucrezi mușchii la maxim, fără să îți uzezi spatele sau genunchii.</li>
                            <li><strong className="text-[var(--text-primary)]">Atenție Exclusivă:</strong> Ești singur în studio cu antrenorul tău. Fără aglomerație.</li>
                        </ul>

                        <div className="my-12 p-8 bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/30 rounded-[var(--radius-xl)] text-center">
                            <h4 className="text-2xl font-bold font-display uppercase mb-4 text-[var(--text-primary)]">Pregătit să încerci?</h4>
                            <p className="mb-6 text-[var(--text-secondary)]">Te invităm la o sesiune de probă gratuită în Oradea.</p>
                            <a href="https://wa.me/40769124019" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-white px-6 py-3 rounded-full font-bold uppercase hover:bg-[var(--accent-secondary)] transition-colors shadow-[0_0_30px_rgba(58,134,255,0.35)]">
                                <MessageCircle size={20} />
                                Programare Rapidă
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <StickyBanner />
        </div>
    );
};

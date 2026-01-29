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
import { MONTHLY_PACKAGES } from '../constants';
import { MoveUpRight, MessageCircle } from 'lucide-react';

export const SeoLandingPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Find the matching config
    const pageConfig = SEO_PAGES.find(p => p.slug === slug);

    useEffect(() => {
        if (!pageConfig) {
            // Optional: redirect to 404 or Home if not found
            // navigate('/', { replace: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pageConfig, navigate]);

    if (!pageConfig) {
        return (
            <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Pagina nu a fost găsită</h1>
                    <button onClick={() => navigate('/')} className="text-[#3A86FF] hover:underline">
                        Înapoi la pagina principală
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-transparent min-h-screen text-white selection:bg-[#3A86FF] selection:text-black">
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
                        <div className="inline-block px-4 py-2 border border-[#3A86FF]/30 rounded-full bg-[#3A86FF]/10 mb-6">
                            <span className="text-[#3A86FF] font-bold uppercase tracking-widest text-xs">
                                {pageConfig.keyword}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black impact-font uppercase max-w-4xl mx-auto mb-8">
                            Antrenament EMS în <span className="text-[#3A86FF]">Oradea</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
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
                        <div className="inline-block px-4 py-2 border border-[#25D366]/30 rounded-full bg-[#25D366]/10 mb-6">
                            <span className="text-[#25D366] font-bold uppercase tracking-widest text-xs">
                                Ofertă Limitată
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black impact-font uppercase text-white mb-8">
                            {pageConfig.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            {pageConfig.description}
                        </p>

                        {/* Quick Pricing Grid for conversion */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                            {MONTHLY_PACKAGES.slice(0, 3).map((pkg, i) => (
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
                    <button onClick={() => navigate('/')} className="text-[#3A86FF] flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                        <MoveUpRight size={16} className="rotate-[225deg]" />
                        <span className="font-bold uppercase tracking-widest text-xs">Înapoi la Home</span>
                    </button>

                    <h1 className="text-4xl md:text-6xl font-black impact-font uppercase mb-8 leading-tight">
                        {pageConfig.title}
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {pageConfig.description}
                        </p>
                        <p>
                            Tehnologia EMS (Electrical Muscle Stimulation) este o inovație care permite antrenarea completă a corpului în doar 30 de minute.
                            La NeoBoost Oradea, folosim sistemul Wireless DrySuit, care elimină necesitatea umezirii costumului și oferă o igienă impecabilă.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-6">De ce să alegi NeoBoost?</h3>
                        <ul className="list-disc pl-6 space-y-4 text-gray-300">
                            <li><strong>Timp Câștigat:</strong> 30 minute intense în loc de ore pierdute la sală.</li>
                            <li><strong>Protecție Articulară:</strong> Lucrezi mușchii la maxim, fără să îți uzezi spatele sau genunchii.</li>
                            <li><strong>Atenție Exclusivă:</strong> Ești singur în studio cu antrenorul tău. Fără aglomerație.</li>
                        </ul>

                        <div className="my-12 p-8 bg-[#3A86FF]/10 border border-[#3A86FF] rounded-2xl text-center">
                            <h4 className="text-2xl font-black uppercase mb-4">Pregătit să încerci?</h4>
                            <p className="mb-6">Te invităm la o sesiune de probă gratuită în Oradea.</p>
                            <a href="https://wa.me/40769124019" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#3A86FF] text-black px-6 py-3 rounded-lg font-bold uppercase hover:scale-105 transition-transform">
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

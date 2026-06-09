import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveUpRight, Clock, Users, TrendingUp } from 'lucide-react';
import { getExtendedProgram } from '../../extendedPrograms';
import { SEO } from '../../components/SEO';
import {
    ForWhoSection,
    WorkoutDetailsSection,
    IncludesSection,
    PricingSection,
    BonusesSection,
    Reward3Plus1Section,
    ConditionsSection,
    ConsultationSection,
    AfterConsultationSection,
    LocationSection
} from '../../components/program/sections';
import { StepForm } from '../../components/Forms/StepForm';
import { FORM_CONFIGS } from '../../components/Forms/formConfig';

export const ProgramLandingPage: React.FC = () => {
    const { programId } = useParams<{ programId: string }>();
    const navigate = useNavigate();
    const [showForm, setShowForm] = React.useState(false);

    const program = programId ? getExtendedProgram(programId) : undefined;

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, [programId]);

    if (!program) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Program nu a fost găsit</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#3A86FF] hover:underline"
                    >
                        Înapoi la pagina principală
                    </button>
                </div>
            </div>
        );
    }

    const formConfig = FORM_CONFIGS[program.id];

    if (showForm && formConfig) {
        return <StepForm config={formConfig} onClose={() => setShowForm(false)} programId={program.id} />;
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* SEO */}
            {program.seo && (
                <SEO
                    title={program.seo.title}
                    description={program.seo.description}
                    ogImage={program.image}
                    canonical={`/program/${program.id}`}
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": program.title,
                        "description": program.description,
                        "image": `https://neo-boost.com${program.image}`,
                        "brand": {
                            "@type": "Brand",
                            "name": "NeoBoost"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://neo-boost.com/program/${program.id}`,
                            "priceCurrency": "RON",
                            "price": program.pricing?.specialPrice ? program.pricing.specialPrice.replace(/\D/g, '') : "0",
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "Organization",
                                "name": "NeoBoost EMS"
                            }
                        }
                    }}
                />
            )}

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#3A86FF] transition-colors"
                    >
                        <MoveUpRight size={20} className="rotate-[225deg]" />
                        <span className="font-black uppercase tracking-wider">Înapoi</span>
                    </button>

                    <h1 className="text-xl md:text-2xl font-black impact-font uppercase tracking-tighter truncate max-w-[50%] text-gray-900">
                        {program.title}
                    </h1>

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-[#3A86FF] text-white px-6 py-2 rounded-lg font-black uppercase text-sm hover:scale-105 transition-transform"
                    >
                        Aplică Acum
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden mt-16">
                <img
                    src={program.image}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20">
                    <span className="inline-block px-4 py-2 bg-[#3A86FF] rounded-full text-white text-xs font-black uppercase tracking-widest mb-6 w-fit shadow-md">
                        {program.tag}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black impact-font uppercase leading-none tracking-tighter mb-6 text-gray-900">
                        {program.title}
                    </h1>
                    <p className="text-2xl md:text-4xl font-bold text-[#3A86FF] mb-8">
                        {program.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 max-w-3xl leading-relaxed font-medium">
                        {program.description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-20">
                {/* Quick Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-gray-50 p-8 border border-gray-100 rounded-2xl text-center shadow-sm">
                        <Clock size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-gray-500 font-black mb-2">Durată</div>
                        <div className="text-2xl font-bold text-gray-900">{program.duration}</div>
                    </div>

                    <div className="bg-gray-50 p-8 border border-gray-100 rounded-2xl text-center shadow-sm">
                        <Users size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-gray-500 font-black mb-2">Ideal Pentru</div>
                        <div className="text-2xl font-bold text-gray-900">{program.idealFor}</div>
                    </div>

                    <div className="bg-gray-50 p-8 border border-gray-100 rounded-2xl text-center shadow-sm">
                        <TrendingUp size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-gray-500 font-black mb-2">Beneficiu</div>
                        <div className="text-2xl font-bold text-gray-900">{program.benefit}</div>
                    </div>
                </div>

                {/* All Sections */}
                <ForWhoSection ideal={program.forWho.ideal} notFor={program.forWho.notFor} />

                {/* Video Section */}
                {program.video && (
                    <section className="mb-20">
                        {/* Container fitted to video size to avoid black bars */}
                        <div className="glass-block p-4 border-[#3A86FF]/20 rounded-2xl overflow-hidden w-fit mx-auto">
                            {program.video.includes('youtube.com') || program.video.includes('youtu.be') ? (
                                <iframe
                                    src={program.video.includes('/shorts/')
                                        ? program.video.replace('youtube.com/shorts/', 'www.youtube.com/embed/')
                                        : program.video.replace('watch?v=', 'embed/')
                                    }
                                    title={program.title}
                                    className="h-[600px] aspect-[9/16] mx-auto rounded-xl border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={program.video}
                                    controls
                                    className="h-[600px] w-auto mx-auto rounded-xl object-contain"
                                />
                            )}
                        </div>
                    </section>
                )}

                <WorkoutDetailsSection
                    duration={program.workoutDetails.duration}
                    frequency={program.workoutDetails.frequency}
                    format={program.workoutDetails.format}
                    structure={program.workoutDetails.structure}
                />

                <IncludesSection includes={program.includes} />

                {/* Gallery Section */}
                {program.gallery && (
                    <section className="mb-20">
                        <h2 className="text-3xl font-black impact-font uppercase mb-8 text-center text-gray-900">
                            Galerie <span className="text-[#3A86FF]">Foto</span>
                        </h2>
                        {/* Using columns for masonry intent or simple grid depending on images */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {program.gallery.map((item, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md">
                                    {item.includes('youtube.com') || item.includes('youtu.be') ? (
                                        <div className="aspect-[9/16] w-full">
                                            <iframe
                                                src={item.includes('/shorts/')
                                                    ? item.replace('youtube.com/shorts/', 'www.youtube.com/embed/')
                                                    : item.includes('watch?v=')
                                                        ? item.replace('watch?v=', 'embed/')
                                                        : item.replace('youtu.be/', 'www.youtube.com/embed/')
                                                }
                                                title={`Gallery Video ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={item}
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-auto object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <PricingSection
                    specialPrice={program.pricing.specialPrice}
                    referencePackages={program.pricing.referencePackages}
                    details={program.pricing.details}
                    onOpenForm={() => setShowForm(true)}
                />

                <BonusesSection bonuses={program.bonuses} />

                <Reward3Plus1Section
                    enabled={program.reward3Plus1.enabled}
                    conditions={program.reward3Plus1.conditions}
                    description={program.reward3Plus1.description}
                />

                <ConditionsSection conditions={program.participationConditions} />

                <ConsultationSection
                    title={program.freeConsultation.title}
                    description={program.freeConsultation.description}
                    calendlyLink={program.freeConsultation.calendlyLink}
                />

                <AfterConsultationSection text={program.afterConsultation} />

                <LocationSection />

                {/* Final CTA */}
                <div className="mt-20 text-center">
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-4 bg-[#3A86FF] text-white px-12 py-6 rounded-2xl font-black impact-font text-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(58,134,255,0.4)]"
                    >
                        APLICĂ PENTRU ACEST PROGRAM
                    </button>
                </div>
            </main>
        </div>
    );
};

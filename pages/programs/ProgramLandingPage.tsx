import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveUpRight, Target } from 'lucide-react';
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
        <div className="min-h-screen bg-black text-white">
            {/* SEO */}
            {program.seo && (
                <SEO
                    title={program.seo.title}
                    description={program.seo.description}
                    ogImage={program.image}
                    canonical={`/program/${program.id}`}
                />
            )}

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-[#3A86FF] hover:text-white transition-colors"
                    >
                        <MoveUpRight size={20} className="rotate-[225deg]" />
                        <span className="font-black uppercase tracking-wider">Înapoi</span>
                    </button>

                    <h1 className="text-xl md:text-2xl font-black impact-font uppercase tracking-tighter truncate max-w-[50%]">
                        {program.title}
                    </h1>

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-[#3A86FF] text-black px-6 py-2 rounded-lg font-black uppercase text-sm hover:scale-105 transition-transform"
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
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20">
                    <span className="inline-block px-4 py-2 bg-[#3A86FF]/20 border border-[#3A86FF] rounded-full text-[#3A86FF] text-xs font-black uppercase tracking-widest mb-6 w-fit">
                        {program.tag}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black impact-font uppercase leading-none tracking-tighter mb-6">
                        {program.title}
                    </h1>
                    <p className="text-2xl md:text-4xl font-bold text-[#3A86FF] mb-8">
                        {program.subtitle}
                    </p>
                    <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                        {program.description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-20">
                {/* Quick Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                        <Target size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Durată</div>
                        <div className="text-2xl font-bold text-white">{program.duration}</div>
                    </div>

                    <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                        <Target size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Ideal Pentru</div>
                        <div className="text-2xl font-bold text-white">{program.idealFor}</div>
                    </div>

                    <div className="glass-block p-8 border-[#3A86FF]/20 rounded-2xl text-center">
                        <Target size={32} className="text-[#3A86FF] mx-auto mb-4" />
                        <div className="text-sm uppercase tracking-widest text-[#3A86FF] font-black mb-2">Beneficiu</div>
                        <div className="text-2xl font-bold text-white">{program.benefit}</div>
                    </div>
                </div>

                {/* All Sections */}
                <ForWhoSection ideal={program.forWho.ideal} notFor={program.forWho.notFor} />

                <WorkoutDetailsSection
                    duration={program.workoutDetails.duration}
                    frequency={program.workoutDetails.frequency}
                    format={program.workoutDetails.format}
                    structure={program.workoutDetails.structure}
                />

                <IncludesSection includes={program.includes} />

                <PricingSection
                    specialPrice={program.pricing.specialPrice}
                    referencePackages={program.pricing.referencePackages}
                    details={program.pricing.details}
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
                        className="inline-flex items-center gap-4 bg-[#3A86FF] text-black px-12 py-6 rounded-2xl font-black impact-font text-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(58,134,255,0.4)]"
                    >
                        APLICĂ PENTRU ACEST PROGRAM
                    </button>
                </div>
            </main>
        </div>
    );
};

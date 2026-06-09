import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, CheckCircle2, XCircle, Clock, Dumbbell, Zap, Gift,
    Star, CheckCheck, MapPin, CalendarCheck, MessageCircle, ArrowRight,
} from 'lucide-react';
import { getExtendedProgram } from '../../extendedPrograms';
import { SEO } from '../../components/SEO';
import { StepForm } from '../../components/Forms/StepForm';
import { FORM_CONFIGS } from '../../components/Forms/formConfig';
import { BRAND } from '../../constants';
import { waLink } from '../../components/home';

const WA = (msg: string) => waLink(msg);

/* ── reusable mini-components ── */
const SectionHead: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
    <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">{eyebrow}</p>
        <h2 className="font-display text-3xl font-black uppercase italic tracking-tight text-gray-900 md:text-4xl">{title}</h2>
    </div>
);

export const ProgramLandingPage: React.FC = () => {
    const { programId } = useParams<{ programId: string }>();
    const navigate = useNavigate();
    const [showForm, setShowForm] = React.useState(false);

    React.useEffect(() => { window.scrollTo(0, 0); }, [programId]);

    const program = programId ? getExtendedProgram(programId) : undefined;

    if (!program) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
                <div className="text-center">
                    <h1 className="mb-4 font-display text-4xl font-black text-[var(--text-primary)]">Program negăsit</h1>
                    <button onClick={() => navigate('/programe')} className="font-bold text-[var(--accent-primary)] underline">
                        Înapoi la programe
                    </button>
                </div>
            </div>
        );
    }

    const formConfig = FORM_CONFIGS[program.id];
    if (showForm && formConfig) {
        return <StepForm config={formConfig} onClose={() => setShowForm(false)} programId={program.id} />;
    }

    const videoSrc = program.video
        ? program.video.includes('/shorts/')
            ? program.video.replace('youtube.com/shorts/', 'www.youtube.com/embed/') + '?rel=0&modestbranding=1'
            : program.video.includes('watch?v=')
                ? program.video.replace('watch?v=', 'embed/') + '?rel=0'
                : program.video
        : null;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {program.seo && (
                <SEO
                    title={program.seo.title}
                    description={program.seo.description}
                    ogImage={program.image}
                    canonical={`/program/${program.id}`}
                    jsonLd={{
                        "@context": "https://schema.org", "@type": "Product",
                        "name": program.title, "description": program.description,
                        "image": `https://neo-boost.com${program.image}`,
                        "brand": { "@type": "Brand", "name": "NeoBoost" },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://neo-boost.com/program/${program.id}`,
                            "priceCurrency": "RON",
                            "price": program.pricing?.specialPrice?.replace(/\D/g, '') || "0",
                            "availability": "https://schema.org/InStock",
                            "seller": { "@type": "Organization", "name": "NeoBoost EMS" }
                        }
                    }}
                />
            )}

            {/* ── STICKY HEADER ── */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
                    <button
                        onClick={() => navigate('/programe')}
                        className="inline-flex items-center gap-1.5 font-bold text-gray-500 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeft size={18} /> Programe
                    </button>
                    <h1 className="max-w-[45%] truncate font-display text-lg font-black uppercase italic text-gray-900 md:text-xl">
                        {program.title}
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#3A86FF] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-700"
                    >
                        Aplică <ArrowRight size={15} />
                    </button>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="relative h-[65vh] overflow-hidden md:h-[75vh]">
                <img src={program.image} alt={program.title} fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 md:px-10">
                    <span className="mb-5 inline-block w-fit rounded-full bg-[#3A86FF] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white">
                        {program.tag}
                    </span>
                    <h1 className="font-display text-5xl font-black uppercase italic leading-none tracking-tight text-gray-900 md:text-7xl">
                        {program.title}
                    </h1>
                    <p className="mt-3 text-2xl font-bold text-[#3A86FF] md:text-3xl">{program.subtitle}</p>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">{program.description}</p>
                </div>
            </section>

            {/* ── QUICK INFO ── */}
            <section className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-gray-100 px-5 md:px-10">
                    {[
                        { icon: <Clock size={22} />, label: 'Durată', value: program.duration },
                        { icon: <Dumbbell size={22} />, label: 'Ideal pentru', value: program.idealFor },
                        { icon: <Zap size={22} />, label: 'Beneficiu', value: program.benefit },
                    ].map((c) => (
                        <div key={c.label} className="flex flex-col items-center gap-1 px-4 py-7 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                            <span className="shrink-0 text-[#3A86FF]">{c.icon}</span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{c.label}</p>
                                <p className="text-sm font-bold text-gray-900 md:text-base">{c.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mx-auto max-w-7xl space-y-0 px-5 md:px-10">

                {/* ── FOR WHO ── */}
                <section className="py-16 md:py-20">
                    <SectionHead eyebrow="Potrivire" title="Pentru cine este programul?" />
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-[var(--radius-lg)] border border-green-100 bg-green-50/50 p-7">
                            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-black uppercase text-green-700">
                                <CheckCircle2 size={22} /> Ideal pentru
                            </h3>
                            <ul className="space-y-3">
                                {program.forWho.ideal.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-[var(--radius-lg)] border border-red-100 bg-red-50/50 p-7">
                            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-black uppercase text-red-600">
                                <XCircle size={22} /> Nu este pentru
                            </h3>
                            <ul className="space-y-3">
                                {program.forWho.notFor.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                                        <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── VIDEO ── */}
                {videoSrc && (
                    <section className="pb-16 md:pb-20">
                        <SectionHead eyebrow="Preview" title="Vezi cum arată" />
                        <div className="flex justify-center">
                            <div className="w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-gray-100 shadow-lg">
                                <div className="aspect-[9/16]">
                                    <iframe src={videoSrc} title={program.title} className="h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen style={{ border: 0 }} />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── WORKOUT DETAILS ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Structură" title="Cum sunt antrenamentele?" />
                    <div className="mb-6 grid gap-4 md:grid-cols-3">
                        {[
                            { icon: <Clock size={20} />, label: 'Durată', value: program.workoutDetails.duration },
                            { icon: <Dumbbell size={20} />, label: 'Frecvență', value: program.workoutDetails.frequency },
                            { icon: <Zap size={20} />, label: 'Format', value: program.workoutDetails.format },
                        ].map((c) => (
                            <div key={c.label} className="rounded-[var(--radius-lg)] border border-gray-100 bg-gray-50 p-6">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#3A86FF]/10 text-[#3A86FF]">{c.icon}</div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{c.label}</p>
                                <p className="mt-1 font-bold text-gray-900">{c.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-gray-100 bg-gray-50 p-7">
                        <h3 className="mb-4 font-display text-lg font-black uppercase text-gray-900">Structura antrenamentelor</h3>
                        <ul className="space-y-3">
                            {program.workoutDetails.structure.map((s, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-[#3A86FF]" /> {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── INCLUDES ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Ce primești" title="Ce este inclus" />
                    <div className="grid gap-3 sm:grid-cols-2">
                        {program.includes.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 text-sm leading-relaxed text-gray-700">
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#3A86FF]" /> {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── GALLERY ── */}
                {program.gallery && program.gallery.length > 0 && (
                    <section className="border-t border-gray-100 py-16 md:py-20">
                        <SectionHead eyebrow="Galerie" title="Imagini din program" />
                        <div className="grid gap-3 md:grid-cols-3">
                            {program.gallery.map((item, idx) => {
                                const isYT = item.includes('youtube.com') || item.includes('youtu.be');
                                const ytSrc = isYT
                                    ? item.includes('/shorts/') ? item.replace('youtube.com/shorts/', 'www.youtube.com/embed/')
                                        : item.includes('watch?v=') ? item.replace('watch?v=', 'embed/')
                                            : item.replace('youtu.be/', 'www.youtube.com/embed/')
                                    : '';
                                return (
                                    <div key={idx} className="overflow-hidden rounded-[var(--radius-lg)] border border-gray-100">
                                        {isYT ? (
                                            <div className="aspect-[9/16]">
                                                <iframe src={ytSrc} title={`Gallery ${idx + 1}`} className="h-full w-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen style={{ border: 0 }} />
                                            </div>
                                        ) : (
                                            <img src={item} alt={`Galerie ${idx + 1}`} loading="lazy" className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ── PRICING ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Investiție" title="Prețuri" />
                    <div className="rounded-[var(--radius-xl)] border border-[#3A86FF]/20 bg-blue-50/40 p-8 text-center md:p-12">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3A86FF]">Preț special program</p>
                        <p className="mt-3 font-display text-4xl font-black italic text-gray-900 md:text-5xl">
                            {program.pricing.specialPrice}
                        </p>
                        <button onClick={() => setShowForm(true)}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A86FF] px-8 py-4 font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-700">
                            <Star size={17} className="fill-current" /> Aplică pentru program
                        </button>
                        <p className="mt-3 text-sm text-gray-500">sau scrie-ne pe <a href={WA(`Salut! Vreau detalii despre programul ${program.title}.`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:underline">WhatsApp</a></p>
                    </div>
                </section>

                {/* ── BONUSES ── */}
                {program.bonuses?.length > 0 && (
                    <section className="border-t border-gray-100 py-16 md:py-20">
                        <SectionHead eyebrow="Extra" title="Bonusuri incluse" />
                        <div className="grid gap-3 sm:grid-cols-2">
                            {program.bonuses.map((b, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-5">
                                    <Gift size={20} className="shrink-0 text-amber-500" />
                                    <span className="text-sm font-medium text-gray-800">{b}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 3+1 REWARD ── */}
                {program.reward3Plus1?.enabled && (
                    <section className="border-t border-gray-100 py-16 md:py-20">
                        <SectionHead eyebrow="Recompensă" title="Oferta 3 + 1 Gratuit" />
                        <div className="rounded-[var(--radius-xl)] border border-[#3A86FF]/20 bg-blue-50/40 p-7 md:p-9">
                            <p className="mb-6 text-base leading-relaxed text-gray-700">{program.reward3Plus1.description}</p>
                            <h4 className="mb-4 font-display text-lg font-black uppercase text-gray-900">Condiții:</h4>
                            <ul className="space-y-2.5">
                                {program.reward3Plus1.conditions.map((c, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#3A86FF]" /> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* ── CONDITIONS ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Transparență" title="Condiții de participare" />
                    <ul className="space-y-3">
                        {program.participationConditions.map((c, i) => (
                            <li key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3A86FF]/10 text-xs font-black text-[#3A86FF]">{i + 1}</span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ── CONSULTATION ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Primul pas" title={program.freeConsultation.title} />
                    <div className="grid items-center gap-6 md:grid-cols-2">
                        <p className="text-lg leading-relaxed text-gray-600">{program.freeConsultation.description}</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setShowForm(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A86FF] px-7 py-4 font-bold text-white transition-colors hover:bg-blue-700">
                                <CalendarCheck size={18} /> Aplică acum — e gratuit
                            </button>
                            <a href={WA(`Salut! Vreau consultația gratuită pentru ${program.title}.`)} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-7 py-4 font-bold text-gray-900 transition-colors hover:border-green-400 hover:text-green-600">
                                <MessageCircle size={18} className="text-green-500" /> Scrie pe WhatsApp
                            </a>
                        </div>
                    </div>
                    {program.afterConsultation && (
                        <p className="mt-6 text-sm italic text-gray-500">{program.afterConsultation}</p>
                    )}
                </section>

                {/* ── LOCATION ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <SectionHead eyebrow="Unde?" title="Locații NeoBoost" />
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            { name: 'Hotel Ramada', address: 'Calea Aradului nr. 9, Oradea', maps: 'https://maps.google.com/?q=Hotel+Ramada+Oradea' },
                            { name: 'Sala GetFit', address: 'Lotus Center, Nufărului, Oradea', maps: 'https://maps.google.com/?q=GetFit+Lotus+Center+Oradea' },
                        ].map((loc) => (
                            <a key={loc.name} href={loc.maps} target="_blank" rel="noopener noreferrer"
                                className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-gray-100 bg-gray-50 p-6 transition-colors hover:border-[#3A86FF]">
                                <MapPin size={22} className="mt-0.5 shrink-0 text-[#3A86FF]" />
                                <div>
                                    <h4 className="font-display text-lg font-black uppercase text-gray-900">{loc.name}</h4>
                                    <p className="text-sm text-gray-500">{loc.address}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── FINAL CTA ── */}
                <section className="border-t border-gray-100 py-16 md:py-20">
                    <div className="rounded-[var(--radius-xl)] bg-gray-900 px-8 py-14 text-center md:py-20">
                        <h2 className="font-display text-3xl font-black uppercase italic text-white md:text-5xl">
                            Aplică pentru<br /><span className="text-[#3A86FF]">{program.title}</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-md text-base text-gray-400">Prima consultație e gratuită. Fără obligații, fără presiune.</p>
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <button onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 rounded-full bg-[#3A86FF] px-8 py-4 font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-600">
                                <Star size={17} className="fill-current" /> Aplică acum
                            </button>
                            <a href={WA(`Salut! Sunt interesat de programul ${program.title}. Vreau detalii.`)} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-bold text-white transition-colors hover:border-green-400 hover:text-green-400">
                                <MessageCircle size={17} className="text-green-400" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

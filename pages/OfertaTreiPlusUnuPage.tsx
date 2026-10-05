import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { Star, Gift, CalendarCheck, Target, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { SEO } from '../components/SEO';
import { Section, Heading, WhatsappCta } from '../components/home';
import { Offer3Plus1Grid } from '../components/home/Offer3Plus1Grid';
import { OFFERS_3PLUS1, OFFER_MIN_PRICE } from '../lib/offer3plus1';
import { Footer } from '../components/Footer';

const STEPS = [
    { icon: <Target size={24} />, title: '1. Alege pachetul', description: 'Health Pro, Sculpt Pro sau Master Body: 1, 2 sau 3 ședințe pe săptămână, cât îți permite ritmul.' },
    { icon: <CalendarCheck size={24} />, title: '2. Plătești 3 luni', description: 'La tariful lunar standard, fără reduceri ascunse. Antrenorul îți urmărește progresul și te ține responsabil.' },
    { icon: <Gift size={24} />, title: '3. Luna 4 e pe noi', description: 'Ai fost serios? Primești a 4-a lună cadou, cu toate ședințele ei. Zero costuri în plus.' },
];

const CONDITIONS = [
    'Prezență minim 80% la ședințele programate',
    'Respectarea planului stabilit cu antrenorul',
    'Completarea check-in-urilor și măsurătorilor periodice',
    'Atingerea obiectivelor realiste stabilite la început',
];

export const OfertaTreiPlusUnuPage: React.FC = () => {
    const { session, onOpenBooking } = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();
    const prices = OFFERS_3PLUS1.map((o) => `${o.title} ${o.price} RON`).join(', ');

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <SEO
                title="Oferta Specială 3+1 Gratuit — Abonament EMS Oradea | NeoBoost"
                description={`Plătești 3 luni de antrenament EMS la tariful lunar, primești a 4-a lună CADOU. Pachete de la ${OFFER_MIN_PRICE} RON: ${prices}.`}
                canonical="/oferta-3-plus-1"
            />

            {/* HERO */}
            <section className="relative overflow-hidden px-6 pb-16 pt-28 text-center md:pb-24 md:pt-40">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'linear-gradient(#3A86FF 1px, transparent 1px), linear-gradient(90deg, #3A86FF 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
                    }}
                />
                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="hero-rise mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
                        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            Ofertă exclusivă online
                        </span>
                    </div>
                    <h1 className="hero-rise font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-[var(--text-primary)] sm:text-7xl lg:text-8xl" style={{ animationDelay: '60ms' }}>
                        3 luni.<br />
                        <span className="text-[var(--accent-primary)]">A 4-a, cadou.</span>
                    </h1>
                    <p className="hero-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg" style={{ animationDelay: '140ms' }}>
                        Plătești <strong className="font-semibold text-[var(--text-primary)]">3 luni la tariful lunar standard</strong>, iar
                        a <strong className="font-semibold text-[var(--accent-primary)]">4-a lună e cadou</strong>, cu toate ședințele ei. Disciplina se premiază.
                    </p>
                    <div className="hero-rise mt-9" style={{ animationDelay: '220ms' }}>
                        <button
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-secondary)]"
                        >
                            Vezi pachetele
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <Section tint>
                <Heading eyebrow="Cum funcționează" title={<>Simplu ca 1·2·3</>} />
                <div className="grid gap-5 md:grid-cols-3">
                    {STEPS.map((s) => (
                        <div key={s.title} className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 text-center">
                            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                                {s.icon}
                            </div>
                            <h3 className="font-display text-lg font-bold uppercase text-[var(--text-primary)]">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{s.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* PACKAGES: preț = tarif lunar standard x 3, luna 4 cadou */}
            <Section id="packages">
                <Heading
                    eyebrow="Pachete 3+1"
                    title={<>Alege pachetul tău</>}
                    sub="Prețul e exact tariful lunar standard înmulțit cu 3. Luna cadou nu se scade din nimic: vine peste."
                />
                <Offer3Plus1Grid userId={session?.user?.id ?? null} />
            </Section>

            {/* CONDITIONS */}
            <Section tint>
                <div className="mx-auto max-w-3xl">
                    <Heading
                        eyebrow="Transparent"
                        title={<>Condiții de eligibilitate</>}
                        sub="Luna cadou se acordă automat la îndeplinirea condițiilor de mai jos."
                    />
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 md:p-9">
                        <ul className="space-y-4">
                            {CONDITIONS.map((c, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="font-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-sm font-medium text-[var(--accent-primary)]">
                                        {i + 1}
                                    </span>
                                    <span className="leading-relaxed text-[var(--text-secondary)]">{c}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                <strong className="text-[var(--text-primary)]">Notă:</strong> Antrenamentul EMS nu este recomandat
                                persoanelor cu stimulator cardiac, femeilor îsărcinate, persoanelor cu epilepsie sau tromboză.
                                Discutăm detaliile la prima evaluare.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* TESTIMONIALS */}
            <Section>
                <div className="mb-10 text-center">
                    <div className="mb-3 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] md:text-4xl">
                        Ce spun membrii NeoBoost
                    </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {TESTIMONIALS.slice(0, 3).map((t, i) => (
                        <div key={i} className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-7">
                            <p className="text-sm italic leading-relaxed text-[var(--text-secondary)]">"{t.quote}"</p>
                            <div className="mt-5 flex items-center gap-3">
                                <img src={t.imageUrl} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{t.name}</h4>
                                    <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--accent-primary)]">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FINAL CTA */}
            <Section tint>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Ai întrebări?<br /><span className="text-[var(--accent-primary)]">Răspundem imediat.</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base text-[var(--text-secondary)]">
                        Scrie-ne pe WhatsApp, răspundem în câteva minute. Zero obligații, zero presiune.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button
                            onClick={onOpenBooking}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-secondary)]"
                        >
                            Rezervă ședința gratuită
                        </button>
                        <WhatsappCta text="Salut! Am câteva întrebări despre oferta 3+1 Gratuit.">
                            Scrie-ne pe WhatsApp
                        </WhatsappCta>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { Quote, TrendingDown } from 'lucide-react';
import { RICH_TRANSFORMATIONS } from '../constants';
import { Section, Heading, PrimaryCta, WhatsappCta } from '../components/home';
import { Footer } from '../components/Footer';

export const ResultsPage = () => {
    const ctx = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Rezultate Clienți & Transformări Reale | NeoBoost Oradea</title>
                <meta name="description" content="Transformări reale ale clienților NeoBoost Oradea — slăbire, tonifiere și corectarea posturii prin EMS wireless. Rezultate validate prin măsurători biometrice." />
                <link rel="canonical" href="https://neo-boost.com/rezultate" />
            </Helmet>

            {/* HERO */}
            <Section>
                <div className="max-w-3xl">
                    <p className="hero-rise mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">Povești de succes</p>
                    <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl" style={{ animationDelay: '60ms' }}>
                        Transformări<br /><span className="text-[var(--accent-primary)]">reale, măsurate</span>
                    </h1>
                    <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                        Nu promitem miracole peste noapte. Promitem rezultate măsurabile pentru cei care respectă planul.
                        Iată ce au reușit clienții noștri.
                    </p>
                </div>
            </Section>

            {/* TRANSFORMATIONS */}
            <Section tint className="!pt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                    {RICH_TRANSFORMATIONS.map((t) => (
                        <article key={t.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-tertiary)]">
                                <img src={t.images.combined} alt={`Transformare ${t.name}`} loading="lazy" className="h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3">
                                    <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">Înainte</span>
                                    <span className="rounded-full bg-[var(--accent-primary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">După</span>
                                </div>
                            </div>
                            <div className="p-6 md:p-7">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-display text-xl font-black uppercase text-[var(--text-primary)]">{t.name}</h3>
                                    <span className="rounded-full bg-[var(--accent-primary)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--accent-primary)]">{t.program}</span>
                                    <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">· {t.duration}</span>
                                </div>
                                <div className="mt-4 flex gap-2 text-[var(--text-secondary)]">
                                    <Quote size={18} className="shrink-0 text-[var(--accent-primary)]/40" />
                                    <p className="text-sm italic leading-relaxed">„{t.quote}"</p>
                                </div>
                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {t.stats.map((s) => (
                                        <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3 text-center">
                                            <div className="flex items-center justify-center gap-1 font-display text-lg font-black text-[var(--text-primary)]">
                                                {s.change.startsWith('-') && <TrendingDown size={14} className="text-[var(--success)]" />}
                                                {s.change}<span className="text-xs font-bold text-[var(--text-muted)]">{s.unit}</span>
                                            </div>
                                            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Următoarea transformare<br />poate fi a ta
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base text-[var(--text-secondary)]">
                        Începe cu o ședință gratuită. Măsurăm, stabilim un plan realist și pornim la treabă.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                        <WhatsappCta text="Salut! Am văzut rezultatele și vreau și eu o transformare. Putem discuta?">Scrie-ne pe WhatsApp</WhatsappCta>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

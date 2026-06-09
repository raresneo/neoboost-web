import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { PROGRAMS } from '../constants';
import { Section, Heading, PrimaryCta, WhatsappCta, waLink } from '../components/home';
import { Footer } from '../components/Footer';

export const ProgramsPage = () => {
    const navigate = useNavigate();
    const ctx = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();

    React.useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Programe EMS Oradea – Slăbire, Post-Natal, Transformare | NeoBoost</title>
                <meta name="description" content="Programe EMS structurate la NeoBoost Oradea: 6 Week Kickstart, Fit Mamma post-natal, transformare 8 săptămâni și antrenament semi-privat. Rezultate susținute de disciplină." />
                <link rel="canonical" href="https://neo-boost.com/programe" />
            </Helmet>

            {/* HERO */}
            <Section>
                <div className="max-w-3xl">
                    <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl">
                        Programe cu<br /><span className="text-[var(--accent-primary)]">obiectiv clar</span>
                    </h1>
                    <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                        Nu doar ședințe — programe structurate cu plan, monitorizare și recompensă pentru disciplină.
                        Alege traseul potrivit obiectivului tău.
                    </p>
                    <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '220ms' }}>
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                        <button onClick={() => navigate('/preturi')} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-7 py-4 text-sm font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]">
                            Vezi abonamentele
                        </button>
                    </div>
                </div>
            </Section>

            {/* PROGRAMS GRID */}
            <Section tint>
                <Heading eyebrow="Programe structurate" title={<>Alege-ți traseul</>} />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {PROGRAMS.map((p) => (
                        <div key={p.id} className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] transition-all duration-150 hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]">
                            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)]">
                                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <span className={`absolute left-3 top-3 rounded-full ${p.tagColor} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white`}>
                                    {p.tag}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    <Clock size={13} /> {p.duration}
                                </div>
                                <h3 className="font-display text-xl font-black uppercase text-[var(--text-primary)]">{p.title}</h3>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">{p.benefit}</p>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{p.description}</p>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="font-display text-2xl font-black text-[var(--text-primary)]">{p.price}</span>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Link to={`/program/${p.id}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--accent-secondary)]">
                                        Detalii <ArrowRight size={15} />
                                    </Link>
                                    <a href={waLink(`Salut! Sunt interesat de programul ${p.title}.`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] px-3 py-2.5 transition-colors hover:border-[#25D366]">
                                        <MessageCircle size={16} className="text-[#25D366]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Nu știi care e pentru tine?
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base text-[var(--text-secondary)]">
                        Spune-ne obiectivul tău și îți recomandăm programul potrivit. Prima ședință e gratuită.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă gratuit</PrimaryCta>
                        <WhatsappCta text="Salut! Vreau să-mi recomandați un program EMS potrivit obiectivului meu.">Întreabă un antrenor</WhatsappCta>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

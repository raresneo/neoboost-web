import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { Instagram, Linkedin, Quote } from 'lucide-react';
import { TEAM } from '../components/sections/TeamSection';
import { Section, Heading, PrimaryCta, WhatsappCta } from '../components/home';
import { Footer } from '../components/Footer';

const Socials: React.FC<{ socials?: { instagram?: string; linkedin?: string } }> = ({ socials }) => {
    if (!socials) return null;
    return (
        <div className="mt-4 flex gap-2">
            {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
                    <Instagram size={16} />
                </a>
            )}
            {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
                    <Linkedin size={16} />
                </a>
            )}
        </div>
    );
};

export const TeamPage = () => {
    const ctx = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();
    const founder = TEAM.find((m) => m.type === 'founder') || TEAM[0];
    const rest = TEAM.filter((m) => m.id !== founder.id);

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Echipa NeoBoost – Antrenori EMS Oradea | NeoBoost</title>
                <meta name="description" content="Cunoaște echipa NeoBoost Oradea: antrenori dedicați de EMS și fitness care te ghidează 1-la-1 spre rezultate reale. Oameni care au fost în locul tău." />
                <link rel="canonical" href="https://neo-boost.com/echipa" />
            </Helmet>

            {/* HERO */}
            <Section>
                <div className="max-w-3xl">
                    <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl">
                        Oamenii din<br /><span className="text-[var(--accent-primary)]">spatele rezultatelor</span>
                    </h1>
                    <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                        Antrenori dedicați, mulți dintre ei foști clienți. Te ghidăm 1-la-1, cu răbdare și empatie, spre versiunea ta cea mai bună.
                    </p>
                </div>
            </Section>

            {/* FOUNDER FEATURE */}
            <Section tint className="!pt-0">
                <div className="grid items-center gap-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-tertiary)]">
                            <img src={founder.image} alt={founder.name} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                    </div>
                    <div className="p-7 md:p-10 lg:col-span-3">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent-primary)]">{founder.role}</p>
                        <h2 className="mt-1 font-display text-3xl font-black uppercase italic text-[var(--text-primary)] md:text-4xl">{founder.name}</h2>
                        <Quote size={28} className="mt-5 text-[var(--accent-primary)]/40" />
                        <p className="mt-2 text-lg font-medium italic leading-relaxed text-[var(--text-primary)]">„{founder.quote}"</p>
                        <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{founder.description}</p>
                        <Socials socials={founder.socials} />
                    </div>
                </div>
            </Section>

            {/* TEAM GRID */}
            <Section>
                <Heading eyebrow="Echipa" title={<>Antrenorii tăi</>} />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {rest.map((m) => (
                        <div key={m.id} className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] transition-all duration-150 hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]">
                            <div className="aspect-square overflow-hidden bg-[var(--bg-tertiary)]">
                                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="font-display text-lg font-black uppercase text-[var(--text-primary)]">{m.name}</h3>
                                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">{m.role}</p>
                                <p className="mt-3 flex-1 text-sm italic leading-relaxed text-[var(--text-secondary)]">„{m.quote}"</p>
                                <Socials socials={m.socials} />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section tint>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Hai să ne cunoaștem
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base text-[var(--text-secondary)]">
                        Prima ședință e gratuită. Vino, cunoaște echipa și simte atmosfera NeoBoost.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                        <WhatsappCta text="Salut! Aș vrea să cunosc echipa și să programez o ședință gratuită.">Scrie-ne pe WhatsApp</WhatsappCta>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

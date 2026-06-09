import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Target, Zap, Users, Award } from 'lucide-react';
import { Section, Heading, PrimaryCta, WhatsappCta } from '../components/home';
import { Footer } from '../components/Footer';

const values = [
    { icon: <Target className="h-6 w-6" />, title: 'Rezultate reale', description: 'Nu promitem minuni. Promitem progres constant, vizibil, bazat pe știință și pe efortul tău.' },
    { icon: <Heart className="h-6 w-6" />, title: 'Personalizare totală', description: 'Fiecare client e unic. Fiecare program e construit în jurul obiectivelor, limitărilor și ritmului tău.' },
    { icon: <Users className="h-6 w-6" />, title: '1-la-1 cu antrenor', description: 'Nu ești lăsat singur nicio secundă. Antrenorul ghidează, motivează și ajustează fiecare ședință.' },
    { icon: <Award className="h-6 w-6" />, title: 'Tehnologie wireless', description: 'Folosim echipament EMS wireless de ultimă generație — fără fire, fără restricții, fără compromisuri.' },
];

const stats = [
    { value: '500+', label: 'Clienți mulțumiți' },
    { value: '30 min', label: 'Per ședință eficientă' },
    { value: '1-la-1', label: 'Antrenament personal' },
    { value: '5★', label: 'Rating Google' },
];

export const DespreNoiPage: React.FC = () => (
    <main className="min-h-screen bg-[var(--bg-primary)]">
        <Helmet>
            <title>Despre NeoBoost – EMS Studio Oradea | Povestea Noastră</title>
            <meta name="description" content="Descoperă povestea NeoBoost Oradea. Studio EMS wireless cu antrenori dedicați, program 1-la-1 și rezultate dovedite. Prima ședință gratuită." />
            <link rel="canonical" href="https://neo-boost.com/despre-noi" />
        </Helmet>

        {/* HERO */}
        <Section>
            <div className="max-w-3xl">
                <div className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-1.5">
                    <Zap size={13} className="text-[var(--accent-primary)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">EMS Studio · Oradea</span>
                </div>
                <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl" style={{ animationDelay: '60ms' }}>
                    Primul studio<br /><span className="text-[var(--accent-primary)]">EMS wireless</span><br />din Oradea
                </h1>
                <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                    Am pornit cu o idee simplă: <strong className="font-semibold text-[var(--text-primary)]">să ajutăm oamenii să arate și să se simtă mai bine</strong>, fără să le pierdem timpul.
                </p>
            </div>
        </Section>

        {/* STATS */}
        <Section tint className="!py-0">
            <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] md:grid-cols-4 md:divide-y-0">
                {stats.map((s) => (
                    <div key={s.label} className="px-6 py-10 text-center">
                        <p className="font-display text-3xl font-black italic text-[var(--text-primary)] md:text-4xl">{s.value}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* STORY */}
        <Section>
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">Povestea noastră</p>
                    <h2 className="font-display text-4xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                        De ce am fondat NeoBoost
                    </h2>
                    <div className="mt-7 space-y-4 text-lg leading-relaxed text-[var(--text-secondary)]">
                        <p>Am văzut prea mulți oameni renunțând la sănătate din lipsă de timp. Sălile clasice cer ore întregi, programe rigide și multă motivație pe care nu toți o au în fiecare zi.</p>
                        <p>Soluția? Tehnologia EMS — care comprimă un antrenament eficient în <strong className="text-[var(--text-primary)]">30 de minute</strong>, ghidat 1-la-1 de un antrenor dedicat.</p>
                        <p>Am deschis NeoBoost în Oradea cu un singur obiectiv: să fie locul unde rezultatele vorbesc de la sine, unde fiecare client se simte văzut și sprijinit.</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
                        <img src="/ramada.webp" alt="NeoBoost Studio Oradea" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-[var(--shadow-lg)]">
                        <p className="mb-1 text-xs font-black uppercase tracking-widest text-[var(--accent-primary)]">Studio EMS</p>
                        <p className="font-bold text-[var(--text-primary)]">Oradea · Hotel Ramada</p>
                    </div>
                </div>
            </div>
        </Section>

        {/* VALUES */}
        <Section tint>
            <Heading eyebrow="Valorile noastre" title={<>Ce ne definește</>} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {values.map((v) => (
                    <div key={v.title} className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                            {v.icon}
                        </div>
                        <h3 className="font-display text-lg font-black uppercase text-[var(--text-primary)]">{v.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{v.description}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* MISSION */}
        <Section>
            <div className="mx-auto max-w-3xl text-center">
                <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">Misiunea noastră</p>
                <blockquote className="font-display text-3xl font-black italic leading-tight text-[var(--text-primary)] md:text-4xl">
                    „Să facem sănătatea accesibilă oricui, indiferent de timp, vârstă sau nivel de pregătire."
                </blockquote>
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
                    Credem că fiecare om merită să se simtă bine în corpul lui. De aceea, fiecare program NeoBoost este construit
                    în jurul nevoilor reale ale clientului, nu în jurul unui tipar generic.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <WhatsappCta text="Salut! Vreau să aflu mai multe despre NeoBoost și să programez o ședință gratuită.">
                        Vino să ne cunoști
                    </WhatsappCta>
                </div>
            </div>
        </Section>

        <Footer />
    </main>
);

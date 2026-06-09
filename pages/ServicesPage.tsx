import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { CheckCircle2, Zap, Heart, Activity, Timer, Phone } from 'lucide-react';
import { BRAND } from '../constants';
import { Section, Heading, PrimaryCta, WhatsappCta } from '../components/home';
import { Footer } from '../components/Footer';

const steps = [
    { number: '01', title: 'Consultație inițială', description: 'Discuți cu antrenorul despre obiectivul tău, nivelul de activitate și eventuale limitări medicale. Totul e personalizat.' },
    { number: '02', title: 'Echipare EMS', description: 'Îmbraci costumul EMS profesional. Antrenorul setează intensitatea impulsurilor în funcție de tine — confortabil dar eficient.' },
    { number: '03', title: 'Antrenament ghidat', description: '30 de minute de exerciții simple, ghidate pas cu pas. Electrostimularea activează 90% din fibrele musculare simultan.' },
    { number: '04', title: 'Recomandări personale', description: 'La final primești sfaturi despre frecvența ședințelor, nutriție și stilul de viață ca să maximizezi rezultatele.' },
];

const services = [
    { icon: <Zap className="h-7 w-7" />, title: 'EMS Funcțional', subtitle: 'Tonifiere & Slăbire', description: 'Antrenamentul EMS clasic, ideal pentru slăbire, tonifiere și creștere de masă musculară. 30 de minute înlocuiesc 2-3 ore de sală clasică.', features: ['Activare 90% fibre musculare', 'Ardere calorii intensă', 'Tonifiere uniformă', 'Fără suprasolicitare articulară'] },
    { icon: <Heart className="h-7 w-7" />, title: 'EMS Kineto', subtitle: 'Recuperare & Reabilitare', description: 'Program specializat pentru recuperare după accidente, dureri de spate, hernii de disc sau reabilitare musculară. Lucrăm cu protocoale kinetoterapeutice.', features: ['Protocol de recuperare individualizat', 'Redus dureri cronice', 'Reconsolidare musculară', 'Supervizare specializată'] },
    { icon: <Activity className="h-7 w-7" />, title: 'EMS Performance', subtitle: 'Sportivi & Performanță', description: 'Antrenament EMS adaptat pentru sportivi activi care vor să-și crească performanța, să reducă timpul de recuperare și să prevină accidentările.', features: ['Creștere forță explozivă', 'Recuperare accelerată', 'Prevenție accidentări', 'Complement sport existent'] },
    { icon: <Timer className="h-7 w-7" />, title: 'Ședință de probă', subtitle: 'Prima ședință gratuită', description: 'Vino să testezi fără obligații. Prima ședință este complet gratuită — vei vedea cum funcționează EMS și dacă ți se potrivește, înainte de orice decizie.', features: ['Fără costuri', 'Fără abonament forțat', 'Evaluare personalizată', 'Răspuns la toate întrebările'] },
];

const benefits = [
    'Persoane ocupate care nu au timp de antrenamente lungi',
    'Mame care vor să revină în formă după sarcină',
    'Persoane sedentare care vor să reînceapă mișcarea',
    'Cei cu dureri de spate sau probleme articulare',
    'Sportivi care vor să-și crească performanța',
    'Oricine vrea rezultate vizibile în timp scurt',
];

export const ServicesPage: React.FC = () => {
    const ctx = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <Helmet>
                <title>Servicii EMS Oradea – Cum Funcționează | NeoBoost</title>
                <meta name="description" content="Servicii EMS NeoBoost Oradea: antrenament funcțional, kineto și performance. Prima ședință gratuită. Rezultate în 30 de minute, ghidat 1-la-1 cu antrenor." />
                <link rel="canonical" href="https://neo-boost.com/servicii-ems" />
            </Helmet>

            {/* HERO */}
            <Section>
                <div className="max-w-3xl">
                    <div className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-1.5">
                        <Zap size={13} className="text-[var(--accent-primary)]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Wireless EMS · Oradea</span>
                    </div>
                    <h1 className="hero-rise font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-7xl" style={{ animationDelay: '60ms' }}>
                        Servicii EMS<br /><span className="text-[var(--accent-primary)]">pentru obiectivul tău</span>
                    </h1>
                    <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ animationDelay: '140ms' }}>
                        Ședințe EMS <strong className="font-semibold text-[var(--text-primary)]">1-la-1 cu antrenor personal</strong>, adaptate ție.
                        Slăbire, tonifiere, recuperare sau performanță — totul în 30 de minute.
                    </p>
                    <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '220ms' }}>
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
                        <WhatsappCta text="Salut! Vreau să programez o ședință de probă gratuită.">Scrie-ne pe WhatsApp</WhatsappCta>
                    </div>
                </div>
            </Section>

            {/* SERVICES GRID */}
            <Section id="servicii-detalii" tint>
                <Heading eyebrow="Ce oferim" title={<>Tipuri de antrenament</>} />
                <div className="grid gap-5 md:grid-cols-2">
                    {services.map((svc) => (
                        <div key={svc.title} className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 transition-all duration-150 hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                                {svc.icon}
                            </div>
                            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">{svc.subtitle}</p>
                            <h3 className="mt-1 font-display text-2xl font-black uppercase text-[var(--text-primary)]">{svc.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{svc.description}</p>
                            <ul className="mt-5 space-y-2">
                                {svc.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                                        <CheckCircle2 size={16} className="shrink-0 text-[var(--success)]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            {/* HOW IT WORKS */}
            <Section>
                <Heading eyebrow="Cum decurge" title={<>O ședință pas cu pas</>} />
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <div key={step.number} className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7">
                            <span className="font-display text-5xl font-black text-[var(--bg-tertiary)]">{step.number}</span>
                            <h3 className="mt-2 font-display text-lg font-bold text-[var(--text-primary)]">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FOR WHO */}
            <Section tint>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">Pentru cine</p>
                        <h2 className="font-display text-4xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                            EMS se potrivește oricui
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
                            Indiferent că ești sportiv activ, mamă ocupată sau cineva care nu a mai făcut mișcare de ani de zile —
                            antrenamentul EMS se adaptează la tine, nu invers.
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {benefits.map((b) => (
                            <div key={b} className="flex items-center gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
                                <CheckCircle2 size={20} className="shrink-0 text-[var(--success)]" />
                                <span className="font-medium text-[var(--text-secondary)]">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">Hai să începem</p>
                    <h2 className="font-display text-4xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Prima ședință e gratuită
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--text-secondary)]">
                        Nu te obligăm la nimic. Vino, testează și decide după ce ai simțit cum funcționează EMS pe propriul corp.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <PrimaryCta onClick={ctx?.onOpenBooking}>Rezervă gratuit</PrimaryCta>
                        <WhatsappCta text="Salut! Vreau să programez prima ședință EMS gratuită.">Scrie-ne pe WhatsApp</WhatsappCta>
                    </div>
                    <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
                        <Phone size={15} /> {BRAND.phone}
                    </a>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

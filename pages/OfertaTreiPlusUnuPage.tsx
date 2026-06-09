import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import {
    CheckCheck, Star, MessageCircle, CreditCard, Gift, CalendarCheck, Target, ArrowRight,
} from 'lucide-react';
import { QUARTERLY_PACKAGES, TESTIMONIALS, BRAND } from '../constants';
import { SEO } from '../components/SEO';
import { Section, Heading, WhatsappCta, waLink } from '../components/home';
import { Footer } from '../components/Footer';

const STEPS = [
    { icon: <Target size={24} />, title: '1. Alege pachetul', description: 'Health Pro, Sculpt Pro sau Master Body — selectezi frecvența potrivită stilului tău de viață.' },
    { icon: <CalendarCheck size={24} />, title: '2. Fii constant 3 luni', description: 'Urmează planul cu antrenorul tău. Noi îți urmărim progresul și te ținem responsabil.' },
    { icon: <Gift size={24} />, title: '3. Luna 4 e pe noi', description: 'Ai fost serios? Primești luna a 4-a cadou. Zero costuri suplimentare — recompensăm disciplina.' },
];

const CONDITIONS = [
    'Prezență minim 80% la ședințele programate',
    'Respectarea planului stabilit cu antrenorul',
    'Completarea check-in-urilor și măsurătorilor periodice',
    'Atingerea obiectivelor realiste stabilite la început',
];

export const OfertaTreiPlusUnuPage: React.FC = () => {
    const { onOpenBooking } = useOutletContext<{ session: Session | null; onOpenBooking: () => void }>();
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleDirectPurchase = async (pkg: any) => {
        try {
            setIsLoading(pkg.stripePriceId);
            const price = parseInt(pkg.price.replace(/\D/g, ''));
            const apiUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: null, priceId: pkg.stripePriceId, amount: price,
                    productName: `${pkg.title} (Oferta 3+1)`, interval: 'month', intervalCount: 4,
                }),
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else { alert('Eroare la procesare. Te rugăm să ne contactezi pe WhatsApp.'); setIsLoading(null); }
        } catch (err) {
            window.open(waLink(`Salut! Vreau să aflu dacă pachetul ${pkg.title} (oferta 3+1) mi se potrivește.`), '_blank');
            setIsLoading(null);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <SEO
                title="Oferta Specială 3+1 Gratuit — Abonament EMS Oradea | NeoBoost"
                description="Plătești 3 luni de antrenament EMS, primești a 4-a lună CADOU. Pachete de la 1150 RON. Sănătate, sculptare sau transformare completă — tu alegi."
                canonical="/oferta-3-plus-1"
            />

            {/* HERO */}
            <section className="relative overflow-hidden px-6 pb-16 pt-28 text-center md:pb-24 md:pt-40">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
                    }}
                />
                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="hero-rise mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-secondary)]">
                            Ofertă exclusivă online
                        </span>
                    </div>
                    <h1 className="hero-rise font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl" style={{ animationDelay: '60ms' }}>
                        Disciplina<br />
                        <span className="text-[var(--accent-primary)]">se premiază.</span>
                    </h1>
                    <p className="hero-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg" style={{ animationDelay: '140ms' }}>
                        Angajează-te <strong className="font-semibold text-[var(--text-primary)]">3 luni plătite</strong> la antrenamentul EMS și
                        a <strong className="font-semibold text-[var(--accent-primary)]">4-a lună e cadou</strong>. Rezultate reale, premiate.
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

            {/* PACKAGES */}
            <Section id="packages">
                <Heading
                    eyebrow="Pachete 3+1"
                    title={<>Alege pachetul tău</>}
                    sub="Fiecare pachet include ședințe bonus gratuite. Alege frecvența care ți se potrivește."
                />
                <div className="grid gap-5 md:grid-cols-3">
                    {QUARTERLY_PACKAGES.map((pkg) => {
                        const [mainSessions, bonusPart] = pkg.sessionCount.split('+').map((s) => s.trim());
                        const bonusSessions = bonusPart?.replace(' BONUS', '') || '0';
                        const originalPrice = Math.round(parseInt(pkg.price.replace(/\D/g, '')) * 1.33);
                        const featured = (pkg as any).isPremium;
                        return (
                            <div
                                key={pkg.title}
                                className={`relative flex flex-col rounded-[var(--radius-lg)] border bg-[var(--bg-primary)] p-7 transition-all duration-150 ${featured
                                    ? 'border-[var(--accent-primary)] shadow-[var(--shadow-lg)] lg:-translate-y-2'
                                    : 'border-[var(--border-subtle)] hover:border-[var(--text-disabled)]'
                                    }`}
                            >
                                {featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                        Recomandat
                                    </span>
                                )}
                                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent-primary)]">
                                    {pkg.idealFor}
                                </p>
                                <h3 className="mt-1 font-display text-2xl font-black uppercase text-[var(--text-primary)]">{pkg.title}</h3>
                                <div className="mt-4 flex items-end gap-2">
                                    <span className="font-display text-5xl font-black leading-none text-[var(--text-primary)]">{mainSessions}</span>
                                    <div className="mb-1 flex flex-col">
                                        <span className="text-xl font-black leading-none text-[var(--accent-primary)]">+{bonusSessions}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-primary)]">bonus</span>
                                    </div>
                                    <span className="mb-1.5 ml-1 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">ședințe</span>
                                </div>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{pkg.duration}</p>
                                <ul className="mt-6 flex-1 space-y-2.5">
                                    {pkg.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                            <CheckCheck size={16} className="mt-0.5 shrink-0 text-[var(--success)]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 flex items-end gap-2">
                                    <span className="text-sm font-bold text-[var(--text-disabled)] line-through">{originalPrice} RON</span>
                                    <span className="font-display text-3xl font-black leading-none text-[var(--text-primary)]">{pkg.price.replace(' RON', '')}</span>
                                    <span className="mb-0.5 text-sm font-bold text-[var(--accent-primary)]">RON</span>
                                </div>
                                <button
                                    onClick={() => handleDirectPurchase(pkg)}
                                    disabled={isLoading === pkg.stripePriceId}
                                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-secondary)] disabled:opacity-60"
                                >
                                    {isLoading === pkg.stripePriceId ? 'Se procesează…' : (<><CreditCard size={16} /> Cumpără acum</>)}
                                </button>
                                <a
                                    href={waLink(`Salut! Vreau să aflu dacă pachetul ${pkg.title} (oferta 3+1) mi se potrivește.`)}
                                    target="_blank" rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[var(--text-primary)] transition-colors hover:border-[#25D366] hover:text-[#1ebe57]"
                                >
                                    <MessageCircle size={15} className="text-[#25D366]" /> Află dacă ți se potrivește
                                </a>
                            </div>
                        );
                    })}
                </div>
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
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-sm font-black text-[var(--accent-primary)]">
                                        {i + 1}
                                    </span>
                                    <span className="leading-relaxed text-[var(--text-secondary)]">{c}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                <strong className="text-[var(--text-primary)]">Notă:</strong> Antrenamentul EMS nu este recomandat
                                persoanelor cu stimulator cardiac, femeilor însărcinate, persoanelor cu epilepsie sau tromboză.
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
                    <h2 className="font-display text-3xl font-black uppercase italic tracking-tight text-[var(--text-primary)] md:text-4xl">
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
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)]">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FINAL CTA */}
            <Section tint>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-black uppercase italic leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Ai întrebări?<br /><span className="text-[var(--accent-primary)]">Răspundem imediat.</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base text-[var(--text-secondary)]">
                        Scrie-ne pe WhatsApp — răspundem în câteva minute. Zero obligații, zero presiune.
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

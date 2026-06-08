import React from 'react';
import { MessageCircle, Star, ArrowRight, MapPin, Check, Zap } from 'lucide-react';
import { BRAND } from '../../constants';

const WA = (text: string) =>
    `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;

const STATS = [
    { value: '30', unit: 'min', label: 'pe ședință' },
    { value: '90', unit: '%', label: 'mușchi activați' },
    { value: '1:1', unit: '', label: 'cu antrenor' },
];

export const ImmersiveHero = ({ onOpenBooking }: { onOpenBooking?: () => void }) => {
    const openBooking = () => {
        if (onOpenBooking) onOpenBooking();
        else window.open(WA('Salut! Vreau să programez ședința EMS gratuită de 30 de minute.'), '_blank');
    };

    return (
        <section className="relative w-full overflow-hidden bg-[var(--bg-primary)] pt-28 pb-16 md:pt-36 md:pb-24">
            {/* Subtle structural grid — cheap, no blur */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
                }}
            />

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
                {/* ---------- LEFT: editorial copy ---------- */}
                <div className="lg:col-span-7">
                    {/* Eyebrow */}
                    <div
                        className="hero-rise mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-1.5"
                        style={{ animationDelay: '0ms' }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                        </span>
                        <MapPin size={13} className="text-[var(--text-muted)]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                            Oradea · Ramada &amp; GetFit
                        </span>
                    </div>

                    {/* Headline with kinetic rotator — fixed-height line, no overlap */}
                    <h1
                        className="hero-rise font-display text-[2.6rem] font-black uppercase italic leading-[0.95] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-[5rem]"
                        style={{ animationDelay: '60ms' }}
                    >
                        <span className="block">30 de minute și</span>
                        <span className="hero-rotator text-[var(--accent-primary)]">
                            <span>slăbești.</span>
                            <span>te tonifiezi.</span>
                            <span>ai energie.</span>
                        </span>
                        <span className="block text-[var(--text-muted)]">Fără să trăiești în sală.</span>
                    </h1>

                    {/* Subhead */}
                    <p
                        className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl"
                        style={{ animationDelay: '140ms' }}
                    >
                        Antrenament <strong className="font-semibold text-[var(--text-primary)]">EMS wireless</strong>,
                        ghidat 1-la-1 de un antrenor. Echivalentul a 4 ore de sală, condensat în 30 de minute care
                        chiar îți schimbă corpul.
                    </p>

                    {/* CTAs */}
                    <div
                        className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                        style={{ animationDelay: '220ms' }}
                    >
                        <button
                            onClick={openBooking}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-secondary)] active:translate-y-0"
                        >
                            <Zap size={17} className="fill-current" />
                            Rezervă ședința GRATUITĂ
                            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                        <a
                            href={WA('Salut! Aș vrea o discuție de 10 minute să văd dacă antrenamentul EMS mi se potrivește.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-7 py-4 text-sm font-bold text-[var(--text-primary)] transition-colors duration-150 hover:border-[#25D366] hover:text-[#1ebe57]"
                        >
                            <MessageCircle size={17} className="text-[#25D366]" />
                            Scrie-ne pe WhatsApp
                        </a>
                    </div>

                    {/* Trust row */}
                    <div
                        className="hero-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]"
                        style={{ animationDelay: '300ms' }}
                    >
                        <a
                            href={BRAND.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text-primary)]"
                        >
                            <span className="flex">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                                ))}
                            </span>
                            <strong className="font-semibold text-[var(--text-primary)]">5.0</strong> · 127 recenzii Google
                        </a>
                        <span className="inline-flex items-center gap-1.5">
                            <Check size={15} className="text-[var(--success)]" />
                            Prima ședință e gratuită
                        </span>
                    </div>
                </div>

                {/* ---------- RIGHT: hero image (instant, no third-party embed) ---------- */}
                <div className="lg:col-span-5">
                    <div
                        className="hero-rise relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] shadow-[var(--shadow-lg)] lg:max-w-none"
                        style={{ animationDelay: '160ms' }}
                    >
                        <img
                            src="/hero-ems.webp"
                            alt="Antrenament EMS cu antrenor personal la NeoBoost Oradea"
                            width={1100}
                            height={1375}
                            // @ts-ignore — fetchpriority is valid HTML, not yet in React types
                            fetchpriority="high"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        {/* Floating stat badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/55 px-4 py-3 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-wide text-white/70">
                                Tehnologie EMS Wireless
                            </span>
                            <span className="text-sm font-bold text-white">90% mușchi / sesiune</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Stat strip ---------- */}
            <div className="relative z-10 mx-auto mt-14 max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                    {STATS.map((s) => (
                        <div key={s.label} className="px-4 py-6 text-center">
                            <div className="font-display text-3xl font-black text-[var(--text-primary)] md:text-4xl">
                                {s.value}
                                <span className="text-[var(--accent-primary)]">{s.unit}</span>
                            </div>
                            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)] md:text-sm">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React, { useState, useRef, useEffect } from 'react';
import { StaggeredText } from '../ui/StaggeredText';
import { Marquee } from '../ui/Marquee';
import { Session } from '@supabase/supabase-js';
import {
    Check, X, MessageCircle, Zap, ArrowRight, ChevronDown, MapPin, Star, Phone,
} from 'lucide-react';
import {
    BRAND, UNIFIED_BENEFITS, GYM_VS_EMS, EMS_STEPS, MONTHLY_PACKAGES, LOCATIONS, FAQS,
} from '../../constants';
import { useStripeCheckout } from '../../lib/useStripeCheckout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Shared helpers — single source of truth for endpoints & layout    */
/* ------------------------------------------------------------------ */

export const waLink = (text: string) =>
    `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/*  CounterUp — animates a number from 0 to `end` on scroll entry     */
/* ------------------------------------------------------------------ */

export const CounterUp: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obj = { val: 0 };
        const tween = gsap.to(obj, {
            val: end,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
        return () => { tween.kill(); };
    }, [end, suffix]);
    return <span ref={ref}>0{suffix}</span>;
};

export const Section: React.FC<{
    id?: string;
    children: React.ReactNode;
    className?: string;
    tint?: boolean;
}> = ({ id, children, className = '', tint }) => (
    <section
        id={id}
        className={`scroll-mt-24 py-20 md:py-28 ${tint ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'} ${className}`}
    >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">{children}</div>
    </section>
);

export const Heading: React.FC<{ eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }> = ({
    eyebrow, title, sub, center = true,
}) => (
    <div className={`mb-14 ${center ? 'mx-auto max-w-2xl text-center' : ''}`}>
        <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)]">
            {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-black uppercase italic leading-[1.05] tracking-tight text-[var(--text-primary)] md:text-5xl">
            {typeof title === 'string' ? <StaggeredText text={title} /> : title}
        </h2>
        {sub && <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{sub}</p>}
    </div>
);

export const PrimaryCta: React.FC<{ onClick?: () => void; href?: string; children: React.ReactNode; className?: string }> = ({
    onClick, href, children, className = '',
}) => {
    const cls =
        `group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-secondary)] active:translate-y-0 ${className}`;
    const inner = (
        <>
            <Zap size={17} className="fill-current" />
            {children}
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
        </>
    );
    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    ) : (
        <button onClick={onClick} className={cls}>{inner}</button>
    );
};

export const WhatsappCta: React.FC<{ text: string; children: React.ReactNode; className?: string }> = ({
    text, children, className = '',
}) => (
    <a
        href={waLink(text)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-7 py-4 text-sm font-bold text-[var(--text-primary)] transition-colors duration-150 hover:border-[#25D366] hover:text-[#1ebe57] ${className}`}
    >
        <MessageCircle size={17} className="text-[#25D366]" />
        {children}
    </a>
);

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */
/*  Stats Marquee Strip                                                */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
    { icon: '⚡', text: '90% mușchi activați' },
    { icon: '⭐', text: '5.0 · 127 recenzii Google' },
    { icon: '🕐', text: '30 minute = 4h sală' },
    { icon: '🎯', text: 'Antrenor dedicat 1:1' },
    { icon: '📍', text: 'Oradea · Ramada & GetFit' },
    { icon: '🆓', text: 'Prima ședință GRATUITĂ' },
    { icon: '💪', text: 'EMS Wireless Drysuit' },
    { icon: '🏆', text: '500+ clienți transformați' },
];

export const StatsMarquee: React.FC = () => (
    <div
        className="relative overflow-hidden border-y border-[var(--border-subtle)] py-3"
        style={{ background: 'rgba(255,255,255,0.02)' }}
    >
        <Marquee pauseOnHover repeat={3} className="[--duration:35s]">
            {MARQUEE_ITEMS.map((item, i) => (
                <span
                    key={i}
                    className="mx-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] whitespace-nowrap"
                >
                    <span>{item.icon}</span>
                    {item.text}
                    <span className="ml-6 text-[var(--border-subtle)]">·</span>
                </span>
            ))}
        </Marquee>
    </div>
);

/* ------------------------------------------------------------------ */

export const Benefits: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.benefit-card-anim',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: 'power2.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
                }
            );
        }, gridRef);
        return () => ctx.revert();
    }, []);
    return (
        <Section id="beneficii">
            <Heading
                eyebrow="De ce NeoBoost"
                title={<>Rezultate reale,<br />nu promisiuni</>}
                sub="Antrenamentul EMS rezolvă problemele concrete pentru care oamenii vin la noi — de la slăbire la dureri de spate."
            />
            <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {UNIFIED_BENEFITS.map((b) => (
                    <div
                        key={b.id}
                        className="benefit-card-anim group relative flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7 transition-all duration-150 hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]"
                    >
                        {(b as any).badge && (
                            <span className="absolute right-5 top-5 rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                                {(b as any).badge}
                            </span>
                        )}
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] transition-colors group-hover:bg-[var(--accent-primary)] group-hover:text-white">
                            {b.icon}
                        </div>
                        <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                            {b.subtitle}
                        </p>
                        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{b.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{b.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

/* ------------------------------------------------------------------ */
/*  Comparison                                                         */
/* ------------------------------------------------------------------ */

export const Comparison: React.FC = () => (
    <Section id="comparatie" tint>
        <Heading
            eyebrow="Sală vs NeoBoost"
            title={<>De ce 30 de minute<br />bat 2 ore de sală</>}
        />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            <div className="grid grid-cols-12 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <div className="col-span-4 p-4 md:p-5">Criteriu</div>
                <div className="col-span-4 p-4 text-center md:p-5">Sală clasică</div>
                <div className="col-span-4 p-4 text-center text-[var(--accent-primary)] md:p-5">NeoBoost EMS</div>
            </div>
            {GYM_VS_EMS.map((row, i) => (
                <div
                    key={i}
                    className="grid grid-cols-12 items-center border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--bg-secondary)]"
                >
                    <div className="col-span-4 flex items-center gap-3 p-4 md:p-5">
                        <span className="hidden text-[var(--accent-primary)] sm:block">{row.icon}</span>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{row.feature}</span>
                    </div>
                    <div className="col-span-4 p-3 text-center md:p-5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] line-through decoration-[var(--text-disabled)] md:text-sm">
                            <X size={14} className="text-[var(--error)] no-underline" />
                            <span>{row.gym}</span>
                        </span>
                    </div>
                    <div className="col-span-4 p-3 text-center md:p-5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] md:text-sm">
                            <Check size={15} className="text-[var(--success)]" />
                            {row.ems}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

export const HowItWorks: React.FC = () => {
    const stepsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.step-card-anim',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out',
                    scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
                }
            );
        }, stepsRef);
        return () => ctx.revert();
    }, []);
    return (
        <Section id="metoda">
            <Heading eyebrow="Cum funcționează" title={<>Prima ta ședință,<br />pas cu pas</>} />
            <div ref={stepsRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {EMS_STEPS.map((s) => (
                    <div
                        key={s.id}
                        className="step-card-anim relative rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7"
                    >
                        <span className="font-display text-5xl font-black text-[var(--bg-tertiary)]">{s.id}</span>
                        <div className="-mt-4 mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                            {s.icon}
                        </div>
                        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{s.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

const TiltCard: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(4px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
        >
            {children}
        </div>
    );
};

export const PackageGrid: React.FC<{
    packages: typeof MONTHLY_PACKAGES;
    session: Session | null;
    unit?: string;
}> = ({ packages, session, unit = 'ședințe' }) => {
    const { handleCheckout, isLoading } = useStripeCheckout();
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => {
                const featured = pkg.isRecommended || (pkg as any).isPremium;
                return (
                    <TiltCard
                        key={pkg.title}
                        className={`relative flex flex-col rounded-[var(--radius-lg)] border bg-[var(--bg-primary)] p-7 ${pkg.isRecommended
                            ? 'border-[var(--accent-primary)] shadow-[var(--shadow-lg)] lg:-translate-y-2'
                            : 'border-[var(--border-subtle)] hover:border-[var(--text-disabled)]'
                            }`}
                    >
                        {pkg.isRecommended && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                Cel mai ales
                            </span>
                        )}
                        <h3 className="font-display text-lg font-black text-[var(--text-primary)]">{pkg.title}</h3>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                            {pkg.duration}
                        </p>
                        <div className="mt-5 flex items-baseline gap-1">
                            <span className="font-display text-4xl font-black text-[var(--text-primary)]">{pkg.price}</span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            {pkg.pricePerSession ? `~${pkg.pricePerSession} RON / ședință · ` : ''}{pkg.sessionCount} {unit}
                        </p>
                        <ul className="mt-6 flex-1 space-y-2.5">
                            {pkg.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--success)]" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            disabled={isLoading}
                            onClick={() => handleCheckout(pkg.stripePriceId || '', pkg.price, pkg.title, session)}
                            className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors duration-150 disabled:opacity-60 ${featured
                                ? 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-secondary)]'
                                : 'border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'
                                }`}
                        >
                            {isLoading ? 'Se încarcă…' : 'Abonează-te'}
                        </button>
                        <a
                            href={waLink(`Salut! Vreau detalii despre abonamentul ${pkg.title} (${pkg.sessionCount} ${unit}).`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-center text-xs font-semibold text-[var(--text-muted)] transition-colors hover:text-[#1ebe57]"
                        >
                            sau întreabă pe WhatsApp
                        </a>
                    </TiltCard>
                );
            })}
        </div>
    );
};

export const Pricing: React.FC<{ session: Session | null; onOpenBooking: () => void }> = ({ session, onOpenBooking }) => (
    <Section id="programe" tint>
        <Heading
            eyebrow="Abonamente"
            title={<>Alege ritmul tău</>}
            sub="Toate pachetele includ plan alimentar, acces la sală și analiză corporală. Prima ședință e gratuită — fără card, fără obligații."
        />
        <PackageGrid packages={MONTHLY_PACKAGES} session={session} unit="ședințe" />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta onClick={onOpenBooking}>Rezervă ședința gratuită</PrimaryCta>
            <WhatsappCta text="Salut! Vreau să aflu care abonament mi se potrivește.">
                Întreabă un antrenor
            </WhatsappCta>
        </div>
    </Section>
);

/* ------------------------------------------------------------------ */
/*  Locations                                                         */
/* ------------------------------------------------------------------ */

export const Locations: React.FC<{ onOpenLocation?: (loc: any) => void }> = ({ onOpenLocation }) => (
    <Section id="locatii">
        <Heading eyebrow="Unde ne găsești" title={<>Două locații în Oradea</>} />
        <div className="grid gap-5 md:grid-cols-2">
            {LOCATIONS.map((loc) => (
                <div
                    key={loc.id}
                    className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-7"
                >
                    <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                        <MapPin size={18} />
                        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{loc.name}</h3>
                    </div>
                    <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">{loc.address}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{loc.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {loc.perks.map((p, i) => (
                            <span
                                key={i}
                                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                        {onOpenLocation && (
                            <button
                                onClick={() => onOpenLocation(loc)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--accent-secondary)]"
                            >
                                Vezi locația <ArrowRight size={15} />
                            </button>
                        )}
                        <a
                            href={waLink(`Salut! Vreau să programez o ședință la locația ${loc.name}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-sm font-bold text-[var(--text-primary)] transition-colors hover:border-[#25D366] hover:text-[#1ebe57]"
                        >
                            <MessageCircle size={15} className="text-[#25D366]" /> WhatsApp
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

/* ------------------------------------------------------------------ */
/*  FAQ — click-to-open accordion (accessible, mobile-friendly)       */
/* ------------------------------------------------------------------ */

export const Faq: React.FC = () => {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <Section id="faq" tint>
            <Heading eyebrow="Întrebări frecvente" title={<>Ce vor să știe<br />clienții noștri</>} />
            <div className="mx-auto max-w-3xl">
                {FAQS.map((f, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={i} className="border-b border-[var(--border-subtle)]">
                            <button
                                onClick={() => setOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center gap-4 py-5 text-left"
                            >
                                <span className={`shrink-0 transition-colors ${isOpen ? 'text-[var(--accent-primary)]' : 'text-[var(--text-disabled)]'}`}>
                                    {f.icon}
                                </span>
                                <h3 className="flex-1 font-display text-base font-bold text-[var(--text-primary)] md:text-lg">
                                    {f.question}
                                </h3>
                                <ChevronDown
                                    size={20}
                                    className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--accent-primary)]' : ''}`}
                                />
                            </button>
                            <div
                                className="grid overflow-hidden transition-all duration-300 ease-out"
                                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                            >
                                <div className="min-h-0">
                                    <p className="pb-6 pl-12 pr-4 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                                        {f.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

export const FinalCta: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => (
    <section className="bg-[var(--bg-primary)] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--text-primary)] px-8 py-14 text-center md:px-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--bg-primary) 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="relative">
                    <div className="mb-5 inline-flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                        ))}
                        <span className="ml-2 text-sm text-[var(--bg-tertiary)]">5.0 · 127 recenzii</span>
                    </div>
                    <h2 className="font-display text-3xl font-black uppercase italic leading-[1.05] tracking-tight text-[var(--bg-primary)] md:text-5xl">
                        Prima ședință<br />e din partea casei
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-disabled)] md:text-lg">
                        Vino, încearcă antrenamentul EMS și simte diferența pe propriul corp. Fără card, fără obligații.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <PrimaryCta onClick={onOpenBooking}>Rezervă gratuit</PrimaryCta>
                        <WhatsappCta text="Salut! Vreau să programez prima ședință EMS gratuită.">
                            Scrie-ne pe WhatsApp
                        </WhatsappCta>
                    </div>
                    <a
                        href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--bg-tertiary)] transition-colors hover:text-[var(--bg-primary)]"
                    >
                        <Phone size={15} /> {BRAND.phone}
                    </a>
                </div>
            </div>
        </div>
    </section>
);

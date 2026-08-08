import React, { useState } from 'react';
import { Check, Users, User, Clock, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import {
    GYMOS_PORTAL_SUBSCRIPTION_URL,
    SESSION_MINUTES,
    STANDARD_MAX_PARTICIPANTS,
    featuresForMode,
    plansByMode,
    pricePerSession,
    type GymosPlan,
    type PlanMode,
} from '../../lib/gymosPlans';
import { waLink } from './index';

/* ------------------------------------------------------------------ */
/*  Copy pentru fiecare mod                                            */
/* ------------------------------------------------------------------ */

const MODE_COPY: Record<PlanMode, {
    switchLabel: string;
    switchHint: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}> = {
    standard: {
        switchLabel: 'Standard',
        switchHint: 'grup mic',
        title: 'Antrenament în grup mic',
        description: `Maximum ${STANDARD_MAX_PARTICIPANTS} persoane pe ședință, cu antrenor dedicat care te corectează și îți ajustează intensitatea. Energia unui grup mic, atenția unui antrenament personal.`,
        icon: <Users size={18} />,
    },
    exclusive: {
        switchLabel: 'Exclusive 1 la 1',
        switchHint: 'doar tu',
        title: 'Toată sala doar pentru tine',
        description:
            'Slotul se blochează integral pe numele tău. Nimeni altcineva în sală în timpul ședinței, doar tu și antrenorul. Program prioritar la rezervare și confidențialitate totală.',
        icon: <User size={18} />,
    },
};

/* ------------------------------------------------------------------ */
/*  Segmented switch                                                   */
/* ------------------------------------------------------------------ */

const ModeSwitch: React.FC<{ mode: PlanMode; onChange: (mode: PlanMode) => void }> = ({ mode, onChange }) => {
    const modes: PlanMode[] = ['standard', 'exclusive'];
    return (
        <div
            role="tablist"
            aria-label="Tipul de antrenament"
            className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-1.5"
        >
            {/* pilula care alunecă */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-[var(--accent-primary)] transition-transform duration-300 ease-out"
                style={{ transform: mode === 'exclusive' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            {modes.map((m) => {
                const active = mode === m;
                return (
                    <button
                        key={m}
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(m)}
                        className={`relative z-10 flex flex-col items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-200 ${
                            active ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                    >
                        <span className="flex items-center gap-1.5">
                            {MODE_COPY[m].icon}
                            {MODE_COPY[m].switchLabel}
                        </span>
                        <span
                            className={`mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
                                active ? 'text-white/70' : 'text-[var(--text-muted)]'
                            }`}
                        >
                            {MODE_COPY[m].switchHint}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

const PlanCard: React.FC<{ plan: GymosPlan; features: string[] }> = ({ plan, features }) => {
    const isExclusive = plan.mode === 'exclusive';
    const perSession = pricePerSession(plan);

    return (
        <div
            className={`relative flex flex-col rounded-[var(--radius-lg)] border bg-[var(--bg-primary)] p-7 transition-all duration-150 hover:-translate-y-1 ${
                plan.isRecommended
                    ? 'border-[var(--accent-primary)] shadow-[var(--shadow-lg)] lg:-translate-y-2 lg:hover:-translate-y-3'
                    : 'border-[var(--border-subtle)] hover:border-[var(--text-disabled)]'
            }`}
        >
            {plan.isRecommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Cel mai ales
                </span>
            )}

            <h3 className="font-display text-lg font-black uppercase text-[var(--text-primary)]">{plan.label}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {plan.cadence}
            </p>

            <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-black text-[var(--text-primary)]">{plan.price}</span>
                <span className="text-sm font-bold text-[var(--text-muted)]">{plan.currency}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
                ~{perSession} {plan.currency} / ședință · {plan.sessions} ședințe pe lună
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <Check
                            size={16}
                            className={`mt-0.5 shrink-0 ${isExclusive && i === 0 ? 'text-[var(--accent-primary)]' : 'text-[var(--success)]'}`}
                        />
                        <span className={isExclusive && i === 0 ? 'font-semibold text-[var(--text-primary)]' : ''}>{f}</span>
                    </li>
                ))}
            </ul>

            <a
                href={waLink(
                    `Salut! Vreau abonamentul ${plan.label} (${plan.sessions} ședințe, ${plan.price} ${plan.currency}). Cum începem?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors duration-150 ${
                    plan.isRecommended || isExclusive
                        ? 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-secondary)]'
                        : 'border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'
                }`}
            >
                <MessageCircle size={16} />
                Vreau acest pachet
            </a>

            <a
                href={GYMOS_PORTAL_SUBSCRIPTION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center text-xs font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]"
            >
                Ai deja cont? Reînnoiește în aplicație
            </a>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Secțiunea completă                                                 */
/* ------------------------------------------------------------------ */

export const PricingPlans: React.FC<{ defaultMode?: PlanMode }> = ({ defaultMode = 'standard' }) => {
    const [mode, setMode] = useState<PlanMode>(defaultMode);
    const plans = plansByMode(mode);
    const features = featuresForMode(mode);
    const copy = MODE_COPY[mode];

    return (
        <div>
            <ModeSwitch mode={mode} onChange={setMode} />

            {/* Explicația modului selectat */}
            <div className="mx-auto mt-7 max-w-2xl text-center">
                <h3 className="font-display text-xl font-black uppercase italic text-[var(--text-primary)] md:text-2xl">
                    {copy.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                    {copy.description}
                </p>
            </div>

            {/* Faptele care nu se schimbă între moduri */}
            <div className="mx-auto mb-12 mt-7 flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                    <Clock size={14} className="text-[var(--accent-primary)]" />
                    Ședință de {SESSION_MINUTES} de minute
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                    {mode === 'exclusive' ? (
                        <>
                            <User size={14} className="text-[var(--accent-primary)]" />
                            Doar tu și antrenorul
                        </>
                    ) : (
                        <>
                            <Users size={14} className="text-[var(--accent-primary)]" />
                            Maximum {STANDARD_MAX_PARTICIPANTS} persoane pe slot
                        </>
                    )}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                    <ShieldCheck size={14} className="text-[var(--accent-primary)]" />
                    Prima ședință gratuită
                </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => (
                    <PlanCard key={plan.gymosPlanId} plan={plan} features={features} />
                ))}
            </div>

            {mode === 'exclusive' && (
                <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[var(--text-muted)]">
                    Numărul de sloturi Exclusive în orele de vârf este limitat, pentru că un client Exclusive
                    ocupă slotul întreg. Dacă intervalul dorit e deja rezervat, îți propunem cea mai apropiată
                    variantă.
                </p>
            )}

            {mode === 'standard' && (
                <button
                    onClick={() => setMode('exclusive')}
                    className="group mx-auto mt-9 flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/40 bg-[var(--bg-secondary)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]"
                >
                    Vrei sala doar pentru tine? Vezi Exclusive
                    <ArrowRight size={15} className="text-[var(--accent-primary)] transition-transform group-hover:translate-x-1" />
                </button>
            )}
        </div>
    );
};

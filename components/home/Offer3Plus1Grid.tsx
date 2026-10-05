/**
 * Cardurile pachetelor 3+1, în designul cinematic.
 * Folosit pe /oferta-3-plus-1 și pe /preturi, din aceeași sursă (lib/offer3plus1.ts).
 */
import React, { useState } from 'react';
import { CheckCheck, CreditCard, MessageCircle } from 'lucide-react';
import { OFFERS_3PLUS1, type Offer3Plus1 } from '../../lib/offer3plus1';
import { waLink } from './index';

const fmt = (n: number) => n.toLocaleString('ro-RO');

const OfferCard: React.FC<{ o: Offer3Plus1; loading: boolean; onBuy: (o: Offer3Plus1) => void }> = ({ o, loading, onBuy }) => {
    const waText = `Salut! Vreau pachetul ${o.title} (oferta 3+1: ${o.paidSessions} + ${o.bonusSessions} ședințe bonus, ${o.price} ${o.currency}). Cum începem?`;
    return (
        <div
            className={`relative flex flex-col rounded-[var(--radius-lg)] border bg-[var(--bg-secondary)]/90 p-7 backdrop-blur-xl transition-colors ${
                o.isPremium ? 'border-[var(--accent-primary)] shadow-[0_0_40px_rgba(58,134,255,0.18)]' : 'border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/60'
            }`}
        >
            {o.isPremium && (
                <span className="nb-mono absolute -top-3 left-7 rounded-full bg-[var(--accent-primary)] px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-white">
                    Recomandat
                </span>
            )}
            <p className="nb-mono text-[12px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">{o.idealFor}</p>
            <h3 className="nb-display mt-2 text-[30px] font-bold uppercase leading-none tracking-[-0.03em] text-[var(--text-primary)]">{o.title}</h3>

            <div className="mt-6 flex items-end gap-3">
                <span className="nb-display text-[64px] font-bold leading-[0.8] tracking-[-0.05em] text-[var(--text-primary)]">{o.paidSessions}</span>
                <span className="nb-display pb-1 text-[26px] font-bold leading-none text-[var(--accent-primary)]">+{o.bonusSessions}</span>
                <span className="pb-1 text-[15px] text-[var(--text-secondary)]">ședințe, ultimele {o.bonusSessions} cadou</span>
            </div>

            {/* 4 luni ca 4 segmente: 3 plătite, 1 cadou */}
            <div className="mt-5 grid grid-cols-4 gap-1" aria-hidden="true">
                {[0, 1, 2, 3].map((m) => (
                    <span
                        key={m}
                        className="h-6 rounded-[4px]"
                        style={
                            m < 3
                                ? { background: '#3A86FF', boxShadow: '0 0 10px rgba(58,134,255,.45)' }
                                : { background: 'transparent', border: '1.5px dashed #39F5A0' }
                        }
                    />
                ))}
            </div>
            <div className="nb-mono mt-2 flex justify-between text-[12px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <span>3 luni x {fmt(o.monthlyPrice)} lei</span>
                <span className="text-[var(--success)]">luna 4 cadou</span>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5">
                {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[15px] text-[var(--text-secondary)]">
                        <CheckCheck size={16} className="mt-0.5 shrink-0 text-[var(--success)]" />
                        {f}
                    </li>
                ))}
            </ul>

            <div className="mt-7 border-t border-[var(--border-subtle)] pt-5">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <span className="nb-display text-[40px] font-bold leading-none tracking-[-0.03em] text-[var(--text-primary)]">{fmt(o.price)}</span>
                        <span className="ml-1.5 text-[16px] font-medium text-[var(--text-secondary)]">{o.currency}</span>
                    </div>
                    <span className="nb-mono pb-1 text-[13px] text-[var(--text-muted)] line-through">{fmt(o.fullValue)} {o.currency}</span>
                </div>
                <p className="nb-mono mt-2 text-[12px] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    ~{o.effectivePerSession} lei / ședință cu luna cadou
                </p>
            </div>

            {o.stripePriceId ? (
                <button
                    type="button"
                    onClick={() => onBuy(o)}
                    disabled={loading}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-secondary)] disabled:opacity-60"
                >
                    {loading ? 'Se procesează…' : (<><CreditCard size={16} /> Cumpără acum</>)}
                </button>
            ) : (
                <a
                    href={waLink(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-secondary)]"
                >
                    <MessageCircle size={16} /> Vreau pachetul
                </a>
            )}
            <a
                href={waLink(`Salut! Vreau să aflu dacă pachetul ${o.title} (oferta 3+1) mi se potrivește.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[var(--text-primary)] transition-colors hover:border-[#25D366] hover:text-[#1ebe57]"
            >
                <MessageCircle size={15} className="text-[#25D366]" /> Află dacă ți se potrivește
            </a>
        </div>
    );
};

export const Offer3Plus1Grid: React.FC<{ userId?: string | null }> = ({ userId = null }) => {
    const [loading, setLoading] = useState<string | null>(null);

    const onBuy = async (o: Offer3Plus1) => {
        if (!o.stripePriceId) return;
        try {
            setLoading(o.title);
            const res = await fetch(`${window.location.origin}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    priceId: o.stripePriceId,
                    amount: o.price,
                    productName: `${o.title} (Oferta 3+1)`,
                    interval: 'month',
                    intervalCount: 4,
                }),
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
                return;
            }
            throw new Error('Fără URL de plată');
        } catch {
            window.open(waLink(`Salut! Vreau pachetul ${o.title} (oferta 3+1, ${o.price} ${o.currency}).`), '_blank');
            setLoading(null);
        }
    };

    return (
        <div className="grid gap-5 md:grid-cols-3">
            {OFFERS_3PLUS1.map((o) => (
                <OfferCard key={o.title} o={o} loading={loading === o.title} onBuy={onBuy} />
            ))}
        </div>
    );
};

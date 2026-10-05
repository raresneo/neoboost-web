/**
 * Hero cinematic de 15 secunde: tipografie kinetică, forme care se transformă,
 * lume 3D în spate și o consolă de timeline modelată după tableta aparatului EMS.
 * Totul e calculat din același ceas, deci secvența se poate derula (scrub) oricând.
 */
import React, { useEffect, useState } from 'react';
import {
    clock, startClock, DURATION, SCENES, seg, clamp, lerp,
    easeOutExpo, easeInOut, easeInCubic, easeOutBack,
} from './timeline';
import { morph, toPoints, toClip, type ShapeName } from './shapes';
import { CinematicWorld } from './CinematicWorld';

export function useClock() {
    const [, set] = useState(0);
    useEffect(() => {
        const fn = () => set((n) => (n + 1) % 1e6);
        clock.listeners.add(fn);
        return () => {
            clock.listeners.delete(fn);
        };
    }, []);
    return clock;
}

type InMode = 'slam' | 'rise' | 'spread' | 'pop';
type OutMode = 'through' | 'drop' | 'slide' | 'none';

const Letters: React.FC<{
    text: string; t: number; start: number; end: number;
    stagger?: number; dur?: number; inn?: InMode; out?: OutMode;
}> = ({ text, t, start, end, stagger = 0.045, dur = 0.75, inn = 'rise', out = 'through' }) => {
    if (t < start - 0.05 || t > end + 0.6) return null;
    const chars = Array.from(text);
    return (
        <span className="inline-block whitespace-pre" style={{ transformStyle: 'preserve-3d' }} aria-hidden="true">
            {chars.map((ch, i) => {
                const p = seg(t, start + i * stagger, start + i * stagger + dur);
                const q = out === 'none' ? 0 : seg(t, end + i * stagger * 0.4, end + i * stagger * 0.4 + 0.45);
                let tr = '';
                let op = 1;
                let blur = 0;
                const e = easeOutExpo(p);
                if (inn === 'slam') {
                    tr += `translateZ(${lerp(600, 0, e)}px) scale(${lerp(1.8, 1, e)})`;
                    op = clamp(p * 3);
                    blur = lerp(16, 0, e);
                } else if (inn === 'rise') {
                    tr += `translateY(${lerp(70, 0, e)}%) rotateX(${lerp(-85, 0, e)}deg)`;
                    op = clamp(p * 2.5);
                } else if (inn === 'spread') {
                    tr += `translateX(${lerp((i - chars.length / 2) * 38, 0, e)}px)`;
                    op = clamp(p * 2);
                    blur = lerp(10, 0, e);
                } else {
                    tr += `scale(${lerp(0.2, 1, easeOutBack(p))}) translateY(${lerp(40, 0, e)}%)`;
                    op = clamp(p * 4);
                }
                if (q > 0) {
                    const k = easeInCubic(q);
                    if (out === 'through') {
                        tr += ` translateZ(${k * 900}px)`;
                        blur += k * 14;
                    } else if (out === 'drop') {
                        tr += ` translateY(${-k * 90}%) rotateX(${k * 70}deg)`;
                    } else if (out === 'slide') {
                        tr += ` translateX(${-k * 220}px)`;
                        blur += k * 8;
                    }
                    op *= 1 - q;
                }
                return (
                    <span
                        key={i}
                        className="inline-block"
                        style={{ transform: tr, opacity: op, filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined, willChange: 'transform, opacity' }}
                    >
                        {ch}
                    </span>
                );
            })}
        </span>
    );
};

const Mono: React.FC<{ text: string; t: number; start: number; end: number; className?: string }> = ({ text, t, start, end, className = '' }) => {
    if (t < start || t > end + 0.4) return null;
    const n = Math.floor(text.length * seg(t, start, start + 0.6));
    return (
        <div className={`nb-mono text-[14px] uppercase tracking-[0.2em] text-[var(--text-secondary)] ${className}`} style={{ opacity: 1 - seg(t, end, end + 0.4) }}>
            {text.slice(0, n)}
            <span className="text-[var(--accent-primary)]" style={{ opacity: n < text.length ? 1 : 0 }}>▌</span>
        </div>
    );
};

const display = 'nb-display font-bold uppercase leading-[0.86] tracking-[-0.045em]';
const perspective: React.CSSProperties = { perspective: '1100px' };

const SceneOne: React.FC<{ t: number }> = ({ t }) => (
    <div className="absolute inset-0 grid place-items-center" style={perspective}>
        <div className="text-center" style={{ transformStyle: 'preserve-3d' }}>
            <Mono text="Impuls 01 · 85 Hz · 10 canale" t={t} start={0.25} end={2.7} className="mb-6" />
            <div className={`${display} text-[clamp(160px,30vw,420px)] text-[var(--text-primary)]`}>
                <Letters text="30" t={t} start={0.35} end={2.75} stagger={0.12} dur={0.9} inn="slam" out="through" />
            </div>
            <div className={`${display} -mt-2 text-[clamp(40px,7vw,104px)] tracking-[0.02em] text-[var(--accent-primary)]`}>
                <Letters text="de minute" t={t} start={0.95} end={2.6} stagger={0.04} inn="rise" out="drop" />
            </div>
        </div>
    </div>
);

const SceneTwo: React.FC<{ t: number }> = ({ t }) => {
    if (t < 2.9 || t > 6.4) return null;
    const n = Math.round(90 * easeOutExpo(seg(t, 3.2, 4.4)));
    const pIn = easeOutExpo(seg(t, 3.05, 3.8));
    const pOut = easeInCubic(seg(t, 5.55, 6.05));
    return (
        <div className="absolute inset-0 grid place-items-center" style={perspective}>
            <div className="flex flex-col items-center md:flex-row md:items-end md:gap-10">
                <div
                    className={`${display} text-[clamp(140px,24vw,340px)] tabular-nums text-[var(--text-primary)]`}
                    style={{
                        opacity: pIn * (1 - pOut),
                        transform: `rotateY(${lerp(-40, 0, pIn) + pOut * 60}deg) translateX(${lerp(-120, 0, pIn)}px) scale(${1 + pOut * 0.3})`,
                        filter: `blur(${(1 - pIn) * 12 + pOut * 10}px)`,
                    }}
                >
                    {n}<span className="text-[var(--accent-primary)]">%</span>
                </div>
                <div className={`${display} pb-[0.4em] text-left text-[clamp(32px,4.6vw,68px)] leading-[0.95]`}>
                    <div className="text-[var(--text-primary)]"><Letters text="din mușchi" t={t} start={3.7} end={5.5} stagger={0.03} out="slide" /></div>
                    <div className="text-[var(--accent-primary)]"><Letters text="lucrează" t={t} start={3.95} end={5.55} stagger={0.03} out="slide" /></div>
                    <div className="text-[var(--text-secondary)]"><Letters text="simultan." t={t} start={4.2} end={5.6} stagger={0.03} out="slide" /></div>
                </div>
            </div>
        </div>
    );
};

const SceneThree: React.FC<{ t: number }> = ({ t }) => {
    if (t < 5.9 || t > 9.4) return null;
    return (
        <div className="absolute inset-0 grid place-items-center" style={perspective}>
            <div className="text-center">
                <Mono text="o ședință NeoBoost ≈" t={t} start={6.05} end={8.6} className="mb-5" />
                <div className={`${display} text-[clamp(110px,19vw,280px)] text-[var(--text-primary)]`}>
                    <Letters text="4 ore" t={t} start={6.2} end={8.75} stagger={0.08} dur={0.8} inn="slam" out="through" />
                </div>
                <div className={`${display} mt-2 text-[clamp(32px,5vw,72px)] tracking-[0.01em] text-[var(--accent-primary)]`}>
                    <Letters text="de sală clasică" t={t} start={6.7} end={8.6} stagger={0.03} inn="spread" out="drop" />
                </div>
            </div>
        </div>
    );
};

const SceneFour: React.FC<{ t: number; photo: string }> = ({ t, photo }) => {
    if (t < 8.9 || t > 12.5) return null;
    const pm = easeInOut(seg(t, 9.0, 10.0));
    const po = easeInOut(seg(t, 11.6, 12.2));
    let pts = morph('circle', 'panel', pm);
    if (po > 0) {
        const tri = morph('panel', 'triangle', po);
        pts = pts.map(([x, y], i) => [lerp(x, tri[i][0], po), lerp(y, tri[i][1], po)] as [number, number]);
    }
    const scale = lerp(0.18, 1, easeOutExpo(seg(t, 9.0, 10.1))) * (1 - po * 0.85);
    const kb = lerp(1.18, 1.02, seg(t, 9, 12.2));
    const words = [
        { w: 'Wireless.', at: 9.55 },
        { w: '1 la 1.', at: 10.05 },
        { w: 'În Oradea.', at: 10.55 },
    ];
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 md:flex-row md:justify-between md:px-[8vw]" style={perspective}>
            <div className={`${display} order-2 text-[clamp(44px,6.4vw,104px)] !leading-[1.02] md:order-1`}>
                {words.map((x, i) => (
                    <div key={x.w} className={i === 1 ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}>
                        <Letters text={x.w} t={t} start={x.at} end={11.55 + i * 0.08} stagger={0.03} inn="pop" out="slide" />
                    </div>
                ))}
            </div>
            <div
                className="relative order-1 aspect-[4/5] w-[min(58vw,380px)] md:order-2"
                style={{ transform: `scale(${scale}) rotateY(${lerp(-18, -6, pm)}deg)`, transformStyle: 'preserve-3d' }}
            >
                <div className="absolute inset-0 overflow-hidden" style={{ clipPath: toClip(pts) }}>
                    <img src={photo} alt="" className="h-full w-full object-cover" style={{ transform: `scale(${kb})` }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#06070B]/50 via-transparent to-[#3A86FF]/15" />
                </div>
                <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points={toPoints(pts, 50, 50, 50, 50)} fill="none" stroke="#3A86FF" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
                </svg>
            </div>
        </div>
    );
};

const SceneFive: React.FC<{ t: number; onCta: () => void }> = ({ t, onCta }) => {
    if (t < 11.9) return null;
    const btn = easeOutBack(seg(t, 13.0, 13.6));
    const fade = 1 - easeInOut(seg(t, 14.55, 14.95));
    return (
        <div className="absolute inset-0 grid place-items-center" style={{ ...perspective, opacity: fade }}>
            <div className="text-center">
                <div className={`${display} text-[clamp(36px,5.2vw,80px)] tracking-[-0.02em] text-[var(--text-primary)]`}>
                    <Letters text="Prima ședință e" t={t} start={12.1} end={99} stagger={0.025} out="none" />
                </div>
                <div className={`${display} mt-1 text-[clamp(72px,15vw,230px)] text-[var(--accent-primary)]`} style={{ textShadow: '0 0 60px rgba(58,134,255,0.45)' }}>
                    <Letters text="gratuită" t={t} start={12.4} end={99} stagger={0.06} dur={0.85} inn="slam" out="none" />
                </div>
                <button
                    type="button"
                    onClick={onCta}
                    tabIndex={t > 13 ? 0 : -1}
                    className="pointer-events-auto mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--accent-primary)] px-8 py-4 nb-display text-[16px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_40px_rgba(58,134,255,0.55)] transition-colors hover:bg-[var(--accent-secondary)]"
                    style={{ transform: `scale(${btn})`, opacity: clamp(btn) }}
                >
                    Rezervă ședința gratuită <span aria-hidden="true">→</span>
                </button>
            </div>
        </div>
    );
};

const CUTS: { at: number; a: ShapeName; b: ShapeName }[] = [
    { at: 2.75, a: 'circle', b: 'diamond' },
    { at: 5.75, a: 'diamond', b: 'triangle' },
    { at: 8.75, a: 'triangle', b: 'hex' },
    { at: 11.75, a: 'hex', b: 'circle' },
];

const Cuts: React.FC<{ t: number }> = ({ t }) => {
    const c = CUTS.find((x) => t >= x.at && t <= x.at + 1.1);
    if (!c) return null;
    const p = seg(t, c.at, c.at + 1.1);
    const pts = morph(c.a, c.b, easeInOut(clamp(p * 1.4)));
    const s = lerp(6, 120, easeInCubic(p));
    const rot = p * Math.PI * 0.6;
    return (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice" style={{ opacity: Math.sin(Math.PI * p) }}>
            <polygon points={toPoints(pts, 0, 0, s, s, rot)} fill="none" stroke="#3A86FF" strokeWidth={lerp(0.6, 3, p)} />
            <polygon points={toPoints(pts, 0, 0, s * 0.82, s * 0.82, -rot)} fill="none" stroke="#BFD4FF" strokeWidth={lerp(0.3, 1.2, p)} opacity="0.6" />
        </svg>
    );
};

const Console: React.FC = () => {
    const c = useClock();
    const t = c.t;
    const pulse = Math.sin(t * Math.PI * 1.6) > 0;
    const fmt = (x: number) => `00:${String(Math.floor(x)).padStart(2, '0')}`;
    return (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 px-4 pb-[96px] md:px-8 xl:pb-7">
            <div className="mx-auto flex max-w-[1240px] items-center gap-4 rounded-2xl border border-white/10 bg-[#0B0F1C]/70 px-4 py-3 backdrop-blur-xl md:gap-6 md:px-5">
                <button
                    type="button"
                    onClick={() => { clock.playing = !clock.playing; clock.emit(); }}
                    aria-label={c.playing ? 'Pauză secvență' : 'Pornește secvența'}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--text-primary)] text-[#06070B] transition-transform hover:scale-105"
                >
                    {c.playing ? (
                        <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9.5-5.5z" fill="currentColor" /></svg>
                    )}
                </button>
                <div className="nb-mono w-[118px] shrink-0 text-[14px] tabular-nums text-[var(--text-primary)]">
                    {fmt(t)} <span className="text-[var(--text-secondary)]">/ 00:15</span>
                </div>
                <div className="relative min-w-0 flex-1">
                    <div
                        className="relative h-9 cursor-pointer touch-none"
                        role="slider"
                        aria-label="Poziție în secvență"
                        aria-valuemin={0}
                        aria-valuemax={15}
                        aria-valuenow={Math.floor(t)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowRight') clock.seek(t + 1);
                            if (e.key === 'ArrowLeft') clock.seek(t - 1);
                        }}
                        onPointerDown={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            const go = (x: number) => clock.seek(clamp((x - r.left) / r.width) * (DURATION - 0.01));
                            go(e.clientX);
                            const mv = (ev: PointerEvent) => go(ev.clientX);
                            const up = () => {
                                window.removeEventListener('pointermove', mv);
                                window.removeEventListener('pointerup', up);
                            };
                            window.addEventListener('pointermove', mv);
                            window.addEventListener('pointerup', up);
                        }}
                    >
                        <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10" />
                        <div className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_12px_#3A86FF]" style={{ width: `${(t / DURATION) * 100}%` }} />
                        {SCENES.map((s) => (
                            <div key={s.at} className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-white/30" style={{ left: `${(s.at / DURATION) * 100}%` }} />
                        ))}
                    </div>
                    <div className="relative hidden h-5 md:block">
                        {SCENES.map((s, i) => {
                            const on = t >= s.at && (i === SCENES.length - 1 || t < SCENES[i + 1].at);
                            return (
                                <button
                                    key={s.at}
                                    type="button"
                                    onClick={() => clock.seek(s.at + 0.01)}
                                    className={`nb-mono absolute top-0 text-[14px] uppercase tracking-[0.12em] transition-colors ${on ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                    style={{ left: `${(s.at / DURATION) * 100}%` }}
                                >
                                    {s.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="hidden items-end gap-[3px] lg:flex" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, i) => {
                        const h = 6 + (0.5 + 0.5 * Math.sin(t * 3 + i * 0.7)) * 14 + (pulse ? 6 : 0);
                        return <span key={i} className="w-[4px] rounded-sm bg-[var(--accent-primary)]" style={{ height: h, opacity: pulse ? 1 : 0.6 }} />;
                    })}
                </div>
                <div className="nb-mono hidden items-center gap-2 text-[14px] uppercase tracking-[0.12em] text-[var(--text-secondary)] sm:flex">
                    <span className="h-2 w-2 rounded-full bg-[var(--success)]" style={{ boxShadow: pulse ? '0 0 10px #39F5A0' : 'none', opacity: pulse ? 1 : 0.45 }} />
                    85 Hz
                </div>
            </div>
        </div>
    );
};

const Overlay: React.FC<{ onCta: () => void; photo: string }> = ({ onCta, photo }) => {
    const { t, scroll } = useClock();
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const fade = 1 - clamp(scroll / (vh * 0.55));
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: fade }}>
            <SceneOne t={t} />
            <SceneTwo t={t} />
            <SceneThree t={t} />
            <SceneFour t={t} photo={photo} />
            <SceneFive t={t} onCta={onCta} />
            <Cuts t={t} />
        </div>
    );
};

export const CinematicHero: React.FC<{ onOpenBooking?: () => void; photo?: string }> = ({ onOpenBooking, photo = '/hero-ems.webp' }) => {
    useEffect(() => startClock(), []);
    const onCta = () => {
        if (onOpenBooking) onOpenBooking();
        else window.open('https://wa.me/40769124019?text=' + encodeURIComponent('Salut! Vreau să programez ședința EMS gratuită de 30 de minute.'), '_blank');
    };
    return (
        <>
            <CinematicWorld />
            <section className="nb-hero relative z-10 h-[100svh] min-h-[620px]" aria-label="NeoBoost EMS Oradea">
                <h1 className="sr-only">NeoBoost: antrenament EMS de 30 de minute în Oradea. Prima ședință e gratuită.</h1>
                <p className="sr-only">
                    30 de minute. 90% din mușchi lucrează simultan. O ședință NeoBoost echivalează cu 4 ore de sală clasică. Wireless, 1 la 1, în Oradea.
                </p>
                <Overlay onCta={onCta} photo={photo} />
                <Console />
            </section>
        </>
    );
};

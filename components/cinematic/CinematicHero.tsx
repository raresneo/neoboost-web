/**
 * Hero cinematic de 15 secunde: tipografie kinetică, forme care se transformă,
 * lume 3D în spate. Rulează singură în buclă, ca design viu al paginii, nu ca video:
 * fără player, fără timecode. Totul e calculat din același ceas.
 */
import React, { useEffect, useState } from 'react';
import {
    clock, startClock, seg, clamp, lerp,
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
                // Doar transform + opacity (pe GPU). Fără filter: blur pe fiecare literă bloca mobilul.
                let tr = '';
                let op = 1;
                const e = easeOutExpo(p);
                if (inn === 'slam') {
                    tr += `translateZ(${lerp(700, 0, e)}px) scale(${lerp(1.9, 1, e)})`;
                    op = clamp(p * 3);
                } else if (inn === 'rise') {
                    tr += `translateY(${lerp(70, 0, e)}%) rotateX(${lerp(-85, 0, e)}deg)`;
                    op = clamp(p * 2.5);
                } else if (inn === 'spread') {
                    tr += `translateX(${lerp((i - chars.length / 2) * 38, 0, e)}px) rotateY(${lerp(60, 0, e)}deg)`;
                    op = clamp(p * 2);
                } else {
                    tr += `scale(${lerp(0.2, 1, easeOutBack(p))}) translateY(${lerp(40, 0, e)}%)`;
                    op = clamp(p * 4);
                }
                if (q > 0) {
                    const k = easeInCubic(q);
                    if (out === 'through') {
                        tr += ` translateZ(${k * 900}px)`;
                    } else if (out === 'drop') {
                        tr += ` translateY(${-k * 90}%) rotateX(${k * 70}deg)`;
                    } else if (out === 'slide') {
                        tr += ` translateX(${-k * 220}px) rotateY(${-k * 40}deg)`;
                    }
                    op *= 1 - q;
                }
                return (
                    <span
                        key={i}
                        className="inline-block"
                        style={{ transform: tr, opacity: op }}
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
/** Cifrele mari primesc o „extrudare” 3D: straturi albastre în spate, ca un relief. */
const extrude: React.CSSProperties = {
    textShadow: '0 1px 0 #9DBDFF, 0 3px 0 #3A86FF, 0 6px 0 #1F55B8, 0 10px 0 #12306B, 0 18px 40px rgba(58,134,255,0.45)',
};
const perspective: React.CSSProperties = { perspective: '1100px' };

const SceneOne: React.FC<{ t: number }> = ({ t }) => (
    <div className="absolute inset-0 grid place-items-center" style={perspective}>
        <div className="text-center" style={{ transformStyle: 'preserve-3d' }}>
            <Mono text="Impuls 01 · 85 Hz · 10 canale" t={t} start={0.25} end={2.7} className="mb-6" />
            <div className={`${display} text-[clamp(160px,30vw,420px)] text-[var(--text-primary)]`} style={extrude}>
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
                        ...extrude,
                        opacity: pIn * (1 - pOut),
                        transform: `rotateY(${lerp(-40, 0, pIn) + pOut * 60}deg) translateX(${lerp(-120, 0, pIn)}px) scale(${1 + pOut * 0.3})`,
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
                <div className={`${display} text-[clamp(110px,19vw,280px)] text-[var(--text-primary)]`} style={extrude}>
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

/** Indicator discret de scroll: fără player, fără timecode. Secvența rulează singură, ca fundal viu. */
const ScrollCue: React.FC = () => {
    const { scroll } = useClock();
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[104px] z-20 flex flex-col items-center gap-3 xl:bottom-10"
            style={{ opacity: 1 - clamp(scroll / 200) }}
        >
            <span className="nb-mono text-[12px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/15">
                <span className="nb-scroll-dot absolute left-0 top-0 h-4 w-px bg-[var(--accent-primary)] shadow-[0_0_8px_#3A86FF]" />
            </span>
        </div>
    );
};

const Overlay: React.FC<{ onCta: () => void; photo: string }> = ({ onCta, photo }) => {
    const { t, scroll, px, py } = useClock();
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const fade = 1 - clamp(scroll / (vh * 0.55));
    // după ce hero-ul a ieșit din ecran nu mai randăm nimic
    if (fade <= 0.001) return null;
    // tipografia se înclină invers față de cameră: stă „în” spațiul 3D, nu lipită pe ecran
    const tilt = `rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg) translate3d(${(-px * 14).toFixed(1)}px, ${(-py * 10).toFixed(1)}px, 0)`;
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: fade, perspective: '1400px' }}>
            <div className="absolute inset-0" style={{ transform: tilt, transformStyle: 'preserve-3d' }}>
                <SceneOne t={t} />
                <SceneTwo t={t} />
                <SceneThree t={t} />
                <SceneFour t={t} photo={photo} />
                <SceneFive t={t} onCta={onCta} />
            </div>
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
                <ScrollCue />
            </section>
        </>
    );
};

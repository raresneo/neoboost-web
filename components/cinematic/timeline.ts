/**
 * Ceasul comun al secvenței cinematice de 15 secunde din hero.
 * Îl citesc și overlay-ul DOM (tipografia kinetică), și lumea 3D (three.js).
 */
export const DURATION = 15;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeInCubic = (x: number) => x * x * x;
export const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export const SCENES = [
    { at: 0, label: '30 min' },
    { at: 3, label: '90%' },
    { at: 6, label: '4 ore' },
    { at: 9, label: '1 la 1' },
    { at: 12, label: 'Gratuit' },
];

type Listener = () => void;

export const clock = {
    t: 0,
    playing: true,
    scroll: 0,
    reduced: false,
    listeners: new Set<Listener>(),
    seek(t: number) {
        this.t = ((t % DURATION) + DURATION) % DURATION;
        this.emit();
    },
    emit() {
        this.listeners.forEach((fn) => fn());
    },
};

let raf = 0;
let users = 0;

/** Pornește bucla master. Se oprește singură când nu mai e nimeni montat. */
export function startClock() {
    users += 1;
    if (users > 1) return stopClock;
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    clock.reduced = reduced;
    if (reduced) {
        clock.playing = false;
        clock.t = 13.8;
    }
    let last = performance.now();
    const loop = (now: number) => {
        const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
        last = now;
        if (clock.playing && !document.hidden) clock.t = (clock.t + dt) % DURATION;
        clock.scroll = window.scrollY || document.documentElement.scrollTop || 0;
        clock.emit();
        raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return stopClock;
}

function stopClock() {
    users = Math.max(0, users - 1);
    if (users === 0) cancelAnimationFrame(raf);
}

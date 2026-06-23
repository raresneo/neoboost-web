import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, MessageCircle } from 'lucide-react';
import { BRAND } from '../../constants';

/* ================================================================== */
/*  Goals with real value metrics — not taglines                      */
/* ================================================================== */

const GOALS = [
    {
        id: 'slabit',
        icon: '🔥',
        label: 'Slăbire & Remodelare',
        stats: [
            { label: 'Grăsime pierdută', value: '5–8 kg', period: 'în 8 ședințe' },
            { label: 'Metabolism boosted', value: '+23%', period: 'post-ședință' },
            { label: 'Calorii arse', value: '600–800', period: 'per ședință EMS' },
            { label: 'Frecvență ideală', value: '2×/săpt', period: 'rezultate în 4 săpt' },
        ],
        color: '#FF6B35',
        focus: 'Abdomen · Glute · Coapse',
    },
    {
        id: 'tonifiere',
        icon: '💪',
        label: 'Tonifiere & Sculptare',
        stats: [
            { label: 'Activare musculară', value: '90%', period: 'vs 30% la sală' },
            { label: 'Definire vizibilă', value: '3–4 săpt', period: 'cu 2× pe săptămână' },
            { label: 'Masă musculară', value: '+12–15%', period: 'în 6 săptămâni' },
            { label: 'Cost per ședință', value: '75 RON', period: 'pachetul Elite' },
        ],
        color: '#3B82F6',
        focus: 'Piept · Bicepși · Glute · Cvadricepși',
    },
    {
        id: 'coloana',
        icon: '🦴',
        label: 'Sănătatea Oaselor & Articulațiilor',
        stats: [
            { label: 'Reducere dureri spate', value: '78%', period: 'în 12 săptămâni' },
            { label: 'Spasme musculare', value: '−95%', period: 'în 6 ședințe' },
            { label: 'Mobilitate articulară', value: '+35%', period: 'umeri, șold, genunchi' },
            { label: 'Sigur și cu hernii', value: '1–2×/săpt', period: 'frecvență recomandată' },
        ],
        color: '#22C55E',
        focus: 'Paravertebrali · Core profund · Umeri · Șold',
    },
    {
        id: 'postura',
        icon: '⚖️',
        label: 'Postură & Echilibru',
        stats: [
            { label: 'Corecție posturală', value: '+40%', period: 'simetrie în 8 ședințe' },
            { label: 'Mușchi stabilizatori', value: '100%', period: 'activați simultan' },
            { label: 'Propriocepție', value: '+28%', period: 'echilibru dinamic' },
            { label: 'Dureri cronice gât/umeri', value: '−60%', period: 'în 10 ședințe' },
        ],
        color: '#A78BFA',
        focus: 'Core · Paravertebrali · Umeri · Gambă',
    },
    {
        id: 'energie',
        icon: '⚡',
        label: 'Energie & Performanță',
        stats: [
            { label: 'VO₂ Max', value: '+18%', period: 'în 8–12 ședințe' },
            { label: 'Recuperare post-efort', value: '−40%', period: 'timp de refacere' },
            { label: 'Forță maximă', value: '+25%', period: 'în 6 săptămâni' },
            { label: 'Energie zilnică', value: '+3 ore', period: 'vitalitate activă' },
        ],
        color: '#F59E0B',
        focus: 'Full Body · Picioare · Core · Brațe',
    },
];

const FREQUENCIES = [
    { id: '1', label: '1×/săptămână', sessions: 4,  hint: 'Start ușor' },
    { id: '2', label: '2×/săptămână', sessions: 8,  hint: 'Recomandat' },
    { id: '3', label: '3×/săptămână', sessions: 10, hint: 'Intensiv' },
    { id: '4', label: '4×/săptămână', sessions: 12, hint: 'Performanță max' },
];

// Per-goal projections for each frequency level (index 0–3 = 1× to 4×/săpt)
const GOAL_PROGRESS: Record<string, { result: string; timeframe: string; bullets: string[] }[]> = {
    slabit: [
        { result: '−1–2 kg grăsime', timeframe: 'prima lună',
          bullets: ['Metabolism pornit', 'Primele schimbări vizibile', 'Ideal pentru debut'] },
        { result: '−3–5 kg · metabolism +15%', timeframe: 'în 4 săptămâni',
          bullets: ['Ardere activă de grăsime', 'Metabolism accelerat +15%', 'Abdomen mai definit'] },
        { result: '−5–8 kg · corp reformat', timeframe: 'în 4 săptămâni',
          bullets: ['Corp reformat complet', 'Celulită redusă semnificativ', 'Energie și tonus crescut'] },
        { result: '−7–10 kg · transformare totală', timeframe: 'în 4 săptămâni',
          bullets: ['Transformare corporală totală', 'Metabolism la nivel atletic', 'Siluetă complet redesenată'] },
    ],
    tonifiere: [
        { result: 'Tonifiere de bază vizibilă', timeframe: 'în 6 săptămâni',
          bullets: ['Mușchi mai fermi și mai elastici', 'Tonus general îmbunătățit', 'Primele contururi vizibile'] },
        { result: 'Definire clară · masă +10%', timeframe: 'în 4 săptămâni',
          bullets: ['Definire musculară clară', 'Masă musculară +10%', 'Forță și rezistență crescute'] },
        { result: 'Sculptare intensă · masă +13%', timeframe: 'în 4 săptămâni',
          bullets: ['Sculptare musculară intensă', 'Bicepși și glute definite', 'Masă musculară +13%'] },
        { result: 'Corp de performanță · masă +15%', timeframe: 'în 4 săptămâni',
          bullets: ['Corp de performanță atletică', 'Activare musculară 90%', 'Masă +15% · forță maximă'] },
    ],
    coloana: [
        { result: 'Spasme reduse · postură mai bună', timeframe: 'în 3 săptămâni',
          bullets: ['Spasme musculare diminuate', 'Postură îmbunătățită vizibil', 'Primele zile fără dureri'] },
        { result: '−60% dureri · mobilitate +20%', timeframe: 'în 4 săptămâni',
          bullets: ['Dureri de spate −60%', 'Mobilitate articulară +20%', 'Coloana vertebrală stabilizată'] },
        { result: '−80% dureri · articulații libere', timeframe: 'în 4 săptămâni',
          bullets: ['Dureri eliminate în proporție de 80%', 'Articulații eliberate și mobile', 'Core profund activat'] },
        { result: 'Durere eliminată · recuperare completă', timeframe: 'în 4 săptămâni',
          bullets: ['Zero dureri cronice', 'Recuperare completă funcțională', 'Coloana 100% sănătoasă'] },
    ],
    postura: [
        { result: 'Stabilizatori activați · aliniere +10%', timeframe: 'în 4 săptămâni',
          bullets: ['Mușchi stabilizatori activați', 'Aliniere posturală +10%', 'Echilibru îmbunătățit'] },
        { result: 'Postură corectată · echilibru +20%', timeframe: 'în 4 săptămâni',
          bullets: ['Postură corectată vizibil', 'Echilibru dinamic +20%', 'Dureri gât/umeri reduse'] },
        { result: 'Propriocepție +28% · dureri −50%', timeframe: 'în 4 săptămâni',
          bullets: ['Propriocepție +28%', 'Dureri cronice −50%', 'Control corporal total'] },
        { result: 'Corp perfect aliniat · control total', timeframe: 'în 4 săptămâni',
          bullets: ['Corp perfect aliniat', 'Zero dureri posturale', 'Mișcare fluentă și naturală'] },
    ],
    energie: [
        { result: 'Energie +1h zilnic · recuperare rapidă', timeframe: 'în 3 săptămâni',
          bullets: ['Energie zilnică +1 oră', 'Recuperare post-efort mai rapidă', 'Vitalitate crescută constant'] },
        { result: 'VO₂ Max +10% · forță +15%', timeframe: 'în 4 săptămâni',
          bullets: ['Capacitate aerobă VO₂ Max +10%', 'Forță musculară +15%', 'Rezistență la efort crescută'] },
        { result: 'Performanță +25% · recuperare −30%', timeframe: 'în 4 săptămâni',
          bullets: ['Performanță sportivă +25%', 'Timp recuperare −30%', 'Anduranță la nivel avansat'] },
        { result: 'Nivel atletic · vitalitate maximă', timeframe: 'în 4 săptămâni',
          bullets: ['Nivel atletic real atins', 'Vitalitate și energie maximă', 'Corp de înaltă performanță'] },
    ],
};

const BUDGET_OPTIONS = [
    { value: 125,  label: '~125 RON',  desc: 'O ședință · test drive' },
    { value: 460,  label: '~460 RON',  desc: 'STARTER · 4 ședințe' },
    { value: 710,  label: '~710 RON',  desc: 'PROGRESS · 8 ședințe' },
    { value: 850,  label: '~850 RON',  desc: 'TRANSFORM · 10 ședințe' },
    { value: 900,  label: '~900 RON',  desc: 'ELITE · 12 ședințe' },
];

const PACKAGES = [
    { id: 'single',    title: 'O ședință',    price: 125, sessions: 1,  perSess: 125, badge: '🎯', idealFor: 'Prima experiență EMS' },
    { id: 'starter',   title: 'STARTER 🌱',   price: 460, sessions: 4,  perSess: 115, badge: '🌱', idealFor: 'Începători sau întreținere' },
    { id: 'progress',  title: 'PROGRESS 🚀',  price: 710, sessions: 8,  perSess: 89,  badge: '🚀', idealFor: 'Slăbire și tonifiere rapidă' },
    { id: 'transform', title: 'TRANSFORM 🔥', price: 850, sessions: 10, perSess: 85,  badge: '🔥', idealFor: 'Transformare intensivă' },
    { id: 'elite',     title: 'ELITE 👑',     price: 900, sessions: 12, perSess: 75,  badge: '👑', idealFor: 'Performanță maximă' },
];

function recommend(sessions: number, budget: number) {
    const byBudget = PACKAGES.filter(p => p.price <= budget);
    if (!byBudget.length) return PACKAGES[0];
    return byBudget.reduce((best, p) =>
        Math.abs(p.sessions - sessions) < Math.abs(best.sessions - sessions) ? p : best
    );
}

function buildWA(goal: string, freq: string, budget: number, pkg: typeof PACKAGES[0], gender?: string, ageGroup?: string) {
    const g = GOALS.find(x => x.id === goal)?.label ?? '';
    const f = FREQUENCIES.find(x => x.id === freq)?.label ?? '';
    const genLabel = gender === 'male' ? 'Bărbat' : gender === 'female' ? 'Femeie' : '';
    const msg =
        `Salut! Am completat quiz-ul pe neo-boost.com.\n\n` +
        (genLabel ? `👤 Profil: ${genLabel}${ageGroup ? `, ${ageGroup} ani` : ''}\n` : '') +
        `🎯 Obiectiv: ${g}\n` +
        `📅 Disponibilitate: ${f}\n` +
        `💰 Buget: ~${budget} RON/lună\n` +
        `📦 Recomandat: ${pkg.title}\n\n` +
        `Vreau să rezerv ședința gratuită! 🙌`;
    return `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(msg)}`;
}

/* ================================================================== */
/*  Electrode positions on the EMS suit photos                       */
/* ================================================================== */

const ELECTRODES: Record<'male' | 'female', { top: number; left: number }[]> = {
    male: [
        { top: 27, left: 36 }, { top: 27, left: 64 }, // pectoral stâng/drept
        { top: 36, left: 21 }, { top: 36, left: 79 }, // bicepși
        { top: 44, left: 38 }, { top: 44, left: 60 }, // abs superior
        { top: 51, left: 39 }, { top: 51, left: 59 }, // abs inferior
        { top: 61, left: 37 }, { top: 61, left: 63 }, // glute
        { top: 71, left: 36 }, { top: 71, left: 64 }, // cvadricepși
    ],
    female: [
        { top: 23, left: 35 }, { top: 23, left: 65 }, // piept
        { top: 32, left: 22 }, { top: 32, left: 78 }, // bicepși
        { top: 42, left: 38 }, { top: 42, left: 62 }, // core
        { top: 54, left: 38 }, { top: 54, left: 62 }, // glute
        { top: 66, left: 36 }, { top: 66, left: 64 }, // cvadricepși
    ],
};

const ElectrodeOverlay: React.FC<{ gender: 'male' | 'female'; freqIdx: number; goalColor: string }> = ({ gender, freqIdx, goalColor }) => {
    const electrodes = ELECTRODES[gender] ?? ELECTRODES.male;
    const duration = [2.8, 2.0, 1.4, 0.9][freqIdx];
    const dotSize = [8, 10, 13, 16][freqIdx];
    const maxOp = [0.50, 0.68, 0.84, 1.0][freqIdx];
    return (
        <>
            <style>{`
                @keyframes electroSpark {
                    0%,100% { opacity: 0.18; transform: translate(-50%,-50%) scale(1); }
                    50% { opacity: ${maxOp}; transform: translate(-50%,-50%) scale(1.9); }
                }
            `}</style>
            {electrodes.map((e, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: `${e.top}%`, left: `${e.left}%`,
                    width: dotSize, height: dotSize,
                    borderRadius: '50%',
                    background: goalColor,
                    transform: 'translate(-50%,-50%)',
                    boxShadow: `0 0 ${dotSize * 2}px ${goalColor}, 0 0 ${dotSize * 4}px ${goalColor}50`,
                    animation: `electroSpark ${duration}s ease-in-out ${((i * 0.22) % duration).toFixed(2)}s infinite`,
                    pointerEvents: 'none',
                }} />
            ))}
        </>
    );
};

/* ================================================================== */
/*  Animated Body — reacts to goal selection                          */
/* ================================================================== */

const BodyVisualization: React.FC<{ goal: string; isAnimating: boolean; intensity?: number }> = ({ goal, isAnimating, intensity = 3 }) => {
    const goalData = GOALS.find(g => g.id === goal);
    const color = goalData?.color ?? '#3B82F6';

    // intensity 0–3: controls muscle highlight size + opacity
    const LEVELS = [
        { opacity: 0.10, scale: 0.60 },
        { opacity: 0.20, scale: 0.80 },
        { opacity: 0.33, scale: 1.00 },
        { opacity: 0.52, scale: 1.22 },
    ];
    const lvl = LEVELS[Math.max(0, Math.min(3, intensity))];

    const muscleMap: Record<string, { cx: number; cy: number; rx: number; ry: number }[]> = {
        slabit: [
            { cx: 60, cy: 110, rx: 22, ry: 24 }, // abdomen
            { cx: 44, cy: 165, rx: 12, ry: 22 }, { cx: 76, cy: 165, rx: 12, ry: 22 }, // glutes
            { cx: 60, cy: 95, rx: 20, ry: 18 }, // back
        ],
        tonifiere: [
            { cx: 30, cy: 85, rx: 9, ry: 14 }, { cx: 90, cy: 85, rx: 9, ry: 14 }, // biceps
            { cx: 60, cy: 88, rx: 20, ry: 18 }, // chest
            { cx: 44, cy: 165, rx: 14, ry: 24 }, { cx: 76, cy: 165, rx: 14, ry: 24 }, // glutes
            { cx: 44, cy: 140, rx: 10, ry: 16 }, { cx: 76, cy: 140, rx: 10, ry: 16 }, // quadriceps
        ],
        coloana: [
            { cx: 60, cy: 90, rx: 24, ry: 26 }, // back / paravertebrali
            { cx: 60, cy: 120, rx: 20, ry: 14 }, // erector spinae
            { cx: 60, cy: 112, rx: 18, ry: 16 }, // core profund
            { cx: 34, cy: 70, rx: 8, ry: 10 }, { cx: 86, cy: 70, rx: 8, ry: 10 }, // umeri
        ],
        postura: [
            { cx: 60, cy: 105, rx: 20, ry: 22 }, // core stabilizatori
            { cx: 60, cy: 88, rx: 22, ry: 18 }, // paravertebrali superiori
            { cx: 34, cy: 68, rx: 9, ry: 11 }, { cx: 86, cy: 68, rx: 9, ry: 11 }, // umeri
            { cx: 44, cy: 220, rx: 8, ry: 16 }, { cx: 76, cy: 220, rx: 8, ry: 16 }, // gamba
        ],
        energie: [
            { cx: 30, cy: 85, rx: 9, ry: 14 }, { cx: 90, cy: 85, rx: 9, ry: 14 }, // arms
            { cx: 44, cy: 140, rx: 11, ry: 18 }, { cx: 76, cy: 140, rx: 11, ry: 18 }, // legs
            { cx: 60, cy: 110, rx: 20, ry: 20 }, // core
        ],
    };

    const muscles = muscleMap[goal] ?? [];

    return (
        <svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg"
            style={{ width: 100, height: 220, overflow: 'visible' }}
        >
            <defs>
                <radialGradient id={`glow-${goal}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>
                <filter id={`musGlow-${goal}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* Background glow */}
            <ellipse cx="60" cy="130" rx="38" ry="85" fill={`url(#glow-${goal})`} />

            {/* Body outline */}
            <circle cx="60" cy="22" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
            <rect x="55" y="37" width="10" height="10" rx="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.75" />
            <path d="M 40 47 Q 20 50 16 78 L 26 78 Q 28 58 40 54 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
            <path d="M 80 47 Q 100 50 104 78 L 94 78 Q 92 58 80 54 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
            <path d="M 40 54 L 80 54 L 76 125 L 44 125 Z" fill="none" stroke={color} strokeWidth="1.3" opacity="0.85" />
            <path d="M 16 78 Q 12 100 16 122" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 104 78 Q 108 100 104 122" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 16 122 Q 10 145 14 160" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <path d="M 104 122 Q 110 145 106 160" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <path d="M 44 125 L 38 210 L 50 210 L 56 160 L 64 160 L 72 210 L 84 210 L 76 125 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.85" />
            <path d="M 38 210 L 30 220" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 50 210 L 48 222" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 72 210 L 74 222" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 84 210 L 92 220" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />

            {/* Muscle highlights — scale + opacity driven by intensity */}
            {muscles.map((m, i) => (
                <ellipse
                    key={i}
                    cx={m.cx} cy={m.cy}
                    rx={m.rx * lvl.scale} ry={m.ry * lvl.scale}
                    fill={color}
                    opacity={lvl.opacity}
                    filter={`url(#musGlow-${goal})`}
                    style={{
                        transition: 'rx 0.4s ease, ry 0.4s ease, opacity 0.4s ease',
                        animation: isAnimating ? `pulse 2.2s ease-in-out ${i * 0.25}s infinite` : 'none',
                    }}
                />
            ))}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.15; }
                    50% { opacity: 0.45; }
                }
            `}</style>
        </svg>
    );
};

/* ================================================================== */
/*  Slide variants                                                     */
/* ================================================================== */

const slide = {
    enter:  (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

/* ================================================================== */
/*  QuizModal                                                          */
/* ================================================================== */

interface Props { isOpen: boolean; onClose: () => void; }

export const QuizModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [dir, setDir]   = useState(1);
    const [goal, setGoal] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | ''>('');
    const [ageGroup, setAgeGroup] = useState('');
    const [freq, setFreq] = useState('');
    const [budget, setBudget] = useState(0);
    const [hoveredGoal, setHoveredGoal] = useState('');
    const [freqIdx, setFreqIdx] = useState(0);
    const [swipeDir, setSwipeDir] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setStep(0); setGoal(''); setGender(''); setAgeGroup('');
            setFreq(''); setBudget(0); setDir(1);
            setHoveredGoal(''); setFreqIdx(0); setSwipeDir(1);
        }
    }, [isOpen]);

    const freqSessions = FREQUENCIES.find(f => f.id === freq)?.sessions ?? 4;
    const pkg = recommend(freqSessions, budget);
    const waUrl = buildWA(goal, freq, budget, pkg, gender, ageGroup);

    const goTo = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

    const TITLES = [
        'Care e obiectivul tău?',
        'Spune-ne despre tine',
        'Cât de des poți veni?',
        'Care e bugetul lunar?',
        'Pachetul perfect pentru tine',
    ];
    const SUBS = [
        'Selectează și vei vedea cum se transformă corpul tău.',
        'Personalizăm experiența și recomandarea pentru tine.',
        'Mișcă sliderul — corpul reacționează live.',
        'Pornești cu o ședință gratuită, fără obligații.',
        '',
    ];

    const activeGoalData = GOALS.find(g => g.id === goal || g.id === hoveredGoal);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        key="sheet"
                        initial={{ y: '100%', rotateX: 4 }}
                        animate={{ y: 0, rotateX: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        className="fixed bottom-0 left-0 right-0 z-[201] max-h-[92dvh] overflow-y-auto rounded-t-[32px] border-t border-white/10"
                        style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 100%)', transformOrigin: 'bottom center' }}
                    >
                        {/* Ambient glow reacts to goal color */}
                        <motion.div
                            className="pointer-events-none absolute inset-0 rounded-t-[32px] overflow-hidden"
                            style={{ zIndex: 0 }}
                        >
                            <motion.div
                                animate={{
                                    background: activeGoalData
                                        ? `radial-gradient(ellipse 80% 40% at 50% 0%, ${activeGoalData.color}28 0%, transparent 70%)`
                                        : 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)',
                                }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0"
                            />
                        </motion.div>

                        {/* Handle bar */}
                        <div className="relative z-10 mx-auto mt-3 mb-1 h-1 w-12 rounded-full bg-white/20" />

                        {/* Header */}
                        <div className="relative z-10 flex items-start justify-between px-5 pt-3 pb-0">
                            <div className="flex-1 pr-4">
                                {step < 4 && (
                                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em]"
                                        style={{ color: activeGoalData?.color ?? '#3B82F6' }}>
                                        Pasul {step + 1} / 4
                                    </p>
                                )}
                                <h2 className="font-display text-[1.5rem] font-black uppercase leading-tight text-white">
                                    {TITLES[step]}
                                </h2>
                                {SUBS[step] && (
                                    <p className="mt-1 text-xs text-white/40">{SUBS[step]}</p>
                                )}
                            </div>
                            <button onClick={onClose}
                                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/30 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Progress bar */}
                        {step < 4 && (
                            <div className="relative z-10 mx-5 mt-3 h-[2px] rounded-full bg-white/8">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: activeGoalData?.color ?? '#3B82F6' }}
                                    animate={{ width: `${((step + 1) / 4) * 100}%` }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                />
                            </div>
                        )}

                        {/* Step content */}
                        <div className="relative z-10 px-5 pt-4 pb-6">
                            <AnimatePresence mode="wait" custom={dir}>
                                {/* ---- STEP 0: Goal — Value-driven ---- */}
                                {step === 0 && (
                                    <motion.div key="s0" custom={dir} variants={slide}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.22 }}>
                                        <div className="grid grid-cols-1 gap-3" style={{ perspective: '900px' }}>
                                            {GOALS.map((g, gi) => (
                                                <motion.button
                                                    key={g.id}
                                                    onMouseEnter={() => setHoveredGoal(g.id)}
                                                    onMouseLeave={() => setHoveredGoal('')}
                                                    onClick={() => { setGoal(g.id); goTo(1); }}
                                                    className="flex flex-col gap-0 overflow-hidden rounded-2xl border p-4 text-left"
                                                    style={{
                                                        background: goal === g.id || hoveredGoal === g.id
                                                            ? `linear-gradient(135deg, ${g.color}18 0%, ${g.color}08 100%)`
                                                            : 'rgba(255,255,255,0.03)',
                                                        borderColor: goal === g.id || hoveredGoal === g.id ? `${g.color}80` : 'rgba(255,255,255,0.07)',
                                                        boxShadow: goal === g.id || hoveredGoal === g.id
                                                            ? `0 0 0 1px ${g.color}40, 0 8px 32px ${g.color}20, inset 0 1px 0 ${g.color}20`
                                                            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                                                        transformStyle: 'preserve-3d',
                                                    }}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: gi * 0.06, duration: 0.35 }}
                                                    whileHover={{ rotateX: -3, rotateY: 2, scale: 1.02, z: 16 }}
                                                    whileTap={{ scale: 0.97, rotateX: 1 }}
                                                >
                                                    {/* Top row: Icon + Title */}
                                                    <div className="flex items-start justify-between gap-3 mb-3">
                                                        <span className="text-4xl leading-none drop-shadow-lg">{g.icon}</span>
                                                        <div className="flex-1">
                                                            <h3 className="font-display text-sm font-black uppercase leading-snug text-white">
                                                                {g.label}
                                                            </h3>
                                                            <p className="mt-0.5 text-[9px] text-white/35">Focus: {g.focus}</p>
                                                        </div>
                                                        {(goal === g.id || hoveredGoal === g.id) && (
                                                            <motion.div
                                                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                                className="mt-0.5 h-2 w-2 rounded-full"
                                                                style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }}
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Stats grid */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {g.stats.map((stat, i) => (
                                                            <div key={i} className="rounded-xl px-2.5 py-2"
                                                                style={{ background: `${g.color}10`, border: `1px solid ${g.color}15` }}>
                                                                <p className="text-[10px] text-white/40">{stat.label}</p>
                                                                <p className="font-display text-sm font-black leading-tight" style={{ color: g.color }}>
                                                                    {stat.value}
                                                                </p>
                                                                <p className="text-[9px] text-white/30">{stat.period}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Body preview */}
                                        {(goal || hoveredGoal) && (
                                            <motion.div
                                                className="mt-4 flex justify-center"
                                                initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
                                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                                transition={{ duration: 0.5, type: 'spring', damping: 18 }}
                                                style={{ filter: `drop-shadow(0 0 24px ${activeGoalData?.color ?? '#3B82F6'}60)` }}
                                            >
                                                <BodyVisualization
                                                    goal={goal || hoveredGoal}
                                                    isAnimating={!!hoveredGoal || !!goal}
                                                    intensity={3}
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* ---- STEP 1: Gender + Age ---- */}
                                {step === 1 && (
                                    <motion.div key="s1" custom={dir} variants={slide}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.22 }}>

                                        {/* Gender cards */}
                                        <div className="grid grid-cols-2 gap-3 mb-5" style={{ perspective: '700px' }}>
                                            {([
                                                { id: 'male' as const, label: 'Bărbat', img: '/quiz_suit_male.webp' },
                                                { id: 'female' as const, label: 'Femeie', img: '/quiz_suit_female.webp' },
                                            ]).map(g => (
                                                <motion.button key={g.id}
                                                    onClick={() => setGender(g.id)}
                                                    whileHover={{ rotateY: g.id === 'male' ? 4 : -4, scale: 1.03 }}
                                                    whileTap={{ scale: 0.96 }}
                                                    className="flex flex-col items-center overflow-hidden rounded-2xl transition-all duration-200"
                                                    style={{
                                                        border: `2px solid ${gender === g.id ? '#3B82F6' : 'rgba(255,255,255,0.08)'}`,
                                                        background: gender === g.id ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)',
                                                        boxShadow: gender === g.id ? '0 0 32px rgba(59,130,246,0.25), inset 0 1px 0 rgba(59,130,246,0.2)' : 'none',
                                                        transformStyle: 'preserve-3d',
                                                    }}
                                                >
                                                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                                        <img src={g.img} alt={g.label}
                                                            className="h-full w-full object-cover object-top"
                                                            style={{ filter: 'grayscale(1)' }}
                                                            onError={(e) => {
                                                                const el = e.currentTarget as HTMLImageElement;
                                                                el.style.display = 'none';
                                                                const fb = el.nextElementSibling as HTMLElement;
                                                                if (fb) fb.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="hidden h-full w-full flex-col items-center justify-center"
                                                            style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                            <span className="text-5xl">{g.id === 'male' ? '🧍' : '🧍‍♀️'}</span>
                                                        </div>
                                                        {gender === g.id && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                                className="absolute inset-0"
                                                                style={{ background: 'linear-gradient(to top, rgba(59,130,246,0.3) 0%, transparent 60%)' }} />
                                                        )}
                                                    </div>
                                                    <span className="py-2.5 font-display text-sm font-black uppercase text-white">{g.label}</span>
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Age groups */}
                                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">Vârsta</p>
                                        <div className="grid grid-cols-4 gap-2 mb-5">
                                            {['18–29', '30–44', '45–59', '60+'].map(age => (
                                                <motion.button key={age}
                                                    onClick={() => setAgeGroup(age)}
                                                    whileTap={{ scale: 0.93 }}
                                                    className="rounded-xl border py-2.5 text-sm font-bold transition-all duration-150"
                                                    style={{
                                                        background: ageGroup === age ? '#3B82F6' : 'rgba(255,255,255,0.05)',
                                                        borderColor: ageGroup === age ? '#3B82F6' : 'rgba(255,255,255,0.08)',
                                                        color: ageGroup === age ? 'white' : 'rgba(255,255,255,0.5)',
                                                        boxShadow: ageGroup === age ? '0 0 16px rgba(59,130,246,0.3)' : 'none',
                                                    }}
                                                >
                                                    {age}
                                                </motion.button>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                            onClick={() => { if (gender) goTo(2); }}
                                            className="w-full rounded-full py-4 font-display text-sm font-black uppercase tracking-wide text-white"
                                            style={{
                                                background: gender ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : 'rgba(255,255,255,0.08)',
                                                opacity: gender ? 1 : 0.4,
                                                cursor: gender ? 'pointer' : 'not-allowed',
                                                boxShadow: gender ? '0 8px 24px rgba(59,130,246,0.35)' : 'none',
                                            }}
                                        >
                                            Continuă
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* ---- STEP 2: Frequency — Photo + Slider + Bullets ---- */}
                                {step === 2 && (() => {
                                    const goalColor = GOALS.find(g => g.id === goal)?.color ?? '#3B82F6';
                                    const projection = GOAL_PROGRESS[goal]?.[freqIdx];
                                    const pct = (freqIdx / 3) * 100;
                                    const isFemale = gender === 'female';
                                    return (
                                        <motion.div key="s2" custom={dir} variants={slide}
                                            initial="enter" animate="center" exit="exit"
                                            transition={{ duration: 0.22 }}>

                                            {/* ── Responsive layout: stacked mobile / side-by-side md+ ── */}
                                            <div className="flex flex-col md:flex-row md:gap-6 md:items-start">

                                                {/* LEFT — Photo */}
                                                <div className="flex justify-center md:justify-start md:shrink-0 mb-4 md:mb-0" style={{ perspective: '700px' }}>
                                                    <motion.div
                                                        animate={{ rotateY: (freqIdx - 1.5) * 6, scale: 0.96 + freqIdx * 0.015 }}
                                                        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                                                        className="relative overflow-hidden rounded-2xl"
                                                        style={{
                                                            width: 'clamp(130px, 35vw, 190px)',
                                                            aspectRatio: '3/4',
                                                            transformStyle: 'preserve-3d',
                                                            boxShadow: `0 20px 60px ${goalColor}30, 0 0 0 1px ${goalColor}20`,
                                                        }}
                                                    >
                                                        <img
                                                            src={`/quiz_suit_${gender || 'male'}.webp`}
                                                            alt="EMS suit"
                                                            className="h-full w-full object-cover object-top"
                                                            style={{ filter: isFemale ? 'grayscale(1)' : 'none' }}
                                                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                                        />
                                                        <div className="pointer-events-none absolute inset-0"
                                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                                                        {(gender === 'male' || gender === 'female') && (
                                                            <ElectrodeOverlay gender={gender} freqIdx={freqIdx} goalColor={goalColor} />
                                                        )}
                                                    </motion.div>
                                                </div>

                                                {/* RIGHT — Controls + Benefits */}
                                                <div className="flex-1 min-w-0">

                                                    {/* Intensity dots + label */}
                                                    <div className="mb-3 flex items-center gap-2">
                                                        {[0,1,2,3].map(i => (
                                                            <button key={i} onClick={() => setFreqIdx(i)}
                                                                className="h-1.5 rounded-full transition-all duration-300"
                                                                style={{
                                                                    width: i === freqIdx ? 28 : 8,
                                                                    background: i === freqIdx ? goalColor : 'rgba(255,255,255,0.15)',
                                                                    boxShadow: i === freqIdx ? `0 0 8px ${goalColor}` : 'none',
                                                                }} />
                                                        ))}
                                                        <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                                                            style={{ color: goalColor }}>
                                                            {['Întreținere', 'Recomandat ✦', 'Intensiv', 'Max'][freqIdx]}
                                                        </span>
                                                    </div>

                                                    {/* Slider */}
                                                    <div className="mb-4">
                                                        <input
                                                            type="range" min="0" max="3" step="1"
                                                            value={freqIdx}
                                                            onChange={e => setFreqIdx(Number(e.target.value))}
                                                            className="freq-slider w-full"
                                                            style={{
                                                                '--slider-color': goalColor,
                                                                '--slider-pct': `${pct}%`,
                                                            } as React.CSSProperties & Record<string, string>}
                                                        />
                                                        <div className="mt-1.5 flex justify-between">
                                                            {FREQUENCIES.map((f, i) => (
                                                                <span key={f.id} className="text-[9px] font-semibold transition-colors"
                                                                    style={{ color: i === freqIdx ? goalColor : 'rgba(255,255,255,0.28)' }}>
                                                                    {f.label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Benefit card with bullets */}
                                                    <AnimatePresence mode="wait">
                                                        {projection && (
                                                            <motion.div key={freqIdx}
                                                                initial={{ opacity: 0, y: 8 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -6 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="mb-4 rounded-2xl p-4"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${goalColor}14 0%, ${goalColor}06 100%)`,
                                                                    border: `1px solid ${goalColor}28`,
                                                                    boxShadow: `inset 0 1px 0 ${goalColor}18`,
                                                                }}>
                                                                {/* Main result */}
                                                                <p className="text-sm font-black leading-snug text-white mb-0.5">
                                                                    {projection.result}
                                                                </p>
                                                                <p className="text-[10px] font-mono uppercase tracking-wide mb-3"
                                                                    style={{ color: goalColor }}>
                                                                    {projection.timeframe}
                                                                </p>
                                                                {/* Divider */}
                                                                <div className="mb-2.5 h-px" style={{ background: `${goalColor}20` }} />
                                                                {/* Bullets */}
                                                                <div className="flex flex-col gap-1.5">
                                                                    {projection.bullets.map((b, i) => (
                                                                        <motion.div key={i}
                                                                            initial={{ opacity: 0, x: -8 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: i * 0.07 }}
                                                                            className="flex items-center gap-2">
                                                                            <span className="shrink-0 h-1.5 w-1.5 rounded-full"
                                                                                style={{ background: goalColor, boxShadow: `0 0 6px ${goalColor}` }} />
                                                                            <span className="text-xs text-white/70">{b}</span>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                onClick={() => { setFreq(FREQUENCIES[freqIdx].id); goTo(3); }}
                                                className="mt-2 w-full rounded-full py-4 font-display text-sm font-black uppercase tracking-wide text-white"
                                                style={{
                                                    background: `linear-gradient(135deg, ${goalColor} 0%, ${goalColor}cc 100%)`,
                                                    boxShadow: `0 8px 24px ${goalColor}40`,
                                                }}>
                                                Continuă cu {FREQUENCIES[freqIdx].label}
                                            </motion.button>
                                        </motion.div>
                                    );
                                })()}

                                {/* ---- STEP 3: Budget ---- */}
                                {step === 3 && (
                                    <motion.div key="s3" custom={dir} variants={slide}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.22 }}>
                                        <div className="flex flex-col gap-2">
                                            {BUDGET_OPTIONS.map((b, bi) => (
                                                <motion.button key={b.value}
                                                    initial={{ opacity: 0, x: -12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: bi * 0.07 }}
                                                    onClick={() => { setBudget(b.value); goTo(4); }}
                                                    whileHover={{ x: 4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center justify-between rounded-2xl border px-4 py-3.5"
                                                    style={{
                                                        background: budget === b.value ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                                                        borderColor: budget === b.value ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.07)',
                                                        boxShadow: budget === b.value ? '0 0 16px rgba(59,130,246,0.2), inset 0 1px 0 rgba(59,130,246,0.15)' : 'none',
                                                    }}
                                                >
                                                    <span className="font-display text-sm font-black uppercase text-white">{b.label}</span>
                                                    <span className="text-xs text-white/40">{b.desc}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* ---- STEP 4: Result ---- */}
                                {step === 4 && (
                                    <motion.div key="s4" custom={dir} variants={slide}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.25 }}>
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Body visualization */}
                                            <motion.div
                                                initial={{ scale: 0.7, opacity: 0, rotateX: 15 }}
                                                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                                transition={{ delay: 0.05, duration: 0.6, type: 'spring', damping: 20 }}
                                                style={{ filter: `drop-shadow(0 0 30px ${GOALS.find(g=>g.id===goal)?.color ?? '#3B82F6'}50)` }}
                                            >
                                                <BodyVisualization goal={goal} isAnimating={true} intensity={3} />
                                            </motion.div>

                                            {/* Package card */}
                                            <motion.div
                                                initial={{ y: 24, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.45 }}
                                                className="w-full rounded-2xl p-4"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.06) 100%)',
                                                    border: '1px solid rgba(59,130,246,0.35)',
                                                    boxShadow: '0 0 0 1px rgba(59,130,246,0.1), 0 20px 40px rgba(59,130,246,0.12), inset 0 1px 0 rgba(59,130,246,0.2)',
                                                }}
                                            >
                                                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#3B82F6]">
                                                    Recomandat pentru tine
                                                </p>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-display text-xl font-black uppercase text-white">
                                                            {pkg.title}
                                                        </h3>
                                                        <p className="text-xs text-white/40">{pkg.idealFor}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-display text-3xl font-black text-white">
                                                            {pkg.price}
                                                        </p>
                                                        <p className="text-[10px] text-white/40">RON</p>
                                                    </div>
                                                </div>
                                                {pkg.sessions > 1 && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="h-px flex-1 bg-white/10" />
                                                        <p className="text-xs text-white/40">{pkg.sessions} ședințe · {pkg.perSess} RON/ședință</p>
                                                        <div className="h-px flex-1 bg-white/10" />
                                                    </div>
                                                )}
                                            </motion.div>

                                            {/* WhatsApp CTA */}
                                            <motion.a
                                                initial={{ y: 24, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.35, duration: 0.4 }}
                                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                href={waUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-sm font-bold uppercase tracking-wide text-white"
                                                style={{
                                                    background: 'linear-gradient(135deg, #25D366, #1da851)',
                                                    boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
                                                }}
                                            >
                                                <MessageCircle size={18} className="fill-white" />
                                                Rezervă ședința gratuită
                                            </motion.a>

                                            <button onClick={() => goTo(0)}
                                                className="text-xs text-white/25 hover:text-white/50 transition-colors underline underline-offset-2">
                                                Încearcă din nou
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Back button */}
                        {step > 0 && step < 4 && (
                            <div className="relative z-10 px-5 pb-6">
                                <button onClick={() => goTo(step - 1)}
                                    className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
                                    <ArrowLeft size={13} />
                                    Înapoi
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

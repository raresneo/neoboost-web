import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// ======================================
// GLOBAL ANIMATED THOR MASCOTS
// Articulated SVG puppets that WALK
// across the page with real limb movement
// ======================================

// --- Articulated Male Thor ---
const MaleThor: React.FC<{ state: 'walk' | 'idle' | 'throw' | 'flex'; facingRight: boolean }> = ({ state, facingRight }) => {
    const walkCycle = state === 'walk';
    const throwing = state === 'throw';
    const flexing = state === 'flex';

    return (
        <svg
            viewBox="0 0 80 120"
            fill="none"
            className="w-full h-full"
            style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
        >
            {/* === CAPE (behind body) === */}
            <motion.path
                d="M32 30 L24 85 Q30 78 36 85"
                stroke="#1E40AF" strokeWidth="2" fill="#1E40AF" fillOpacity="0.3"
                strokeLinecap="round"
                animate={walkCycle ? {
                    d: ["M32 30 L24 85 Q30 78 36 85", "M32 30 L22 83 Q28 90 36 82", "M32 30 L24 85 Q30 78 36 85"]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* === HEAD + HELMET === */}
            <motion.g
                animate={walkCycle ? { y: [0, -2, 0], rotate: [-1, 1, -1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ transformOrigin: "40px 20px" }}
            >
                {/* Head */}
                <circle cx="40" cy="18" r="12" fill="#F5D0A9" stroke="#D4A574" strokeWidth="1.5" />
                {/* Hair */}
                <path d="M28 16 Q32 6 40 8 Q48 6 52 16" fill="#8B6914" stroke="#6B4E12" strokeWidth="1" />
                {/* Beard */}
                <path d="M34 24 Q40 30 46 24" fill="#8B6914" stroke="#6B4E12" strokeWidth="0.8" />
                {/* Eyes */}
                <circle cx="36" cy="16" r="1.5" fill="#2563EB" />
                <circle cx="44" cy="16" r="1.5" fill="#2563EB" />
                {/* Helmet wings */}
                <motion.path d="M28 14 L20 6 L26 14" fill="#94A3B8" stroke="#64748B" strokeWidth="1"
                    animate={walkCycle ? { d: ["M28 14 L20 6 L26 14", "M28 14 L18 4 L25 13", "M28 14 L20 6 L26 14"] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.path d="M52 14 L60 6 L54 14" fill="#94A3B8" stroke="#64748B" strokeWidth="1"
                    animate={walkCycle ? { d: ["M52 14 L60 6 L54 14", "M52 14 L62 4 L55 13", "M52 14 L60 6 L54 14"] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
                {/* Helmet band */}
                <path d="M28 14 Q40 10 52 14" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
            </motion.g>

            {/* === TORSO === */}
            <motion.g
                animate={walkCycle ? { y: [0, -1, 0] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
            >
                {/* Body (EMS suit) */}
                <path d="M32 30 L32 65 L48 65 L48 30 Z" fill="#1E293B" stroke="#334155" strokeWidth="1.5" rx="3" />
                {/* EMS electrode pads */}
                <rect x="34" y="36" width="5" height="8" rx="1" fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="0.8" />
                <rect x="41" y="36" width="5" height="8" rx="1" fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="0.8" />
                <rect x="34" y="50" width="5" height="6" rx="1" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="0.8" />
                <rect x="41" y="50" width="5" height="6" rx="1" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="0.8" />
                {/* Belt */}
                <rect x="30" y="62" width="20" height="4" rx="1" fill="#92400E" stroke="#78350F" strokeWidth="1" />
                {/* Lightning belt buckle */}
                <text x="37" y="66" fontSize="6" fill="#FBBF24">⚡</text>
                {/* Arm guards */}
                <rect x="26" y="42" width="4" height="8" rx="1" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
                <rect x="50" y="42" width="4" height="8" rx="1" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
            </motion.g>

            {/* === LEFT ARM (swings while walking, raises when throwing) === */}
            <motion.g
                style={{ transformOrigin: "32px 32px" }}
                animate={
                    throwing
                        ? { rotate: [0, -120, -120, 30, 0] }
                        : flexing
                            ? { rotate: [-60, -70, -60] }
                            : walkCycle
                                ? { rotate: [25, -25, 25] }
                                : { rotate: 0 }
                }
                transition={
                    throwing
                        ? { duration: 1.2, repeat: Infinity, repeatDelay: 3 }
                        : { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                }
            >
                {/* Upper arm */}
                <line x1="32" y1="32" x2="24" y2="50" stroke="#F5D0A9" strokeWidth="5" strokeLinecap="round" />
                {/* Forearm */}
                <motion.g style={{ transformOrigin: "24px 50px" }}
                    animate={throwing ? { rotate: [0, -40, 60, 0] } : flexing ? { rotate: [-90, -100, -90] } : {}}
                    transition={{ duration: throwing ? 1.2 : 1.5, repeat: Infinity, repeatDelay: throwing ? 3 : 0 }}
                >
                    <line x1="24" y1="50" x2="18" y2="64" stroke="#F5D0A9" strokeWidth="4" strokeLinecap="round" />
                    {/* Hand */}
                    <circle cx="18" cy="64" r="3" fill="#F5D0A9" stroke="#D4A574" strokeWidth="0.8" />
                </motion.g>
            </motion.g>

            {/* === RIGHT ARM + MJOLNIR === */}
            <motion.g
                style={{ transformOrigin: "48px 32px" }}
                animate={
                    throwing
                        ? { rotate: [0, 120, 120, -30, 0] }
                        : flexing
                            ? { rotate: [60, 70, 60] }
                            : walkCycle
                                ? { rotate: [-25, 25, -25] }
                                : { rotate: 0 }
                }
                transition={
                    throwing
                        ? { duration: 1.2, repeat: Infinity, repeatDelay: 3 }
                        : { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                }
            >
                {/* Upper arm */}
                <line x1="48" y1="32" x2="56" y2="50" stroke="#F5D0A9" strokeWidth="5" strokeLinecap="round" />
                {/* Forearm */}
                <motion.g style={{ transformOrigin: "56px 50px" }}
                    animate={throwing ? { rotate: [0, 40, -60, 0] } : flexing ? { rotate: [90, 100, 90] } : {}}
                    transition={{ duration: throwing ? 1.2 : 1.5, repeat: Infinity, repeatDelay: throwing ? 3 : 0 }}
                >
                    <line x1="56" y1="50" x2="62" y2="64" stroke="#F5D0A9" strokeWidth="4" strokeLinecap="round" />
                    {/* Hand */}
                    <circle cx="62" cy="64" r="3" fill="#F5D0A9" stroke="#D4A574" strokeWidth="0.8" />
                    {/* MJOLNIR */}
                    <rect x="58" y="62" width="10" height="7" rx="2" fill="#64748B" stroke="#475569" strokeWidth="1" />
                    <line x1="63" y1="69" x2="63" y2="76" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="63" cy="76" r="1.5" fill="#78350F" />
                </motion.g>
            </motion.g>

            {/* === LEFT LEG (walking animation) === */}
            <motion.g
                style={{ transformOrigin: "36px 65px" }}
                animate={walkCycle ? { rotate: [-30, 30, -30] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Thigh */}
                <line x1="36" y1="65" x2="34" y2="85" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                {/* Shin (knee bends while walking) */}
                <motion.g style={{ transformOrigin: "34px 85px" }}
                    animate={walkCycle ? { rotate: [0, 40, 0] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <line x1="34" y1="85" x2="32" y2="102" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                    {/* Boot */}
                    <path d="M27 100 L37 100 L37 106 L25 106 Z" fill="#92400E" stroke="#78350F" strokeWidth="1" />
                    <rect x="28" y="97" width="8" height="4" rx="1" fill="#78350F" />
                </motion.g>
            </motion.g>

            {/* === RIGHT LEG === */}
            <motion.g
                style={{ transformOrigin: "44px 65px" }}
                animate={walkCycle ? { rotate: [30, -30, 30] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Thigh */}
                <line x1="44" y1="65" x2="46" y2="85" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                {/* Shin */}
                <motion.g style={{ transformOrigin: "46px 85px" }}
                    animate={walkCycle ? { rotate: [40, 0, 40] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <line x1="46" y1="85" x2="48" y2="102" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                    {/* Boot */}
                    <path d="M43 100 L53 100 L55 106 L43 106 Z" fill="#92400E" stroke="#78350F" strokeWidth="1" />
                    <rect x="44" y="97" width="8" height="4" rx="1" fill="#78350F" />
                </motion.g>
            </motion.g>

            {/* === LIGHTNING SPARKLES (while walking) === */}
            {walkCycle && (
                <>
                    <motion.circle cx="20" cy="90" r="2" fill="#FBBF24"
                        animate={{ opacity: [0, 1, 0], y: [0, -15], x: [0, -5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    />
                    <motion.circle cx="60" cy="95" r="1.5" fill="#60A5FA"
                        animate={{ opacity: [0, 1, 0], y: [0, -12] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    />
                </>
            )}

            {/* === THROWN HAMMER (flies when throwing) === */}
            {throwing && (
                <motion.g
                    animate={{ x: [0, 150, 200, 150, 0], y: [0, -60, -40, -20, 0], rotate: [0, 360, 720, 1080, 1440] }}
                    transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 0 }}
                    style={{ transformOrigin: "66px 68px" }}
                >
                    <rect x="60" y="62" width="10" height="7" rx="2" fill="#64748B" stroke="#475569" strokeWidth="1" opacity="0.7" />
                    <line x1="65" y1="69" x2="65" y2="74" stroke="#92400E" strokeWidth="2" opacity="0.7" />
                </motion.g>
            )}
        </svg>
    );
};

// --- Articulated Female Thor ---
const FemaleThor: React.FC<{ state: 'walk' | 'idle' | 'throw' | 'flex'; facingRight: boolean }> = ({ state, facingRight }) => {
    const walkCycle = state === 'walk';
    const flexing = state === 'flex';

    return (
        <svg
            viewBox="0 0 80 120"
            fill="none"
            className="w-full h-full"
            style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
        >
            {/* === CAPE === */}
            <motion.path
                d="M34 30 L28 82 Q32 76 38 82"
                stroke="#7C3AED" strokeWidth="1.5" fill="#7C3AED" fillOpacity="0.25"
                strokeLinecap="round"
                animate={walkCycle ? {
                    d: ["M34 30 L28 82 Q32 76 38 82", "M34 30 L26 80 Q30 86 38 78", "M34 30 L28 82 Q32 76 38 82"]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* === HEAD + HELMET === */}
            <motion.g
                animate={walkCycle ? { y: [0, -2, 0], rotate: [-1, 1, -1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ transformOrigin: "40px 18px" }}
            >
                <circle cx="40" cy="18" r="11" fill="#FECACA" stroke="#FCA5A5" strokeWidth="1" />
                {/* Red hair flowing */}
                <motion.path d="M29 16 Q34 4 40 6 Q46 4 51 16 L52 28 Q48 22 44 26 Q40 22 36 26 Q32 22 28 28 Z"
                    fill="#DC2626" stroke="#B91C1C" strokeWidth="0.8"
                    animate={walkCycle ? {
                        d: ["M29 16 Q34 4 40 6 Q46 4 51 16 L52 28 Q48 22 44 26 Q40 22 36 26 Q32 22 28 28 Z",
                            "M29 16 Q34 4 40 6 Q46 4 51 16 L54 30 Q48 24 44 28 Q40 24 36 28 Q32 24 26 30 Z",
                            "M29 16 Q34 4 40 6 Q46 4 51 16 L52 28 Q48 22 44 26 Q40 22 36 26 Q32 22 28 28 Z"]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                {/* Eyes */}
                <circle cx="36" cy="16" r="1.5" fill="#2563EB" />
                <circle cx="44" cy="16" r="1.5" fill="#2563EB" />
                {/* Smile */}
                <path d="M37 21 Q40 24 43 21" stroke="#B91C1C" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Helmet + wings */}
                <path d="M30 12 Q40 6 50 12" stroke="#94A3B8" strokeWidth="3" fill="none" />
                <motion.path d="M30 12 L22 4 L28 12" fill="#C0C0C0" stroke="#94A3B8" strokeWidth="0.8"
                    animate={walkCycle ? { d: ["M30 12 L22 4 L28 12", "M30 12 L20 2 L27 11", "M30 12 L22 4 L28 12"] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.path d="M50 12 L58 4 L52 12" fill="#C0C0C0" stroke="#94A3B8" strokeWidth="0.8"
                    animate={walkCycle ? { d: ["M50 12 L58 4 L52 12", "M50 12 L60 2 L53 11", "M50 12 L58 4 L52 12"] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
                {/* Helmet gem */}
                <circle cx="40" cy="10" r="2" fill="#06B6D4" stroke="#0891B2" strokeWidth="0.5" />
            </motion.g>

            {/* === TORSO === */}
            <motion.g animate={walkCycle ? { y: [0, -1, 0] } : {}} transition={{ duration: 0.6, repeat: Infinity }}>
                <path d="M33 28 L33 62 L47 62 L47 28 Z" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
                {/* EMS pads */}
                <rect x="35" y="34" width="4" height="7" rx="1" fill="#8B5CF6" fillOpacity="0.4" stroke="#8B5CF6" strokeWidth="0.8" />
                <rect x="41" y="34" width="4" height="7" rx="1" fill="#8B5CF6" fillOpacity="0.4" stroke="#8B5CF6" strokeWidth="0.8" />
                <rect x="35" y="48" width="4" height="5" rx="1" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="0.8" />
                <rect x="41" y="48" width="4" height="5" rx="1" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="0.8" />
                {/* Belt */}
                <rect x="31" y="59" width="18" height="4" rx="1" fill="#92400E" stroke="#78350F" strokeWidth="1" />
                <text x="37" y="63" fontSize="6" fill="#FBBF24">⚡</text>
            </motion.g>

            {/* === LEFT ARM === */}
            <motion.g
                style={{ transformOrigin: "33px 30px" }}
                animate={flexing ? { rotate: [-60, -70, -60] } : walkCycle ? { rotate: [25, -25, 25] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
            >
                <line x1="33" y1="30" x2="25" y2="48" stroke="#FECACA" strokeWidth="4.5" strokeLinecap="round" />
                <motion.g style={{ transformOrigin: "25px 48px" }}
                    animate={flexing ? { rotate: [-90, -100, -90] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <line x1="25" y1="48" x2="20" y2="62" stroke="#FECACA" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="20" cy="62" r="2.5" fill="#FECACA" stroke="#FCA5A5" strokeWidth="0.6" />
                </motion.g>
            </motion.g>

            {/* === RIGHT ARM + MJOLNIR === */}
            <motion.g
                style={{ transformOrigin: "47px 30px" }}
                animate={flexing ? { rotate: [60, 70, 60] } : walkCycle ? { rotate: [-25, 25, -25] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
            >
                <line x1="47" y1="30" x2="55" y2="48" stroke="#FECACA" strokeWidth="4.5" strokeLinecap="round" />
                <motion.g style={{ transformOrigin: "55px 48px" }}
                    animate={flexing ? { rotate: [90, 100, 90] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <line x1="55" y1="48" x2="60" y2="62" stroke="#FECACA" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="60" cy="62" r="2.5" fill="#FECACA" stroke="#FCA5A5" strokeWidth="0.6" />
                    {/* Mjolnir */}
                    <rect x="56" y="60" width="9" height="6" rx="1.5" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
                    <line x1="61" y1="66" x2="61" y2="73" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
            </motion.g>

            {/* === LEFT LEG === */}
            <motion.g
                style={{ transformOrigin: "37px 62px" }}
                animate={walkCycle ? { rotate: [-28, 28, -28] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
            >
                <line x1="37" y1="62" x2="35" y2="82" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
                <motion.g style={{ transformOrigin: "35px 82px" }}
                    animate={walkCycle ? { rotate: [0, 38, 0] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                >
                    <line x1="35" y1="82" x2="33" y2="98" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M28 96 L38 96 L38 102 L26 102 Z" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
                </motion.g>
            </motion.g>

            {/* === RIGHT LEG === */}
            <motion.g
                style={{ transformOrigin: "43px 62px" }}
                animate={walkCycle ? { rotate: [28, -28, 28] } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
            >
                <line x1="43" y1="62" x2="45" y2="82" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
                <motion.g style={{ transformOrigin: "45px 82px" }}
                    animate={walkCycle ? { rotate: [38, 0, 38] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                >
                    <line x1="45" y1="82" x2="47" y2="98" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M42 96 L52 96 L54 102 L42 102 Z" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
                </motion.g>
            </motion.g>

            {/* Sparkles */}
            {walkCycle && (
                <>
                    <motion.circle cx="22" cy="88" r="1.5" fill="#A78BFA"
                        animate={{ opacity: [0, 1, 0], y: [0, -12] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                    />
                    <motion.circle cx="58" cy="92" r="1" fill="#FBBF24"
                        animate={{ opacity: [0, 1, 0], y: [0, -10] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
                    />
                </>
            )}
        </svg>
    );
};

// --- Behavior States ---
type MascotAction = 'walk' | 'idle' | 'throw' | 'flex';

interface MascotState {
    x: number;
    action: MascotAction;
    facingRight: boolean;
    targetX: number;
}

// --- Main Global Component ---
export const FloatingMascots: React.FC = () => {
    const [male, setMale] = useState<MascotState>({
        x: -120,
        action: 'walk',
        facingRight: true,
        targetX: 300,
    });
    const [female, setFemale] = useState<MascotState>({
        x: typeof window !== 'undefined' ? window.innerWidth + 120 : 1200,
        action: 'walk',
        facingRight: false,
        targetX: typeof window !== 'undefined' ? window.innerWidth - 300 : 900,
    });
    const [hammerFlying, setHammerFlying] = useState(false);
    const animFrameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    // Decide new random target for a mascot
    const getRandomTarget = useCallback((currentX: number) => {
        const w = window.innerWidth;
        const margin = 60;
        let newTarget: number;
        do {
            newTarget = margin + Math.random() * (w - margin * 2);
        } while (Math.abs(newTarget - currentX) < 100);
        return newTarget;
    }, []);

    // Pick a random action
    const getRandomAction = useCallback((): MascotAction => {
        const roll = Math.random();
        if (roll < 0.55) return 'walk';
        if (roll < 0.75) return 'idle';
        if (roll < 0.9) return 'flex';
        return 'throw';
    }, []);

    // Animation loop
    useEffect(() => {
        const speed = 1.2; // px per frame at 60fps
        let maleTimer = 0;
        let femaleTimer = 0;
        const actionDurations = { walk: 0, idle: 120, throw: 260, flex: 180 }; // frames

        const loop = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            if (delta > 100) {
                animFrameRef.current = requestAnimationFrame(loop);
                return; // skip large gaps (tab switch)
            }

            setMale(prev => {
                let { x, action, facingRight, targetX } = prev;

                if (action === 'walk') {
                    const dir = targetX > x ? 1 : -1;
                    x += dir * speed;
                    facingRight = dir > 0;
                    if (Math.abs(x - targetX) < 5) {
                        const newAction = getRandomAction();
                        return { x: targetX, action: newAction, facingRight, targetX };
                    }
                } else {
                    maleTimer++;
                    if (maleTimer > actionDurations[action]) {
                        maleTimer = 0;
                        const newTarget = getRandomTarget(x);
                        return { x, action: 'walk', facingRight: newTarget > x, targetX: newTarget };
                    }
                }
                return { x, action, facingRight, targetX };
            });

            setFemale(prev => {
                let { x, action, facingRight, targetX } = prev;

                if (action === 'walk') {
                    const dir = targetX > x ? 1 : -1;
                    x += dir * speed * 0.9;
                    facingRight = dir > 0;
                    if (Math.abs(x - targetX) < 5) {
                        const newAction = getRandomAction();
                        return { x: targetX, action: newAction, facingRight, targetX };
                    }
                } else {
                    femaleTimer++;
                    if (femaleTimer > actionDurations[action]) {
                        femaleTimer = 0;
                        const newTarget = getRandomTarget(x);
                        return { x, action: 'walk', facingRight: newTarget > x, targetX: newTarget };
                    }
                }
                return { x, action, facingRight, targetX };
            });

            animFrameRef.current = requestAnimationFrame(loop);
        };

        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [getRandomAction, getRandomTarget]);

    // Flying hammer effect
    useEffect(() => {
        if (male.action === 'throw' && !hammerFlying) {
            setHammerFlying(true);
            setTimeout(() => setHammerFlying(false), 4000);
        }
    }, [male.action, hammerFlying]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
            {/* Male Thor */}
            <div
                className="absolute bottom-0 transition-none"
                style={{
                    left: male.x - 40,
                    width: 80,
                    height: 110,
                }}
            >
                <MaleThor state={male.action} facingRight={male.facingRight} />
            </div>

            {/* Female Thor */}
            <div
                className="absolute bottom-0 transition-none"
                style={{
                    left: female.x - 40,
                    width: 75,
                    height: 105,
                }}
            >
                <FemaleThor state={female.action} facingRight={female.facingRight} />
            </div>

            {/* Flying Mjolnir */}
            <AnimatePresence>
                {hammerFlying && (
                    <motion.div
                        className="absolute"
                        style={{ bottom: 80 }}
                        initial={{ x: male.x, opacity: 1 }}
                        animate={{
                            x: [male.x, male.x + (male.facingRight ? 300 : -300), male.x],
                            y: [0, -120, 0],
                            rotate: [0, 720, 1440],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    >
                        <svg viewBox="0 0 24 20" width="30" height="25" fill="none">
                            <rect x="2" y="2" width="14" height="10" rx="3" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
                            <line x1="9" y1="12" x2="9" y2="19" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
                            <motion.circle cx="9" cy="7" r="3" fill="#FBBF24" fillOpacity="0.5"
                                animate={{ r: [3, 5, 3], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ground shadow indicators */}
            <div
                className="absolute bottom-0 h-[4px] rounded-full bg-black/10 blur-[2px]"
                style={{ left: male.x - 15, width: 30 }}
            />
            <div
                className="absolute bottom-0 h-[3px] rounded-full bg-black/10 blur-[2px]"
                style={{ left: female.x - 12, width: 24 }}
            />
        </div>
    );
};

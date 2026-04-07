import React from 'react';
import { motion } from 'framer-motion';

// ======================================
// THOR MASCOT — God of Thunder ⚡
// EMS = Electric Muscle Stimulation
// Thor = Perfect brand mascot!
// ======================================

// --- Wandering Wrapper: Thor walks around the card ---
const WanderingThor: React.FC<{
    children: React.ReactNode;
    path: { x: number[]; y: number[]; rotate: number[] };
    duration?: number;
}> = ({ children, path, duration = 10 }) => (
    <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{ width: 55, height: 70 }}
        animate={{
            x: path.x,
            y: path.y,
            rotate: path.rotate,
        }}
        transition={{
            duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
        }}
    >
        {children}
    </motion.div>
);

// --- Lightning trail that follows Thor ---
const LightningTrail = () => (
    <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 36, height: 6 }}
        animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.7, 1.3, 0.7] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
        <svg viewBox="0 0 36 6" fill="none" className="w-full h-full">
            <path d="M2 3 L8 1 L14 5 L20 1 L26 4 L32 2" stroke="#3A86FF" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
    </motion.div>
);

// --- Common Thor Base (cape, helmet with wings, hammer) ---

// Thor 1: SLĂBIRE — Thor celebrează, aruncă ciocanul în sus victorios
const ThorSlimming = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 60 75" fill="none" className="w-full h-full">
            {/* Helmet with wings */}
            <circle cx="30" cy="13" r="9" stroke="currentColor" strokeWidth="2.5" />
            {/* Helmet wing left */}
            <motion.path d="M21 10 L14 4 L18 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ d: ["M21 10 L14 4 L18 12", "M21 10 L13 2 L18 11", "M21 10 L14 4 L18 12"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Helmet wing right */}
            <motion.path d="M39 10 L46 4 L42 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ d: ["M39 10 L46 4 L42 12", "M39 10 L47 2 L42 11", "M39 10 L46 4 L42 12"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Happy face */}
            <circle cx="26" cy="12" r="1.5" fill="currentColor" />
            <circle cx="34" cy="12" r="1.5" fill="currentColor" />
            <path d="M26 16 Q30 20 34 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Cape flowing */}
            <motion.path d="M24 22 L18 50 Q24 46 26 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ d: ["M24 22 L18 50 Q24 46 26 50", "M24 22 L16 48 Q22 52 26 48", "M24 22 L18 50 Q24 46 26 50"] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Body */}
            <path d="M30 22 L30 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Arm holding Mjolnir UP (celebrating) */}
            <motion.g animate={{ rotate: [-5, 10, -5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ transformOrigin: "30px 28px" }}>
                <path d="M30 28 L46 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mjolnir */}
                <rect x="44" y="8" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="48" y1="16" x2="48" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>

            {/* Other arm raised */}
            <motion.path d="M30 28 L16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M30 28 L16 20", "M30 28 L14 16", "M30 28 L16 20"] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Walking legs */}
            <motion.path d="M30 46 L22 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M30 46 L22 62", "M30 46 L26 63", "M30 46 L22 62"] }}
                transition={{ duration: 0.7, repeat: Infinity }}
            />
            <motion.path d="M30 46 L38 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M30 46 L38 62", "M30 46 L34 63", "M30 46 L38 62"] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.35 }}
            />

            {/* Lightning sparks from hammer */}
            <motion.text x="50" y="8" fontSize="8"
                animate={{ opacity: [0, 1, 0], y: [-2, -8] }}
                transition={{ duration: 1, repeat: Infinity }}
            >⚡</motion.text>
            <motion.text x="42" y="4" fontSize="6"
                animate={{ opacity: [0, 1, 0], x: [-2, -6] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            >⚡</motion.text>
        </svg>
        <LightningTrail />
    </div>
);

// Thor 2: DURERI SPATE — Thor cu spatele drept, cape majestic, scutul pe spate
const ThorBackPain = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 60 75" fill="none" className="w-full h-full">
            {/* Helmet */}
            <circle cx="30" cy="13" r="9" stroke="currentColor" strokeWidth="2.5" />
            <path d="M21 10 L14 4 L18 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M39 10 L46 4 L42 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Expression: pain → relief */}
            <circle cx="26" cy="12" r="1.5" fill="currentColor" />
            <circle cx="34" cy="12" r="1.5" fill="currentColor" />
            <motion.path d="M26 16 Q30 19 34 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ d: ["M26 17 Q30 14 34 17", "M26 15 Q30 19 34 15"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />

            {/* Spine straightening */}
            <motion.path d="M30 22 L30 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M30 22 Q35 34 30 46", "M30 22 Q30 34 30 46"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />

            {/* Cape as shield on back */}
            <motion.path d="M24 22 L20 44 Q26 48 30 44 Q34 48 40 44 L36 22"
                stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Arms: touching back → arms relaxed with hammer */}
            <motion.path d="M30 28 L18 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M30 28 L22 38", "M30 28 L18 22"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.g animate={{ rotate: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} style={{ transformOrigin: "30px 28px" }}>
                <path d="M30 28 L44 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mjolnir hanging */}
                <rect x="42" y="30" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </motion.g>

            {/* Legs */}
            <path d="M30 46 L22 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 46 L38 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Pain zigzags fade out */}
            <motion.path d="M40 28 L44 26 L42 30" stroke="#EF4444" strokeWidth="1.5" fill="none"
                animate={{ opacity: [0.8, 0, 0, 0.8] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            {/* Green checkmark appears */}
            <motion.text x="44" y="18" fontSize="10" fill="#10B981"
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            >✓</motion.text>
        </svg>
        <LightningTrail />
    </div>
);

// Thor 3: TONIFIERE — Thor flexing both arms, Mjolnir on belt, cape billowing
const ThorToning = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 60 75" fill="none" className="w-full h-full">
            {/* Helmet */}
            <circle cx="30" cy="13" r="9" stroke="currentColor" strokeWidth="2.5" />
            <path d="M21 10 L14 4 L18 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M39 10 L46 4 L42 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="12" r="1.5" fill="currentColor" />
            <circle cx="34" cy="12" r="1.5" fill="currentColor" />
            <path d="M27 16 Q30 18 33 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Body */}
            <path d="M30 22 L30 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cape billowing */}
            <motion.path d="M24 22 L16 46 Q20 42 24 46"
                stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"
                animate={{ d: ["M24 22 L16 46 Q20 42 24 46", "M24 22 L14 44 Q18 48 24 44", "M24 22 L16 46 Q20 42 24 46"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Arms flexing (double bicep pose) */}
            <motion.g animate={{ scaleY: [1, 1.03, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <path d="M30 28 L20 24 L16 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 28 L40 24 L44 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            {/* Bicep bumps pulsing */}
            <motion.circle cx="16" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"
                animate={{ r: [3, 5, 3], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle cx="44" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"
                animate={{ r: [3, 5, 3], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Mjolnir on belt */}
            <rect x="34" y="38" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
            <line x1="37" y1="43" x2="37" y2="47" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

            {/* Power stance legs */}
            <path d="M30 46 L20 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 46 L40 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Sparkles around body */}
            <motion.text x="8" y="12" fontSize="6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>✦</motion.text>
            <motion.text x="48" y="36" fontSize="5" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}>✦</motion.text>
            <motion.text x="12" y="42" fontSize="4" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1 }}>✦</motion.text>

            {/* Thunder aura */}
            <motion.ellipse cx="30" cy="36" rx="18" ry="26" stroke="#3A86FF" strokeWidth="0.8" fill="none" strokeDasharray="4 4"
                animate={{ opacity: [0, 0.3, 0], scale: [0.95, 1.06, 0.95] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            />
        </svg>
        <LightningTrail />
    </div>
);

// Thor 4: FORȚĂ — Thor lifting Mjolnir overhead, classic power pose
const ThorPower = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 70 75" fill="none" className="w-full h-full">
            {/* Helmet */}
            <circle cx="35" cy="18" r="9" stroke="currentColor" strokeWidth="2.5" />
            <path d="M26 15 L19 9 L23 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M44 15 L51 9 L47 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Determined face */}
            <line x1="31" y1="16" x2="33" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="37" y1="17" x2="39" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M32 21 L38 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

            {/* Body crouching then standing */}
            <motion.path d="M35 27 L35 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M35 27 L35 52", "M35 27 L35 48", "M35 27 L35 52"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Cape */}
            <motion.path d="M28 27 L22 48 Q26 44 30 48"
                stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"
                animate={{ d: ["M28 27 L22 48 Q26 44 30 48", "M28 27 L20 46 Q24 50 30 46", "M28 27 L22 48 Q26 44 30 48"] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Arms + Mjolnir lifting overhead */}
            <motion.g
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            >
                <path d="M35 32 L20 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 32 L50 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mjolnir centered above */}
                <rect x="30" y="4" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="36" y1="13" x2="36" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            {/* Legs */}
            <motion.path d="M35 50 L24 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M35 52 L24 64", "M35 48 L26 64", "M35 52 L24 64"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.path d="M35 50 L46 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                animate={{ d: ["M35 52 L46 64", "M35 48 L44 64", "M35 52 L46 64"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Impact lightning bolts on lift */}
            <motion.text x="12" y="18" fontSize="9"
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            >⚡</motion.text>
            <motion.text x="54" y="18" fontSize="9"
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.15 }}
            >⚡</motion.text>

            {/* Sweat drop */}
            <motion.circle cx="24" cy="20" r="1.5" fill="currentColor"
                animate={{ opacity: [0, 1, 0], y: [0, 10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            />
        </svg>
        <LightningTrail />
    </div>
);

// Thor 5: TIMP — Thor flying fast with Mjolnir (like throwing it + holding on)
const ThorSpeed = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 65 75" fill="none" className="w-full h-full">
            {/* Clock ring in background */}
            <circle cx="32" cy="38" r="26" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <motion.line x1="32" y1="38" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "32px 38px" }}
            />

            {/* Thor flying horizontally */}
            <motion.g
                animate={{ x: [-3, 3, -3], y: [-2, 2, -2] }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                {/* Helmet */}
                <circle cx="32" cy="28" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M25 26 L20 21 L24 27" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M39 26 L44 21 L40 27" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <circle cx="29" cy="27" r="1" fill="currentColor" />
                <circle cx="35" cy="27" r="1" fill="currentColor" />

                {/* Body leaning forward */}
                <path d="M32 35 L32 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                {/* Arm stretched forward holding Mjolnir */}
                <path d="M32 38 L48 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="48" y="30" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />

                {/* Other arm back */}
                <path d="M32 38 L20 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                {/* Cape streaming behind */}
                <motion.path d="M26 36 L14 42 Q18 38 14 48"
                    stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"
                    animate={{ d: ["M26 36 L14 42 Q18 38 14 48", "M26 36 L12 40 Q16 44 12 50", "M26 36 L14 42 Q18 38 14 48"] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />

                {/* Running legs */}
                <motion.path d="M32 48 L26 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    animate={{ d: ["M32 48 L26 58", "M32 48 L30 58", "M32 48 L26 58"] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
                <motion.path d="M32 48 L38 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    animate={{ d: ["M32 48 L38 58", "M32 48 L34 58", "M32 48 L38 58"] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                />
            </motion.g>

            {/* Speed lines */}
            <motion.line x1="14" y1="32" x2="6" y2="32" stroke="currentColor" strokeWidth="1.5"
                animate={{ opacity: [0, 0.8, 0], x: [0, -6] }}
                transition={{ duration: 0.7, repeat: Infinity }}
            />
            <motion.line x1="16" y1="38" x2="6" y2="38" stroke="currentColor" strokeWidth="1.5"
                animate={{ opacity: [0, 0.8, 0], x: [0, -8] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.15 }}
            />
            <motion.line x1="14" y1="44" x2="6" y2="44" stroke="currentColor" strokeWidth="1.5"
                animate={{ opacity: [0, 0.8, 0], x: [0, -6] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.3 }}
            />

            {/* "30 min" */}
            <motion.text x="18" y="70" fontSize="10" fill="currentColor" fontWeight="bold"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >⏱️30'</motion.text>
        </svg>
        <LightningTrail />
    </div>
);

// Thor 6: COSTUM USCAT — Thor "suiting up" with lightning armor
const ThorTechSuit = () => (
    <div className="relative w-full h-full">
        <svg viewBox="0 0 60 75" fill="none" className="w-full h-full">
            {/* Helmet */}
            <circle cx="30" cy="13" r="9" stroke="currentColor" strokeWidth="2.5" />
            <path d="M21 10 L14 4 L18 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M39 10 L46 4 L42 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="12" r="1.5" fill="currentColor" />
            <circle cx="34" cy="12" r="1.5" fill="currentColor" />
            <path d="M26 16 Q30 19 34 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Armor suit body (outfit lines flowing) */}
            <motion.path d="M22 22 L22 52 L38 52 L38 22"
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="4 3"
                animate={{ strokeDashoffset: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Lightning circuit lines flowing through suit */}
            <motion.line x1="27" y1="24" x2="27" y2="48" stroke="#3A86FF" strokeWidth="1.2"
                strokeDasharray="3 4"
                animate={{ strokeDashoffset: [20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.line x1="30" y1="22" x2="30" y2="50" stroke="#3A86FF" strokeWidth="1.2"
                strokeDasharray="3 4"
                animate={{ strokeDashoffset: [20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
            />
            <motion.line x1="33" y1="24" x2="33" y2="48" stroke="#3A86FF" strokeWidth="1.2"
                strokeDasharray="3 4"
                animate={{ strokeDashoffset: [20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
            />

            {/* Arms holding Mjolnir casually */}
            <path d="M22 28 L10 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38 28 L48 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Mjolnir in right hand */}
            <rect x="46" y="28" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="50" y1="34" x2="50" y2="38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

            {/* Legs */}
            <path d="M26 52 L20 67" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 52 L40 67" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Wireless signal waves */}
            <motion.path d="M46 18 Q50 16 46 13" stroke="#3A86FF" strokeWidth="1.5" fill="none"
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.path d="M50 20 Q56 16 50 11" stroke="#3A86FF" strokeWidth="1.2" fill="none"
                animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.path d="M54 22 Q62 16 54 9" stroke="#3A86FF" strokeWidth="0.8" fill="none"
                animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />

            {/* Lightning bolts on suit */}
            <motion.text x="4" y="26" fontSize="9"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
            >⚡</motion.text>
        </svg>
        <LightningTrail />
    </div>
);

// --- THOR CONFIG: wandering paths ---
const THOR_CONFIG: Record<string, {
    Component: React.FC;
    path: { x: number[]; y: number[]; rotate: number[] };
    duration: number;
}> = {
    slabire: {
        Component: ThorSlimming,
        path: { x: [0, 70, 130, 80, 20, 0], y: [20, 60, 25, 90, 65, 20], rotate: [0, 5, -3, 4, -5, 0] },
        duration: 12,
    },
    dureri: {
        Component: ThorBackPain,
        path: { x: [110, 40, 10, 70, 120, 110], y: [10, 55, 80, 35, 70, 10], rotate: [-3, 3, -4, 4, -2, -3] },
        duration: 14,
    },
    tonifiere: {
        Component: ThorToning,
        path: { x: [10, 90, 50, 120, 30, 10], y: [30, 10, 75, 45, 85, 30], rotate: [2, -4, 3, -3, 5, 2] },
        duration: 11,
    },
    performanta: {
        Component: ThorPower,
        path: { x: [60, 20, 100, 10, 80, 60], y: [15, 60, 75, 30, 50, 15], rotate: [-2, 4, -3, 5, -4, -2] },
        duration: 13,
    },
    timp: {
        Component: ThorSpeed,
        path: { x: [0, 110, 60, 20, 90, 0], y: [40, 15, 75, 50, 10, 40], rotate: [0, -5, 3, -4, 5, 0] },
        duration: 10,
    },
    uscat: {
        Component: ThorTechSuit,
        path: { x: [100, 30, 80, 10, 110, 100], y: [20, 65, 40, 15, 55, 20], rotate: [3, -3, 4, -5, 2, 3] },
        duration: 12,
    },
};

// --- Main Export ---
interface BenefitMascotProps {
    id: string;
}

export const BenefitMascot: React.FC<BenefitMascotProps> = ({ id }) => {
    const config = THOR_CONFIG[id];
    if (!config) return null;

    const { Component, path, duration } = config;

    return (
        <div className="mascot-container absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-[0.1] group-hover:opacity-[0.5] transition-opacity duration-700">
            <WanderingThor path={path} duration={duration}>
                <Component />
            </WanderingThor>
        </div>
    );
};

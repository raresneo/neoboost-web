import React from 'react';

export const FilmGrain = () => {
    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-overlay animate-noise"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
        >
            <style>{`
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-1%, -1%); }
                    20% { transform: translate(1%, 1%); }
                    30% { transform: translate(-2%, -2%); }
                    40% { transform: translate(2%, 2%); }
                    50% { transform: translate(-1%, 2%); }
                    60% { transform: translate(1%, -2%); }
                    70% { transform: translate(2%, -1%); }
                    80% { transform: translate(-2%, 1%); }
                    90% { transform: translate(1%, 2%); }
                }
                .animate-noise {
                    animation: noise 1s steps(2) infinite;
                    /* Widen the div slightly so margins aren't exposed during translation */
                    width: 110vw;
                    height: 110vh;
                    left: -5vw;
                    top: -5vh;
                }
            `}</style>
        </div>
    );
};

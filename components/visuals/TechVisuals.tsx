import React, { useState, useRef, useEffect } from 'react';

// --- Advanced Tech Displays ---

export const PowerBoxLifestyle = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/80 rounded-2xl">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,134,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,134,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

        <div className="relative w-full h-full scale-[1.05] transition-transform duration-700 group-hover:scale-[1.15]">
            <img
                src="/powerbox_lifestyle.png"
                alt="NeoBoost PowerBox & Dock"
                src="/powerbox_lifestyle.png"
                alt="NeoBoost PowerBox & Dock"
                className="w-full h-full object-cover brightness-90"
                style={{
                    objectPosition: 'center center',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                }}
                loading="lazy"
                decoding="async"
            />
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-[#3A86FF] mix-blend-color opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
        </div>
    </div>
);

export const TabletFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative w-[95%] aspect-[4/3] mx-auto bg-[#1a1a1a] rounded-[2.5rem] p-4 shadow-2xl border-[8px] border-[#222] group-hover:scale-[1.02] transition-transform duration-700">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#333] rounded-b-xl"></div>
        <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative shadow-inner">
            {children}
            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.01] pointer-events-none"></div>
        </div>
    </div>
);

export const EMSAppUI = () => (
    <div className="w-full h-full flex flex-col p-6 font-sans select-none overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3A86FF] animate-pulse"></div>
                <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase">ID-EMS OS v3.4.2</span>
            </div>
            <div className="flex items-center gap-6 text-[8px] text-white/20 font-bold uppercase tracking-wider">
                <span className="text-[#FF3300]">Active Boost</span>
                <span>Batt: 98%</span>
            </div>
        </div>

        {/* Body Displays */}
        <div className="flex-1 flex justify-around items-center">
            {/* Front Body */}
            <div className="relative h-full aspect-[1/2] opacity-80">
                <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full"></div>
                <svg viewBox="0 0 100 200" className="h-full w-full">
                    <path d="M50 10 L60 25 L80 40 L85 80 L70 130 L75 190 M50 10 L40 25 L20 40 L15 80 L30 130 L25 190" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
                    {/* Active Electrodes */}
                    <circle cx="50" cy="40" r="3" fill="#FF3300" className="animate-pulse" />
                    <circle cx="35" cy="70" r="4" fill="#FF3300" />
                    <circle cx="65" cy="70" r="4" fill="#FF3300" />
                    <circle cx="40" cy="110" r="5" fill="#FF3300" opacity="0.6" />
                    <circle cx="60" cy="110" r="5" fill="#FF3300" opacity="0.6" />
                </svg>
            </div>

            {/* Stats Column */}
            <div className="w-32 hidden md:flex flex-col gap-4">
                {[85, 72, 90].map((val, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="text-[6px] text-white/30 uppercase mb-1">Channel {i + 1}</div>
                        <div className="text-sm font-bold text-white">{val}%</div>
                        <div className="h-0.5 bg-white/10 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-[#3A86FF]" style={{ width: `${val}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Bottom Bar Controls */}
        <div className="flex gap-2 mt-8">
            {['Drying', 'Training', 'Recovery', 'Massage'].map((mode, i) => (
                <div key={mode} className={`flex-1 h-8 rounded border border-white/5 text-[6px] uppercase flex items-center justify-center font-bold tracking-tighter ${i === 1 ? 'bg-[#FF3300] text-white' : 'text-white/20'}`}>
                    {mode}
                </div>
            ))}
        </div>
    </div>
);

// --- Oscilloscope Animation Component ---
export const Oscilloscope = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            time += 0.05;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(58, 134, 255, 0.4)'; // #3A86FF with low opacity
            ctx.lineWidth = 1;

            for (let x = 0; x < width; x++) {
                const y = centerY +
                    Math.sin(x * 0.02 + time) * 15 * Math.sin(time * 0.3) +
                    Math.sin(x * 0.05 + time * 1.5) * 5;

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-x-0 bottom-[15%] h-24 w-full pointer-events-none mix-blend-screen opacity-50 z-20" />;
};

export const TabletReal = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group bg-black/80 rounded-2xl">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,134,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,134,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

        <div className="relative w-full h-full scale-[1.2] transition-transform duration-700 group-hover:scale-[1.3]">
            <img
                src="/tablet_combo.jpg"
                alt="NeoBoost Tablet Interface"
                src="/tablet_combo.jpg"
                alt="NeoBoost Tablet Interface"
                className="w-full h-full object-cover brightness-90"
                style={{
                    objectPosition: '40% 60%',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                }}
                loading="lazy"
                decoding="async"
            />
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-[#3A86FF] mix-blend-color opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
        </div>
        <Oscilloscope />
    </div>
);

export const DrysuitLifestyle = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/80 rounded-2xl">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,134,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,134,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

        <div className="relative w-full h-full scale-[1.05] transition-transform duration-700 group-hover:scale-[1.1]">
            <img
                src="/studio_session_1.jpg"
                alt="NeoBoost Drysuit Action"
                src="/studio_session_1.jpg"
                alt="NeoBoost Drysuit Action"
                className="w-full h-full object-cover brightness-90"
                style={{
                    objectPosition: 'center 30%',
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                }}
                loading="lazy"
                decoding="async"
            />
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-[#3A86FF] mix-blend-color opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
        </div>
    </div>
);

export const TiltImage: React.FC<{ src: string; alt: string; isPowerBox?: boolean; isControlApp?: boolean; isDrysuit?: boolean }> = ({ src, alt, isPowerBox, isControlApp, isDrysuit }) => {
    const [transform, setTransform] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const intensity = 15; // Standard intensity
        const rotateX = (0.5 - y) * intensity;
        const rotateY = (x - 0.5) * intensity;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div
            className={`relative w-full h-full group perspective-1000 ${isPowerBox ? 'animate-float' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={ref}
                className="w-full h-full transition-transform duration-100 ease-out"
                style={{ transform, transformStyle: 'preserve-3d' }}
            >
                {isPowerBox ? (
                    <PowerBoxLifestyle />
                ) : isControlApp ? (
                    <TabletReal />
                ) : isDrysuit ? (
                    <DrysuitLifestyle />
                ) : (
                    <div className="relative w-full h-full bg-black/80 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,134,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,134,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
                        <img
                            src={src}
                            alt={alt}
                            src={src}
                            alt={alt}
                            className={`w-full h-full object-contain transition-all duration-500 will-change-transform group-hover:scale-[1.1]`}
                            style={{
                                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                            }}
                            loading="lazy"
                            decoding="async"
                        />
                        {/* Holographic Overlay */}
                        <div className="absolute inset-0 bg-[#3A86FF] mix-blend-color opacity-50"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
                    </div>
                )}
                {/* Specular shine reflection (only for images) */}
                {!isPowerBox && (
                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ mixBlendMode: 'overlay' }}
                    />
                )}
            </div>
        </div>
    );
};

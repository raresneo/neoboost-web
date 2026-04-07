import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className = ""
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none cursor-ew-resize group ${className}`}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)} // Support touch tap to start
        >
            {/* AFTER Image (Background - Full Width) */}
            <img
                src={afterImage}
                alt={afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />
            <div className="absolute top-6 right-6 z-10 bg-[var(--accent-primary)] px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase tracking-widest shadow-lg pointer-events-none">
                {afterLabel}
            </div>

            {/* BEFORE Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden w-full h-full"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
                {/* Overlay to darken Before slightly for contrast if needed, or keep raw */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

                <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase border border-white/10 tracking-widest pointer-events-none">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-[var(--accent-primary)] transition-transform hover:scale-110 active:scale-95">
                    <ArrowLeftRight size={14} className="text-[var(--accent-primary)]" />
                </div>
            </div>

            {/* Drag Hint (Fades out after interaction could be nice, but static is fine for now) */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs font-bold uppercase tracking-widest pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                Trage stanga-dreapta
            </div>
        </div>
    );
};

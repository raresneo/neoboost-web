import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
    beforeStyle?: React.CSSProperties;
    afterStyle?: React.CSSProperties;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, className = '', beforeStyle, afterStyle }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update width on mount/resize to ensure clipped image isn't squashed
    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseDown = () => setIsDragging(true);

    useEffect(() => {
        const handleGlobalUp = () => setIsDragging(false);
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging && containerRef.current) {
                let clientX = 0;
                if ('touches' in e) {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = (e as MouseEvent).clientX;
                }

                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
                const percent = (x / rect.width) * 100;
                setSliderPos(percent);
            }
        };

        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchend', handleGlobalUp);
        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('touchmove', handleGlobalMove);

        return () => {
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchend', handleGlobalUp);
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('touchmove', handleGlobalMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-[9/16] max-h-[80vh] overflow-hidden rounded-2xl select-none cursor-ew-resize border border-white/10 ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) - The "Result" */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-contain object-top bg-[#050505]"
                draggable={false}
                style={afterStyle}
            />

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#3A86FF] text-white text-xs font-bold z-10">
                AFTER
            </div>

            {/* Before Image (Foreground - Clipped) - The "Past" */}
            <div
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-[#3A86FF] shadow-[0_0_20px_rgba(58,134,255,0.5)] z-10"
                style={{ width: `${sliderPos}%` }}
            >
                <div
                    className="relative h-full"
                    style={{ width: containerWidth }}
                >
                    {/* The image inside must be full width of container, not the clipped parent */}
                    <img
                        src={beforeImage}
                        alt="Before"
                        className="absolute top-0 left-0 h-full object-contain object-top max-w-none bg-[#050505]"
                        style={{
                            width: '100%',
                            ...beforeStyle
                        }}
                    />
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs font-bold">
                    BEFORE
                </div>
            </div>

            {/* Handle */}
            <div
                className="absolute top-0 bottom-0 w-10 -ml-5 flex items-center justify-center cursor-ew-resize z-20"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="w-8 h-8 rounded-full bg-[#3A86FF] flex items-center justify-center shadow-[0_0_15px_rgba(58,134,255,0.8)] border-2 border-white">
                    <MoveHorizontal size={16} className="text-white" />
                </div>
            </div>
        </div>
    );
};

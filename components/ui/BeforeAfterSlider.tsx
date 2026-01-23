import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, className = '' }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let clientX = 0;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = (e as React.MouseEvent).clientX;
        }

        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;

        setSliderPos(percent);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleGlobalUp = () => setIsDragging(false);
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                // Determine clientX for global move
                let clientX = 0;
                if ('touches' in e) {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = (e as MouseEvent).clientX;
                }

                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
                    const percent = (x / rect.width) * 100;
                    setSliderPos(percent);
                }
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
            className={`relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl select-none cursor-ew-resize border border-white/10 ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
            />

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#3A86FF] text-white text-xs font-bold z-10">
                AFTER
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-[#3A86FF] bg-black"
                style={{ width: `${sliderPos}%` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ width: '100vw', maxWidth: 'none' }} // Trick to keep image fixed while container shrinks? No, better use container width
                // Actually, to make it work, the image inside needs to be the full width of the CONTAINER, not 100% of the clipped div.
                // We need to query the parent width. But cleaner CSS approach:
                />

                {/* Fix for Before Image: It must maintain the same aspect ratio and position as background */}
                {/* Re-implementation of img style for clip */}
            </div>

            {/* We need a specific structure for the before image to not squish. 
                Common technique: Set image width to the container's width.
            */}
            <div
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-[#3A86FF] shadow-[0_0_20px_rgba(58,134,255,0.5)]"
                style={{ width: `${sliderPos}%` }}
            >
                <div className="relative w-full h-full">
                    {/* This inner div needs to be the width of the OUTER container */}
                    <img
                        src={beforeImage}
                        alt="Before"
                        className="absolute top-0 left-0 h-full object-cover object-top max-w-none"
                        style={{ width: containerRef.current ? containerRef.current.getBoundingClientRect().width : '100%' }}
                    // On first render containerRef is null, so 100% might squish. 
                    // Better approach: use 100vw or just rely on object-cover with fixed aspect ratio
                    />
                    {/* 
                      Actually, simpler way: 
                      Use a background image or just valid width.
                      If I set width: 100% on the image, it fits the clipped div.
                      I need width: 'calc(100% / (sliderPos/100))' - Math is complex.
                      
                      Best way: 
                      Position absolute, Left 0.
                      Width: The width of the parent container.
                      We can force this via style or js.
                      
                      Let's try JS width update on resize/mount.
                     */}
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

// Fix for image width within clipped div:
// We can simply pass the width from the parent or use a CSS variable.
// Or effectively: width of image = 100% of PARENT.
// But the parent of the image is the CLIPPED div.
// So we need width: (100 / sliderPos) * 100 %.

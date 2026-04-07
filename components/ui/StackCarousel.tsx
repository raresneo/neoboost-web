import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface StackCarouselProps {
    children: React.ReactNode[];
}

export const StackCarousel: React.FC<StackCarouselProps> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % children.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + children.length) % children.length);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        trackMouse: true
    });

    const getCardStyle = (index: number) => {
        const diff = (index - activeIndex + children.length) % children.length;

        // We want to show:
        // Current (0)
        // Next (1) -> Right stack
        // Previous (L-1) -> Left stack

        // Adjusted logic for circular "stack" view
        // 0 = Center
        // 1 = Right 1
        // 2 = Right 2
        // ...
        // L-1 = Left 1

        let position = index - activeIndex;
        if (position < -Math.floor(children.length / 2)) position += children.length;
        if (position > Math.floor(children.length / 2)) position -= children.length;

        // VISIBLE RANGE: [-2, -1, 0, 1, 2]
        // We hide others
        if (Math.abs(position) > 2) return { display: 'none' };

        const zIndex = 10 - Math.abs(position);
        const scale = 1 - Math.abs(position) * 0.15;
        const opacity = 1 - Math.abs(position) * 0.3;
        const xPercent = position * 60; // 60% overlap
        const rotateY = position * -25; // Rotate towards center

        return {
            zIndex,
            scale,
            opacity,
            x: `${xPercent}%`,
            rotateY: `${rotateY}deg`,
            z: Math.abs(position) * -200, // Move back in 3D
        };
    };

    // Framer Motion Variants for smooth transitions
    const variants = {
        center: { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 },
        left: { x: '-60%', scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: 25 },
        right: { x: '60%', scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: -25 },
        leftHidden: { x: '-120%', scale: 0.7, zIndex: 1, opacity: 0 },
        rightHidden: { x: '120%', scale: 0.7, zIndex: 1, opacity: 0 },
    };

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000 overflow-hidden" {...handlers}>
            <div className="relative w-[300px] md:w-[350px] h-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    {children.map((child, index) => {
                        let position = index - activeIndex;
                        if (position < -Math.floor(children.length / 2)) position += children.length;
                        if (position > Math.floor(children.length / 2)) position -= children.length;

                        let variant = 'hidden';
                        if (position === 0) variant = 'center';
                        else if (position === 1) variant = 'right';
                        else if (position === -1) variant = 'left';
                        else if (position > 1) variant = 'rightHidden'; // Or maybe 'rightStack'
                        else if (position < -1) variant = 'leftHidden';

                        // Custom styles for non-animated props if needed, but variants handle most

                        // We only render [-2, 2] range effectively for performance
                        if (Math.abs(position) > 2 && children.length > 5) return null;

                        return (
                            <motion.div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full origin-center"
                                animate={variant}
                                variants={variants}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {child}
                                {/* Dark overlay for depth */}
                                {position !== 0 && (
                                    <div
                                        className="absolute inset-0 bg-black/40 rounded-[2rem] z-50 pointer-events-none transition-opacity duration-300"
                                        onClick={() => position === 1 ? handleNext() : handlePrev()}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 md:left-20 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all hover:scale-110"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 md:right-20 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all hover:scale-110"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface SnapCarouselProps {
    children: React.ReactNode;
    className?: string;
    itemWidth?: string; // e.g., "w-full md:w-1/2 lg:w-1/3"
}

export const SnapCarousel = ({ children, className = '', itemWidth = 'min-w-[85vw] md:min-w-[600px]' }: SnapCarouselProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // buffer
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Scroll 80% of view
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`relative group ${className}`}>
            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-6 md:px-24 pr-[20%] md:pr-24"
                style={{ scrollBehavior: 'smooth' }}
            >
                {React.Children.map(children, (child) => (
                    <div className={`snap-center shrink-0 ${itemWidth}`}>
                        {child}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Floating) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 hidden md:block">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="shadow-2xl bg-white/80 backdrop-blur-md border border-white/40 !rounded-full w-12 h-12"
                >
                    <ArrowLeft size={20} />
                </Button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 hidden md:block">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="shadow-2xl bg-white/80 backdrop-blur-md border border-white/40 !rounded-full w-12 h-12"
                >
                    <ArrowRight size={20} />
                </Button>
            </div>

            {/* Mobile Swipe Hint (Optional) */}
            <div className="md:hidden flex items-center justify-center gap-2 text-gray-400 text-sm font-medium mt-2 animate-pulse">
                <ArrowRight size={16} />
                <span>Swipe pentru a vedea mai multe</span>
                <ArrowRight size={16} />
            </div>
        </div>
    );
};

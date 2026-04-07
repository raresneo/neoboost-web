import React, { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';

interface FlashCardImage {
    src: string;
    alt: string;
    caption?: string;
    year?: string;
}

interface FlashCardStackProps {
    images: FlashCardImage[];
}

export const FlashCardStack: React.FC<FlashCardStackProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full aspect-[4/5] md:aspect-square max-w-sm mx-auto group cursor-pointer perspective-1000" onClick={nextCard}>
            {images.map((img, index) => {
                // Calculate position relative to current index
                // We show 3 cards: current, +1, +2
                const position = (index - currentIndex + images.length) % images.length;

                // Only render top 3 for performance/visuals, unless there are fewer
                if (position > 2 && images.length > 3) return null;

                const zIndex = images.length - position;
                const scale = 1 - position * 0.05;
                const translateY = position * 10; // move down slightly
                const opacity = 1 - position * 0.2;
                const rotate = position * 2; // slight rotation for stack effect

                return (
                    <div
                        key={img.src}
                        className="absolute inset-0 transition-all duration-500 ease-out shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
                        style={{
                            zIndex,
                            transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                            opacity
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                        />

                        {/* Caption Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12">
                            {img.year && (
                                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded mb-2">
                                    {img.year}
                                </span>
                            )}
                            {img.caption && (
                                <p className="text-white font-medium text-sm md:text-base leading-tight">
                                    {img.caption}
                                </p>
                            )}
                        </div>

                        {/* Hint for interaction (only on top card) */}
                        {position === 0 && (
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-full p-2 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="text-white w-5 h-5" />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Progress Indicators */}
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-500 w-6' : 'bg-zinc-700'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

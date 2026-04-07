import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

interface ScrollRevealTextProps {
    text: string;
    highlights?: {
        word: string;
        icon?: React.ReactNode;
        color?: string;
    }[];
    className?: string;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, highlights = [], className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.5"]
    });

    const words = text.split(" ");

    return (
        <div ref={containerRef} className={`flex flex-wrap leading-tight ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);

                // Check if this word is a highlight
                // Simple cleaning to match "word." or "word,"
                const cleanWord = word.replace(/[.,!?;:()]/g, "");
                const highlight = highlights.find(h => h.word.toLowerCase() === cleanWord.toLowerCase());

                return (
                    <Word
                        key={i}
                        word={word}
                        range={[start, end]}
                        progress={scrollYProgress}
                        highlight={highlight}
                    />
                );
            })}
        </div>
    );
};

interface WordProps {
    word: string;
    range: [number, number];
    progress: MotionValue<number>;
    highlight?: {
        word: string;
        icon?: React.ReactNode;
        color?: string;
    };
}

const Word: React.FC<WordProps> = ({ word, range, progress, highlight }) => {
    const opacity = useTransform(progress, range, [0.1, 1]); // Scrub opacity from 0.1 to 1 based on range

    // If highlighted, we might want to make it pop more or change color
    const color = highlight?.color ? highlight.color : "inherit";

    return (
        <span className="relative mr-[0.25em] inline-block">
            <motion.span style={{ opacity, color }} className="transition-colors duration-200">
                {word}  {/* Use original word with punctuation */}
            </motion.span>

            {/* Render Icon if present and fully revealed? Or always visible but faded? */}
            {highlight?.icon && (
                <motion.span
                    style={{ opacity }}
                    className="inline-block ml-1 align-middle -mt-1 transform scale-110"
                >
                    {highlight.icon}
                </motion.span>
            )}
        </span>
    );
};

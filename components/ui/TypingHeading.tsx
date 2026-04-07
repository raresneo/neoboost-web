import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface TypingHeadingProps {
    text: string;
    highlightText?: string;
    highlightColor?: string;
    className?: string; // Additional classes for font size, weight, etc.
}

export const TypingHeading: React.FC<TypingHeadingProps> = ({
    text,
    highlightText,
    highlightColor = "text-blue-600",
    className = "text-4xl md:text-6xl font-display font-bold uppercase italic"
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    // We want the animation to trigger when the element is in view/scrolling
    // But "lyrics style" often implies opacity/color shift based on scroll position
    // For simplicity and "creating the writing" effect requested, a staggered character reveal on viewport entry is best.

    const words = text.split(" ");

    // Split text into an array of words/segments to handle highlighting easily
    const parts = highlightText
        ? text.split(new RegExp(`(${highlightText})`, 'gi'))
        : [text];

    return (
        <h2 ref={containerRef} className={`${className} flex flex-wrap gap-x-3 gap-y-1 relative ${className?.includes('justify-') ? '' : 'justify-center'}`}>
            {/* We will map words to animate them appearing */}
            {text.split(" ").map((word, i) => {
                const isHighlight = highlightText && highlightText.toLowerCase().includes(word.toLowerCase().replace(/[.,]/g, ''));

                return (
                    <span key={i} className="relative inline-block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{
                                duration: 0.5,
                                ease: [0.33, 1, 0.68, 1],
                                delay: i * 0.05 // Stagger effect
                            }}
                            className={`inline-block ${isHighlight ? highlightColor : ''}`}
                        >
                            {word}
                        </motion.span>
                    </span>
                );
            })}
        </h2>
    );
};

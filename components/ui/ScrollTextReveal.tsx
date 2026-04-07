import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';

interface ScrollTextRevealProps {
    children: string;
    className?: string;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({ children, className }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25']
    });

    const words = children.split(' ');

    return (
        <p ref={container} className={`${className} flex flex-wrap`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
};

const Word: React.FC<{ children: string; progress: any; range: [number, number] }> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative mr-[12px] mt-[12px]">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity: opacity }}>{children}</motion.span>
        </span>
    );
};

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    as?: React.ElementType;
    stagger?: number;
    mode?: 'word' | 'char';
    once?: boolean;
}

export const RevealText: React.FC<RevealTextProps> = ({
    text,
    className = '',
    delay = 0,
    as: Component = 'div',
    stagger = 0.05,
    mode = 'word',
    once = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-20%" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay }
        }
    };

    const itemVariants = {
        hidden: {
            y: "110%",
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        },
        visible: {
            y: 0,
            transition: { duration: 1, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const MotionComponent = motion(Component as any);
    const words = text.split(" ");

    if (mode === 'char') {
        // Char mode: animate each character individually, but wrap by WORD so that:
        // 1. Spaces between words are preserved as static spacers (no animation)
        // 2. overflow-hidden is per-word → italic glyphs at word edges are never clipped
        // 3. y="110%" during animation stays within the word wrapper → properly hidden
        const charStagger = stagger * 0.5; // chars stagger faster than words
        let charIndex = 0;

        return (
            <MotionComponent
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`${className}`}
                style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
            >
                {words.map((word, wi) => (
                    <React.Fragment key={wi}>
                        {/* Word wrapper: overflow-hidden per word — italic edges never clipped */}
                        <span className="relative inline-block overflow-hidden py-[0.12em] mr-[0.22em] align-bottom">
                            {word.split("").map((char) => {
                                const ci = charIndex++;
                                return (
                                    <motion.span
                                        key={ci}
                                        variants={{
                                            hidden: { y: "110%", transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
                                            visible: {
                                                y: 0,
                                                transition: {
                                                    duration: 1,
                                                    ease: [0.33, 1, 0.68, 1],
                                                    delay: ci * charStagger
                                                }
                                            }
                                        }}
                                        className="inline-block"
                                        style={{ willChange: "transform" }}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                        </span>
                    </React.Fragment>
                ))}
            </MotionComponent>
        );
    }

    // Word mode (default): each word slides up from behind overflow-hidden mask
    return (
        <MotionComponent
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${className}`}
        >
            {words.map((word, index) => (
                <span key={index} className="relative overflow-hidden inline-block mr-[0.25em] py-[0.1em] align-bottom">
                    <motion.span
                        variants={itemVariants}
                        className="inline-block"
                        style={{ willChange: "transform" }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </MotionComponent>
    );
};

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

    // For char mode, group by word so we can wrap at word boundaries only
    const items = mode === 'word'
        ? text.split(" ")
        : text.split(" ").flatMap((word, wi, arr) => [
            ...word.split(""),
            ...(wi < arr.length - 1 ? [" "] : [])
          ]);

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

    return (
        <MotionComponent
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${className} overflow-hidden`}
            style={mode === 'char' ? { wordBreak: 'keep-all', overflowWrap: 'normal' } : undefined}
        >
            {items.map((item, index) => (
                item === " " ? (
                    <span key={index} className="inline-block" style={{ width: '0.3em' }} aria-hidden="true" />
                ) : (
                    <span key={index} className={`relative inline-block ${mode === 'word' ? 'mr-[0.25em]' : ''} py-2`}>
                        <motion.span
                            variants={itemVariants}
                            className="inline-block"
                            style={{ willChange: "transform" }}
                        >
                            {item}
                        </motion.span>
                    </span>
                )
            ))}
        </MotionComponent>
    );
};

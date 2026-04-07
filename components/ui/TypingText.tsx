import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
    text,
    className = "text-gray-200 text-lg md:text-xl",
    delay = 0
}) => {
    return (
        <p className={`${className} flex flex-wrap gap-x-1.5 relative`}>
            {text.split(" ").map((word, i) => (
                <span key={i} className="relative inline-block overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                            duration: 0.4,
                            ease: [0.33, 1, 0.68, 1],
                            delay: delay + (i * 0.02) // Faster stagger for longer text
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </p>
    );
};

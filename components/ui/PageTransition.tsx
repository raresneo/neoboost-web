import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.61, 1, 0.88, 1], // Custom easing
        },
    },
    exit: {
        opacity: 0,
        y: -20, // Slightly move up on exit
        transition: {
            duration: 0.3,
            ease: [0.61, 1, 0.88, 1],
        },
    },
};

export const PageTransition = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

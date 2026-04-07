
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export const SpeedScrollEffect = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity reading
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to opacity of speed lines
    // Velocity can be positive or negative. We want absolute value.
    const velocityFactor = useTransform(smoothVelocity, [-10000, 0, 10000], [1, 0, 1]);
    const opacity = useTransform(velocityFactor, [0, 0.5, 1], [0, 0.3, 0.8]);

    // Optional: skew effect on the main content?? 
    // It's hard to skew "body" from here without wrapping it.
    // So we will stick to visual overlays.

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[50] mix-blend-overlay"
            style={{ opacity }}
        >
            {/* Vignette that creates a tunnel vision effect at high speeds */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

            {/* Dynamic particles or vertical lines */}
            <div className="w-full h-full flex justify-between px-10">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#3A86FF] to-transparent"
                        style={{
                            opacity: useTransform(smoothVelocity, (latest) => Math.min(Math.abs(latest) / 5000, 0.5)),
                            scaleY: useTransform(smoothVelocity, (latest) => 1 + Math.abs(latest) / 1000),
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

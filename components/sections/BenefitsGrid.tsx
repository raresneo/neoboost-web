import React, { useState } from 'react';
import { BenefitModal } from '../ui/BenefitModal';

import { UNIFIED_BENEFITS } from '../../constants';
import { motion } from 'framer-motion';

export const BenefitsGrid = () => {
    const [selectedBenefit, setSelectedBenefit] = useState<typeof UNIFIED_BENEFITS[0] | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {UNIFIED_BENEFITS.map((benefit, i) => (
                    <motion.div
                        key={benefit.id}
                        variants={itemVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        onClick={() => setSelectedBenefit(benefit)}
                        className="group relative bg-white border border-gray-100 hover:border-blue-300 rounded-[var(--radius-xl)] p-8 transition-shadow duration-300 cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden"
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500"></div>

                        {/* Icon */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 border border-gray-100 group-hover:border-transparent group-hover:scale-110 shadow-sm">
                                {benefit.icon}
                            </div>

                            {(benefit as any).badge && (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-orange-500/30 uppercase tracking-tighter"
                                >
                                    {(benefit as any).badge}
                                </motion.div>
                            )}
                        </div>

                        <h3 className="text-2xl font-display font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {benefit.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            {benefit.desc}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#3A86FF] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                Vezi Detalii
                            </span>
                            <div className="flex items-center gap-2 text-blue-600">
                                <span className="text-xs font-mono group-hover:opacity-0 transition-opacity">EXPLORE</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-2xl leading-none"
                                >
                                    &rarr;
                                </motion.span>
                            </div>
                        </div>

                        {/* Animated Mascot Character */}

                    </motion.div>
                ))}
            </motion.div>

            <BenefitModal
                isOpen={!!selectedBenefit}
                onClose={() => setSelectedBenefit(null)}
                benefit={selectedBenefit}
            />
        </>
    );
};

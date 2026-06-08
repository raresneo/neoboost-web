import React from 'react';
import { Dumbbell, ArrowRight, Activity, BrainCircuit, ShieldCheck, Users, Star, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { DualToneImage } from '../ui/DualToneImage';
import { motion } from 'framer-motion';
import { TextScramble } from '../ui/TextScramble';

interface NoSuitSectionProps {
    onOpenBooking: () => void;
}

export const NoSuitSection: React.FC<NoSuitSectionProps> = ({ onOpenBooking }) => {

    const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
        return (
            <div className="relative overflow-hidden w-full">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0, delay }}
                    className={className}
                >
                    {text.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.05,
                                delay: delay + (i * 0.02),
                                ease: "linear"
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.p>
            </div>
        );
    };

    return (
        <section className="py-20 md:py-32 bg-[var(--bg-primary)] border-y border-[var(--border-subtle)] relative z-10">
            <div className="container mx-auto px-6 md:px-24">
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                            <Activity size={14} />
                            <span>Formatul Antrenamentelor</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 uppercase italic">
                            <TextScramble text="ALEGE CUM TE" /> <span className="text-blue-600">ANTRENEZI. ⚡</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* OPTION 1: PERSONAL TRAINING */}
                    <ScrollReveal className="h-full">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col h-full relative overflow-hidden group hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-50/30 rounded-full blur-xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 flex-1">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-blue-600">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black italic uppercase text-gray-900">Personal Training</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">1-la-1</p>
                                    </div>
                                </div>

                                {/* Personalization Accent */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                                    <Star size={12} className="fill-amber-500" />
                                    Recomandat pentru focus maxim
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 text-sm leading-relaxed mb-2 font-semibold">
                                    Experiență premium, focus pe tine. 🎯
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Fiecare detaliu contează: ai corectare posturală constantă și intimitate maximă. Ideal dacă vrei să simți progresul pas cu pas și să ai control total asupra fiecărei sesiuni. ✨
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <BrainCircuit size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-gray-900">Corecție Posturală Milimetrică</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">Antrenorul ajustează fiecare mișcare, astfel încât să lucrezi eficient și sigur, fără compromisuri.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <ShieldCheck size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-gray-900">Siguranță Maximă</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">Zero riscuri inutile. Progresul e monitorizat, adaptat, perfect pentru recuperare sau dacă ai nevoie de extra atenție.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pentru cine */}
                                <div className="bg-blue-50/50 p-4 rounded-xl mb-6 border border-blue-100/50">
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
                                        <Sparkles size={14} />
                                        Pentru cine?
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">Dacă vrei să-ți construiești un sistem pe termen lung, cu feedback personalizat și ritm adaptat stilului tău de viață.</p>
                                </div>

                                {/* Image */}
                                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group-hover:shadow-lg transition-all duration-500">
                                    <DualToneImage
                                        src="/DSC03989.webp"
                                        alt="Personal Training EMS"
                                        className="w-full h-full object-cover"
                                        intensity="light"
                                    />
                                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-lg">
                                        1 Client : 1 Antrenor
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button onClick={onOpenBooking} className="w-full bg-gray-900 hover:bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-xl shadow-gray-300">
                                VREAU ANTRENAMENT UNUL LA UNU
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </ScrollReveal>

                    {/* OPTION 2: SMALL GROUP */}
                    <ScrollReveal delay={100} className="h-full">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col h-full relative overflow-hidden group hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                            {/* Subtle background accent */}
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-purple-50/30 rounded-full blur-xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 flex-1">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-blue-600">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black italic uppercase text-gray-900">Small Group</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">2-3 persoane</p>
                                    </div>
                                </div>

                                {/* Personalization Accent */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                                    <Star size={12} className="fill-blue-500" />
                                    Cel mai ales de clienți
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <p className="text-gray-700 text-sm leading-relaxed mb-2 font-semibold">
                                        Energie de grup, cost optimizat. 🚀
                                    </p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Te antrenezi cu 1-2 persoane, păstrând atenția antrenorului și dinamica unui grup mic. Motivație extra, atmosferă relaxată, progres împărțit. 🙌
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <Activity size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-gray-900">Vibe & Energie</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">Atmosferă dinamică – te motivezi reciproc, dar fără presiunea unei clase mari.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <Dumbbell size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-gray-900">Cost Avantajos</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">Acces la tehnologie premium și ghidaj personalizat, la un preț mai accesibil.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pentru cine */}
                                <div className="bg-blue-50/50 p-4 rounded-xl mb-6 border border-blue-100/50">
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
                                        <Sparkles size={14} />
                                        Pentru cine?
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">Dacă vrei să combini beneficiile unui antrenament eficient cu energia unui grup restrâns, dar fără să pierzi din supravegherea atentă.</p>
                                </div>

                                {/* Image */}
                                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group-hover:shadow-lg transition-all duration-500">
                                    <DualToneImage
                                        src="/group_training_squats.webp"
                                        alt="Small Group Training EMS"
                                        className="w-full h-full object-cover"
                                        intensity="light"
                                    />
                                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-lg">
                                        2-3 Clienți : 1 Antrenor
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button onClick={onOpenBooking} className="w-full bg-gray-900 hover:bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-xl shadow-gray-300">
                                VREAU ANTRENAMENT DE GRUP
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Check, MessageCircle, X } from 'lucide-react';
import { Button } from './Button';

interface QuizOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
    color?: string;
}

interface QuizStep {
    id: string;
    question: string;
    subtext?: string;
    options: QuizOption[];
}

interface LeadGenQuizProps {
    steps: QuizStep[];
    onComplete: (answers: Record<string, string>) => void;
    onClose?: () => void;
}

export const LeadGenQuiz: React.FC<LeadGenQuizProps> = ({ steps, onComplete, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [direction, setDirection] = useState(0);

    const handleSelect = (optionId: string) => {
        setAnswers(prev => ({ ...prev, [steps[currentStep].id]: optionId }));
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setTimeout(() => setCurrentStep(prev => prev + 1), 300); // Small delay for visual feedback
        } else {
            onComplete({ ...answers, [steps[currentStep].id]: optionId });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" onClick={onClose}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                    <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-8 md:p-12">
                    <AnimatePresence mode='wait' custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            initial={{ x: direction * 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction * -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-10 text-center">
                                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                                    Pasul {currentStep + 1} din {steps.length}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                    {step.question}
                                </h3>
                                {step.subtext && (
                                    <p className="text-gray-500 text-lg">{step.subtext}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {step.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option.id)}
                                        className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 hover:scale-[1.02]
                                            ${answers[step.id] === option.id
                                                ? 'border-blue-600 bg-blue-50 shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'
                                            }`}
                                    >
                                        {option.icon && (
                                            <div className={`p-3 rounded-xl ${answers[step.id] === option.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'} transition-colors`}>
                                                {option.icon}
                                            </div>
                                        )}
                                        <span className={`font-bold text-lg ${answers[step.id] === option.id ? 'text-blue-900' : 'text-gray-700'}`}>
                                            {option.label}
                                        </span>

                                        {answers[step.id] === option.id && (
                                            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-blue-600">
                                                <Check size={24} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {currentStep > 0 && (
                        <div className="mt-8">
                            <button
                                onClick={handleBack}
                                className="text-sm font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider flex items-center gap-2"
                            >
                                <ArrowRight className="rotate-180" size={16} /> Înapoi
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

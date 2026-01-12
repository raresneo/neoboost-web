import React, { useState, useRef, useEffect } from 'react';
import { FormConfig, FormStep } from './types';
import { ChevronDown, ChevronUp, Check, Copy, MessageCircle, ArrowRight, X, Loader2 } from 'lucide-react';
import { BRAND } from '../../constants';
import { getStoredUTMParameters } from '../../lib/utm';

interface StepFormProps {
    config: FormConfig;
    programId?: string;
    onComplete?: (answers: Record<string, string>, finalMessage: string) => Promise<void>;
    submitLabel?: string;
    submitIcon?: React.ReactNode;
}

export const StepForm: React.FC<StepFormProps> = ({ config, onClose, programId, onComplete, submitLabel, submitIcon }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Initialize refs array
    useEffect(() => {
        stepsRef.current = stepsRef.current.slice(0, config.steps.length + 1); // +1 for final screen
    }, [config.steps]);

    // Lock body scroll when form is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            // Also ensure lenis (smooth scroll) is paused if used, 
            // but locking overflow:hidden usually handles it for native scroll.
            // If using Lenis via global instance, better to stop it, but standard overflow hidden is a good first step.
        };
    }, []);

    const handleScroll = () => {
        // Optional: Update currentStep based on scroll position if needed
    };

    const scrollToStep = (index: number) => {
        setCurrentStep(index);
        if (stepsRef.current[index]) {
            stepsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleAnswer = (stepId: string, value: string, autoAdvance = false) => {
        setAnswers(prev => ({ ...prev, [stepId]: value }));
        if (autoAdvance && currentStep < config.steps.length) { // Allow going to final step (length)
            setTimeout(() => {
                scrollToStep(currentStep + 1);
            }, 400); // Small delay for visual feedback
        }
    };

    const handleNext = () => {
        if (currentStep < config.steps.length) {
            scrollToStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            scrollToStep(currentStep - 1);
        }
    };

    // Construct message
    const constructMessage = () => {
        let message = config.whatsappTemplate;

        // Replace placeholders
        Object.entries(answers).forEach(([key, value]) => {
            // Truncate long text if needed (max 200 chars for free text fields)
            let safeValue = value as string;
            if (safeValue && safeValue.length > 200) {
                safeValue = safeValue.substring(0, 197) + '...';
            }
            message = message.replace(`{${key}}`, safeValue);
        });

        // Cleanup any remaining placeholders that weren't filled (shouldn't happen if validation is strict, but good safety)
        message = message.replace(/{[a-zA-Z0-9_]+}/g, '(nespecificat)');

        return message;
    };

    const finalMessage = constructMessage();
    const whatsappUrl = `https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=${encodeURIComponent(finalMessage)}`;

    const saveLeadToBackend = async () => {
        if (submitSuccess) return true; // Already saved

        setIsSubmitting(true);
        try {
            const utm = getStoredUTMParameters();
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    programId: programId || config.id,
                    firstName: answers['name']?.split(' ')[0] || answers['first_name'] || 'Lead',
                    lastName: answers['name']?.split(' ').slice(1).join(' ') || answers['last_name'] || 'Form',
                    email: answers['email'] || 'no-email@provided.com',
                    phone: answers['phone'] || answers['contact'] || '',
                    formData: answers,
                    utmSource: utm.source,
                    utmMedium: utm.medium,
                    utmCampaign: utm.campaign
                }),
            });

            if (!response.ok) throw new Error('Failed to save lead');

            setSubmitSuccess(true);
            return true;
        } catch (error) {
            console.error('Error saving lead:', error);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(finalMessage);
        saveLeadToBackend(); // Try to save even if they just copy
        alert('Mesajul a fost copiat! Deschide WhatsApp și dă Paste.');
    };

    return (
        <div className="fixed inset-0 z-[100000] bg-black text-white flex flex-col h-[100dvh] w-screen overscroll-none" style={{ touchAction: 'pan-y' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 bg-black z-50">
                <div>
                    <h2 className="text-xl md:text-2xl font-black impact-font uppercase text-[#3A86FF]">{config.title}</h2>
                    <div className="flex gap-1 mt-2">
                        {config.steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-[#3A86FF]' : 'bg-white/10'}`}
                            />
                        ))}
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentStep === config.steps.length ? 'bg-[#3A86FF]' : 'bg-white/10'}`} />
                    </div>
                </div>
                <button onClick={onClose} className="p-4 -mr-2 hover:bg-white/10 rounded-full transition-colors z-[60]">
                    <X size={24} className="text-white/60 hover:text-white" />
                </button>
            </div>

            {/* Steps Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory"
                onScroll={handleScroll}
            >
                {config.steps.map((step, index) => (
                    <div
                        key={step.id}
                        ref={el => stepsRef.current[index] = el}
                        className="h-full min-h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center p-6 md:p-20 snap-start relative border-b border-white/5"
                    >
                        <div className="max-w-xl w-full animate-fadeIn">
                            <span className="mono-font text-[#3A86FF] text-xs uppercase tracking-[0.3em] mb-4 block">
                                Pasul {index + 1} din {config.steps.length}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{step.question}</h3>
                            {step.subtext && <p className="text-white/50 text-lg mb-8">{step.subtext}</p>}

                            <div className="mt-8 space-y-4">
                                {/* Input Types */}
                                {step.type === 'text' && (
                                    <div className="flex flex-col gap-4">
                                        <input
                                            type="text"
                                            value={answers[step.id] || ''}
                                            onChange={(e) => handleAnswer(step.id, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                            placeholder={step.placeholder}
                                            className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#3A86FF] text-2xl md:text-3xl py-4 outline-none transition-colors placeholder:text-white/20 font-light"
                                            autoFocus={currentStep === index}
                                            autoComplete="off"
                                        />
                                        <button
                                            onClick={handleNext}
                                            disabled={!answers[step.id]}
                                            className="self-start mt-4 flex items-center gap-2 bg-white/10 hover:bg-[#3A86FF] hover:text-black px-6 py-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            Următorul <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}

                                {step.type === 'textarea' && (
                                    <div className="flex flex-col gap-4">
                                        <textarea
                                            value={answers[step.id] || ''}
                                            onChange={(e) => handleAnswer(step.id, e.target.value)}
                                            placeholder={step.placeholder}
                                            className="w-full bg-white/5 border border-white/10 focus:border-[#3A86FF] text-xl p-6 rounded-xl outline-none transition-colors placeholder:text-white/20 min-h-[150px]"
                                        />
                                        <button
                                            onClick={handleNext}
                                            className="self-start mt-4 flex items-center gap-2 bg-white/10 hover:bg-[#3A86FF] hover:text-black px-6 py-3 rounded-full transition-all"
                                        >
                                            {step.required === false && !answers[step.id] ? 'Sari Peste' : 'Următorul'} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}

                                {step.type === 'radio' && (
                                    <div className="grid gap-3">
                                        {step.options?.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => handleAnswer(step.id, opt, true)}
                                                className={`text-left p-6 rounded-xl border transition-all duration-300 flex items-center justify-between group ${answers[step.id] === opt ? 'bg-[#3A86FF] text-black border-[#3A86FF]' : 'bg-white/5 border-white/10 hover:border-[#3A86FF]/50 hover:bg-white/10'}`}
                                            >
                                                <span className="text-xl font-medium">{opt}</span>
                                                {answers[step.id] === opt && <Check size={24} />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Final Step: Review & Send */}
                <div
                    ref={el => stepsRef.current[config.steps.length] = el}
                    className="h-full min-h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center p-6 md:p-20 snap-start bg-[#0a0a0a]"
                >
                    <div className="max-w-xl w-full text-center">
                        <div className="w-20 h-20 bg-[#3A86FF]/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <MessageCircle size={40} className="text-[#3A86FF]" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black impact-font uppercase mb-6">Gata de Start!</h3>
                        <p className="text-white/60 text-lg mb-10 leading-relaxed">
                            Formularul tău este completat. Apasă butonul de mai jos pentru a deschide WhatsApp cu toate detaliile gata scrise.
                        </p>

                        <button
                            onClick={async () => {
                                // Basic tracking for Lead/Contact
                                if (typeof (window as any).gtag === 'function') {
                                    (window as any).gtag('event', 'generate_lead', { 'event_category': 'form', 'event_label': onComplete ? 'purchase_start' : 'whatsapp_send' });
                                }
                                if (typeof (window as any).fbq === 'function') {
                                    (window as any).fbq('track', onComplete ? 'InitiateCheckout' : 'Contact');
                                }

                                // Save to backend (Lead Gen)
                                await saveLeadToBackend();

                                if (onComplete) {
                                    await onComplete(answers, finalMessage);
                                } else {
                                    // Open WhatsApp
                                    window.open(whatsappUrl, '_blank');
                                }
                            }}
                            disabled={isSubmitting}
                            className="w-full bg-[#3A86FF] text-black text-xl font-black uppercase tracking-widest py-6 rounded-xl hover:brightness-110 shadow-[0_0_40px_rgba(58,134,255,0.3)] hover:shadow-[0_0_60px_rgba(58,134,255,0.5)] transition-all transform hover:-translate-y-1 mb-8 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isSubmitting ? (
                                <Loader2 size={28} className="animate-spin" />
                            ) : (
                                submitIcon || <MessageCircle size={28} />
                            )}
                            {isSubmitting ? 'Se procesează...' : (submitLabel || 'Trimite pe WhatsApp')}
                        </button>

                        {/* Fallback */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Dacă nu se deschide WhatsApp:
                            </p>
                            <textarea
                                readOnly
                                value={finalMessage}
                                className="w-full bg-black/50 text-white/60 text-sm p-4 rounded-lg mb-4 h-32 resize-none font-mono"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider"
                            >
                                <Copy size={16} /> Copiază Mesajul
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Footer (Desktop/Mobile) - Optional indicators */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[10000]">
                <button onClick={handlePrev} disabled={currentStep === 0} className="p-3 bg-white/10 hover:bg-white/20 rounded-full disabled:opacity-0 transition-opacity">
                    <ChevronUp size={24} />
                </button>
                {currentStep < config.steps.length && (
                    <button onClick={handleNext} className="p-3 bg-white/10 hover:bg-white/20 rounded-full animate-bounce">
                        <ChevronDown size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

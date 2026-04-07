import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NAMES = [
    "Andreea P.", "Mihai S.", "Ioana D.", "Cristian V.", "Elena M.", "Alex K.", "Diana R.", "Robert T."
];

const ACTIONS = [
    "a rezervat o ședință gratuită",
    "s-a înscris la programul Elite",
    "a finalizat prima lună 🎉",
    "a întrebat de pachetul Transform"
];

export const SocialProofToast = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({ name: "", action: "", time: "acum" });

    useEffect(() => {
        // Initial delay
        const initialTimer = setTimeout(() => {
            triggerNotification();
        }, 5000); // 5 sec after load

        // Interval loop
        const interval = setInterval(() => {
            triggerNotification();
        }, 20000 + Math.random() * 10000); // Every 20-30 sec

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const triggerNotification = () => {
        const name = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
        const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        const time = `${Math.floor(Math.random() * 5) + 1} min în urmă`;

        setData({ name, action, time });
        setIsVisible(true);

        // Hide after 5 sec
        setTimeout(() => {
            setIsVisible(false);
        }, 5000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: 20 }}
                    className="fixed bottom-6 right-6 z-[9990] bg-[var(--bg-secondary)]/90 backdrop-blur-md border border-[var(--accent-primary)]/30 p-4 rounded-xl shadow-2xl max-w-xs flex items-start gap-4 hidden md:flex"
                >
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white mb-0.5">{data.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{data.action}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">{data.time}</p>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-white"
                    >
                        <X size={12} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { NeoFAQItem } from '../../constants';

// --- FAQ Item ---
export const FAQItem: React.FC<{ item: NeoFAQItem; i: number }> = ({ item, i }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleEnter = () => {
        timeoutRef.current = window.setTimeout(() => setIsExpanded(true), 150);
    };
    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsExpanded(false);
    };

    return (
        <div
            className={`relative border-b border-[var(--border-subtle)] bg-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'bg-white rounded-2xl shadow-xl border border-gray-100 px-6 md:px-10 my-4' : 'hover:bg-[var(--bg-tertiary)]/50'}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onTouchStart={() => setIsExpanded(true)}
            onTouchEnd={() => setIsExpanded(false)}
        >
            <div className={`transition-all duration-700 ${isExpanded ? 'py-10' : 'py-5'} flex items-center gap-8 cursor-default`}>
                <div className={`transition-all duration-700 ${isExpanded ? 'text-blue-600 scale-125' : 'text-[var(--text-disabled)] scale-90'}`}>
                    {item.icon}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h3 className={`text-base md:text-lg font-bold font-display tracking-wide transition-all duration-500 ${isExpanded ? 'text-gray-900' : 'text-[var(--text-secondary)]'}`}>
                            {item.question}
                        </h3>
                        <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100 rotate-180' : 'opacity-0'}`}>
                            <ChevronDown size={18} className="text-blue-600" />
                        </div>
                    </div>
                    <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base border-l-2 border-blue-500/20 pl-6 py-2">
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

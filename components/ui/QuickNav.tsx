import React, { useEffect, useState } from 'react';

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'beneficii', label: 'Beneficii' },
    { id: 'metoda', label: 'Metoda' },
    { id: 'comparatie', label: 'Diferența' },
    { id: 'programe', label: 'Prețuri' },
    { id: 'rezultate', label: 'Rezultate' }
];

export const QuickNav = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        SECTIONS.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
            {SECTIONS.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="group flex items-center justify-end gap-3"
                >
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${activeSection === section.id ? 'text-[#3A86FF] opacity-100' : 'text-white/40'}`}>
                        {section.label}
                    </span>
                    <div className={`w-2 h-2 rounded-full border transition-all duration-300 ${activeSection === section.id ? 'bg-[#3A86FF] border-[#3A86FF] scale-125' : 'border-white/20 bg-transparent'}`} />
                </button>
            ))}
        </div>
    );
};

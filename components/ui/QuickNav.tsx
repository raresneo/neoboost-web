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
        <div className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-3.5 2xl:flex">
            {SECTIONS.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    aria-label={section.label}
                    className="group flex items-center justify-end gap-2.5"
                >
                    <span className="rounded-md bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                        {section.label}
                    </span>
                    <div
                        className={`h-2 w-2 rounded-full transition-all duration-200 ${activeSection === section.id
                            ? 'scale-125 bg-[var(--accent-primary)]'
                            : 'bg-[var(--text-disabled)] group-hover:bg-[var(--text-muted)]'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

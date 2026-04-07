import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from './Button';

export const StickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-info');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[999] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hidden md:block`}>
            <Button
                variant="vibrant"
                size="md"
                onClick={scrollToContact}
                className="shadow-[0_10px_30px_rgba(58,134,255,0.4)] !px-6 !py-3 flex items-center gap-2"
            >
                <Calendar size={18} />
                <span>Book Now</span>
            </Button>
        </div>
    );
};

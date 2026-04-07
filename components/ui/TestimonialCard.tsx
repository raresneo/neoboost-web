import React from 'react';
import { Quote, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Testimonial } from '../../constants';

// --- Testimonial Card ---
export const TestimonialCard: React.FC<{ testimonial: Testimonial; i: number }> = ({ testimonial, i }) => {
    return (
        <ScrollReveal delay={i * 100}>
            <a
                href={testimonial.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative p-10 glass transition-all duration-700 hover:glass-neon h-full flex flex-col justify-between overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
            >
                <div className="absolute top-0 right-0 p-8 text-[var(--text-disabled)]/[0.1] pointer-events-none group-hover:text-[#3A86FF]/[0.05] transition-colors duration-700">
                    <Quote size={80} />
                </div>

                <div className="relative z-10 flex items-center justify-between mb-8">
                    <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, idx) => (
                            <Star key={idx} size={10} className="fill-[#3A86FF] text-[#3A86FF]" />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-[8px] mono-font text-[var(--text-muted)] uppercase tracking-widest font-bold">
                        <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" alt="Google" className="w-3 h-3 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" loading="lazy" decoding="async" />
                        Verified Review
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-lg md:text-xl font-light text-[var(--text-secondary)] leading-relaxed mb-12 italic group-hover:text-[var(--text-primary)] transition-colors duration-700">
                        "{testimonial.quote}"
                    </p>
                </div>

                <div className="relative z-10 border-t border-[var(--border-subtle)] pt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#3A86FF]/20 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div>
                        <h4 className="text-[var(--text-primary)] font-bold font-display text-xl group-hover:text-[#3A86FF] transition-colors">{testimonial.name.toUpperCase()}</h4>
                        <p className="mono-font text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-1">{testimonial.role}</p>
                    </div>
                </div>
            </a>
        </ScrollReveal>
    );
};

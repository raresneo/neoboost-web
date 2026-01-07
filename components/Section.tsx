
import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  light?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id, light = false }) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-6 md:px-12 overflow-hidden ${light ? 'bg-white' : 'bg-slate-50'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;

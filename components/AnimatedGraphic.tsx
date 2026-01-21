
import React, { useRef, useEffect, useState } from 'react';

type GraphicType = 'muscle' | 'energy' | 'tech';

interface AnimatedGraphicProps {
  type: GraphicType;
  className?: string;
  delay?: number;
}

export const AnimatedGraphic: React.FC<AnimatedGraphicProps> = ({ type, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSource = () => {
    switch (type) {
      case 'muscle': return '/graphics/muscle_anatomy.png';
      case 'energy': return '/graphics/energy_flow.png';
      case 'tech': return '/graphics/tech_hud.png';
    }
  };

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-4';
    switch (type) {
      case 'muscle': return 'opacity-100 translate-y-0';
      case 'energy': return 'opacity-100 translate-y-0';
      case 'tech': return 'opacity-100 translate-y-0';
    }
  };

  const renderOverlay = () => {
    switch (type) {
      case 'muscle':
        return (
          <>
            <div className={`absolute top-0 left-0 w-full h-1 bg-[#3A86FF] shadow-[0_0_20px_#3A86FF] opacity-0 ${isVisible ? 'animate-scan-vertical' : ''}`}
              style={{ animationDuration: '3s', animationIterationCount: 'infinite' }} />
            <div className={`absolute inset-0 bg-gradient-to-t from-[#3A86FF]/10 to-transparent opacity-0 ${isVisible ? 'animate-pulse' : ''}`} />
          </>
        );
      case 'energy':
        return (
          <>
            <div className={`absolute inset-0 bg-[#3A86FF]/10 opacity-0 ${isVisible ? 'animate-pulse-fast' : ''}`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] radial-gradient-glow opacity-30 ${isVisible ? 'animate-pulse' : ''}`} />
          </>
        );
      case 'tech':
        return (
          <div className={`absolute inset-0 border-2 border-[#3A86FF]/20 rounded-full ${isVisible ? 'animate-spin-slow' : ''}`}
            style={{ borderTopColor: '#3A86FF', borderRightColor: 'transparent' }} />
        );
    }
  };

  return (
    <div
      ref={ref}
      className={`relative rounded-xl transition-all duration-1000 ${className} ${getAnimationClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >

      {/* Overlay Effects Only - No Background Image */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {renderOverlay()}
        {/* Subtle grid overlay for all */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0gMSAwIEwgMSAyMCBNIDAgMSBMIDIwIDEiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')] opacity-30"></div>
      </div>

      {/* Label Tag */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#3A86FF]/30 rounded-full backdrop-blur-md">
        <div className={`w-1.5 h-1.5 rounded-full bg-[#3A86FF] ${isVisible ? 'animate-pulse' : ''}`}></div>
        <span className="text-[9px] font-bold text-[#3A86FF] uppercase tracking-widest mono-font">
          {type === 'muscle' ? 'Anatomical Scan' : type === 'energy' ? 'Energy Flow' : 'Data Sync'}
        </span>
      </div>
    </div>
  );
};

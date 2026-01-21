
import React, { useRef, useEffect, useState } from 'react';

type GraphicType = 'muscle' | 'energy' | 'tech';

interface AnimatedGraphicProps {
  type: GraphicType;
  bgImage?: string; // New prop for custom photography
  className?: string;
  delay?: number;
}

export const AnimatedGraphic: React.FC<AnimatedGraphicProps> = ({ type, bgImage, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSource = () => {
    if (bgImage) return bgImage;
    switch (type) {
      case 'muscle': return '/ems_training_2.jpg';
      case 'energy': return '/ems_training_1.jpg';
      case 'tech': return '/powerbox_real.jpg';
      default: return '/ems_training_1.jpg';
    }
  };

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-4';
    return 'opacity-100 translate-y-0';
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
      className={`relative overflow-hidden rounded-xl transition-all duration-1000 ${className} ${getAnimationClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background Holographic Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Background Grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,134,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,134,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

        <img
          src={getSource()}
          alt={`NeoBoost ${type} visualization`}
          className={`w-full h-full object-cover opacity-60 mix-blend-luminosity transition-all duration-[2s] ${isVisible ? 'scale-100 grayscale contrast-[1.2] brightness-75' : 'scale-110 grayscale contrast-100'}`}
        />

        {/* Digital Blue Overlay to create 'Hologram' effect on real photo */}
        <div className="absolute inset-0 bg-[#3A86FF] mix-blend-color opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]/80"></div>

        {/* Scanlines for CRT effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
      </div>

      {/* HUD Effects Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {renderOverlay()}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0gMSAwIEwgMSAyMCBNIDAgMSBMIDIwIDEiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')] opacity-30"></div>
      </div>

      {/* Label Tag */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#3A86FF]/30 rounded-full backdrop-blur-md">
        <div className={`w-1.5 h-1.5 rounded-full bg-[#3A86FF] ${isVisible ? 'animate-pulse' : ''}`}></div>
        <span className="text-[9px] font-bold text-[#3A86FF] uppercase tracking-widest mono-font">
          {type === 'muscle' ? 'Anatomical Scan' : type === 'energy' ? 'Energy Flow' : 'Data Sync'}
        </span>
      </div>
    </div>
  );
};

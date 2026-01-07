
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Lenis from 'lenis';
import {
  X,
  MessageCircle,
  Zap,
  MoveUpRight,
  Instagram,
  Facebook,
  ChevronDown,
  ArrowDown,
  CheckCircle2,
  HelpCircle,
  Target,
  Star,
  Quote,
  History,
  TrendingUp,
  UserCheck,
  Shirt,
  Droplets,
  Activity,
  HeartPulse,
  Volume2,
  VolumeX,
  Menu,
  X as CloseIcon,
  LogOut,
  Calendar,
  Users,
  Dumbbell,
  Crown,
  Baby,
  Microscope,
  Medal,
  Briefcase,
  Link,
  PlayCircle,
  CheckCheck,
  CreditCard
} from 'lucide-react';
import { BRAND, BENEFITS, MONTHLY_PACKAGES, QUARTERLY_PACKAGES, LOCATIONS, FAQS, TECH_COMPONENTS, IMS_PROTOCOL, GYM_VS_EMS, EMS_SOLUTIONS, NeoPackage, NeoFAQItem, TESTIMONIALS, Testimonial, EMS_MILESTONES, Milestone, EMS_STEPS, EMS_OBJECTIVES, BENEFIT_ARTICLES, PROGRAMS } from './constants';
import { supabase, Profile } from './lib/supabase';
import { AuthModal } from './components/Auth/AuthModal';
import { Session } from '@supabase/supabase-js';
import { StepForm } from './components/Forms/StepForm';
import { FORM_CONFIGS } from './components/Forms/formConfig';

// --- Components ---

// --- Advanced Animations ---
const StaggeredText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 }); // Use a local observer for text to ensure it triggers correctly

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="inline-block mr-[0.2em] whitespace-nowrap overflow-hidden align-bottom">
          <span
            className={`inline-block transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.3,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}
            style={{ transitionDelay: `${delay + wIdx * 80}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

const MagneticButton: React.FC<{ children: React.ReactNode; href: string; className?: string }> = ({ children, href, className = "" }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </a>
  );
};

// --- Shared Observer Logic ---
const observerCallbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>();

const sharedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const cb = observerCallbacks.get(entry.target);
    if (cb) cb(entry);
  });
}, { threshold: 0.1, rootMargin: '50px' });

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Callback that handles the intersection logic
    const handleIntersect = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, we don't need to observe it anymore for this simple reveal effect
        sharedObserver.unobserve(element);
        observerCallbacks.delete(element);
      }
    };

    observerCallbacks.set(element, handleIntersect);
    sharedObserver.observe(element);

    return () => {
      observerCallbacks.delete(element);
      sharedObserver.unobserve(element);
    };
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal will-change-scroll ${isVisible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- Interactive Stats Components (moved into ObjectivesWithSlider) ---

const AnimatedCounter: React.FC<{ value: number; duration?: number; suffix?: string; delay?: number }> = ({ value, duration = 2000, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleIntersect = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        sharedObserver.unobserve(element);
        observerCallbacks.delete(element);
      }
    };

    observerCallbacks.set(element, handleIntersect);
    sharedObserver.observe(element);

    return () => {
      observerCallbacks.delete(element);
      sharedObserver.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now() + delay;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      const currentCount = Math.floor(easedProgress * value);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AmbientAudio: React.FC<{ isMuted: boolean }> = ({ isMuted }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Listen for first user interaction to enable audio
  useEffect(() => {
    const enableAudio = () => {
      setHasInteracted(true);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('scroll', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('scroll', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('scroll', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  // Audio management logic
  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    const audio = audioRef.current;
    let fadeInterval: NodeJS.Timeout;

    if (!isMuted) {
      audio.volume = 0;
      audio.play().catch(e => console.log("Audio play error:", e));

      fadeInterval = setInterval(() => {
        if (audio.volume < 0.23) {
          audio.volume = Math.min(0.25, audio.volume + 0.02);
        } else {
          audio.volume = 0.25;
          clearInterval(fadeInterval);
        }
      }, 50);
    } else {
      fadeInterval = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 30);
    }

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, [isMuted, hasInteracted]);

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/ambient.mp3" type="audio/mpeg" />
    </audio>
  );
};

// --- Benefits Video Background Component ---
const BenefitsVideoBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-40 grayscale-[20%] contrast-[1.2] brightness-75 mix-blend-overlay scale-[2]">
        <iframe
          src="https://www.youtube.com/embed/KjbuMF4nE80?autoplay=1&mute=1&controls=0&loop=1&playlist=KjbuMF4nE80&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          className="w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="NeoBoost Benefits"
        />
      </div>
      {/* VIGNETTE FADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-10 opacity-90"></div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
    </div>
  );
};

// --- Biohack Video Background Component ---
const BiohackVideoBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-40 grayscale-[20%] contrast-[1.1] brightness-75 mix-blend-screen scale-[2]">
        <iframe
          src="https://www.youtube.com/embed/LRdKs1NpS5g?autoplay=1&mute=1&controls=0&loop=1&playlist=LRdKs1NpS5g&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          className="w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="NeoBoost Biohack"
        />
      </div>
      {/* VIGNETTE FADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
      <div className="absolute inset-0 bg-black/70 z-10"></div>
    </div>
  );
};

// --- Technology Video Background Component ---
const TechnologyVideoBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-40 grayscale-[20%] contrast-[1.1] brightness-75 mix-blend-screen scale-[1.3]">
        <iframe
          src="https://www.youtube.com/embed/HNrYC60KFRc?autoplay=1&mute=1&controls=0&loop=1&playlist=HNrYC60KFRc&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          className="w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="NeoBoost Technology"
        />
      </div>
      {/* VIGNETTE FADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
      <div className="absolute inset-0 bg-black/70 z-10"></div>
    </div>
  );
};

// --- Programs Video Background Component ---
const ProgramsVideoBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-50 grayscale-[10%] contrast-[1.1] brightness-90 mix-blend-screen scale-[2.4]">
        <iframe
          src="https://www.youtube.com/embed/AQrpSZ4viVA?autoplay=1&mute=1&controls=0&loop=1&playlist=AQrpSZ4viVA&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          className="w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="NeoBoost Programs"
        />
      </div>
      {/* VIGNETTE FADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
    </div>
  );
};

// --- Benefit Articles Section ---
const BenefitArticlesSection: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`py-20 bg-black relative z-10 ${className}`}>
      <div className="container mx-auto px-6 md:px-24">
        <ScrollReveal>
          <div className="text-center mb-24">
            <p className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-bold uppercase mb-4">Science & Solutions</p>
            <h2 className="text-4xl md:text-5xl font-black impact-font text-white uppercase">
              Explicații <span className="text-[#00F5FF]">Științifice</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-32">
          {BENEFIT_ARTICLES.map((article, idx) => (
            <div key={article.id} id={article.id} className="scroll-mt-40">
              <ScrollReveal delay={idx * 100}>
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 border-t border-white/10 pt-16">
                  {/* Header Column */}
                  <div className="lg:sticky top-40 self-start">
                    <h3 className="text-4xl md:text-5xl font-black impact-font text-white mb-2 uppercase">{article.title}</h3>
                    <p className="text-[#00F5FF] mono-font text-xs font-bold tracking-widest uppercase mb-6">{article.subtitle}</p>
                    <div className="text-white/40 text-sm leading-relaxed font-light">
                      {article.intro}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="space-y-12">
                    {/* Mechanisms */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {article.mechanisms.map((mech, mIdx) => (
                        <div key={mIdx} className="bg-white/[0.02] border border-white/5 p-6 hover:border-[#00F5FF]/20 transition-colors duration-500">
                          <h4 className="text-white font-bold impact-font uppercase mb-3 text-lg">{mech.title}</h4>
                          <p className="text-white/50 text-xs leading-relaxed">{mech.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Science & Expectations */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Activity size={16} className="text-[#00F5FF]" />
                          <h4 className="font-bold text-white uppercase text-sm tracking-wider">Ce spune știința</h4>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed pl-7 border-l border-[#00F5FF]/20">{article.science}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Target size={16} className="text-[#00F5FF]" />
                          <h4 className="font-bold text-white uppercase text-sm tracking-wider">Așteptări Corecte</h4>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed pl-7 border-l border-[#00F5FF]/20">{article.expectations}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Science Page Component ---
const SciencePage: React.FC<{ onBack: () => void; initialArticleId?: string | null }> = ({ onBack, initialArticleId }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialArticleId) {
      setTimeout(() => {
        const element = document.getElementById(initialArticleId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [initialArticleId]);

  return (
    <div className="min-h-screen bg-black text-white relative z-50">
      {/* Fixed Navigation Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-[#00F5FF] transition-colors text-[10px] md:text-sm font-black uppercase tracking-widest"
          >
            <ChevronDown size={16} className="rotate-90" />
            ÎNAPOI
          </button>
        </div>
        <div className="mono-font text-[#00F5FF] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
          SCIENCE ZONE
        </div>
      </div>

      <div className="pt-20">
        <BenefitArticlesSection className="!bg-transparent" />
      </div>

      {/* Footer minimal for this page */}
      <div className="py-10 border-t border-white/10 text-center">
        <p className="text-white/30 text-xs">© 2024 NeoBoost Oradea. Science & Research.</p>
      </div>
    </div>
  );
};



// --- EMS Protocol Subsection ---
const EMSProtocolSubsection = () => {
  return (
    <div className="mt-40 md:mt-60">
      <ScrollReveal>
        <div className="flex items-center gap-6 mb-8">
          <TrendingUp className="text-[#00F5FF]" size={20} />
          <span className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-black uppercase">Standard de Performanță</span>
        </div>
        <div className="text-6xl md:text-8xl font-black impact-font text-white mb-24">
          <StaggeredText text="CUM FUNCȚIONEAZĂ" className="block" />
          <StaggeredText text="PROTOCOLUL EMS." className="block text-[#00F5FF]" delay={200} />
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-32 items-start">
        {/* Steps Column */}
        <div className="space-y-12">
          {EMS_STEPS.map((step, idx) => (
            <ScrollReveal key={step.id} delay={idx * 150}>
              <div className="flex gap-10 group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-[#00F5FF]/40 group-hover:bg-[#00F5FF]/5 transition-all duration-500">
                    <span className="impact-font text-xl text-[#00F5FF]">{step.id}</span>
                  </div>
                  {idx !== EMS_STEPS.length - 1 && <div className="w-px h-full bg-gradient-to-b from-[#00F5FF]/20 to-transparent my-4"></div>}
                </div>
                <div className="pt-2">
                  <h3 className="text-3xl font-black impact-font text-white mb-4 group-hover:text-[#00F5FF] transition-colors">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Objectives Column with Interactive Slider */}
        <ObjectivesWithSlider />
      </div>
    </div>
  );
};

// --- Objectives with Session Slider ---
const ObjectivesWithSlider = () => {
  const [sessions, setSessions] = useState(2);

  // Beneficii bazate pe EMS_OBJECTIVES cu scalare în funcție de ședințe
  const objectives = [
    { title: "Slăbire & Metabolism", base: 40, max: 95, icon: <Zap size={16} /> },
    { title: "Tonifiere Musculară", base: 35, max: 90, icon: <Target size={16} /> },
    { title: "Sănătatea Coloanei", base: 30, max: 85, icon: <UserCheck size={16} /> },
    { title: "Performanță Atletică", base: 25, max: 80, icon: <TrendingUp size={16} /> },
    { title: "Reducere Dureri Spate", base: 35, max: 88, icon: <HeartPulse size={16} /> },
    { title: "Recuperare Medicală", base: 20, max: 75, icon: <Activity size={16} /> }
  ];

  const getScaledValue = (base: number, max: number) => {
    const multipliers = { 1: 0.35, 2: 0.7, 3: 1 };
    const multiplier = multipliers[sessions as keyof typeof multipliers];
    return Math.round(base + (max - base) * multiplier);
  };

  const sessionLabels = {
    1: { title: "MENȚINERE", color: "text-white/50" },
    2: { title: "OPTIMAL", color: "text-[#00F5FF]" },
    3: { title: "INTENSIV", color: "text-[#00F5FF]" }
  };

  const currentLabel = sessionLabels[sessions as keyof typeof sessionLabels];

  return (
    <div className="sticky top-40 glass p-8 md:p-12">
      {/* Header */}
      <div className="mb-8">
        <h4 className="text-2xl font-black impact-font text-white mb-2">OBIECTIVE ȘI REZULTATE</h4>
        <p className="text-sm text-white/30 font-light italic">Ajustează intensitatea pentru a vedea impactul.</p>
      </div>

      {/* Session Slider */}
      <div className="mb-10 p-6 glass-dark">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="mono-font text-[8px] text-white/30 uppercase tracking-widest mb-1">Ședințe / Săptămână</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black impact-font text-[#00F5FF]">{sessions}</span>
              <span className="mono-font text-[10px] text-white/20">× 30 min</span>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xl font-black impact-font ${currentLabel.color}`}>{currentLabel.title}</p>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative py-4">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full">
            <div
              className="h-full bg-[#00F5FF] shadow-[0_0_15px_#00F5FF] rounded-full transition-all duration-500"
              style={{ width: `${((sessions - 1) / 2) * 100}%` }}
            />
          </div>

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setSessions(step)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-[9px] font-black ${sessions >= step
                  ? 'bg-[#00F5FF] border-[#00F5FF] text-black shadow-[0_0_15px_rgba(0,255,136,0.5)]'
                  : 'bg-black border-white/20 text-white/30 hover:border-white/40'
                  }`}
              >
                {step}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={sessions}
            onChange={(e) => setSessions(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Dynamic Objectives */}
      <div className="space-y-6">
        {objectives.map((obj, idx) => {
          const scaledValue = getScaledValue(obj.base, obj.max);
          return (
            <div key={idx} className="group/item transition-all duration-500 hover:translate-x-1">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-[#00F5FF] group-hover/item:scale-110 transition-transform duration-300">{obj.icon}</div>
                  <span className="mono-font text-[9px] uppercase tracking-widest text-white/60 font-bold group-hover/item:text-[#00F5FF] transition-colors">{obj.title}</span>
                </div>
                <span className="mono-font text-[10px] text-[#00F5FF] font-black transition-all duration-500">
                  {scaledValue}%
                </span>
              </div>
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00F5FF]/40 to-[#00F5FF] transition-all duration-700 ease-out"
                  style={{ width: `${scaledValue}%`, boxShadow: '0 0 8px rgba(0,255,136,0.3)' }}
                />
                <div
                  className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-fast"
                  style={{ animationDelay: `${idx * 0.3}s` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-10 pt-6 border-t border-white/5">
        <div className="flex gap-3 items-center mb-4">
          <Zap size={12} className="text-[#00F5FF]" />
          <p className="text-[9px] mono-font text-white/30 uppercase tracking-widest font-bold">Protocol NeoBoost Oradea</p>
        </div>
        <p className="text-[10px] text-white/20 leading-relaxed italic">
          *Rezultatele cu {sessions} {sessions === 1 ? 'ședință' : 'ședințe'}/săpt. Vizibile în 4-8 săptămâni.
        </p>
      </div>
    </div>
  );
};

// --- EMSTimeline Component ---
// --- Evolution Video Background Component ---
const EvolutionVideoBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-60 grayscale-[5%] brightness-100 contrast-[1.1] scale-[2.4]">
      <iframe
        src="https://www.youtube.com/embed/dHSf8UHlfYo?autoplay=1&mute=1&controls=0&loop=1&playlist=dHSf8UHlfYo&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
        className="w-full h-full pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="NeoBoost Evolution"
      />
    </div>
    {/* VIGNETTE FADE - Stronger to hide edges */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
    <div className="absolute inset-0 bg-black/40 z-10"></div>
  </div>
);

// --- History Video Background Component ---
const HistoryVideoBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-50 grayscale-[10%] brightness-90 contrast-[1.1] scale-[1.5]">
      <iframe
        src="https://www.youtube.com/embed/gihuF94qjWA?autoplay=1&mute=1&controls=0&loop=1&playlist=gihuF94qjWA&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
        className="w-full h-full pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="NeoBoost EMS History"
      />
    </div>
    {/* VIGNETTE FADE */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
    <div className="absolute inset-0 bg-black/60 z-10"></div>
  </div>
);

const EMSTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="istoric" className="py-32 md:py-60 bg-[#050505] relative z-10 overflow-hidden">
      <HistoryVideoBackground />
      <div className="container mx-auto px-6 md:px-24">
        <ScrollReveal className="mb-24">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-12 h-px bg-[#00F5FF]"></div>
            <span className="mono-font text-[9px] text-[#00F5FF] font-black tracking-[0.6em] uppercase">Evoluție Tehnologică</span>
          </div>
          <div className="text-7xl md:text-[12vw] font-black impact-font text-white leading-[0.7] tracking-tighter">
            <StaggeredText text="EMS." className="block" />
            <StaggeredText text="ISTORIC." className="block text-[#00F5FF]" delay={200} />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Milestone Selection (Years) */}
          <div className="lg:col-span-4 space-y-4">
            {EMS_MILESTONES.map((m, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`group cursor-pointer flex items-center gap-6 p-6 transition-all duration-500 border-l-2 ${activeIndex === idx ? 'border-[#00F5FF] bg-white/[0.03]' : 'border-white/5 hover:border-white/20'}`}
              >
                <span className={`mono-font text-xl font-black transition-all duration-500 ${activeIndex === idx ? 'text-[#00F5FF] scale-110 translate-x-2' : 'text-white/20 group-hover:text-white/40'}`}>
                  {m.year}
                </span>
                <span className={`impact-font text-2xl tracking-wide uppercase transition-all duration-500 ${activeIndex === idx ? 'text-white opacity-100' : 'text-white/20 group-hover:text-white/40'}`}>
                  {m.title}
                </span>
              </div>
            ))}
          </div>

          {/* Active Milestone Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative p-12 md:p-20 glass overflow-hidden group min-h-[400px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 text-white/[0.02] scale-[2] pointer-events-none">
                {EMS_MILESTONES[activeIndex].icon}
              </div>

              <div className="relative z-10">
                <div className={`w-16 h-16 flex items-center justify-center mb-10 transition-all duration-700 border border-white/10 ${EMS_MILESTONES[activeIndex].isNeo ? 'bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_50px_rgba(0,245,255,0.2)] border-[#00F5FF]/30' : 'bg-transparent text-white/40'}`}>
                  {EMS_MILESTONES[activeIndex].icon}
                </div>

                <h3 className="text-5xl md:text-7xl font-black impact-font text-white mb-8 transition-all duration-700">
                  {EMS_MILESTONES[activeIndex].title}
                </h3>

                <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed max-w-2xl transition-all duration-700">
                  {EMS_MILESTONES[activeIndex].description}
                </p>

                {EMS_MILESTONES[activeIndex].isNeo && (
                  <div className="mt-12 inline-flex items-center gap-3 px-6 py-2 border border-[#00F5FF]/20 bg-[#00F5FF]/5 rounded-full">
                    <Zap size={14} className="text-[#00F5FF] animate-pulse" />
                    <span className="mono-font text-[10px] text-[#00F5FF] uppercase tracking-widest font-black">Tehnologie activă în prezent</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- EMSEducation Component ---
const EMSEducation = () => {
  return (
    <section className="py-32 md:py-60 bg-[#080808] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">

        {/* Evolution Section */}
        <ScrollReveal className="mb-40">
          <div className="flex items-center gap-6 mb-8">
            <History className="text-[#00F5FF]" size={20} />
            <span className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-black uppercase">Context & Istoric</span>
          </div>
          <div className="text-6xl md:text-8xl font-black impact-font text-white mb-20 leading-[0.8] uppercase">
            <StaggeredText text="Evoluția" className="inline-block mr-4" />
            <StaggeredText text="EMS." className="inline-block text-[#00F5FF]" delay={200} />
            <span className="text-white/30 text-4xl md:text-5xl tracking-normal normal-case font-light block mt-6">De unde a început și de ce contează azi.</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stage 1 */}
            <div className="glass-block p-10 hover:border-[#00F5FF]/30 transition-all duration-500 group">
              <span className="impact-font text-6xl text-white/5 group-hover:text-[#00F5FF]/20 transition-colors mb-6 block">01</span>
              <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Recuperare & <br />Reabilitare</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                Rădăcinile EMS sunt medicale. Creat pentru a activa musculatura când contracția voluntară era slabă.
              </p>
              <ul className="space-y-2 text-[10px] mono-font text-white/30 uppercase tracking-wider">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Activare musculară</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Menținere tonus</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Reeducare neuromotorie</li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="glass-block p-10 hover:border-[#00F5FF]/30 transition-all duration-500 group">
              <span className="impact-font text-6xl text-white/5 group-hover:text-[#00F5FF]/20 transition-colors mb-6 block">02</span>
              <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Performanță <br />Sportivă</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                Adoptat de atleți pentru recrutare musculară superioară și antrenament fără stress articular.
              </p>
              <ul className="space-y-2 text-[10px] mono-font text-white/30 uppercase tracking-wider">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Recrutare 90%+</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Recuperare activă</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#00F5FF]"></div> Control & Eficiență</li>
              </ul>
            </div>

            {/* Stage 3 */}
            <div className="glass-block border-[#00F5FF]/20 p-10 relative overflow-hidden group shadow-[0_0_30px_rgba(0,245,255,0.05)]">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={40} className="text-[#00F5FF]" /></div>
              <span className="impact-font text-6xl text-[#00F5FF]/40 mb-6 block">03</span>
              <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Fitness Modern <br />& Eficiență</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                Soluția pentru oamenii ocupați care vor rezultate structurate, fără "încercări la întâmplare".
              </p>
              <ul className="space-y-2 text-[10px] mono-font text-[#00F5FF] uppercase tracking-wider font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Timp optimizat</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Structură & Ghidaj</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Mediu Sigur Exclusiv</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Differentiation Section */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-px bg-[#00F5FF]"></div>
                <span className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-black uppercase">NeoBoost Difference</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black impact-font text-white mb-10 leading-[0.85]">
                TRANSFORMARE<br />
                PRIN ACȚIUNI<br />
                <span className="text-[#00F5FF]">PERSONALIZATE.</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                La NeoBoost, EMS nu e despre a împinge corpul la limită, ci despre a construi o transformare sustenabilă, într-un cadru de siguranță totală.
              </p>

              <div className="space-y-8 border-l border-white/10 pl-8">
                <div>
                  <h4 className="text-white font-bold impact-font text-xl uppercase mb-2 text-[#00F5FF]">Costumul = Interfața</h4>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    Fiecare costum este calea prin care semnalul ajunge în corp. Ajustarea lui nu este un detaliu logistic, ci baza personalizării pentru structura ta corporală.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold impact-font text-xl uppercase mb-2 text-[#00F5FF]">Personalizare Reală</h4>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    Nu doar intensitate. Configurăm frecvența, profunzimea stimulării și parametrii pe grupe musculare. Două persoane pot face "același antrenament" cu setări complet diferite.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#00F5FF]/5 blur-3xl rounded-full opacity-20"></div>
              <div className="relative glass-block p-10 md:p-14">
                <div className="mb-10">
                  <Quote className="text-[#00F5FF] mb-6" size={40} />
                  <h3 className="text-2xl md:text-3xl font-bold impact-font text-white uppercase leading-tight mb-6">
                    "Noi nu urmărim să fie greu. Urmărim să fie corect pentru tine."
                  </h3>
                  <div className="h-px w-20 bg-[#00F5FF] opacity-50"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] flex-shrink-0 bg-[#00F5FF]/5">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h5 className="text-white font-bold impact-font uppercase mb-1">Expertiză</h5>
                      <p className="text-white/30 text-xs leading-relaxed">Specialiști cu studii în electroterapie și kinetoterapie.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] flex-shrink-0 bg-[#00F5FF]/5">
                      <Target size={20} />
                    </div>
                    <div>
                      <h5 className="text-white font-bold impact-font uppercase mb-1">Evaluare</h5>
                      <p className="text-white/30 text-xs leading-relaxed">Evaluare de 5-7 minute înainte de prima sesiune pentru calibrare.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

// --- Immersive Morph Hero ---
const ImmersiveHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black py-20">

      {/* Background Visual */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full">
            <iframe
              src="https://www.youtube.com/embed/h6UWL9F-m8g?autoplay=1&mute=1&controls=0&loop=1&playlist=h6UWL9F-m8g&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
              className="w-full h-full opacity-65 grayscale-[20%] scale-[2.2] pointer-events-none"
              style={{ filter: 'brightness(0.7) contrast(1.1)' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="NeoBoost Hero"
            />
          </div>
        </div>
        {/* VIGNETTE FADE */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10 opacity-90"></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Brand Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#00F5FF]/10 electric-glow pointer-events-none blur-3xl opacity-50"></div>
          <h1 className="text-[16vw] md:text-[10vw] font-black impact-font leading-[0.85] tracking-tighter select-none text-white uppercase relative z-10 px-4 heading-glow glitch-hover">
            NEOBOOST
          </h1>
        </div>

        {/* Headline & Subheadline */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Antrenament EMS Premium în Oradea
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed readable-text">
            Slăbire, tonus muscular și postură mai bună în doar <span className="text-[#00F5FF] font-semibold">30 de minute pe săptămână</span>.
          </p>
        </div>

        {/* 2 CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <MagneticButton
            href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez o probă gratuită EMS.`}
            className="bg-[#00F5FF] text-black px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-black impact-font tracking-tight hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:shadow-[0_0_50px_rgba(0,245,255,0.7)] active:scale-95 inline-flex items-center gap-3"
          >
            <MessageCircle size={22} />
            PROBĂ GRATUITĂ
          </MagneticButton>

          <a
            href="#abonamente"
            className="border-2 border-white/30 text-white px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold impact-font tracking-tight hover:bg-white/10 hover:border-white/50 transition-all inline-flex items-center gap-3"
          >
            <Zap size={20} />
            VEZI ABONAMENTE
          </a>
        </div>

        {/* Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/60 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span><strong className="text-white">4.9</strong> pe Google</span>
          </div>
          <div className="w-px h-5 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#00F5FF]" />
            <span><strong className="text-white">500+</strong> clienți activi</span>
          </div>
          <div className="w-px h-5 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#00F5FF]" />
            <span><strong className="text-white">3000+</strong> ședințe EMS</span>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <ArrowDown size={20} className="text-[#00F5FF]" />
      </div>
    </div>
  );
};

// --- FAQ Item ---
const FAQItem: React.FC<{ item: NeoFAQItem; i: number }> = ({ item, i }) => {
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
      className={`relative border-b border-white/5 bg-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'glass-block border-white/10 px-6 md:px-10 my-4' : 'hover:bg-white/[0.01]'}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={() => setIsExpanded(true)}
      onTouchEnd={() => setIsExpanded(false)}
    >
      <div className={`transition-all duration-700 ${isExpanded ? 'py-10' : 'py-5'} flex items-center gap-8 cursor-default`}>
        <div className={`transition-all duration-700 ${isExpanded ? 'text-[#00F5FF] scale-125' : 'text-white/10 scale-90'}`}>
          {item.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className={`text-base md:text-lg font-bold impact-font tracking-wide transition-all duration-500 ${isExpanded ? 'text-white' : 'text-white/30'}`}>
              {item.question}
            </h3>
            <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100 rotate-180' : 'opacity-0'}`}>
              <ChevronDown size={18} className="text-[#00F5FF]" />
            </div>
          </div>
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded ? 'max-h-[300px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <p className="text-white/50 font-light leading-relaxed text-sm md:text-base border-l border-[#00F5FF]/20 pl-6 py-2">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Package Card ---
const PackageCard: React.FC<{ pkg: NeoPackage; i: number; user: any; onOpenAuth: () => void; onCheckout: (pkg: NeoPackage) => void }> = ({ pkg, i, user, onOpenAuth, onCheckout }) => {
  return (
    <ScrollReveal delay={i * 100}>
      <div className={`group relative p-8 md:p-12 border transition-all duration-700 h-full flex flex-col justify-between overflow-hidden cursor-default ${pkg.isPremium ? 'bg-black text-white shadow-2xl border-[#00F5FF]/50 shadow-[#00F5FF]/10' : 'bg-[#0a0a0a] text-white border-white/5 hover:border-[#00F5FF]/30'}`}>

        {/* Animated Background Element */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        {/* Recomandat Badge */}
        {pkg.isRecommended && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#00F5FF] text-black text-[9px] font-black uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)] z-20">
            ⭐ FAVORIT
          </div>
        )}

        <div className="absolute -top-12 -left-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 pointer-events-none text-[#00F5FF]">
          <span className="text-[280px] font-black impact-font leading-none">{pkg.sessionCount}</span>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <span className="mono-font text-[9px] font-bold text-[#00F5FF]/40 uppercase tracking-[0.4em]">{pkg.duration}</span>
            <div className="text-right">
              <span className="block text-5xl font-black impact-font text-[#00F5FF] leading-none text-glow">{pkg.sessionCount}</span>
              <span className="text-[8px] mono-font opacity-40 uppercase font-bold tracking-widest block mt-1">Ședințe</span>
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-black impact-font mb-6 transition-colors group-hover:text-[#00F5FF] leading-none uppercase">{pkg.title}</h3>

          {/* Ideal For Label */}
          {pkg.idealFor && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider mb-8 bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20`}>
              <Target size={12} />
              {pkg.idealFor}
            </div>
          )}

          <div className="space-y-4 mb-12">
            {pkg.features.map((f, idx) => (
              <div key={idx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/60">
                <CheckCheck size={14} className="text-[#00F5FF]" /> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-8 flex flex-col gap-4 border-t border-white/5">
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black impact-font text-white">{pkg.price}</span>
              <span className="mono-font text-[10px] text-[#00F5FF] font-black tracking-widest">LEI</span>
            </div>
            {pkg.pricePerSession && (
              <p className="mono-font text-[11px] mt-2 text-white/30 italic">
                ≈ {pkg.pricePerSession} lei / ședință
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onCheckout(pkg)}
              className="group/btn relative flex items-center justify-between p-5 bg-[#00F5FF] text-black overflow-hidden transition-all duration-500 shadow-[0_0_25px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] glitch-hover"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10 text-[11px] font-black tracking-[0.2em] uppercase">
                CUMPĂRĂ ACUM
              </span>
              <CreditCard size={20} className="relative z-10" />
            </button>

            <a
              href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să programez pachetul ${pkg.title}.`}
              target="_blank"
              className="flex items-center justify-between p-5 border border-white/10 text-white/50 hover:text-white hover:border-[#00F5FF]/50 transition-all duration-500"
            >
              <span className="text-[11px] font-black tracking-[0.2em] uppercase">CONTACT WHATSAPP</span>
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

// --- Testimonial Card ---
const TestimonialCard: React.FC<{ testimonial: Testimonial; i: number }> = ({ testimonial, i }) => {
  return (
    <ScrollReveal delay={i * 100}>
      <a
        href={testimonial.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative p-10 glass transition-all duration-700 hover:glass-neon h-full flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 text-white/[0.02] pointer-events-none group-hover:text-[#00F5FF]/[0.05] transition-colors duration-700">
          <Quote size={80} />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex gap-1">
            {[...Array(testimonial.rating)].map((_, idx) => (
              <Star key={idx} size={10} className="fill-[#00F5FF] text-[#00F5FF]" />
            ))}
          </div>
          <div className="flex items-center gap-2 text-[8px] mono-font text-white/20 uppercase tracking-widest font-bold">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" alt="Google" className="w-3 h-3 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" loading="lazy" decoding="async" />
            Verified Review
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-lg md:text-xl font-light text-white/50 leading-relaxed mb-12 italic group-hover:text-white/80 transition-colors duration-700">
            "{testimonial.quote}"
          </p>
        </div>

        <div className="relative z-10 border-t border-white/5 pt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#00F5FF]/20 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
            <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div>
            <h4 className="text-white font-bold impact-font text-xl group-hover:text-[#00F5FF] transition-colors">{testimonial.name.toUpperCase()}</h4>
            <p className="mono-font text-[9px] text-white/20 uppercase tracking-widest mt-1">{testimonial.role}</p>
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
};


// --- Program Modal ---
const ProgramModal: React.FC<{ program: typeof PROGRAMS[0] | null; onClose: () => void }> = ({ program, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    setIsApplying(false);
    if (program) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [program]);

  if (!program) return null;

  const formConfig = FORM_CONFIGS[program.id];

  if (isApplying && formConfig) {
    return <StepForm config={formConfig} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-10 overscroll-contain">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl h-[100dvh] md:h-auto md:max-h-[90vh] bg-[#0a0a0a] border-x md:border border-[#00F5FF]/20 shadow-[0_0_50px_rgba(0,245,255,0.1)] md:rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
          <h3 className="impact-font text-2xl text-white uppercase">{program.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto font-sans text-white/80 leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
          {program.image && (
            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
            </div>
          )}
          <div className="p-6 md:p-10 prose prose-invert max-w-none">
            {program.content.replace(/\[WHATSAPP_LINK\]/g, "").replace(/\[LINK FORMULAR\]/g, "")}
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-black/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-xs text-white/40 hidden md:block">
            *Locurile sunt limitate.
          </div>
          {formConfig ? (
            <button
              onClick={() => setIsApplying(true)}
              className="w-full md:w-auto bg-[#00F5FF] text-black px-8 py-3 font-black impact-font uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.2)]"
            >
              <MessageCircle size={18} />
              Aplică Acum
            </button>
          ) : (
            <a
              href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Vreau să mă înscriu în programul ${program.title}.`}
              target="_blank"
              className="w-full md:w-auto bg-[#00F5FF] text-black px-8 py-3 font-black impact-font uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Aplică Acum
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Programs Grid Section ---
const ProgramsSection = () => {
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS[0] | null>(null);

  const getIcon = (iconId: string) => {
    switch (iconId) {
      case 'zap': return <Zap size={80} className="text-white" />;
      case 'baby': return <Baby size={80} className="text-white" />;
      case 'users': return <Users size={80} className="text-white" />;
      case 'muscle': return <Dumbbell size={80} className="text-white" />;
      case 'calendar': return <Calendar size={80} className="text-white" />;
      case 'target': return <Target size={80} className="text-white" />;
      case 'crown': return <Crown size={80} className="text-white" />;
      default: return <Zap size={80} className="text-white" />;
    }
  };

  return (
    <section id="programe" className="py-32 md:py-60 bg-[#050505] relative z-20 border-t border-white/5 overflow-hidden">
      <ProgramsVideoBackground />
      <div className="container mx-auto px-6 md:px-24">
        <ScrollReveal>
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Target className="text-[#00F5FF]" size={20} />
                <span className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-black uppercase">Start Your Journey</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black impact-font text-white uppercase leading-[0.8] heading-glow">
                PROGRAME <br /><span className="text-transparent" style={{ WebkitTextStroke: '2px #00F5FF' }}>ACTIVE.</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-right text-sm font-light leading-relaxed hidden md:block readable-text">
              Alege programul care se potrivește obiectivelor tale. Fie că vrei slăbire, tonifiere sau performanță, avem o structură dedicată.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, i) => (
            <ScrollReveal key={prog.id} delay={i * 100}>
              <div
                onClick={() => setSelectedProgram(prog)}
                className="group relative h-full bg-[#0a0a0a] border border-white/5 hover:border-[#00F5FF]/40 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col rounded-3xl"
              >
                {/* Image Placeholder area */}
                <div className="relative h-60 overflow-hidden bg-white/5">
                  <div className={`absolute top-4 left-4 z-10 ${prog.tagColor || 'bg-[#00F5FF]'} text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm`}>
                    {prog.tag}
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 rounded-sm">
                    {prog.duration}
                  </div>

                  {/* We use a gradient overlay instead of image if image fails or just as style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:text-[#00F5FF] transition-all duration-700">
                    {getIcon(prog.iconId || 'zap')}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 relative z-10 -mt-10 bg-gradient-to-b from-transparent to-[#0a0a0a]">
                  <div className="mb-4">
                    <span className="text-[9px] text-[#00F5FF] font-bold uppercase tracking-wider block mb-1">
                      Ideal: {prog.idealFor}
                    </span>
                    <h3 className="text-3xl font-black impact-font text-white mb-2 group-hover:text-[#00F5FF] transition-colors leading-none uppercase">
                      {prog.title}
                    </h3>
                  </div>

                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 border-l-2 border-[#00F5FF] pl-3">
                    {prog.subtitle}
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                    {prog.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div>
                      <span className="text-[8px] uppercase text-white/20 font-bold tracking-widest block mb-1">Beneficiu Principal</span>
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        {prog.benefit}
                      </span>
                    </div>

                    <button className="w-full py-3 bg-white/5 hover:bg-[#00F5FF] hover:text-black text-white text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded-sm group-hover:bg-[#00F5FF] group-hover:text-black glitch-hover">
                      VEZI DETALII <MoveUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
    </section>
  );
};

// --- Payment Success Modal ---
const PaymentSuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
      <div className="relative glass-block p-10 max-w-md text-center border-[#00F5FF] shadow-[0_0_50px_rgba(0,245,255,0.3)] rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F5FF]/10 to-transparent pointer-events-none rounded-2xl"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#00F5FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00F5FF] shadow-[0_0_30px_rgba(0,245,255,0.4)]">
            <CheckCheck size={40} />
          </div>
          <h2 className="text-3xl font-black impact-font text-white mb-4 uppercase">PLATA CONFIRMATĂ!</h2>
          <p className="text-white/60 mb-8 font-light leading-relaxed">Abonamentul tău a fost activat cu succes. Vei primi factura și confirmarea pe email.</p>
          <button onClick={onClose} className="bg-[#00F5FF] text-black px-8 py-3 font-bold impact-font tracking-widest uppercase hover:scale-105 transition-transform shadow-lg w-full rounded">
            ÎNȚELES
          </button>
        </div>
      </div>
    </div>
  );
}

const Navbar = ({ isMuted, setIsMuted, user, onOpenAuth }: { isMuted: boolean; setIsMuted: (m: boolean) => void; user: any; onOpenAuth: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Pentru Cine', id: 'pentru-cine' },
    { label: 'Metodă', id: 'metoda' },
    { label: 'Programe', id: 'programe' },
    { label: 'Abonamente', id: 'abonamente' },
    { label: 'Locații', id: 'locatii' },
    { label: 'FAQ', id: 'faq' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${isScrolled || isMenuOpen ? 'py-4 glass-dark shadow-2xl' : 'py-8 md:py-10'}`}>
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo_white.png" alt="NeoBoost Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
            <span className="text-xl md:text-2xl font-black impact-font tracking-tighter text-white">{BRAND.name}</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mono-font text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-[#00F5FF] hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all duration-300"
              >
                {item.label}
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                <span className="text-white/40 text-xs text-right">
                  <div className="mono-font text-[8px] uppercase tracking-widest text-[#00F5FF]">Active</div>
                  <div className="font-bold">{user.email?.split('@')[0]}</div>
                </span>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00F5FF]/20 flex items-center justify-center transition-colors group"
                >
                  <LogOut className="text-white/60 group-hover:text-[#00F5FF]" size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="ml-6 px-6 py-2 border border-[#00F5FF]/30 flex items-center gap-2 text-[#00F5FF] hover:bg-[#00F5FF] hover:text-black transition-all duration-300 rounded font-bold uppercase text-xs tracking-widest"
              >
                <UserCheck size={14} />
                Contul Meu
              </button>
            )}

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="group flex items-center gap-3 px-4 py-2 glass hover:glass-neon transition-all duration-500"
              title={isMuted ? "Activează Sunetul" : "Dezactivează Sunetul"}
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                {isMuted ? (
                  <VolumeX size={14} className="text-white/20 group-hover:text-white/40" />
                ) : (
                  <>
                    <Volume2 size={14} className="text-[#00F5FF] animate-pulse" />
                    <span className="absolute -inset-1 border border-[#00F5FF]/20 rounded-full animate-ping"></span>
                  </>
                )}
              </div>
            </button>

            <a
              href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}`}
              className="bg-[#00F5FF] text-black px-8 py-3 text-xs font-black tracking-widest impact-font hover:brightness-110 shadow-lg hover:shadow-[#00F5FF]/20 transition-all transform hover:-translate-y-0.5"
            >
              PROBĂ GRATUITĂ
            </a>
          </div>

          {/* Mobile UI Buttons */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all ${!isMuted ? 'bg-[#00F5FF]/20 border-[#00F5FF]/40 text-[#00F5FF]' : 'bg-white/5 text-white/40'}`}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isMenuOpen ? 'text-[#00F5FF] bg-white/10' : 'text-white bg-white/5'}`}
            >
              {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#080808] z-[150] transition-all duration-500 flex flex-col pt-32 px-10 md:px-24 overflow-y-auto ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          {/* Menu Items */}
          <div className="flex flex-col gap-6 md:gap-8 mb-16">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="impact-font text-5xl md:text-7xl text-white uppercase tracking-tighter hover:text-[#00F5FF] transition-all block"
                style={{ transitionDelay: `${idx * 50}ms`, transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Footer Actions */}
          <div className="mt-auto pb-12 space-y-6">
            <div className="h-px w-full bg-white/10" />

            <div className="grid gap-4">
              {user ? (
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex flex-col">
                    <span className="mono-font text-[10px] text-[#00F5FF] uppercase tracking-widest font-bold">Autentificat ca</span>
                    <span className="text-xl font-bold text-white mt-1">{user.email?.split('@')[0]}</span>
                  </div>
                  <button onClick={() => { supabase.auth.signOut(); setIsMenuOpen(false); }} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
                  className="w-full py-5 bg-white/5 text-white font-black impact-font text-xl tracking-widest uppercase border border-white/10 hover:border-[#00F5FF]/40 hover:text-[#00F5FF] transition-all flex items-center justify-center gap-4 rounded-xl"
                >
                  <UserCheck size={20} />
                  CONTUL MEU
                </button>
              )}

              <a
                href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}`}
                className="w-full bg-[#00F5FF] text-black py-6 text-center impact-font text-2xl uppercase tracking-widest shadow-[0_0_40px_rgba(0,255,136,0.3)] rounded-xl"
              >
                PROBĂ GRATUITĂ
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// --- 3D Tilt Image Component ---
// --- Advanced Tech Displays ---

const PowerBoxLifestyle = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-full h-full scale-[1.05] transition-transform duration-700 group-hover:scale-[1.15]">
      <img
        src="/powerbox_lifestyle.png"
        alt="NeoBoost PowerBox & Dock"
        className="w-full h-full object-cover"
        style={{
          // Focused blend on the center geometry
          objectPosition: 'center center',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          filter: 'contrast(1.1) brightness(1.0)',
          imageRendering: 'auto'
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
);

// --- New Competitive Comparison Section ---
const ComparisonSection = () => (
  <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
    <EvolutionVideoBackground />
    <div className="container mx-auto px-6 md:px-24 relative z-10">
      <ScrollReveal>
        <div className="text-center mb-20 relative z-10">
          <p className="mono-font text-[9px] tracking-[0.4em] text-[#00F5FF]/60 uppercase mb-4">Tradiție vs Inovație</p>
          <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase heading-glow">
            EVOLUȚIA <span className="text-[#00F5FF]/80">FITNESS-ULUI</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-5xl mx-auto">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-[10px] md:text-xs mono-font uppercase tracking-widest text-white/30 border-b border-white/10 pb-4">
          <div className="pl-4">Criteriu</div>
          <div className="text-center">Sală Tradițională</div>
          <div className="text-center text-[#00F5FF]">NeoBoost System</div>
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {GYM_VS_EMS.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className="group grid grid-cols-3 gap-4 items-center p-6 glass-block transition-all duration-300 hover:border-[#00F5FF]/30 hover:shadow-[0_0_20px_rgba(0,255,136,0.05)]">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00F5FF] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-bold text-white text-sm md:text-lg">{item.feature}</span>
                </div>

                <div className="text-center text-white/40 font-light text-sm md:text-base line-through decoration-white/20 decoration-2">
                  {item.gym}
                </div>

                <div className="text-center font-black text-[#00F5FF] text-sm md:text-xl shadow-[#00F5FF]/20 drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                  {item.ems}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Callout */}
        <ScrollReveal delay={300}>
          <div className="mt-16 text-center">
            <p className="text-white/60 font-light italic text-lg mb-8">
              "De ce să pierzi 4 ore pe săptămână când poți obține rezultate mai bune în 30 de minute?"
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// --- Science & Solutions Section ---
const ScienceSolutionsSection = () => (
  <section className="py-32 bg-zinc-900 border-b border-white/5 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F5FF]/20 to-transparent"></div>
    <div className="container mx-auto px-6 md:px-24">
      <ScrollReveal>
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-1 bg-[#00F5FF]"></div>
            <span className="mono-font text-[#00F5FF] uppercase tracking-widest text-xs font-black">Probleme & Soluții</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black impact-font text-white mb-8 heading-glow">
            ȘTIINȚA DIN SPATELE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-cyan-600">REZULTATELOR.</span>
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            Nu este magie, este bio-inginerie. NeoBoost abordează corpul uman la nivel celular pentru a rezolva probleme specifice.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        {EMS_SOLUTIONS.map((sol, i) => (
          <ScrollReveal key={sol.id} delay={i * 100}>
            <div className="group relative bg-black border border-white/10 p-8 md:p-12 hover:border-[#00F5FF]/40 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 grayscale group-hover:grayscale-0">
                {sol.icon}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 text-[#00F5FF] group-hover:scale-110 transition-transform duration-500">
                  {sol.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-black impact-font text-white mb-4 group-hover:text-[#00F5FF] transition-colors">
                  {sol.title}
                </h3>

                <p className="text-white/70 font-medium mb-6 text-lg">
                  {sol.description}
                </p>

                <div className="pl-6 border-l-2 border-[#00F5FF]/30">
                  <p className="text-white/40 text-sm italic font-light">
                    "<span className="text-[#00F5FF]">Știința:</span> {sol.science}"
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// --- Trial Video Background Component ---
const TrialVideoBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full opacity-30 grayscale-[10%] brightness-50 contrast-[1.1] scale-[1.5]">
      <iframe
        src="https://www.youtube.com/embed/2yi5qIn9J7w?autoplay=1&mute=1&controls=0&loop=1&playlist=2yi5qIn9J7w&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
        className="w-full h-full pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="NeoBoost Trial Experience"
      />
    </div>
    {/* VIGNETTE / FADE OVERLAYS to hide edges */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-100"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90"></div>
    <div className="absolute inset-0 bg-black/35 z-10"></div>
  </div>
);

// --- Trial Roadmap Section ---
const TrialRoadmap = () => {
  const roadmap = [
    { step: "01", title: "Consiliere", desc: "Discutăm despre obiectivele tale și starea de sănătate.", icon: <UserCheck size={20} /> },
    { step: "02", title: "Echipare", desc: "Primești costumul Drysuit bio-optic pregătit special.", icon: <Shirt size={20} /> },
    { step: "03", title: "Activare", desc: "30 de minute de antrenament ghidat 1-la-1.", icon: <Zap size={20} /> },
    { step: "04", title: "Recuperare", desc: "Shake proteic și planificare pentru rezultate.", icon: <Droplets size={20} /> }
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      <TrialVideoBackground />
      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black impact-font text-white tracking-tight uppercase">EXPERIENȚA <span className="text-[#00F5FF]">PRIMEI VIZITE.</span></h2>
            <p className="text-white/40 mt-4 mono-font text-xs tracking-widest uppercase">Simplu, rapid, profesionist.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="relative p-6 sm:p-10 glass rounded-2xl group hover:neon-border transition-all duration-500">
                <div className="text-5xl font-black impact-font text-white/5 group-hover:text-[#00F5FF]/10 transition-colors mb-4">{item.step}</div>
                <div className="text-[#00F5FF] mb-6 transform group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-xl font-black impact-font text-white mb-2 uppercase">{item.title}</h3>
                <p className="text-sm text-white/30 font-light leading-relaxed">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 translate-y-1/2">
                    <ArrowDown className="-rotate-90 text-white/5" size={20} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sticky "20 Minute" Banner ---
const StickyBanner = () => (
  <div className="fixed bottom-0 left-0 w-full bg-[#00F5FF] text-black py-3 z-[90] overflow-hidden whitespace-nowrap border-t border-black/10 shadow-[0_-10px_40px_rgba(0,255,136,0.3)]">
    <div className="flex items-center justify-around gap-10 animate-marquee">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-10">
          <Zap size={14} className="fill-current" />
          <span className="impact-font text-sm md:text-base font-black tracking-widest uppercase">DOAR 30 MINUTE / MINIM 1 ȘEDINȚĂ SĂPTĂMÂNAL</span>
          <span className="mono-font text-[10px] font-bold opacity-40 uppercase tracking-widest px-4 border-x border-black/20">Opțiuni flexibile pentru rezultate accelerate</span>
        </div>
      ))}
    </div>
  </div>
);

const TabletFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-[95%] aspect-[4/3] mx-auto bg-[#1a1a1a] rounded-[2.5rem] p-4 shadow-2xl border-[8px] border-[#222] group-hover:scale-[1.02] transition-transform duration-700">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#333] rounded-b-xl"></div>
    <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative shadow-inner">
      {children}
      {/* Screen Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.01] pointer-events-none"></div>
    </div>
  </div>
);

const EMSAppUI = () => (
  <div className="w-full h-full flex flex-col p-6 font-sans select-none overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse"></div>
        <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase">ID-EMS OS v3.4.2</span>
      </div>
      <div className="flex items-center gap-6 text-[8px] text-white/20 font-bold uppercase tracking-wider">
        <span className="text-[#FF3300]">Active Boost</span>
        <span>Batt: 98%</span>
      </div>
    </div>

    {/* Body Displays */}
    <div className="flex-1 flex justify-around items-center">
      {/* Front Body */}
      <div className="relative h-full aspect-[1/2] opacity-80">
        <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full"></div>
        <svg viewBox="0 0 100 200" className="h-full w-full">
          <path d="M50 10 L60 25 L80 40 L85 80 L70 130 L75 190 M50 10 L40 25 L20 40 L15 80 L30 130 L25 190" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
          {/* Active Electrodes */}
          <circle cx="50" cy="40" r="3" fill="#FF3300" className="animate-pulse" />
          <circle cx="35" cy="70" r="4" fill="#FF3300" />
          <circle cx="65" cy="70" r="4" fill="#FF3300" />
          <circle cx="40" cy="110" r="5" fill="#FF3300" opacity="0.6" />
          <circle cx="60" cy="110" r="5" fill="#FF3300" opacity="0.6" />
        </svg>
      </div>

      {/* Stats Column */}
      <div className="w-32 hidden md:flex flex-col gap-4">
        {[85, 72, 90].map((val, i) => (
          <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="text-[6px] text-white/30 uppercase mb-1">Channel {i + 1}</div>
            <div className="text-sm font-bold text-white">{val}%</div>
            <div className="h-0.5 bg-white/10 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-[#00F5FF]" style={{ width: `${val}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Bar Controls */}
    <div className="flex gap-2 mt-8">
      {['Drying', 'Training', 'Recovery', 'Massage'].map((mode, i) => (
        <div key={mode} className={`flex-1 h-8 rounded border border-white/5 text-[6px] uppercase flex items-center justify-center font-bold tracking-tighter ${i === 1 ? 'bg-[#FF3300] text-white' : 'text-white/20'}`}>
          {mode}
        </div>
      ))}
    </div>
  </div>
);

const TabletReal = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-full h-full scale-[1.2] transition-transform duration-700 group-hover:scale-[1.3]">
      <img
        src="/tablet_combo.jpg"
        alt="NeoBoost Tablet Interface"
        className="w-full h-full object-cover"
        style={{
          // Focused blend on the tablet screen (bottom-center of the photo)
          objectPosition: '40% 60%',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          filter: 'contrast(1.1) brightness(1.0)',
          imageRendering: 'auto'
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
);

const DrysuitLifestyle = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-full h-full scale-[1.05] transition-transform duration-700 group-hover:scale-[1.1]">
      <img
        src="/studio_session_1.jpg"
        alt="NeoBoost Drysuit Action"
        className="w-full h-full object-cover"
        style={{
          // Show the athlete with NeoBoost on back more clearly
          objectPosition: 'center 30%',
          filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
          imageRendering: 'auto'
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
);

const TiltImage: React.FC<{ src: string; alt: string; isPowerBox?: boolean; isControlApp?: boolean; isDrysuit?: boolean }> = ({ src, alt, isPowerBox, isControlApp, isDrysuit }) => {
  const [transform, setTransform] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const intensity = 15; // Standard intensity
    const rotateX = (0.5 - y) * intensity;
    const rotateY = (x - 0.5) * intensity;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className={`relative w-full h-full group perspective-1000 ${isPowerBox ? 'animate-float' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        className="w-full h-full transition-transform duration-100 ease-out"
        style={{ transform, transformStyle: 'preserve-3d' }}
      >
        {isPowerBox ? (
          <PowerBoxLifestyle />
        ) : isControlApp ? (
          <TabletReal />
        ) : isDrysuit ? (
          <DrysuitLifestyle />
        ) : (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-contain transition-all duration-500 will-change-transform group-hover:scale-[1.1]`}
            style={{
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              filter: 'contrast(1.2) brightness(0.9)'
            }}
            loading="lazy"
            decoding="async"
          />
        )}
        {/* Specular shine reflection (only for images) */}
        {!isPowerBox && (
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'science'>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // Auth State
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Check for success payment
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success')) {
      setShowSuccessModal(true);
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => subscription.unsubscribe();
  }, []);

  const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'quarterly'>('monthly');
  const currentPackages = pricingPeriod === 'monthly' ? MONTHLY_PACKAGES : QUARTERLY_PACKAGES;

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Patch anchor links to work with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement);
          }
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const [isMuted, setIsMuted] = useState(false); // Audio ON by default for immersive experience

  const handleCheckout = async (pkg: NeoPackage) => {
    try {
      const price = parseInt(pkg.price.replace(/\D/g, ''));
      const isQuarterly = pricingPeriod === 'quarterly';
      const intervalCount = isQuarterly ? 3 : 1;

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id, // Optional - only if logged in
          priceId: pkg.stripePriceId,
          amount: price,
          productName: `${pkg.title} (${pricingPeriod === 'monthly' ? 'Lunar' : '3 Luni'})`,
          interval: 'month',
          intervalCount: intervalCount
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data);
        alert('Eroare la inițierea plății: ' + (data.error || 'Necunoscută'));
      }
    } catch (e) {
      console.error(e);
      alert('Eroare conexiune server.');
    }
  };

  // Imagini specifice care reflectă pozele furnizate de utilizator
  const locationImages = [
    // Ramada: Imagine locală (uploaded by user)
    "/ramada.jpg",
    // GetFit: Lumină naturală abundentă, geamuri mari, spațiu deschis (bazat pe a doua poză furnizată)
    // GetFit: Imagine locală (uploaded by user)
    "/getfit.jpg"
  ];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-[#00F5FF] selection:text-black">
      <AmbientAudio isMuted={isMuted} />
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        user={session?.user}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      {/* Conditional Rendering based on View */}
      {activeView === 'science' ? (
        <SciencePage
          onBack={() => setActiveView('home')}
          initialArticleId={activeArticleId}
        />
      ) : (
        <>
          <ImmersiveHero />



          {/* ===== PENTRU CINE ESTE NEOBOOST ===== */}
          <section id="pentru-cine" className="py-20 md:py-32 bg-[#030303] relative z-10 overflow-hidden">
            <BenefitsVideoBackground />
            <div className="container mx-auto px-6 md:px-24 relative z-10">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-bold uppercase mb-4">Ce Poți Obține</p>
                  <h2 className="text-4xl md:text-6xl font-black impact-font text-white">
                    Beneficii <span className="text-[#00F5FF]">reale</span>, nu promisiuni
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Benefit 1 - Slăbire */}
                <ScrollReveal delay={0}>
                  <div onClick={() => { setActiveView('science'); setActiveArticleId('slabire-rapida'); }} className="glass-block p-8 h-full hover:border-[#00F5FF]/30 transition-all duration-500 group block cursor-pointer flex flex-col">
                    <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00F5FF]/20 transition-colors">
                      <Zap size={28} className="text-[#00F5FF]" />
                    </div>
                    <h3 className="text-2xl font-black impact-font text-white mb-2 group-hover:text-[#00F5FF] transition-colors">SLĂBIRE RAPIDĂ</h3>
                    <p className="text-[#00F5FF] text-xs font-bold uppercase tracking-wider mb-3">Fără dietă extremă</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                      Arzi până la <span className="text-white font-bold">500 kcal</span> în 30 min și activezi metabolismul pentru încă 48h (efect afterburn).
                    </p>
                    <div className="flex items-center gap-2 text-[#00F5FF] text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                      Vezi explicația științifică <MoveUpRight size={12} />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Benefit 2 - Dureri de Spate */}
                <ScrollReveal delay={100}>
                  <div onClick={() => { setActiveView('science'); setActiveArticleId('dureri-spate'); }} className="glass-block p-8 h-full border-[#00F5FF]/20 hover:border-[#00F5FF]/40 transition-all duration-500 group block cursor-pointer relative overflow-hidden flex flex-col">
                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#00F5FF]/20 text-[#00F5FF] text-[8px] font-black uppercase tracking-wider rounded">Popular</div>
                    <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00F5FF]/20 transition-colors">
                      <HeartPulse size={28} className="text-[#00F5FF]" />
                    </div>
                    <h3 className="text-2xl font-black impact-font text-[#00F5FF] mb-2">ADIO DURERI DE SPATE</h3>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Fără frică de mișcare</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                      Clienții noștri spun că după 6-8 ședințe pot sta la birou fără durere lombară.
                    </p>
                    <div className="flex items-center gap-2 text-[#00F5FF] text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                      Cum funcționează, pas cu pas <MoveUpRight size={12} />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Benefit 3 - Tonifiere */}
                <ScrollReveal delay={200}>
                  <div onClick={() => { setActiveView('science'); setActiveArticleId('tonifiere'); }} className="glass-block p-8 h-full hover:border-[#00F5FF]/30 transition-all duration-500 group block cursor-pointer flex flex-col">
                    <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00F5FF]/20 transition-colors">
                      <Target size={28} className="text-[#00F5FF]" />
                    </div>
                    <h3 className="text-2xl font-black impact-font text-white mb-2 group-hover:text-[#00F5FF] transition-colors">TONIFIERE</h3>
                    <p className="text-[#00F5FF] text-xs font-bold uppercase tracking-wider mb-3">Fără rușine la sală</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                      Musculatura se activează 90% simultan. Rezultate vizibile în 4-8 săptămâni.
                    </p>
                    <div className="flex items-center gap-2 text-[#00F5FF] text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                      Ce înseamnă „tonifiere” în realitate <MoveUpRight size={12} />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Benefit 4 - Performanță */}
                <ScrollReveal delay={300}>
                  <div onClick={() => { setActiveView('science'); setActiveArticleId('forta-performanta'); }} className="glass-block p-8 h-full hover:border-[#00F5FF]/30 transition-all duration-500 group block cursor-pointer flex flex-col">
                    <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00F5FF]/20 transition-colors">
                      <TrendingUp size={28} className="text-[#00F5FF]" />
                    </div>
                    <h3 className="text-2xl font-black impact-font text-white mb-2 group-hover:text-[#00F5FF] transition-colors">FORȚĂ & PERFORMANȚĂ</h3>
                    <p className="text-[#00F5FF] text-xs font-bold uppercase tracking-wider mb-3">Fără risc de accidentare</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                      Recrutare rapidă a fibrelor musculare, creștere forță fără stres articular.
                    </p>
                    <div className="flex items-center gap-2 text-[#00F5FF] text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                      Protocolul care reduce riscul <MoveUpRight size={12} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section id="metoda" className="py-32 md:py-60 bg-[#020202] relative z-10 overflow-hidden">
            <BiohackVideoBackground />
            <div className="container mx-auto px-6 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-start">
                <div className="lg:sticky top-40">
                  <ScrollReveal>
                    <p className="mono-font text-[9px] tracking-[0.6em] text-[#00F5FF] font-bold uppercase mb-6">Protocol de Eficiență</p>
                    <h2 className="text-7xl md:text-9xl font-black impact-font text-white leading-[0.8]">BIO<br /><span className="text-[#00F5FF]">HACK.</span></h2>
                    <div className="h-px w-20 bg-[#00F5FF] my-12 opacity-30"></div>
                    <p className="text-2xl font-light text-white/40 leading-tight max-w-sm">
                      Rezultate garantate prin stimularea a <span className="text-white italic">90% din fibrele musculare</span> simultan.
                    </p>
                  </ScrollReveal>
                </div>

                <div className="grid gap-6">
                  {BENEFITS.map((b, i) => (
                    <ScrollReveal key={i} delay={i * 100}>
                      <div className="group p-10 glass-block hover:border-[#00F5FF]/30 transition-all duration-700">
                        <h3 className="text-3xl font-black impact-font mb-4 text-white group-hover:text-[#00F5FF] transition-colors">{b.title}</h3>
                        <p className="text-white/40 font-light leading-relaxed">{b.description}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>


          <div className="grid-bg py-24 border-y border-white/5">
            <ComparisonSection />
          </div>




          <TrialRoadmap />

          <ProgramsSection />






          <section id="tehnologie" className="py-32 md:py-60 bg-black relative z-10 overflow-hidden">
            <TechnologyVideoBackground />
            <div className="container mx-auto px-6 md:px-24 relative z-10">
              <ScrollReveal>
                <h2 className="text-7xl md:text-[12vw] font-black impact-font text-white mb-32 leading-none uppercase">
                  PRECIZIE<br /><span className="text-[#00F5FF]">BIO-TECH.</span>
                </h2>
              </ScrollReveal>

              <div className="space-y-48">
                {TECH_COMPONENTS.map((comp, idx) => (
                  <div key={comp.id} className={`grid lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <ScrollReveal className={`${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      <div className={`relative aspect-video overflow-visible border-none group`}>
                        <TiltImage
                          src={comp.image}
                          alt={comp.title}
                          isPowerBox={comp.id === 'powerbox'}
                          isControlApp={comp.id === 'control'}
                          isDrysuit={['drysuit', 'costum', 'ems-suit'].some(id => comp.id.includes(id))}
                        />
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className={`space-y-8 ${idx % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                      <h3 className="text-5xl md:text-7xl font-black impact-font text-white">{comp.title}</h3>
                      <p className={`text-lg text-white/40 font-light leading-relaxed max-w-xl ${idx % 2 !== 0 ? 'ml-auto' : ''}`}>{comp.description}</p>
                      <div className={`flex flex-wrap gap-2 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                        {comp.features.map(f => (
                          <span key={f} className="px-4 py-1.5 border border-white/10 text-[8px] mono-font uppercase tracking-widest text-white/30">
                            {f}
                          </span>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>

              <EMSProtocolSubsection />
            </div>
          </section>

          <EMSTimeline />

          <EMSEducation />

          <section id="recenzii" className="py-32 md:py-60 bg-[#030303] relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
              <ScrollReveal className="mb-24 md:mb-40">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-12 h-px bg-[#00F5FF]"></div>
                  <span className="mono-font text-[9px] text-[#00F5FF] font-black tracking-[0.6em] uppercase">Experiența Clienților</span>
                </div>
                <h2 className="text-7xl md:text-[14vw] font-black impact-font text-white leading-[0.75] tracking-tighter">POVEȘTI.<br /><span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>DE SUCCES.</span></h2>
              </ScrollReveal>

              <div className="grid lg:grid-cols-2 gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <TestimonialCard key={i} testimonial={t} i={i} />
                ))}
              </div>

              {/* CTA After Testimonials */}
              <ScrollReveal delay={400}>
                <div className="mt-16 text-center">
                  <p className="text-white/50 text-lg mb-6">Vrei și tu rezultate similare?</p>
                  <a
                    href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}?text=Salut! Am văzut recenziile și vreau să aflu mai multe despre EMS.`}
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-[#00F5FF] text-black px-8 py-4 text-lg font-black impact-font hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,245,255,0.4)]"
                  >
                    <MessageCircle size={20} />
                    SCRIE-NE PE WHATSAPP
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section id="abonamente" className="py-32 md:py-60 bg-black text-white relative z-20 rounded-t-[5vw] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="container mx-auto px-6 md:px-24 relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
                <ScrollReveal>
                  <div className="text-7xl md:text-[14vw] font-black impact-font leading-[0.7] tracking-tighter heading-glow">
                    <StaggeredText text="TARIFE." />
                  </div>
                  <p className="text-[#00F5FF]/50 text-base font-bold tracking-[0.3em] mt-8 border-l-2 border-[#00F5FF]/20 pl-6 uppercase">Program de transformare accelerată.</p>
                </ScrollReveal>

                <ScrollReveal delay={200} className="w-full lg:w-auto">
                  <div className="relative p-1.5 bg-white/5 border border-white/10 rounded-full flex gap-1 w-fit">
                    <button onClick={() => setPricingPeriod('monthly')} className={`relative z-10 px-10 py-3.5 text-[10px] font-black tracking-widest uppercase transition-all duration-700 rounded-full ${pricingPeriod === 'monthly' ? 'text-black' : 'text-white/40'}`}>LUNAR</button>
                    <button onClick={() => setPricingPeriod('quarterly')} className={`relative z-10 px-10 py-3.5 text-[10px] font-black tracking-widest uppercase transition-all duration-700 rounded-full ${pricingPeriod === 'quarterly' ? 'text-black' : 'text-white/40'}`}>3 LUNI</button>
                    <div className={`absolute top-1.5 bottom-1.5 bg-[#00F5FF] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(0,245,255,0.4)]`} style={{ left: pricingPeriod === 'monthly' ? '6px' : 'calc(50% + 1px)', width: 'calc(50% - 7px)' }} />
                  </div>
                </ScrollReveal>
              </div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {currentPackages.map((pkg, i) => (
                  <PackageCard
                    key={`${pricingPeriod}-${i}`}
                    pkg={pkg}
                    i={i}
                    user={session?.user}
                    onOpenAuth={() => setIsAuthOpen(true)}
                    onCheckout={handleCheckout}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="locatii" className="py-32 md:py-60 bg-black relative z-10">
            <div className="container mx-auto px-6 md:px-24">
              <ScrollReveal>
                <div className="text-7xl md:text-[12vw] font-black impact-font text-white leading-none mb-24 uppercase">
                  <StaggeredText text="LOCAȚII." />
                </div>
              </ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-24">
                {LOCATIONS.map((loc, i) => (
                  <ScrollReveal key={i} delay={i * 200}>
                    <div className="group cursor-default">
                      <div className="relative aspect-video overflow-hidden mb-10 border border-white/5 group-hover:border-[#00F5FF]/30 transition-all duration-700">
                        <img
                          src={locationImages[i]}
                          alt={loc.name}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 object-center`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black impact-font text-white mb-4 group-hover:text-[#00F5FF] transition-colors">{loc.name}</h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 text-white/30 mono-font text-[10px] uppercase tracking-widest font-bold">
                          <Target size={14} className="text-[#00F5FF]" /> {loc.address}
                        </div>
                        <p className="text-white/20 text-sm font-light leading-relaxed max-w-sm">{loc.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="py-32 md:py-60 bg-[#050505] relative z-10">
            <div className="container mx-auto px-6 md:px-24">
              <ScrollReveal>
                <div className="flex flex-col items-center mb-24">
                  <div className="flex items-center gap-4 mb-6">
                    <HelpCircle className="text-[#00F5FF]" size={20} />
                    <span className="mono-font text-[10px] tracking-[0.5em] text-[#00F5FF] font-black uppercase">Informații Tehnice</span>
                  </div>
                  <h2 className="text-7xl md:text-9xl font-black impact-font text-white text-center">ÎNTREBĂRI.</h2>
                </div>
              </ScrollReveal>
              <div className="max-w-3xl mx-auto border-t border-white/5">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} item={faq} i={i} />
                ))}
              </div>
            </div>
          </section>

          <footer className="py-24 bg-black border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-24">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                <h2 className="text-6xl md:text-8xl font-black impact-font text-white/90">{BRAND.name}</h2>
                <div className="flex gap-8 text-white/20">
                  <a href="https://www.instagram.com/neoboost.oradea?igsh=ZW5scDZvbGE4OTBw&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F5FF] transition-colors"><Instagram size={32} /></a>
                  <a href="#" className="hover:text-[#00F5FF] transition-colors"><Facebook size={32} /></a>
                </div>
              </div>
              <div className="h-px w-full bg-white/5 my-12"></div>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <p className="mono-font text-[9px] text-white/20 uppercase tracking-[0.4em]">© 2025 NeoBoost — Performanță Bio-Electrică Oradea</p>
                <p className="mono-font text-[9px] text-white/10 uppercase tracking-[0.4em]">Tehnologie Integrated Muscle Stimulation</p>
              </div>
            </div>
          </footer>

          <a href={`https://wa.me/${BRAND.phone.replace(/\s/g, '')}`} target="_blank" className="fixed bottom-20 right-8 z-[100] w-14 h-14 border border-[#00F5FF]/40 text-[#00F5FF] flex items-center justify-center hover:bg-[#00F5FF] hover:text-black transition-all duration-500 bg-black/50 backdrop-blur-md">
            <MessageCircle size={24} />
          </a>

          <StickyBanner />
        </>
      )}
    </main>
  );
};

export default App;

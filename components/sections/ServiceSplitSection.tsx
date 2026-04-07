import React from 'react';
import { Activity, ArrowRight, Zap, ShieldCheck, Dumbbell, Flame, Users, Clock } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { PROGRAM_ZONES } from '../../constants';
import { TypingHeading } from '../ui/TypingHeading';
import { RadarChart } from '../ui/RadarChart';
import { Marquee } from '../ui/Marquee';

// Extracted VideoCard component for individual lazy loading with Click-to-Play Facade
const VideoCard: React.FC<{ zone: typeof PROGRAM_ZONES[0] }> = ({ zone }) => {
    const [isInView, setIsInView] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false); // New state for Click-to-Play
    const cardRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Load once and keep it
                }
            },
            { rootMargin: '200px' } // Start loading 200px before it comes into view
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click from triggering other events if any
        setIsPlaying(true);
    };

    return (
        <div
            ref={cardRef}
            className="relative w-[85vw] md:w-auto h-[500px] md:h-[600px] rounded-3xl overflow-hidden shrink-0 border border-gray-800 shadow-2xl group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
            onClick={!isPlaying ? handlePlayClick : undefined} // Allow clicking anywhere on card to play
        >
            {/* Background Media */}
            <div className="absolute inset-0 z-0 bg-zinc-900">
                {!isInView || !isPlaying ? (
                    // Static Facade: Image + Play Button
                    <>
                        <img
                            src={zone.image}
                            alt={zone.title}
                            className={`w-full h-full object-cover opacity-60 transition-opacity duration-500
                                ${zone.id === 'kineto' ? 'rotate-[-90deg] scale-[1.8]' : ''}
                                ${zone.video.includes('shorts') ? 'scale-[1.35]' : ''}
                            `}
                            loading="lazy"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                <span className="sr-only">Play Video</span>
                                <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    zone.video ? (
                        (zone.video.includes('youtube') || zone.video.includes('youtu.be')) ? (
                            <div className={`absolute inset-0 w-full h-full bg-black ${zone.id === 'kineto' ? 'overflow-hidden' : ''} animate-fade-in`}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${(() => {
                                        const url = zone.video;
                                        if (url.includes('/shorts/')) return url.split('/shorts/')[1].split('?')[0];
                                        if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
                                        if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
                                        return url.split('/').pop()?.split('?')[0];
                                    })()}?autoplay=1&mute=1&loop=1&playlist=${(() => {
                                        const url = zone.video;
                                        if (url.includes('/shorts/')) return url.split('/shorts/')[1].split('?')[0];
                                        if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
                                        if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
                                        return url.split('/').pop()?.split('?')[0];
                                    })()}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                                    title={zone.title}
                                    className={`w-full h-full object-cover 
                                        ${zone.id === 'kineto' ? 'rotate-[-90deg] scale-[2.4]' :
                                            zone.video.includes('/shorts/') ? 'scale-[1.70]' : 'scale-[3.0]'}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    style={{ border: 0 }}
                                    loading="eager" // Load eagerly once clicked
                                />
                            </div>
                        ) : (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-80"
                            >
                                <source src={zone.video} type="video/mp4" />
                            </video>
                        )
                    ) : (
                        <img
                            src={zone.image}
                            alt={zone.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    )
                )}
                {/* Heavy Text Protection Gradient for readability (Only visible when not playing or if playing but we want text readable - actually better to keep it to ensure text readability) */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none ${isPlaying ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}></div>

                {/* Unified Color Overlay - Hide when playing for better viewing */}
                {!isPlaying && (
                    <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply group-hover:bg-blue-800/40 transition-colors duration-500 pointer-events-none"></div>
                )}
            </div>

            {/* Performance Indicator Overlay (Animation visible) - Hide when playing */}
            {!isPlaying && zone.stats && (
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 origin-top-right">
                    <div className="bg-black/50 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-2xl">
                        <RadarChart data={zone.stats} color="#ffffff" />
                    </div>
                </div>
            )}

            {/* Content Overlay - Hide when playing to let user watch, OR keep it minimal? User said "Click to play", usually implies watching the video. Let's hide the big text when playing, or move it? Stick to hiding for now to allow full view. */}
            {!isPlaying && (
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-6 pointer-events-none">
                    {/* Subtitle - Animated reveal */}
                    <div className="mb-auto pt-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md !text-white text-[10px] font-bold tracking-widest uppercase border border-white/20 shadow-sm`}>
                            {zone.icon}
                            <span>{zone.subtitle}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-black !text-white uppercase italic leading-none mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] text-shadow-lg">
                        {zone.title} 🚀
                    </h3>

                    <p className="!text-white text-sm leading-relaxed mb-4 font-semibold line-clamp-2 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] shadow-black">
                        {zone.description}
                    </p>

                    {/* Technical Specs Reveal */}
                    {zone.technical && (
                        <div className="mb-4 space-y-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:h-0 md:group-hover:h-auto overflow-hidden">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-300">
                                <Zap className="w-3 h-3 text-blue-400" />
                                <span className="font-bold text-white">IMPULS:</span> {zone.technical.currents}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-300">
                                <Clock className="w-3 h-3 text-green-400" />
                                <span className="font-bold text-white">TIMP:</span> {zone.technical.timeline}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                        {zone.features.slice(0, 2).map((feature, i) => (
                            <div key={i} className="px-3 py-1 rounded-md bg-white/10 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                {feature}
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="vibrant"
                        className="w-full shadow-lg shadow-blue-900/20 pointer-events-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://wa.me/40769124019', '_blank');
                        }}
                    >
                        {zone.cta}
                    </Button>
                </div>
            )}

            {/* Close/Reset Button when playing */}
            {isPlaying && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(false);
                    }}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
                >
                    <span className="sr-only">Close Video</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            )}
        </div>
    );
};

export const ServiceSplitSection = () => {
    return (
        <section className="relative w-full py-24 px-0 bg-transparent z-10 overflow-hidden" id="programe">
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24 mb-12">
                <ScrollReveal>
                    <TypingHeading
                        text="Alege Modul Tău de Antrenament. ⚡"
                        highlightText="de Antrenament."
                        highlightColor="text-blue-600"
                        className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] leading-tight justify-center md:justify-start"
                    />
                </ScrollReveal>
            </div>

            {/* Static Grid/Scroll Layout - EXACTLY 4 ITEMS */}
            <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
                <div className="flex flex-nowrap md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-max md:min-w-0 px-6 md:px-12 lg:px-24">
                    {PROGRAM_ZONES.map((zone) => (
                        <VideoCard key={zone.id} zone={zone} />
                    ))}
                </div>
            </div>
        </section>
    );
};

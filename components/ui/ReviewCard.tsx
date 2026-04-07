import React, { useState, useRef } from 'react';
import { Play, Pause, Quote, Star, User } from 'lucide-react';
import { Testimonial } from '../../constants';
import { SpotlightCard } from './SpotlightCard';

interface ReviewCardProps {
    review: Testimonial;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayToggle = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // --- VIDEO & PHOTO CARD ---
    if (review.type === 'video' || review.type === 'photo') {
        const isVideo = review.type === 'video';

        return (
            <div className="relative group h-full h-[400px] w-[300px] md:w-[350px] flex-shrink-0 rounded-[2rem] overflow-hidden border border-gray-200 bg-black shadow-xl">
                {/* Media Element */}
                {isVideo ? (
                    review.videoUrl?.includes('youtube.com') || review.videoUrl?.includes('youtu.be') ? (
                        <iframe
                            src={review.videoUrl.includes('/shorts/')
                                ? review.videoUrl.replace('youtube.com/shorts/', 'www.youtube.com/embed/')
                                : review.videoUrl.includes('watch?v=')
                                    ? review.videoUrl.replace('watch?v=', 'embed/')
                                    : review.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                            }
                            title={review.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            src={review.videoUrl}
                            poster={review.coverImage}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            playsInline
                            loop
                            onClick={handlePlayToggle}
                        />
                    )
                ) : (
                    <img
                        src={review.imageUrl}
                        alt={review.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                )}

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${(isPlaying || (isVideo && (review.videoUrl?.includes('youtube.com') || review.videoUrl?.includes('youtu.be')))) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}></div>

                {/* Play Button (Only for Video) */}
                {isVideo && !isPlaying && !(review.videoUrl?.includes('youtube.com') || review.videoUrl?.includes('youtu.be')) && (
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white cursor-pointer hover:scale-110 hover:bg-white/20 transition-all duration-300 z-20 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                        onClick={handlePlayToggle}
                    >
                        <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                )}

                {/* Content (Bottom) */}
                <div className={`absolute bottom-0 left-0 w-full p-6 transition-transform duration-500 ${isPlaying ? 'translate-y-full' : 'translate-y-0'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full border border-white/30 overflow-hidden backdrop-blur-sm bg-white/10 shadow-md">
                            {/* Small avatar for video/photo card can be just an icon if main image is the content, or same image */}
                            <User size={20} className="text-white m-auto translate-y-2 drop-shadow-sm" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm drop-shadow-md">{review.name}</div>
                            <div className="text-[10px] text-blue-300 uppercase tracking-widest drop-shadow-sm">{review.role}</div>
                        </div>
                    </div>
                    <p className="text-white/95 text-sm font-medium italic border-l-2 border-blue-500 pl-3 leading-relaxed drop-shadow-md">
                        "{review.quote}"
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-20">
                    <span className={`px-2 py-1 rounded backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${isVideo ? 'bg-red-500/80' : 'bg-blue-500/80'}`}>
                        {isVideo ? <><Play size={8} fill="currentColor" /> Preview</> : <><Star size={8} fill="currentColor" /> Verified</>}
                    </span>
                </div>
            </div>
        );
    }

    // --- GOOGLE TEXT CARD ---
    const isGoogle = review.type === 'google' || review.imageUrl?.includes('logo');
    const initials = review.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.1)"
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] h-full min-h-[350px] w-[300px] md:w-[350px] flex-shrink-0 flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300"
        >
            <div>
                <div className="absolute top-6 right-8 opacity-10 text-blue-600 group-hover:opacity-20 transition-opacity flex flex-col items-center gap-1">
                    <Quote size={40} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md flex items-center justify-center ${!review.imageUrl || review.imageUrl.includes('logo') ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : ''}`}>
                        {review.imageUrl && !review.imageUrl.includes('logo') ? (
                            <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white font-bold text-lg">{initials}</span>
                        )}
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 text-base">{review.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                            <img src="/google-logo.png" alt="Google" className="w-3 h-3 opacity-60" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Google Review</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-0.5 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, starI) => (
                        <Star key={starI} size={14} fill="currentColor" />
                    ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium relative z-10">
                    "{review.quote}"
                </p>
            </div>

            {review.level && (
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.level}</span>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded-full">{review.achievement}</span>
                </div>
            )}
        </SpotlightCard>
    );
};

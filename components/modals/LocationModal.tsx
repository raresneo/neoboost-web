import React, { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle2, Calendar, MessageCircle, Target } from 'lucide-react';
import { BookingCalendar } from '../BookingCalendar';
import { LOCATIONS, BRAND } from '../../constants';

// --- Location Modal Component ---
interface LocationModalProps {
    location: typeof LOCATIONS[0] | null;
    isOpen: boolean;
    onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ location, isOpen, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsZoomed(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isZoomed) setIsZoomed(false);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose, isZoomed]);

    if (!isOpen || !location) return null;

    const gallery = location.gallery || [];

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
            onClick={(e) => {
                if (isZoomed) setIsZoomed(false);
                else onClose();
            }}
        >
            {/* Zoom Overlay */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(false);
                    }}
                >
                    <img
                        src={gallery[activeImage] || location.gallery?.[0] || '/ramada.jpg'}
                        alt="Zoomed view"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-6 right-6 p-4 bg-black/50 hover:bg-[#3A86FF] text-white rounded-full transition-colors"
                    >
                        <X size={32} />
                    </button>
                </div>
            )}

            <div
                className={`relative w-full max-w-7xl max-h-[95vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl animate-scale-in ${isZoomed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-[#3A86FF] hover:border-[#3A86FF] transition-all duration-300 group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-5xl md:text-7xl font-black impact-font text-white mb-4 leading-tight">
                            {location.name}
                        </h2>
                        <div className="flex items-center gap-3 text-white/60 mb-4">
                            <MapPin size={20} className="text-[#3A86FF]" />
                            <p className="text-lg">{location.address}</p>
                        </div>
                        <p className="text-gray-200 text-lg leading-relaxed max-w-2xl">
                            {location.description}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column: Gallery */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Galerie Foto</h3>

                            {/* Main Image */}
                            <div
                                className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 group cursor-zoom-in"
                                onClick={() => setIsZoomed(true)}
                            >
                                <img
                                    src={gallery[activeImage] || location.gallery?.[0] || '/ramada.jpg'}
                                    alt={`${location.name} - ${activeImage + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                                    <span className="bg-black/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">Click pentru Zoom</span>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-3">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${activeImage === idx
                                            ? 'border-[#3A86FF] scale-105 shadow-lg shadow-[#3A86FF]/30'
                                            : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Perks */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-white mb-4">Facilități</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {location.perks.map((perk, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
                                        >
                                            <CheckCircle2 size={16} className="text-[#3A86FF] flex-shrink-0" />
                                            <span className="text-sm text-white/80">{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Custom Calendar */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Programează-te Acum</h3>
                            <div className="relative w-full h-[600px] bg-[#050505] rounded-2xl overflow-hidden border border-white/10">
                                <BookingCalendar onClose={onClose} preselectedLocationId={location.id} compact={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

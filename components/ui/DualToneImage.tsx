import React from 'react';
// Removed unused import to fix lint error

interface DualToneImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    intensity?: 'subtle' | 'medium' | 'strong';
}

export const DualToneImage: React.FC<DualToneImageProps> = ({
    src,
    alt,
    className,
    intensity = 'none',
    ...props
}) => {
    // Opacity maps for the overlay intensity
    const intensityMap = {
        none: 'opacity-0',
        subtle: 'opacity-20',
        medium: 'opacity-40',
        strong: 'opacity-60',
        heavy: 'opacity-80' // Keeping for legacy if needed, but discouraged
    };

    return (
        <div className={`relative overflow-hidden bg-[var(--bg-tertiary)] ${className}`}>
            {/* Base Image - Grayscale & High Contrast to accept color better */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover filter brightness-95 relative z-0"
                {...props}
            />

            {/* Red Light (Left) */}
            <div className={`absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent mix-blend-soft-light z-10 pointer-events-none ${intensity === 'none' ? 'opacity-0' : intensityMap[intensity]}`} />

            {/* Blue Light (Right) */}
            <div className={`absolute inset-0 bg-gradient-to-l from-blue-600/30 to-transparent mix-blend-soft-light z-10 pointer-events-none ${intensity === 'none' ? 'opacity-0' : intensityMap[intensity]}`} />

            {/* Darken Bottom (Vignette) - Softened for Light Mode compatibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 mix-blend-multiply z-20 pointer-events-none" />

            {/* Glossy Highlight */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-30" />
        </div>
    );
};

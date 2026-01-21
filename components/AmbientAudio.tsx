import React, { useState, useEffect, useRef } from 'react';

export const AmbientAudio: React.FC<{ isMuted: boolean }> = ({ isMuted }) => {
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
            // Fade out logic
            let currentVol = audio.volume;
            const originalVol = currentVol;

            fadeInterval = setInterval(() => {
                // iOS check: if volume didn't change on first step, volume control is likely not supported
                // In that case, just pause immediately to ensure it stops.
                const isVolumeLocked = (audio.volume === originalVol && originalVol > 0);

                if (audio.volume > 0.02 && !isVolumeLocked) {
                    audio.volume = Math.max(0, audio.volume - 0.05); // Faster fade out
                } else {
                    // Finish fade or force stop if locked
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

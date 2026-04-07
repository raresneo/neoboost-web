import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    reveal?: boolean;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className = "", reveal = true }) => {
    const [outputText, setOutputText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!reveal) return;

        let iteration = 0;

        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setOutputText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
            }

            iteration += 1 / 2; // Decryption speed
        }, 30);

        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [text, reveal]);

    return (
        <span className={`${className} font-display uppercase tracking-widest`}>
            {outputText}
        </span>
    );
};

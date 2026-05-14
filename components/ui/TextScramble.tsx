import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    reveal?: boolean;
}

const chars = '!<>-_\\/[]{}—=+*^?#';

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className = "", reveal = true }) => {
    const [outputText, setOutputText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!reveal) {
            setOutputText(text);
            return;
        }

        let iteration = 0;
        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setOutputText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            iteration += 1; // was 1/2 — now 2× faster

            if (iteration > text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setOutputText(text); // always land on final text
            }
        }, 20); // was 30ms — now 20ms

        // Safety net: after 400ms always show real text
        const safetyTimer = setTimeout(() => {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setOutputText(text);
        }, 400);

        return () => {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            clearTimeout(safetyTimer);
        };
    }, [text, reveal]);

    return (
        <span className={`${className} font-display uppercase tracking-widest`}>
            {outputText}
        </span>
    );
};

import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Main dot follows instantly
            cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;

            // Follower follows with slight delay (handled via CSS transition mostly, or simple lerp)
            // For CSS approach:
            follower.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Only render on non-touch devices ideally
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouch(true);
        }
    }, []);

    if (isTouch) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-exclusion">
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className={`absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform z-20 transition-transform duration-75 ease-out ${isClicking ? 'scale-75' : ''}`}
            />
            {/* Follower Ring */}
            <div
                ref={followerRef}
                className={`absolute w-8 h-8 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform z-10 transition-all duration-300 ease-out 
                ${isHovering ? 'scale-[2.5] bg-white text-black' : 'scale-100'} 
                ${isClicking ? 'scale-[0.8]' : ''}
                `}
                style={{
                    // Optional: Smooth catch-up could be done via JS lerp, but CSS transition-duration handles it okay for MVP
                }}
            >
                {/* Optional "CLICK" or Icon text inside when hovering */}
                <div className={`flex items-center justify-center w-full h-full text-[3px] font-black uppercase transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    Open
                </div>
            </div>
        </div>
    );
};

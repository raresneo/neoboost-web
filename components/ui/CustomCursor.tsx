import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    // State for visual changes only
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Physics state refs
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });
    const magneticTargetRef = useRef<HTMLElement | null>(null);

    // 1. Mouse Event Listeners & Loop
    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Hide default cursor globally
        document.body.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            targetPos.current = { x: clientX, y: clientY };

            // Main dot follows instantly
            if (cursor) {
                cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], .cursor-pointer') as HTMLElement;

            if (interactive) {
                if (magneticTargetRef.current !== interactive) {
                    setIsHovering(true);
                    magneticTargetRef.current = interactive;
                }
            } else {
                if (magneticTargetRef.current !== null) {
                    setIsHovering(false);
                    magneticTargetRef.current = null;
                }
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Physics Loop
        let animationFrame: number;
        const loop = () => {
            const magneticTarget = magneticTargetRef.current;

            const stiffness = magneticTarget ? 0.3 : 0.15;
            const damping = magneticTarget ? 0.6 : 0.8;

            let destX = targetPos.current.x;
            let destY = targetPos.current.y;

            if (magneticTarget) {
                const rect = magneticTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = targetPos.current.x - centerX;
                const distanceY = targetPos.current.y - centerY;

                destX = centerX + distanceX * 0.4;
                destY = centerY + distanceY * 0.4;
            }

            const ax = (destX - pos.current.x) * stiffness;
            const ay = (destY - pos.current.y) * stiffness;

            vel.current.x = (vel.current.x + ax) * damping;
            vel.current.y = (vel.current.y + ay) * damping;

            pos.current.x += vel.current.x;
            pos.current.y += vel.current.y;

            if (follower) {
                follower.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }

            animationFrame = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            document.body.style.cursor = 'auto'; // Restore on unmount
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // 2. Touch Detection
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouch(true);
        }
    }, []);

    if (isTouch) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className={`absolute w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform z-20 transition-all duration-300 ${isHovering ? 'scale-[2] bg-white/50' : 'scale-100 opacity-100'}`}
            />
            {/* Follower Ring */}
            <div
                ref={followerRef}
                className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform z-10 
                flex items-center justify-center
                transition-all duration-500 ease-out 
                ${isHovering
                        ? 'w-16 h-16 bg-white/5 backdrop-blur-[2px] border border-white/30'
                        : 'w-10 h-10 border border-white/50'} 
                ${isClicking ? 'scale-75 border-white/80 border-2' : ''}
                `}
            >
                <div className={`text-[8px] font-bold text-white uppercase tracking-widest transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    Open
                </div>
            </div>
        </div>
    );
};

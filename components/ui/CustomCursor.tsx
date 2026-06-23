import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const ringX = useRef(0);
    const ringY = useRef(0);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        document.body.style.cursor = 'none';

        const onMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const onOver = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('a, button, [role="button"], .cursor-pointer');
            setIsHovering(!!el);
        };

        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        let raf: number;
        const lerp = () => {
            ringX.current += (mouseX.current - ringX.current) * 0.1;
            ringY.current += (mouseY.current - ringY.current) * 0.1;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0)`;
            }
            raf = requestAnimationFrame(lerp);
        };
        raf = requestAnimationFrame(lerp);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            cancelAnimationFrame(raf);
        };
    }, []);

    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    if (isTouch) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <div
                ref={dotRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    marginLeft: -3,
                    marginTop: -3,
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    willChange: 'transform',
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHovering ? 36 : 26,
                    height: isHovering ? 36 : 26,
                    marginLeft: isHovering ? -18 : -13,
                    marginTop: isHovering ? -18 : -13,
                    borderRadius: '50%',
                    border: '1.5px solid var(--accent-primary)',
                    opacity: isHovering ? 0.55 : 0.35,
                    transform: isClicking ? 'scale(0.8)' : undefined,
                    transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.2s ease',
                    willChange: 'transform',
                }}
            />
        </div>
    );
};

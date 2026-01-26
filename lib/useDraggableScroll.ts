import { useRef, useState, useEffect } from 'react';

export const useDraggableScroll = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const slider = ref.current;
        if (!slider) return;

        const mouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            slider.classList.add('cursor-grabbing');
            slider.classList.remove('cursor-grab', 'snap-x'); // Disable snap while dragging for smoothness
            setStartX(e.pageX - slider.offsetLeft);
            setScrollLeft(slider.scrollLeft);
        };

        const mouseLeave = () => {
            setIsDragging(false);
            slider.classList.remove('cursor-grabbing');
            slider.classList.add('cursor-grab', 'snap-x');
        };

        const mouseUp = () => {
            setIsDragging(false);
            slider.classList.remove('cursor-grabbing');
            slider.classList.add('cursor-grab', 'snap-x');
        };

        const mouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', mouseDown);
        slider.addEventListener('mouseleave', mouseLeave);
        slider.addEventListener('mouseup', mouseUp);
        slider.addEventListener('mousemove', mouseMove);

        // Intitial Class
        slider.classList.add('cursor-grab');

        return () => {
            slider.removeEventListener('mousedown', mouseDown);
            slider.removeEventListener('mouseleave', mouseLeave);
            slider.removeEventListener('mouseup', mouseUp);
            slider.removeEventListener('mousemove', mouseMove);
        };
    }, [isDragging, startX, scrollLeft]);

    return ref;
};

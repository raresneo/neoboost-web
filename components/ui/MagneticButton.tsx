import React, { useRef, useState } from 'react';

type MagneticButtonProps = {
    children: React.ReactNode;
    className?: string;
} & (
    | { href: string; onClick?: never }
    | { onClick: () => void; href?: never }
);

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', href, onClick }) => {
    const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const sharedProps = {
        ref,
        className,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { transform: `translate(${position.x}px, ${position.y}px)` },
    };

    if (href) {
        return (
            <a {...sharedProps} href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button {...sharedProps} onClick={onClick} type="button">
            {children}
        </button>
    );
};

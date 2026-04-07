import React, { useEffect, useState } from 'react';

interface RadarChartProps {
    data: {
        [key: string]: number;
    };
    color?: string;
    className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, color = '#3A86FF', className = '' }) => {
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
        // Start animation on mount
        const timer = setTimeout(() => setAnimationProgress(1), 100);
        return () => clearTimeout(timer);
    }, []);

    const keys = Object.keys(data);
    const numPoints = keys.length;
    const radius = 80; // chart radius
    const center = 100; // svg center (100, 100)

    // Helper to calculate point coordinates
    const getPoint = (index: number, value: number, max: number = 100) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const r = (value / max) * radius * animationProgress; // Animate radius
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return { x, y };
    };

    // Generate polygon points string
    const points = keys
        .map((key, i) => {
            const { x, y } = getPoint(i, data[key]);
            return `${x},${y}`;
        })
        .join(' ');

    // Generate grid levels (concentric polygons)
    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <div className={`relative ${className}`}>
            <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">

                {/* Grid Lines (Web) */}
                {gridLevels.map((level, idx) => (
                    <polygon
                        key={idx}
                        points={keys
                            .map((_, i) => {
                                const { x, y } = getPoint(i, 100 * level, 100);
                                // For grid, we don't animate radius, just static
                                const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                                const r = radius * level;
                                const gx = center + r * Math.cos(angle);
                                const gy = center + r * Math.sin(angle);
                                return `${gx},${gy}`;
                            })
                            .join(' ')}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                        className="transition-all duration-1000"
                    />
                ))}

                {/* Axis Lines */}
                {keys.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data Polygon */}
                <polygon
                    points={points}
                    fill={color}
                    fillOpacity="0.2"
                    stroke={color}
                    strokeWidth="2"
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(58,134,255,0.5)]"
                />

                {/* Data Points (Dots) */}
                {keys.map((key, i) => {
                    const { x, y } = getPoint(i, data[key]);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="white"
                            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                        />
                    );
                })}

                {/* Labels */}
                {keys.map((key, i) => {
                    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                    // Position text slightly outside radius
                    const labelRadius = radius + 25;
                    const x = center + labelRadius * Math.cos(angle);
                    const y = center + labelRadius * Math.sin(angle);

                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgba(255,255,255,0.7)"
                            fontSize="9" // Slightly smaller font
                            fontWeight="500"
                            className="uppercase tracking-wider font-mono"
                        >
                            {key}
                        </text>
                    );
                })}

            </svg>

            {/* Central "Scanning" Effect (Optional aesthetic) */}
            <div className="absolute inset-0 bg-transparent rounded-full pointer-events-none animate-pulse-slow opacity-20"></div>
        </div>
    );
};

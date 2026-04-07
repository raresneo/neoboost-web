import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface Metrics {
    start: number;
    end: number;
    unit: string;
    label?: string; // Optional custom label
}

interface BioMetricsGraphProps {
    weight: Metrics;
    bodyFat: Metrics;
    muscle: Metrics;
}

export const BioMetricsGraph: React.FC<BioMetricsGraphProps> = ({ weight, bodyFat, muscle }) => {

    // Calculate percentage change for visuals
    const calculateChange = (m: Metrics) => {
        return ((m.end - m.start) / m.start) * 100;
    };

    const MetricItem = ({ label, metric, color, inverse = false }: { label: string, metric: Metrics, color: string, inverse?: boolean }) => {
        const change = calculateChange(metric);
        const isPositive = inverse ? change < 0 : change > 0; // For fat/cm, negative is good

        // Visual width calc (clamped for visual purposes)
        const maxVal = Math.max(metric.start, metric.end);
        const startPercent = (metric.start / maxVal) * 100;
        const endPercent = (metric.end / maxVal) * 100;

        return (
            <div className="mb-6">
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold mb-2">
                    <span className="text-white/60">{label}</span>
                    <span className={`${isPositive ? 'text-[#3A86FF]' : 'text-red-400'}`}>
                        {change > 0 ? '+' : ''}{change.toFixed(1)}%
                    </span>
                </div>

                {/* Graph Container */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                    {/* Start Marker (Ghost) */}
                    <div
                        className="absolute top-0 bottom-0 bg-white/10 w-1"
                        style={{ left: `${startPercent}%` }}
                    />

                    {/* Actual Bar */}
                    <div
                        className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ${color}`}
                        style={{ width: `${endPercent}%` }}
                    />
                </div>

                <div className="flex justify-between mt-1 text-[10px] mono-font text-white/40">
                    <span>Start: {metric.start} {metric.unit}</span>
                    <span className="text-white">Acum: {metric.end} {metric.unit}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[var(--bg-primary)]/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            <h4 className="text-white font-display font-bold uppercase text-xl mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3A86FF] rounded-full animate-pulse"></div>
                Bio-Metrics
            </h4>

            <MetricItem label={weight.label || "Greutate"} metric={weight} color="bg-white/80" inverse={true} />
            <MetricItem label={bodyFat.label || "Grăsime Corporală"} metric={bodyFat} color="bg-[#3A86FF]" inverse={true} />
            <MetricItem label={muscle.label || "Masă Musculară"} metric={muscle} color="bg-[#00F0FF]" />

        </div>
    );
};

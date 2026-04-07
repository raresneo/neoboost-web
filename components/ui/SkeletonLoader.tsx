import React from 'react';

export const SkeletonLoader = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="w-full max-w-4xl space-y-4">
                <div className="h-12 bg-white/5 rounded-lg w-1/3 mx-auto"></div>
                <div className="h-4 bg-white/5 rounded w-1/4 mx-auto"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-white/5 rounded-2xl"></div>
                ))}
            </div>

            <div className="sr-only">Loading...</div>
        </div>
    );
};

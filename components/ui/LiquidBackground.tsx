'use client';

import React from 'react';

export function LiquidBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#F5F8FA]">

            {/* Animated Blobs Layer - Subtle background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Blob 1: Brand Orange/Red - Top Left - Reduced opacity */}
                <div
                    className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"
                    style={{ backgroundColor: '#FE6535' }}
                />

                {/* Blob 2: Warm Yellow/Pink - Top Right - More subtle */}
                <div
                    className="absolute top-[5%] -right-[10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-blob animation-delay-2000"
                    style={{ backgroundColor: '#FFB088' }}
                />

                {/* Blob 3: Soft Blue/White - Bottom Left */}
                <div
                    className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000"
                    style={{ backgroundColor: '#E0E7FF' }}
                />
            </div>

            {/* Glass Overlay - Increased white overlay for better readability */}
            <div className="relative z-10 min-h-screen bg-white/50 backdrop-blur-[2px]">
                {children}
            </div>
        </div>
    );
}

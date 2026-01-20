'use client';

import { Fragment } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SpaceCard({ space, className, onClick }: { space: any, className?: string, onClick?: (space: any) => void }) {
    // Attractive fallback images for spaces (nightclubs, bars, rooftops)
    const fallbackImages = [
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=800&fit=crop', // Nightclub lights
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop', // Concert crowd
        'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&h=800&fit=crop', // Rooftop bar
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=800&fit=crop', // DJ booth
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop', // Party lights
    ];

    // Parse images (JSON string)
    let images = [];
    try {
        images = JSON.parse(space.images);
    } catch (e) {
        images = [];
    }

    // Use parsed image or pick a random fallback based on space id/name
    const fallbackIndex = (space.id?.charCodeAt?.(0) || space.name?.length || 0) % fallbackImages.length;
    const coverImage = images[0] || fallbackImages[fallbackIndex];

    // Format price
    const priceFormatted = space.price ? `$${space.price.toLocaleString('es-CO')}` : '$20.000';

    // Categories
    const categories = space.category || 'Electrónica · Reggaeton · Crossover';

    return (
        <div
            onClick={() => onClick && onClick(space)}
            className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-2xl",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={coverImage}
                    alt={space.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient Overlay - dark at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">

                {/* Title & Category */}
                <div className="space-y-1 mb-2">
                    <h3 className="font-bold text-xl leading-tight drop-shadow-md">
                        {space.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium truncate">
                        {categories}
                    </p>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#FE6535]" />
                    <span className="truncate">{space.location || 'Cra 27 # 52-24'}</span>
                </div>

                {/* Bottom Row: Price + Arrow Button */}
                <div className="flex items-center justify-between">
                    {/* Price Badge */}
                    <span className="text-lg font-bold text-white">
                        {priceFormatted}
                    </span>

                    {/* Arrow Action Button */}
                    {onClick ? (
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all cursor-pointer shadow-lg">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    ) : (
                        <Link href={`/spaces/${space.id}/edit`}>
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all shadow-lg">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SpaceCard({ space, className, onClick }: { space: any, className?: string, onClick?: (space: any) => void }) {
    // Parse images (JSON string)
    let images = [];
    try {
        images = JSON.parse(space.images);
    } catch (e) {
        images = [];
    }
    const coverImage = images[0] || 'https://placehold.co/600x400/1e293b/cbd5e1?text=No+Image';

    const Wrapper = onClick ? 'div' : Fragment;

    return (
        <div
            onClick={() => onClick && onClick(space)}
            className={cn("group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 shadow-xl cursor-pointer transition-all hover:shadow-2xl", className)}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={coverImage}
                    alt={space.name}
                    className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">

                {/* Top Tags - Price */}
                <div className="absolute top-4 left-4">
                    <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold">
                        {space.price ? `$${space.price.toLocaleString()}` : '$20.000'}
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="space-y-1">
                    <h3 className="font-bold text-xl leading-tight">{space.name}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{space.category} · {space.capacity} pax</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{space.location || 'Cra 27 # 52-24'}</span>
                    </div>
                </div>

                {/* Arrow Action Button */}
                <div className="absolute bottom-5 right-5">
                    {onClick ? (
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg text-white hover:scale-110 transition-transform">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    ) : (
                        <Link href={`/spaces/${space.id}/edit`}>
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg text-white hover:scale-110 transition-transform">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

import { ChevronRight, MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function EventCard({ event, onClick }: { event: any, onClick?: (event: any) => void }) {
    // Attractive fallback images for events (parties, concerts, festivals)
    const fallbackImages = [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop', // Festival sunset
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=800&fit=crop', // Concert crowd
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=800&fit=crop', // Night party
        'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=800&fit=crop', // Stage lights
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=800&fit=crop', // Neon party
    ];

    let images = [];
    try { images = JSON.parse(event.images); } catch (e) { images = []; }

    // Use parsed image or pick a fallback based on event id/title
    const fallbackIndex = (event.id?.charCodeAt?.(0) || event.title?.length || 0) % fallbackImages.length;
    const coverImage = images[0] || fallbackImages[fallbackIndex];

    // Format price
    const priceFormatted = event.price ? `$${event.price.toLocaleString('es-CO')}` : '$20.000';

    // Categories - use space name or fallback
    const categories = event.space?.name || event.category || 'Evento · Fiesta';

    // Format date
    const eventDate = new Date(event.date);
    const formattedDate = format(eventDate, "d 'de' MMMM", { locale: es });

    return (
        <div
            onClick={() => onClick && onClick(event)}
            className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-2xl"
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={coverImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient Overlay - dark at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Status Badge - Top Left */}
            <div className="absolute top-3 left-3">
                <div className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur-sm",
                    event.status === 'published'
                        ? 'bg-green-500/80 text-white'
                        : 'bg-amber-500/80 text-white'
                )}>
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                    {event.status === 'published' ? 'Publicado' : 'Borrador'}
                </div>
            </div>

            {/* Date Badge - Top Right */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-[#FE6535] leading-none">
                        {format(eventDate, "MMM", { locale: es })}
                    </span>
                    <span className="text-lg font-bold text-white leading-tight">
                        {format(eventDate, "d")}
                    </span>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">

                {/* Title & Category */}
                <div className="space-y-1 mb-2">
                    <h3 className="font-bold text-xl leading-tight drop-shadow-md">
                        {event.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium truncate">
                        {categories}
                    </p>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#FE6535]" />
                    <span className="truncate">{event.space?.name || 'Ubicación por definir'}</span>
                </div>

                {/* Bottom Row: Price + Arrow Button */}
                <div className="flex items-center justify-between">
                    {/* Price Badge */}
                    <span className="text-lg font-bold text-white">
                        {priceFormatted}
                    </span>

                    {/* Arrow Action Button */}
                    <Link href={`/events/${event.id}`}>
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all shadow-lg">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

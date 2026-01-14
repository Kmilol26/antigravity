import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar, Clock, Edit, MapPin, Trash, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function EventCard({ event }: { event: any }) {
    let images = [];
    try { images = JSON.parse(event.images); } catch (e) { images = []; }
    const coverImage = images[0] || 'https://placehold.co/600x400/f3f4f6/6b7280?text=Event';

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-gray-100">
            {/* Image Container with Aspect Ratio */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <img
                    src={coverImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Glass Badge for Status */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-medium tracking-wide text-gray-800">
                    <span className={cn("h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]", event.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500')} />
                    {event.status === 'published' ? 'Publicado' : 'Borrador'}
                </div>

                {/* Date Badge (Luma Style - often on top of image or very clean below) */}
                <div className="absolute bottom-3 left-3 glass px-3 py-1.5 rounded-lg flex flex-col items-center justify-center min-w-[50px]">
                    <span className="text-[10px] uppercase font-bold text-red-500 leading-none">{format(new Date(event.date), "MMM", { locale: es })}</span>
                    <span className="text-lg font-bold text-gray-900 leading-tight">{format(new Date(event.date), "d")}</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col p-4 pt-5">
                <div className="mb-4">
                    <h3 className="font-bold text-[17px] leading-snug text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{event.space?.name || 'Ubicación por definir'}</span>
                    </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-5">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{format(new Date(event.startTime), "HH:mm")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.capacity}</span>
                    </div>
                </div>

                {/* Actions - Subtle and Clean: Always visible for admin dash usability */}
                <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                    <Link href={`/events/${event.id}/edit`} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "text-gray-500 hover:text-gray-900 border border-transparent hover:bg-gray-50 h-8 rounded-lg text-xs font-medium")}>
                        Editar
                    </Link>
                    <Link href={`/sales?eventId=${event.id}`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 h-8 rounded-lg text-xs font-medium shadow-sm")}>
                        Ver Ventas
                    </Link>
                </div>
            </div>
        </div>
    );
}

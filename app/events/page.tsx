import { getEvents } from "@/app/actions";
import { EventCard } from "@/components/events/EventCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function EventsPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q;
    const events = await getEvents(query);

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Eventos</h1>
                    <p className="text-gray-500">Programa y administra tus fiestas y conciertos.</p>
                </div>
                <Link href="/events/new" className={cn(buttonVariants({}), "shrink-0")}>
                    <Plus className="w-4 h-4 mr-2" /> Crear Evento
                </Link>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <form>
                        <Input
                            name="q"
                            placeholder="Buscar eventos..."
                            className="pl-10"
                            defaultValue={query}
                        />
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
                {events.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No se encontraron eventos.
                    </div>
                )}
            </div>
        </div>
    );
}

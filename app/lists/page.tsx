import { getGuests, getEvents } from "@/app/actions";
import { GuestList } from "@/components/lists/GuestList";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function ListsPage({ searchParams }: { searchParams: { eventId?: string } }) {
    const eventId = searchParams.eventId;
    const events = await getEvents();
    const guests = await getGuests(eventId);

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Listas y Aprobaciones</h1>
                    <p className="text-gray-500">Gestiona el ingreso y listas de invitados.</p>
                </div>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                <Link
                    href="/lists"
                    className={cn(
                        buttonVariants({ variant: !eventId ? 'default' : 'outline', size: 'sm' }),
                        "whitespace-nowrap"
                    )}
                >
                    Todos
                </Link>
                {events.map(event => (
                    <Link
                        key={event.id}
                        href={`/lists?eventId=${event.id}`}
                        className={cn(
                            buttonVariants({ variant: eventId === event.id ? 'default' : 'outline', size: 'sm' }),
                            "whitespace-nowrap"
                        )}
                    >
                        {event.title}
                    </Link>
                ))}
            </div>

            <GuestList guests={guests} />
        </div>
    );
}

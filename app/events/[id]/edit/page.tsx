import { getEvent, getSpaces } from "@/app/actions";
import { EventForm } from "@/components/events/EventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
    const [event, spaces] = await Promise.all([
        getEvent(params.id),
        getSpaces()
    ]);

    if (!event) {
        notFound();
    }

    return (
        <div className="px-6">
            <EventForm event={event} spaces={spaces} />
        </div>
    );
}

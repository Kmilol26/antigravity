import { getSpaces } from "@/app/actions";
import { EventForm } from "@/components/events/EventForm";

export default async function NewEventPage() {
    const spaces = await getSpaces();
    return (
        <div className="px-6">
            <EventForm spaces={spaces} />
        </div>
    );
}

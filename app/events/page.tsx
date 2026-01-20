

import { EventNav } from "@/components/EventNav";
import { EventsListTab } from "@/components/events/EventsListTab";
import { cn } from "@/lib/utils";

const CONTAINER = "max-w-[820px] mx-auto px-6 w-full";
const eventName = "TikiFest";

// Using a Page instead of Layout+Page for /events to avoid conflict with /events/[id] nested layouts
import { getEvents } from "@/app/actions";

export default async function GlobalEventsPage() {
    const events = await getEvents();
    return (
        <div className="min-h-screen animate-in fade-in duration-500">
            {/* Header */}
            <div className={cn(CONTAINER, "py-1 flex justify-between items-center")}>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                        ✨
                    </div>
                    <h1 className="text-[32px] font-bold tracking-tight bg-gradient-to-r from-[#FE6535] to-[#9747FF] bg-clip-text text-transparent">
                        {eventName}
                    </h1>
                </div>
            </div>

            <EventNav eventId="123" activeTab="Eventos" />

            <div className={cn(CONTAINER, "py-8 space-y-8")}>
                <EventsListTab initialEvents={events} />
            </div>
        </div>
    );
}

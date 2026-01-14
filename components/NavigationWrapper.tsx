'use client';

import { usePathname } from "next/navigation";
import { BusinessNav } from "./BusinessNav";

export function NavigationWrapper() {
    const pathname = usePathname();

    // Check if we are in an Event Management route: /events/[id]
    // BUT NOTE: /events list is part of Business Nav. 
    // /events/[id] is the specific event dashboard.
    // Also need to exclude /events/new

    const isEventDashboard = pathname.startsWith('/events/') &&
        !pathname.endsWith('/events') &&
        !pathname.includes('/new');

    if (isEventDashboard) {
        return null; // Will be handled by the Page's internal layout or a new EventNav component later
    }

    return <BusinessNav />;
}

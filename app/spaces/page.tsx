import { EventSpacesTab } from "@/components/events/EventSpacesTab";
import { getSpaces } from "@/app/actions";

export default async function SpacesPage() {
    const spaces = await getSpaces();
    return <EventSpacesTab initialSpaces={spaces} />;
}

import { EventGeneralForm } from "@/components/events/EventGeneralForm";
import { getBusiness } from "@/app/actions";

export default async function BusinessPage() {
    const business = await getBusiness();

    // Create a default structure if no business exists (shouldn't happen with seed)
    const initialData = business || {
        id: "",
        name: "",
        contact: "",
        phone: "",
        website: "",
        instagram: "",
        address: "",
        categoryMessage: "",
        logo: "",
        banner: "",
    };

    return <EventGeneralForm initialData={initialData} />;
}

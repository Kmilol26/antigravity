import { EventPaymentsTab } from "@/components/events/EventPaymentsTab";
import { getPaymentMethods } from "@/app/actions";

export default async function PaymentsPage() {
    const methods = await getPaymentMethods();
    return <EventPaymentsTab initialMethods={methods} />;
}

import { getEvents, getSalesMetrics } from "@/app/actions";
import { SalesDashboard } from "@/components/sales/SalesDashboard";

export default async function SalesPage({ searchParams }: { searchParams: { eventId?: string } }) {
    const eventId = searchParams.eventId;
    const metrics = await getSalesMetrics(eventId);
    const events = await getEvents();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">Ventas</h1>
            <p className="text-gray-500 mb-8">Monitoreo de ingresos y tickets en tiempo real.</p>

            <SalesDashboard metrics={metrics} events={events} eventId={eventId} />
        </div>
    );
}

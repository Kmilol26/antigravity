import { getDashboardMetrics } from "@/app/actions";
import { MainDashboard } from "@/components/dashboard/MainDashboard";

export default async function DashboardPage() {
    const metrics = await getDashboardMetrics();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">Dashboard</h1>
            <p className="text-gray-500 mb-8">Resumen ejecutivo de tu operación.</p>

            <MainDashboard metrics={metrics} />
        </div>
    );
}

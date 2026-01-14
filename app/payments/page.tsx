import { getBusiness, getInvoices, getPlans } from "@/app/actions";
import { PaymentsPanel } from "@/components/payments/PaymentsPanel";

export default async function PaymentsPage() {
    const business = await getBusiness();
    const plans = await getPlans();
    const invoices = business ? await getInvoices(business.id) : [];

    if (!business) return <div>No business found.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">Planes y Facturación</h1>
            <p className="text-gray-500 mb-8">Administra tu suscripción y métodos de pago.</p>

            <PaymentsPanel business={business} plans={plans} invoices={invoices} />
        </div>
    );
}

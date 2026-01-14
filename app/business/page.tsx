import { getBusiness } from "@/app/actions";
import { BusinessForm } from "@/components/business/BusinessForm";

export default async function BusinessPage() {
    const business = await getBusiness();

    if (!business) {
        return <div>Cargando... No se encontró el negocio.</div>;
    }

    return (
        <div className="px-6">
            <BusinessForm business={business} />
        </div>
    );
}

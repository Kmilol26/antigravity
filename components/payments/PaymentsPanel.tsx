'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import { updatePlan } from "@/app/actions";
import { Check, CreditCard, Download, FileText } from "lucide-react";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function PaymentsPanel({ business, plans, invoices }: { business: any, plans: any[], invoices: any[] }) {
    const [isPending, startTransition] = useTransition();

    const handlePlanChange = (planId: string) => {
        if (confirm("¿Estás seguro de cambiar de plan? Esto afectará tu próxima facturación.")) {
            startTransition(async () => {
                await updatePlan(business.id, planId);
            });
        }
    };

    const handleRegisterBank = () => {
        alert("Simulación: Formulario de inscripción de cuenta bancaria abierto.");
    };

    return (
        <div className="space-y-12">

            {/* Plans Section */}
            <section className="px-6 md:px-0">
                <h2 className="text-xl font-bold mb-6">Tu Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => {
                        const isCurrent = business.planId === plan.id || (!business.planId && plan.name === 'Básico'); // Default logic
                        return (
                            <div key={plan.id} className={cn("p-6 rounded-xl border relative transition-all", isCurrent ? "border-primary bg-primary/5 shadow-md" : "bg-white hover:border-primary/50")}>
                                {isCurrent && (
                                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                        PLAN ACTUAL
                                    </div>
                                )}
                                <h3 className="font-bold text-lg">{plan.name}</h3>
                                <div className="text-3xl font-bold mt-2 mb-4">${plan.price}<span className="text-sm font-normal text-gray-500">/mes</span></div>
                                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                                    {JSON.parse(plan.features).map((feature: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className="w-full"
                                    variant={isCurrent ? "outline" : "default"}
                                    onClick={() => !isCurrent && handlePlanChange(plan.id)}
                                    disabled={isCurrent || isPending}
                                >
                                    {isCurrent ? "Plan Activo" : "Cambiar Plan"}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Billing Details & History */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <section className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold px-6 md:px-0">Historial de Facturación</h2>
                    <div className="bg-white rounded-lg border overflow-hidden mx-6 md:mx-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3">ID Factura</th>
                                        <th className="px-6 py-3">Fecha</th>
                                        <th className="px-6 py-3">Monto</th>
                                        <th className="px-6 py-3">Estado</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((inv) => (
                                        <tr key={inv.id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-xs">{inv.id.substring(0, 8)}</td>
                                            <td className="px-6 py-4">{new Date(inv.dueDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-bold">${inv.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs uppercase font-bold">
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {invoices.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay facturas registradas.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="space-y-6 px-6 md:px-0">
                    <h2 className="text-xl font-bold">Métodos de Pago</h2>
                    <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-8 h-8 text-gray-400" />
                            <div>
                                <p className="font-bold">Visa terminada en 4242</p>
                                <p className="text-xs text-gray-500">Expira 12/28</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mb-4">Editar tarjeta</Button>
                        <hr className="my-4" />
                        <h3 className="font-bold text-sm mb-2">Cuenta Bancaria</h3>
                        <p className="text-xs text-gray-500 mb-4">No hay cuenta registrada para dispersiones.</p>
                        <Button onClick={handleRegisterBank} className="w-full">Registrar Cuenta</Button>
                    </div>
                </section>
            </div>

        </div>
    );
}

'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SalesDashboard({ metrics, events, eventId }: { metrics: any, events: any[], eventId?: string }) {

    const handleDownloadCSV = () => {
        const headers = ['ID', 'Comprador', 'Email', 'Monto', 'Fecha', 'Evento'];
        const rows = metrics.sales.map((sale: any) => [
            sale.id,
            sale.buyerName,
            sale.buyerEmail,
            sale.amount,
            new Date(sale.createdAt).toLocaleDateString(),
            sale.eventId
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map((e: any[]) => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ventas_${eventId || 'global'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSendQR = () => {
        alert("Enviando QRs a todos los asistentes (Simulación)...");
    };

    return (
        <div className="space-y-8">
            {/* Event Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg border gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <Link
                        href="/sales"
                        className={cn(buttonVariants({ variant: !eventId ? 'default' : 'outline', size: 'sm' }), "whitespace-nowrap")}
                    >
                        Global
                    </Link>
                    {events.map(event => (
                        <Link
                            key={event.id}
                            href={`/sales?eventId=${event.id}`}
                            className={cn(buttonVariants({ variant: eventId === event.id ? 'default' : 'outline', size: 'sm' }), "whitespace-nowrap")}
                        >
                            {event.title}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleDownloadCSV}>
                        <Download className="w-4 h-4 mr-2" /> CSV
                    </Button>
                    <Button size="sm" onClick={handleSendQR}>
                        <QrCode className="w-4 h-4 mr-2" /> Enviar QR
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
                    <p className="text-3xl font-bold mt-2 text-primary">${metrics.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Tickets Vendidos</h3>
                    <p className="text-3xl font-bold mt-2">{metrics.totalTickets}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Ocupación</h3>
                    {eventId ? (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span>{metrics.progress.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${metrics.progress}%` }} />
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 mt-2">Selecciona un evento para ver ocupación</p>
                    )}
                </div>
            </div>

            {/* Sales Table */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-bold mb-4">Últimas Ventas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-3">Comprador</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Fecha</th>
                                <th className="px-4 py-3 text-right">Monto</th>
                                <th className="px-4 py-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.sales.map((sale: any) => (
                                <tr key={sale.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{sale.buyerName}</td>
                                    <td className="px-4 py-3 text-gray-500">{sale.buyerEmail}</td>
                                    <td className="px-4 py-3">{new Date(sale.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-right font-bold">${sale.amount}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                            {sale.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {metrics.sales.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No hay ventas registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

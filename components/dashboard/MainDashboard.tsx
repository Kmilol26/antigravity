'use client';

import { ArrowUpRight, DollarSign, Users, Ticket, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainDashboard({ metrics }: { metrics: any }) {
    return (
        <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card
                    title="Ingresos Totales"
                    value={`$${metrics.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    change="+12% vs mes anterior"
                    color="text-green-600"
                />
                <Card
                    title="Tickets Vendidos"
                    value={metrics.tickets.toString()}
                    icon={Ticket}
                    change="+5% vs mes anterior"
                    color="text-blue-600"
                />
                <Card
                    title="Eventos Activos"
                    value={metrics.activeEvents.toString()}
                    icon={Activity}
                    change="2 eventos esta semana"
                    color="text-primary"
                />
                <Card
                    title="Total Invitados"
                    value={metrics.totalGuests.toString()}
                    icon={Users}
                    change="+18% nuevos usuarios"
                    color="text-purple-600"
                />
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm overflow-hidden">
                    <h3 className="text-lg font-bold mb-6">Ingresos por Mes</h3>
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="h-64 flex items-end justify-between gap-2 min-w-[400px]">
                            {[40, 65, 55, 80, 45, 90].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-md transition-all group-hover:bg-primary/40 relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                                            ${h}k
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">{['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Últimas Ventas</h3>
                    <div className="space-y-4">
                        {metrics.recentSales.map((sale: any) => (
                            <div key={sale.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-sm">{sale.buyerName}</p>
                                    <p className="text-xs text-gray-500">{new Date(sale.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="font-bold text-green-600">+${sale.amount}</span>
                            </div>
                        ))}
                        {metrics.recentSales.length === 0 && <p className="text-gray-500 text-sm">No hay ventas recientes.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({ title, value, icon: Icon, change, color }: any) {
    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className={`p-2 rounded-full bg-gray-50 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-1">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                <span>{change}</span>
            </div>
        </div>
    );
}

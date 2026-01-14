'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CreditCard, Wallet, DollarSign, Package, TrendingUp, TrendingDown } from "lucide-react";

export function EventPaymentsTab() {
    const plans = [
        {
            name: 'Plan Básico',
            subtitle: 'Para comercios exclusivos',
            price: '29 USD',
            period: '/ al mes',
            features: [
                { text: 'Entradas virtuales ilimitadas', badge: 'Gratis', color: 'bg-green-500' },
                { text: '50% + 500 COP = Transacción de tickets o 5% por producto', badge: null },
                { text: 'Envío de WhatsApp gratis', badge: 'Gratis', color: 'bg-green-500' },
                { text: 'Envío de correo gratis', badge: 'Gratis', color: 'bg-green-500' },
            ],
            featured: false
        },
        {
            name: 'Plan estándar',
            subtitle: 'Para comercios correctos',
            price: '75 USD',
            period: '/ al mes',
            features: [
                { text: 'Todas las características del plan anterior', badge: null },
                { text: 'Gratis de 90% por boleto o producto', badge: 'Gratis', color: 'bg-green-500' },
                { text: 'Todo lo que incluye el plan anterior + además Exportación de listas de asistentes', badge: null },
                { text: '0% en compra de tickets', badge: 'Gratis', color: 'bg-green-500' },
            ],
            featured: false
        },
        {
            name: 'Administrado',
            subtitle: 'Para el negocio más grande',
            price: '150 USD',
            period: '/ al mes',
            features: [
                { text: 'Consultas de un negocio experto', badge: null },
                { text: '0% en compra de tickets', badge: 'GRATIS', color: 'bg-purple-500' },
                { text: 'Gestiones de Loterias', badge: 'NUEVO', color: 'bg-orange-500' },
                { text: 'Gestiones de Loterias', badge: 'NUEVO', color: 'bg-orange-500' },
                { text: 'Exportar transacciones', badge: 'NUEVO', color: 'bg-orange-500' },
                { text: 'Reportes detallados', badge: 'NUEVO', color: 'bg-orange-500' },
            ],
            featured: true
        },
    ];

    const salesHistory = [
        { entity: 'Grupo FFFabuloso', date: '30 / Mayo / 2025', amount: '150.000 pesos', status: 'Realizado', statusColor: 'bg-green-100 text-green-700' },
        { entity: 'Grupo FFFabuloso', date: '30 / Abril / 2025', amount: '50.000 pesos', status: 'Pendiente', statusColor: 'bg-yellow-100 text-yellow-700' },
        { entity: 'Grupo FFFabuloso', date: '30 / Mayo / 2025', amount: '100.000 pesos', status: 'Realizado', statusColor: 'bg-green-100 text-green-700' },
    ];

    const paymentHistory = [
        { entity: 'Grupo FFFabuloso', date: '30 / Mayo / 2025', amount: '15.000 pesos', status: 'Concluido', statusColor: 'bg-green-100 text-green-700' },
        { entity: 'Grupo FFFabuloso', date: '30 / Abril / 2025', amount: '100.000 pesos', status: 'Concluido', statusColor: 'bg-green-100 text-green-700' },
        { entity: 'Grupo FFFabuloso', date: '30 / Mayo / 2025', amount: '50.000 pesos', status: 'Reprobado', statusColor: 'bg-red-100 text-red-700' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-[820px] mx-auto pb-20">

            {/* Revenue Summary */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Venta de entradas</h2>
                    <p className="text-base text-gray-500 mt-1">Resumen de ventas de tu grupo empresarial</p>
                </div>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[280px] h-10 border-[#FE6535] text-sm font-medium rounded-lg">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los negocios</SelectItem>
                        <SelectItem value="Monaco">Monaco Rooftop</SelectItem>
                        <SelectItem value="tabu">Tabu Studio Bar</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Actividad Metrics */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actividad</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-3 bg-purple-500 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Venta al tiempo</div>
                            <div className="text-2xl font-bold text-purple-600">1,000,000 COP</div>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Más usado</div>
                            <div className="text-2xl font-bold text-green-600">900,000 COP</div>
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-[#FE6535] rounded-xl p-4 flex items-center gap-3">
                        <div className="p-3 bg-orange-500 rounded-lg">
                            <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Entrega variable</div>
                            <div className="text-2xl font-bold text-orange-600">50 EA</div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-3 bg-red-500 rounded-lg">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Perdida vendida</div>
                            <div className="text-2xl font-bold text-red-600">100 EA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Plan */}
            <div className="border border-[#FE6535] rounded-xl p-6 bg-orange-50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500 rounded-lg">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Plan Actual</h3>
                        <p className="text-xs text-gray-500">Resumen de tu suscripción activo</p>
                    </div>
                </div>

                <div className="bg-white border border-[#FE6535] rounded-lg p-4 mt-4">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Plan vigente</div>
                        <div className="text-sm font-bold text-gray-900">BASIC</div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-orange-600">29 USD</span>
                        <span className="text-sm text-gray-500">/ al mes</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <div className="text-xs text-gray-500">Espacios activos</div>
                        <div className="text-xl font-bold text-gray-900">10</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Total facturado</div>
                        <div className="text-xl font-bold text-gray-900">300 USD</div>
                    </div>
                </div>

                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold">
                    Cambiar plan
                </Button>
            </div>

            {/* Plan Comparisons */}
            <div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Resumen de tu plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <button className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            Para empresas sencillas
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`border rounded-xl p-5 ${plan.featured ? 'border-orange-300 bg-orange-50/30' : 'border-[#FE6535] bg-white'}`}
                        >
                            <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-1">{plan.subtitle}</div>
                                <div className="text-base font-bold text-gray-900">{plan.name}</div>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-orange-600">{plan.price}</span>
                                    <span className="text-xs text-gray-500">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start gap-2 text-[10px] leading-relaxed">
                                        <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <span className="text-gray-700">{feature.text}</span>
                                            {feature.badge && (
                                                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${feature.color}`}>
                                                    {feature.badge}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full ${plan.featured ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                                variant={plan.featured ? 'default' : 'ghost'}
                            >
                                Obtener plan
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method */}
            <div className="border border-[#FE6535] rounded-xl p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Método de pago</h3>
                <p className="text-xs text-gray-500 mb-4">Añade una tarjeta o el modelo de pago compatible con Stripe que en Tikipal puedes continuar operaciones</p>

                <div className="flex gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">*</span>
                    </div>
                </div>

                <Button variant="secondary" className="mt-4 border-[#FE6535]">
                    Obtener ↗
                </Button>
            </div>

            {/* Bank Account */}
            <div className="border border-[#FE6535] rounded-xl p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cuenta bancaria</h3>
                <p className="text-xs text-gray-500 mb-4">Registra una cuenta de cliente con el de Tikipal</p>

                <Button variant="secondary" className="border-[#FE6535]">
                    Obtener ↗
                </Button>
            </div>

            {/* Sales History */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Historial de ventas</h3>
                <div className="border border-[#FE6535] rounded-xl overflow-hidden">
                    <table className="w-full text-xs">
                        <thead className="bg-gray-50 border-b border-[#FE6535]">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-600">Entidad</th>
                                <th className="text-left p-3 font-medium text-gray-600">Fecha</th>
                                <th className="text-right p-3 font-medium text-gray-600">Monto</th>
                                <th className="text-center p-3 font-medium text-gray-600">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesHistory.map((sale, idx) => (
                                <tr key={idx} className="border-b border-gray-100 last:border-0">
                                    <td className="p-3 text-gray-700 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        {sale.entity}
                                    </td>
                                    <td className="p-3 text-gray-500">{sale.date}</td>
                                    <td className="p-3 text-right font-bold text-gray-900">{sale.amount}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${sale.statusColor}`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment History */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Historial de pagos</h3>
                <div className="border border-[#FE6535] rounded-xl overflow-hidden">
                    <table className="w-full text-xs">
                        <thead className="bg-gray-50 border-b border-[#FE6535]">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-600">Entidad</th>
                                <th className="text-left p-3 font-medium text-gray-600">Fecha</th>
                                <th className="text-right p-3 font-medium text-gray-600">Monto</th>
                                <th className="text-center p-3 font-medium text-gray-600">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, idx) => (
                                <tr key={idx} className="border-b border-gray-100 last:border-0">
                                    <td className="p-3 text-gray-700 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        {payment.entity}
                                    </td>
                                    <td className="p-3 text-gray-500">{payment.date}</td>
                                    <td className="p-3 text-right font-bold text-gray-900">{payment.amount}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${payment.statusColor}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

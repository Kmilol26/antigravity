'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CreditCard, Wallet, DollarSign, Package, Lock, Ticket, Building2 } from "lucide-react";
import { CreditCardForm } from "@/components/payments/CreditCardForm";
import { BankAccountForm } from "@/components/payments/BankAccountForm";
import { useState } from "react";

export function EventPaymentsTab({ initialMethods = [] }: { initialMethods?: any[] }) {
    const [addingCard, setAddingCard] = useState(false);
    const [addingBank, setAddingBank] = useState(false);

    // Separate methods by type
    const cards = initialMethods.filter(m => m.type === 'credit_card');
    const banks = initialMethods.filter(m => m.type === 'bank_account');

    const plans = [
        {
            name: 'Basic',
            subtitle: 'Para comercios',
            price: '29 USD',
            period: '/ al mes',
            features: [
                { text: 'Perfil de categoria', badge: '1', color: 'bg-green-100' },
                { text: 'Entradas Emitidas', badge: '1.200', color: 'bg-green-100' },
                { text: 'Envios de Whatsapp', badge: '1.200', color: 'bg-green-100' },
                { text: 'Envios de correos', badge: '3.600', color: 'bg-green-100' },
                { text: 'Qr en puerta del comercio', badge: null },
                { text: 'Dashboard en tiempo real', badge: null },
                { text: 'Descarga de Usuarios', badge: null },
                { text: 'Codigos identificador Referidos', badge: null },
                { text: 'Servicio de Escaneo', badge: null },
                { text: 'Creacion eventos ilimitados', badge: null },
            ],
            featured: false
        },
        {
            name: 'Pro',
            subtitle: 'Para medianos comercios',
            price: '75 USD',
            period: '/ al mes',
            features: [
                { text: 'Perfiles de categoria', badge: '3', color: 'bg-amber-100' },
                { text: 'Entradas emitidas', badge: '3.000', color: 'bg-amber-100' },
                { text: 'Envios de Whatsapp', badge: '3.000', color: 'bg-amber-100' },
                { text: 'Envios de correos', badge: '9.000', color: 'bg-amber-100' },
            ],
            featured: false
        },
        {
            name: 'Advanced',
            subtitle: 'A medida que tu negocio escala',
            price: '150 USD',
            period: '/ al mes',
            features: [
                { text: 'Perfiles de categoria', badge: '10', color: 'bg-violet-100' },
                { text: 'Entradas emitidas', badge: '6.000', color: 'bg-violet-100' },
                { text: 'Envios de Whatsapp', badge: '6.000', color: 'bg-violet-100' },
                { text: 'Envios de correos', badge: '18.000', color: 'bg-violet-100' },
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
                    <h2 className="text-xl font-bold text-gray-900">Resumen de Ventas</h2>
                    <p className="text-base text-gray-500 mt-1">Resumen de ventas de tu grupo empresarial</p>
                </div>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[280px] h-10 glass-input text-sm font-medium rounded-xl">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos los Negocios">Todos los negocios</SelectItem>
                        <SelectItem value="Monaco">Monaco Rooftop</SelectItem>
                        <SelectItem value="tabu">Tabu Studio Bar</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Actividad - imagen */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actividad</h3>

                <div className="grid grid-cols-2 gap-6">
                    <div className="glass-card flex items-start gap-4 p-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">Ingresos todo el tiempo</div>
                            <div className="text-2xl font-bold text-[#FE6535]">1.000.000 COP</div>
                        </div>
                    </div>

                    <div className="glass-card flex items-start gap-4 p-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                                <Ticket className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">Ventas mes pasado</div>
                            <div className="text-2xl font-bold text-[#FE6535]">500.000 COP</div>
                        </div>
                    </div>

                    <div className="glass-card flex items-start gap-4 p-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                                <Lock className="w-5 h-5 text-yellow-600" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">Entradas vendidas todo el tiempo </div>
                            <div className="text-2xl font-bold text-[#FE6535]">1245</div>
                        </div>
                    </div>

                    <div className="glass-card flex items-start gap-4 p-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                                <Package className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">Entradas vendidas mes</div>
                            <div className="text-2xl font-bold text-[#FE6535]">866</div>
                        </div>
                    </div>
                </div>

                <Button className="mt-6 bg-[#FE6535] px-6 py-2 rounded-xl text-white shadow-lg shadow-orange-500/30 hover:bg-[#FF7A50] hover:scale-105 transition-all">Cobrar</Button>
            </div>

            {/* Plan tikipal */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plan tikipal</h3>
                <p className="text-sm text-gray-600 mb-4">Resumen de suscripciones y espacios activos</p>

                <div className="glass-panel p-6">
                    <div className="grid grid-cols-3 gap-6 items-start">
                        <div className="flex flex-col items-start text-left">
                            <div className="text-sm text-gray-600 font-medium">Plan vigente</div>
                            <div className="text-4xl font-light text-[#9747FF]">Basic</div>
                        </div>

                        <div className="flex flex-col items-start text-left">
                            <div className="text-sm text-gray-600 font-medium">Costo plan</div>
                            <div className="text-4xl font-light text-[#FE6535]">29 USD</div>
                            <div className="text-xs text-gray-500">USD al mes</div>
                        </div>

                        <div className="flex flex-col items-start text-left">
                            <div className="text-sm text-gray-600 font-medium">Emisiones extra</div>
                            <div className="text-4xl font-light text-[#FE6535]">7.2¢</div>
                            <div className="text-xs text-gray-500">(300 COP)</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                        <div>
                            <div className="text-sm text-gray-600 font-medium">Espacios activos</div>
                            <div className="text-4xl font-light text-[#FE6535]">10</div>
                        </div>

                        <div className="col-start-2">
                            <div className="text-sm text-gray-600 font-medium">Total facturado</div>
                            <div className="text-4xl font-light text-[#FE6535]">300 USD</div>
                        </div>

                        <div />
                    </div>
                </div>

                <Button className="mt-6 bg-[#FE6535] px-6 py-2 rounded-xl text-white shadow-lg shadow-orange-500/30 hover:bg-[#FF7A50] hover:scale-105 transition-all">Aumenta tu plan</Button>
            </div>

            {/* Plan Comparisons */}
            <div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Resumen de tu plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <button className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                            Para empresas sencillas
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-center">
                    {plans.map((plan, idx) => {
                        const isCurrent = idx === 0;
                        return (
                            <div key={plan.name} className="max-w-[323px] w-full h-[592px]">
                                <div className={`glass-panel p-3 flex flex-col h-full hover:shadow-lg transition-shadow ${isCurrent ? 'ring-2 ring-green-400 shadow-green-100' : ''}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="min-w-0">
                                            <h4 className={`text-2xl font-medium leading-tight truncate ${isCurrent ? 'bg-gradient-to-r from-[#FE6EA1] to-[#9747FF] bg-clip-text text-transparent' : idx === 1 ? 'bg-gradient-to-r from-[#9747FF] to-[#FE6EA1] bg-clip-text text-transparent' : 'bg-gradient-to-r from-[#FE6535] to-[#9747FF] bg-clip-text text-transparent'}`}>{plan.name.replace('Plan ', '')}</h4>
                                            <div className="text-xs text-gray-600 mt-1">{plan.subtitle}</div>
                                        </div>

                                        {isCurrent && (
                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold mt-1">Plan actual</span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-4xl font-light tracking-tight text-[#FE6535]">{plan.price.replace(' USD', '')}</div>
                                            <div className="text-sm font-medium text-gray-700">USD</div>
                                            <div className="text-xs text-gray-500 ml-2">{plan.period.replace('/', '').trim()}</div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 pb-2">
                                        <div className="mb-2">
                                            <div className="font-semibold mb-1 text-sm">Tarifas de cobro a partir de</div>
                                            <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700 mb-2">
                                                <li>3.9 % + 900 COP + Impuestos</li>
                                                <li>300 COP en invitaciones y cortesías adicionales</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <div className="font-semibold mb-1 text-sm">Funciones destacadas</div>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                {plan.features.map((feature, fidx) => (
                                                    <li key={fidx} className="flex items-start gap-2">
                                                        <Check className="w-3 h-3 text-gray-600 flex-shrink-0 mt-0.5" />
                                                        <div className="flex items-center gap-2">
                                                            {feature.badge && (
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${feature.color ? feature.color : 'bg-gray-100'}`}>{feature.badge}</span>
                                                            )}
                                                            <span className="text-sm text-gray-700">{feature.text}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {!isCurrent && (
                                        <div className="mt-2">
                                            <Button className="w-full py-2 text-sm bg-[#FE6535] hover:bg-[#e85c30] text-white font-medium rounded-xl shadow-md">Aumenta tu plan</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Payment Method */}
            <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Método de pago (Tarjetas)</h3>
                <p className="text-xs text-gray-500 mb-4">Añade una tarjeta para continuar operaciones</p>

                {/* List existing cards */}
                {cards.length > 0 && (
                    <div className="mb-4 space-y-2">
                        {cards.map((card: any) => (
                            <div key={card.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-6 bg-gray-800 rounded text-white flex items-center justify-center text-[10px]">Your</div>
                                    <span className="text-sm font-medium">**** {card.last4}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {addingCard ? (
                    <CreditCardForm onCancel={() => setAddingCard(false)} onSuccess={() => setAddingCard(false)} />
                ) : (
                    <div className="flex flex-col gap-3">
                        {cards.length === 0 && (
                            <div className="flex gap-3">
                                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center shadow-sm">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}

                        <Button variant="secondary" className="border-gray-200 bg-white self-start hover:bg-gray-50" onClick={() => setAddingCard(true)}>
                            {cards.length > 0 ? 'Agregar otra tarjeta +' : 'Agregar Tarjeta +'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Bank Account */}
            <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cuenta bancaria</h3>
                <p className="text-xs text-gray-500 mb-4">Registra una cuenta de cliente para recibir pagos</p>

                {/* List existing banks */}
                {banks.length > 0 && (
                    <div className="mb-4 space-y-2">
                        {banks.map((bank: any) => (
                            <div key={bank.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{bank.bankName}</span>
                                        <span className="text-xs text-gray-500">**** {bank.last4}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {addingBank ? (
                    <BankAccountForm onCancel={() => setAddingBank(false)} onSuccess={() => setAddingBank(false)} />
                ) : (
                    <Button variant="secondary" className="border-gray-200 bg-white hover:bg-gray-50" onClick={() => setAddingBank(true)}>
                        {banks.length > 0 ? 'Agregar otra cuenta +' : 'Agregar Cuenta +'}
                    </Button>
                )}
            </div>

            {/* Sales History */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Historial de ventas</h3>
                <div className="glass-panel overflow-hidden">
                    <table className="w-full text-xs">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-700">Entidad</th>
                                <th className="text-left p-3 font-medium text-gray-700">Fecha</th>
                                <th className="text-right p-3 font-medium text-gray-700">Monto</th>
                                <th className="text-center p-3 font-medium text-gray-700">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesHistory.map((sale, idx) => (
                                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-gray-800 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm"></div>
                                        {sale.entity}
                                    </td>
                                    <td className="p-3 text-gray-600">{sale.date}</td>
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
                <div className="glass-panel overflow-hidden">
                    <table className="w-full text-xs">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-700">Entidad</th>
                                <th className="text-left p-3 font-medium text-gray-700">Fecha</th>
                                <th className="text-right p-3 font-medium text-gray-700">Monto</th>
                                <th className="text-center p-3 font-medium text-gray-700">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, idx) => (
                                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-gray-800 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm"></div>
                                        {payment.entity}
                                    </td>
                                    <td className="p-3 text-gray-600">{payment.date}</td>
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

'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DoorOpen, Ticket as TicketIcon, Users } from "lucide-react";

export function EventDashboardTab() {
    // Mock data for charts and tables
    const periodUsers = [
        { email: 'sam.villegas16@gmail.com', id: '919084793', count: 8 },
        { email: 'ekessler@gmail.com', id: '918319870', count: 8 },
        { email: 'ckessler01@gmail.com', id: '930647990', count: 7 },
        { email: 'juan.carlos@gmail.com', id: '917668747', count: 7 },
        { email: 'maria.gonzalez@gmail.com', id: '920845612', count: 6 },
        { email: 'jorge.martinez@gmail.com', id: '915623891', count: 6 },
        { email: 'andrea.lopez@gmail.com', id: '917845239', count: 5 },
        { email: 'ricardo.perez@gmail.com', id: '918756342', count: 5 },
    ];

    const allTimeUsers = [
        { email: 'sam.villegas16@gmail.com', id: '919084793', count: 9 },
        { email: 'ekessler@gmail.com', id: '918319870', count: 9 },
        { email: 'ckessler01@gmail.com', id: '930647990', count: 7 },
        { email: 'juan.carlos@gmail.com', id: '917668747', count: 7 },
        { email: 'pedro.sanchez@gmail.com', id: '912459873', count: 6 },
        { email: 'laura.rodriguez@gmail.com', id: '914785623', count: 5 },
        { email: 'alberto.jimenez@gmail.com', id: '913568974', count: 4 },
        { email: 'sofia.fernandez@gmail.com', id: '916847532', count: 4 },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-[820px] mx-auto pb-20">

            {/* Welcome Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Bienvenido a tu información</h2>
                <p className="text-base text-gray-500 mt-1">Datos globales del grupo empresarial</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-3 gap-4">
                {/* Entradas */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl h-[55px] px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                            <DoorOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-gray-700">Entradas</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none">3</div>
                </div>

                {/* Tickets */}
                <div className="bg-green-50 border border-green-200 rounded-xl h-[55px] px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                            <TicketIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-gray-700">Tickets</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none">44</div>
                </div>

                {/* Asistieron */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl h-[55px] px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-gray-700">Asistieron</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none">9</div>
                </div>
            </div>


            {/* Information by Space/Event */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Información por espacio o evento</h3>
                    <p className="text-base text-gray-500 mt-1">Elige la que quieras revisar</p>
                </div>

                <div className="flex gap-4 items-center w-full flex-nowrap">
                    <Select defaultValue="Todos">
                        <SelectTrigger className="w-full flex-1 h-12 border-[#FE6535] text-base font-medium rounded-lg">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todos">Todos</SelectItem>
                            <SelectItem value="Monaco">Monaco Rooftop</SelectItem>
                            <SelectItem value="Tabu">Tabu Studio Bar</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="05, Junio,2025">
                        <SelectTrigger className="w-full flex-1 h-12 border-[#FE6535] text-base font-medium rounded-lg">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="jun05">05,Junio, 2025</SelectItem>
                            <SelectItem value="jun21">21,Junio, 2025</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="21, Junio, 2025">
                        <SelectTrigger className="w-full flex-1 h-12 border-[#FE6535] text-base font-medium rounded-lg">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="jun21">21,Junio, 2025</SelectItem>
                            <SelectItem value="jun22">22,Junio, 2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tickets por periodo & Gráfica */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Tickets por periodo */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Tickets por periodo</h3>
                        <p className="text-base text-gray-500 mt-1">Ventas en el periodo que seleccionaste</p>
                    </div>

                    {/* Pills */}
                    <div className="flex gap-4 pt-2 flex-wrap">
                        <div className="h-12 px-7 rounded-xl bg-[#FE6535] text-white flex items-center justify-center">
                            <div className="text-center leading-none">
                                <div className="text-lg font-bold leading-none">50</div>
                                <div className="text-base font-medium leading-none mt-0.5">Asistieron</div>
                            </div>
                        </div>

                        <div className="h-12 px-7 rounded-xl border border-[#FE6535] bg-white flex items-center justify-center">
                            <div className="text-center leading-none">
                                <div className="text-lg font-bold text-[#FE6535] leading-none">10</div>
                                <div className="text-base font-medium text-gray-900 leading-none mt-0.5">No asistieron</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla (más angosta) */}
                    <div className="border border-[#FE6535] rounded-2xl p-8 w-full max-w-[520px]">
                        <div className="space-y-7">
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-700">Intentos de compra</span>
                                <span className="text-lg font-bold text-[#FE6535]">80</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-700">Tickets</span>
                                <span className="text-lg font-bold text-[#FE6535]">10</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-700">Entradas</span>
                                <span className="text-lg font-bold text-[#FE6535]">60</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-700">Usados</span>
                                <span className="text-lg font-bold text-[#FE6535]">50</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Gráfica periodo */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Gráfica de ventas periodo</h3>
                        <p className="text-base text-gray-500 mt-1">Comparativo visual del periodo seleccionado</p>
                    </div>

                    <div className="border border-[#FE6535] rounded-2xl p-6">
                        {/* Toggle buttons alineados con pills */}
                        <div className="flex gap-4 pt-2 flex-wrap justify-center">
                            <button className="h-12 px-7 rounded-xl bg-[#FE6535] text-white flex items-center justify-center">
                                <span className="text-base font-medium">Por tickets</span>
                            </button>
                            <button className="h-12 px-7 rounded-xl border border-[#FE6535] bg-white flex items-center justify-center">
                                <span className="text-base font-medium text-gray-900">Por entradas</span>
                            </button>
                        </div>

                        <div className="h-48 flex items-end gap-2 justify-around mt-6">
                            {[3, 4, 3, 5, 7, 6, 8, 7, 6, 9].map((height, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                                    <div
                                        className="w-full bg-[#FE6535] rounded-t-md"
                                        style={{ height: `${height * 10}%` }}
                                    />
                                    <span className="text-[10px] text-gray-400">{idx + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tickets todo el tiempo & Gráfica */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* Left: Tickets todo el tiempo */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Tickets todo el tiempo</h3>
                        <p className="text-base text-gray-500 mt-1">Ventas en todo el tiempo de operación</p>
                    </div>

                    {/* Pills */}
                    <div className="flex gap-4 pt-2 flex-wrap">
                        <div className="h-12 px-7 rounded-xl bg-[#FE6535] text-white flex items-center justify-center">
                            <div className="text-center leading-none">
                                <div className="text-lg font-bold leading-none">200</div>
                                <div className="text-base font-medium leading-none mt-0.5">Asistieron</div>
                            </div>
                        </div>

                        <div className="h-12 px-7 rounded-xl border border-[#FE6535] bg-white flex items-center justify-center">
                            <div className="text-center leading-none">
                                <div className="text-lg font-bold text-[#FE6535] leading-none">50</div>
                                <div className="text-base font-medium text-gray-900 leading-none mt-0.5">No asistieron</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla (más angosta) */}
                    <div className="border border-[#FE6535] rounded-2xl p-8 w-full max-w-[520px]">
                        <div className="space-y-7">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-700">Intentos de compra</span>
                                <span className="text-base font-bold text-[#FE6535]">600</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-700">Tickets</span>
                                <span className="text-base font-bold text-[#FE6535]">100</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-700">Entradas</span>
                                <span className="text-base font-bold text-[#FE6535]">300</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-700">Usados</span>
                                <span className="text-base font-bold text-[#FE6535]">200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Gráfica todo el tiempo */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Gráfica de ventas todo el tiempo</h3>
                        <p className="text-base text-gray-500 mt-1">Comparativo histórico</p>
                    </div>

                    <div className="border border-[#FE6535] rounded-2xl p-6">
                        <div className="flex gap-4 pt-2 flex-wrap justify-center">
                            <button className="h-12 px-7 rounded-xl bg-[#FE6535] text-white flex items-center justify-center">
                                <span className="text-base font-medium">Por tickets</span>
                            </button>
                            <button className="h-12 px-7 rounded-xl border border-[#FE6535] bg-white flex items-center justify-center">
                                <span className="text-base font-medium text-gray-900">Por entradas</span>
                            </button>
                        </div>

                        <div className="h-48 flex items-end gap-2 justify-around mt-6">
                            {[4, 5, 4, 6, 8, 7, 9, 8, 7, 9].map((height, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                                    <div
                                        className="w-full bg-[#FE6535] rounded-t-md"
                                        style={{ height: `${height * 10}%` }}
                                    />
                                    <span className="text-[10px] text-gray-400">{idx + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* User Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Usuarios - Periodo */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Usuarios</h3>
                            <p className="text-base text-gray-500">En el periodo seleccionado</p>
                        </div>
                        <button className="text-xs text-orange-500 font-medium hover:underline">Descargar lista ↗</button>
                    </div>

                    <div className="border border-[#FE6535] rounded-xl overflow-hidden">
                        <table className="w-full text-[11px]">
                            <thead className="bg-gray-50 border-b border-[#FE6535]">
                                <tr>
                                    <th className="text-left p-2.5 font-medium text-gray-600">Usuario</th>
                                    <th className="text-left p-2.5 font-medium text-gray-600">ID Único</th>
                                    <th className="text-right p-2.5 font-medium text-gray-600">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {periodUsers.slice(0, 8).map((user, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="p-2.5 text-gray-700">{user.email}</td>
                                        <td className="p-2.5 text-gray-500">{user.id}</td>
                                        <td className="p-2.5 text-right font-bold text-gray-900">{user.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-between">
                            <div className="text-[10px] text-gray-500">1-8 de 20</div>
                            <div className="flex gap-2">
                                <button className="text-[10px] text-gray-400 hover:text-gray-600">Primera página</button>
                                <button className="text-[10px] text-orange-500 font-medium">1 ↓</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Todos los Usuarios - All Time */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Todos los Usuarios</h3>
                            <p className="text-base text-gray-500">Todo el Tiempo</p>
                        </div>
                        <button className="text-xs text-orange-500 font-medium hover:underline">Descargar lista ↗</button>
                    </div>

                    <div className="border border-[#FE6535] rounded-xl overflow-hidden">
                        <table className="w-full text-[11px]">
                            <thead className="bg-gray-50 border-b border-[#FE6535]">
                                <tr>
                                    <th className="text-left p-2.5 font-medium text-gray-600">Usuario</th>
                                    <th className="text-left p-2.5 font-medium text-gray-600">ID Único</th>
                                    <th className="text-right p-2.5 font-medium text-gray-600">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTimeUsers.slice(0, 8).map((user, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="p-2.5 text-gray-700">{user.email}</td>
                                        <td className="p-2.5 text-gray-500">{user.id}</td>
                                        <td className="p-2.5 text-right font-bold text-gray-900">{user.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-between">
                            <div className="text-[10px] text-gray-500">1-8 de 20</div>
                            <div className="flex gap-2">
                                <button className="text-[10px] text-gray-400 hover:text-gray-600">Primera página</button>
                                <button className="text-[10px] text-orange-500 font-medium">1 ↓</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

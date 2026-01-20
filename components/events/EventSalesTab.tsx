'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Ticket, QrCode } from "lucide-react";

export function EventSalesTab() {
    // Mock Data for Attendee List
    const attendees = [
        { id: 1, name: 'Camilo Acosta', list: 'Lista redes', status: 'Asistira' },
        { id: 2, name: 'Jobelo Quintero', list: 'Lista Sonia', status: 'Asistira' },
        { id: 3, name: 'Sebastian Llano', list: 'Lista Instagram', status: 'Asistira' },
        { id: 4, name: 'Carlos Martinez', list: 'Lista Promotor 1', status: 'Asistira' },
        { id: 5, name: 'Mariana Hoyos', list: 'Lista Promotor 2', status: 'Asistira' },
        { id: 6, name: 'Sebastian Perez', list: 'Lista Promotor 3', status: 'Asistira' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-3xl mx-auto pb-20 px-4 md:px-0">

            {/* Filters Section */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Espacios o eventos activos</h3>
                    <p className="text-base text-gray-500">Selecciona el espacio/evento</p>
                    <Select defaultValue="Monaco">
                        <SelectTrigger className="w-full sm:w-[280px] h-10 glass-input text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-2">
                                <Ticket className="w-3.5 h-3.5 text-gray-500" />
                                <SelectValue placeholder="Selecciona..." />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Monaco">Monaco Rooftop</SelectItem>
                            <SelectItem value="tabu">Tabu Studio Bar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Fechas activas</h3>
                    <p className="text-base text-gray-500">Selecciona la fecha de operación</p>
                    <Select defaultValue="jun05">
                        <SelectTrigger className="w-full sm:w-[280px] h-10 glass-input text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-2">
                                <Ticket className="w-3.5 h-3.5 text-gray-500" />
                                <SelectValue placeholder="Selecciona..." />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="jun05">05/Junio/2025</SelectItem>
                            <SelectItem value="jun06">06/Junio/2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Actividad / Progress Section */}
            <div className="space-y-2">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Actividad</h2>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-bold text-green-600">50 tickets</span>
                        </div>
                    </div>
                    <div className="text-xl text-red-500 font-bold">
                        limite <span className="text-xl">500</span>
                    </div>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div className="h-full bg-green-500 w-[10%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
            </div>

            {/* Resumen de tickets Card — Responsive width */}
            <div className="w-full sm:w-[330px] glass-panel px-6 py-6 overflow-hidden hover:shadow-md transition-shadow">
                <h3 className="text-[16px] font-medium text-black leading-none mb-6">
                    Resumen de tickets
                </h3>

                <div className="space-y-5">
                    {/* Row */}
                    <div className="flex items-center justify-between">
                        <div className="h-[26px] w-[185px] rounded-2xl bg-[#F4C542] flex items-center gap-3 px-3 shadow-md">
                            <div className="h-[24px] w-[34px] -ml-1 rounded-lg bg-white/25 flex items-center justify-center">
                                <span className="text-[16px] leading-none">🔒</span>
                            </div>
                            <span className="text-[16px] text-white font-medium leading-none">Intentos</span>
                        </div>

                        <div className="h-[26px] w-[78px] rounded-2xl bg-orange-100 flex items-center justify-center border border-gray-200">
                            <span className="text-[16px] font-medium text-[#FE6535] leading-none">80</span>
                        </div>
                    </div>

                    {/* Row */}
                    <div className="flex items-center justify-between">
                        <div className="h-[26px] w-[185px] rounded-2xl bg-[#4CAF50] flex items-center gap-3 px-3 shadow-md">
                            <div className="h-[24px] w-[34px] -ml-1 rounded-lg bg-white/25 flex items-center justify-center">
                                <span className="text-[16px] leading-none">🎟</span>
                            </div>
                            <span className="text-[16px] text-white font-medium leading-none">Tickets</span>
                        </div>

                        <div className="h-[26px] w-[78px] rounded-2xl bg-green-100 flex items-center justify-center border border-gray-200">
                            <span className="text-[16px] font-medium text-[#2E7D32] leading-none">50</span>
                        </div>
                    </div>

                    {/* Row */}
                    <div className="flex items-center justify-between">
                        <div className="h-[34px] w-[185px] rounded-2xl bg-[#FE6535] flex items-center gap-3 px-3 shadow-md">
                            <div className="h-[24px] w-[34px] -ml-1 rounded-lg bg-white/25 flex items-center justify-center">
                                <span className="text-[16px] leading-none">🚪</span>
                            </div>
                            <span className="text-[16px] text-white font-medium leading-none">Entradas</span>
                        </div>

                        <div className="h-[34px] w-[78px] rounded-2xl bg-orange-100 flex items-center justify-center border border-gray-200">
                            <span className="text-[16px] font-medium text-[#FE6535] leading-none">60</span>
                        </div>
                    </div>

                    {/* Row */}
                    <div className="flex items-center justify-between">
                        <div className="h-[34px] w-[185px] rounded-2xl bg-[#A78BFA] flex items-center gap-3 px-3 shadow-md">
                            <div className="h-[24px] w-[34px] -ml-1 rounded-lg bg-white/25 flex items-center justify-center">
                                <span className="text-[16px] leading-none">💰</span>
                            </div>
                            <span className="text-[16px] text-white font-medium leading-none">Ingresos</span>
                        </div>

                        <div className="h-[34px] w-full sm:w-[78px] rounded-2xl bg-purple-100 flex items-center justify-center border border-gray-200">
                            <span className="text-[16px] font-medium text-[#7C3AED] leading-none">10</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de asistentes Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Lista de asistentes</h2>
                    <p className="text-base text-gray-500 mt-1">Vuelve a enviar la entrada que necesites</p>
                </div>

                <div className="flex justify-between items-center gap-4 text-xs sm:text-sm">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <Input placeholder="Buscar ticket" className="pl-9 h-9 text-xs glass-input rounded-full" />
                    </div>
                    <Button variant="secondary" size="sm" className="bg-orange-100 text-orange-600 text-xs font-bold border-none hover:bg-orange-200">
                        Descargar <ExternalLink className="w-3 h-3 ml-1 sm:ml-2" />
                    </Button>
                </div>

                {/* Attendees List */}
                <div className="space-y-3">
                    {attendees.map((attendee) => (
                        <div key={attendee.id} className="glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="p-1.5 border border-gray-200 bg-gray-50 rounded-md shrink-0">
                                    <Ticket className="w-3.5 h-3.5 text-gray-600" />
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-sm font-bold text-gray-800 truncate">{attendee.name}</span>
                                    <span className="text-xs text-gray-600 font-medium truncate">{attendee.list}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                                    {attendee.status}
                                </span>
                                <Button size="sm" variant="secondary" className="bg-white text-gray-600 hover:bg-gray-50 h-7 text-[10px] font-medium border border-gray-200 flex-1 sm:flex-none">
                                    <QrCode className="w-3 h-3 mr-1.5" /> Enviar QR
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

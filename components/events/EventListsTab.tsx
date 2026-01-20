'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Ticket, X } from "lucide-react";
import { useState } from "react";

export function EventListsTab() {
    const [selectedAttendees, setSelectedAttendees] = useState<number[]>([]);

    // Mock Data for Waitlist
    const waitlist = [
        { id: 1, name: 'Camilo Acosta', list: 'Lista redes', status: 'Asistirá' },
        { id: 2, name: 'Jobelo Quintero', list: 'Lista Sonia', status: 'Asistirá' },
        { id: 3, name: 'Sebastian Llano', list: 'Lista Instagram', status: 'Aprobado' },
        { id: 4, name: 'Carlos Martinez', list: 'Lista Promotor 1', status: 'Asistirá' },
        { id: 5, name: 'Mariana Hoyos', list: 'Lista Promotor 2', status: 'Aprobado' },
        { id: 6, name: 'Sebastian Perez', list: 'Lista Promotor 3', status: 'Asistirá' },
    ];

    const toggleAttendee = (id: number) => {
        setSelectedAttendees(prev =>
            prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-[820px] mx-auto pb-20">

            {/* Filters Section */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Espacios o eventos activos</h3>
                    <p className="text-base text-gray-500">Selecciona el espacio/evento</p>
                    <Select defaultValue="Monaco">
                        <SelectTrigger className="w-[280px] h-10 glass-input text-sm font-medium text-gray-700">
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
                    <p className="text-base text-gray-500">Selecciona la fecha </p>
                    <Select defaultValue="jun05">
                        <SelectTrigger className="w-[280px] h-10 glass-input text-sm font-medium text-gray-700">
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
                            <span className="text-xl font-bold text-green-600">50 <span className="text-xl font-medium">registrados</span></span>
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

            {/* Lista de espera Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Lista de espera</h2>
                    <p className="text-base text-gray-500 mt-1">Aprueba los registros que tengas en espera</p>
                </div>

                <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <Input placeholder="Buscar invitado" className="pl-9 h-9 text-xs glass-input rounded-full" />
                </div>

                {/* Waitlist Items */}
                <div className="space-y-3">
                    {waitlist.map((person) => {
                        const isSelected = selectedAttendees.includes(person.id);
                        const statusColor = person.status === 'Asistirá' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700';

                        return (
                            <div key={person.id} className="glass-card flex items-center justify-between p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    {/* Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleAttendee(person.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 bg-white"
                                    />
                                    <div className="p-1.5 border border-gray-200 bg-gray-50 rounded-md">
                                        <Ticket className="w-3.5 h-3.5 text-gray-500" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <span className="text-sm font-bold text-gray-800 w-32">{person.name}</span>
                                        <span className="text-xs text-gray-500 font-medium">{person.list}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColor}`}>
                                        {person.status}
                                    </span>
                                    <Button size="sm" variant="secondary" className="bg-white rounded-lg h-7 px-3 text-[10px] font-medium text-gray-600 hover:bg-gray-50 border border-gray-200">
                                        <X className="w-3 h-3 mr-1.5" /> Cancelar ↗
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Message */}
                <div className="mt-6 p-4 glass-panel bg-orange-50 border-orange-200">
                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                        A las personas que apruebes, les llegará una confirmación por correo y WhatsApp con su entrada en formato QR. También podrán consultarla en cualquier momento, desde su cuenta en Tikipal
                    </p>
                </div>
            </div>
        </div>
    );
}

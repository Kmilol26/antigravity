'use client';

import { SpaceCard } from "@/components/spaces/SpaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { CreateEventForm } from "@/components/events/CreateEventForm";

export function EventsListTab({ initialEvents }: { initialEvents: any[] }) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);

    // Use connection to DB
    const events = initialEvents;

    if (isCreating) {
        return (
            <CreateEventForm
                initialData={editingEvent}
                onCancel={() => {
                    setIsCreating(false);
                    setEditingEvent(null);
                }}
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Tus eventos</h1>
                        <p className="text-base text-gray-500">Gestiona la información de cada evento</p>
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-amber-100 text-amber-700 hover:bg-amber-200 text-xs font-bold border-none shadow-sm"
                    >
                        Ver categoría ↗
                    </Button>
                </div>

                {/* Metrics Pills */}
                <div className="flex flex-wrap gap-4">
                    <div className="glass-panel flex items-center gap-3 px-5 h-12 min-w-[180px]">
                        <span className="text-base font-semibold text-gray-700">Eventos</span>
                        <span className="ml-auto bg-purple-100 text-purple-700 text-base font-bold px-3 h-6 inline-flex items-center justify-center rounded-md leading-none">
                            8
                        </span>
                    </div>

                    <div className="glass-panel flex items-center gap-3 px-5 h-12 min-w-[220px]">
                        <span className="text-base font-semibold text-gray-700">Ubicación</span>
                        <span className="ml-auto bg-red-100 text-red-700 text-base font-bold px-3 h-6 inline-flex items-center justify-center rounded-md leading-none whitespace-nowrap">
                            Bogota
                        </span>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="glass-panel flex flex-wrap items-center gap-3 h-12 px-4 w-fit">
                    <span className="text-base font-bold text-gray-700 mr-2">Categorias</span>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-bold rounded-lg hover:bg-green-200 transition-colors shadow-sm">
                        Zona 85
                    </button>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-purple-100 text-purple-700 text-xs font-bold rounded-lg hover:bg-purple-200 transition-colors shadow-sm">
                        Restaurantes
                    </button>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-orange-100 text-orange-700 text-xs font-bold rounded-lg hover:bg-orange-200 transition-colors whitespace-nowrap shadow-sm">
                        Mas Visitados
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button
                        onClick={() => { setEditingEvent(null); setIsCreating(true); }}
                        className="bg-[#FE6535] hover:bg-[#E55A28] text-white shadow-lg shadow-orange-500/30 rounded-xl px-8 h-10 font-medium hover:scale-105 transition-all"
                    >
                        Crear Evento
                    </Button>
                </div>

                {/* Search */}
                <div>
                    <p className="text-base font-medium text-gray-700 mb-2">Selecciona cualquier evento</p>
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FE6535]" />
                        <Input
                            placeholder="Busca tu evento"
                            className="pl-10 glass-input h-10 shadow-sm"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex flex-wrap gap-[10.5px] justify-center sm:justify-start">
                    {events.map((event) => (
                        <SpaceCard
                            key={event.id}
                            space={event}
                            className="w-full sm:w-[185px] h-auto sm:h-[242px] aspect-auto"
                            onClick={(e) => {
                                setEditingEvent(e);
                                setIsCreating(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

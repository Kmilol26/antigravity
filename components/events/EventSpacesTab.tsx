'use client';

import { SpaceCard } from "@/components/spaces/SpaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { CreateSpaceForm } from "@/components/spaces/CreateSpaceForm";

export function EventSpacesTab() {
    const [isCreating, setIsCreating] = useState(false);
    const [editingSpace, setEditingSpace] = useState<any>(null);

    // Simulated spaces data to match the screenshot provided
    const spaces = [
        { id: '1', name: 'Tabu Studio Bar', category: 'Electronica', capacity: 200, images: '["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-24' },
        { id: '2', name: 'Toni-k Bar', category: 'Champeta', capacity: 150, images: '["https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-36' },
        { id: '3', name: 'Cacao Blunt Bar', category: 'Reggaeton', capacity: 300, images: '["https://images.unsplash.com/photo-1574096079513-d82599692951?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cr 50 # 12-63' },
        { id: '4', name: 'Octava Club', category: 'House', capacity: 500, images: '["https://images.unsplash.com/photo-1570876050997-2fdefb00c004?auto=format&fit=crop&q=80"]', price: '40.000', location: 'Cra 8 # 63-41' },
        { id: '5', name: 'Salvador', category: 'Electronica', capacity: 250, images: '["https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80"]', price: '30.000', location: 'Cl 85 # 12-71' },
        { id: '6', name: 'Tabu Studio Bar', category: 'Electronica', capacity: 200, images: '["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-24' },
        { id: '7', name: 'Toni-k Bar', category: 'Champeta', capacity: 150, images: '["https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-36' },
        { id: '8', name: 'Cacao Blunt Bar', category: 'Reggaeton', capacity: 300, images: '["https://images.unsplash.com/photo-1574096079513-d82599692951?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cr 50 # 12-63' }
    ];

    if (isCreating) {
        return (
            <CreateSpaceForm
                initialData={editingSpace}
                onCancel={() => {
                    setIsCreating(false);
                    setEditingSpace(null);
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
                        <h1 className="text-xl font-bold text-gray-900">Tus espacios</h1>
                        <p className="text-base text-gray-500">Gestiona la información de cada espacio</p>
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FEF3C7] text-[#D97706] hover:bg-[#FDE68A] text-xs font-bold border-none shadow-sm"
                    >
                        Ver categoría ↗
                    </Button>
                </div>

                {/* Metrics Pills */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 px-5 h-12 bg-white border border-[#FE6535] rounded-xl shadow-sm min-w-[180px]">
                        <span className="text-base font-semibold text-gray-700">Espacios</span>

                        <span className="ml-auto bg-[#A7F3D0] text-[#065F46] text-base font-bold px-3 h-6 inline-flex items-center justify-center rounded-md leading-none">
                            14
                        </span>
                    </div>

                    <div className="flex items-center gap-3 px-5 h-12 bg-white border border-[#FE6535] rounded-xl shadow-sm min-w-[220px]">
                        <span className="text-base font-semibold text-gray-700">Ubicación</span>

                        <span className="ml-auto bg-[#FECACA] text-[#991B1B] text-base font-bold px-3 h-6 inline-flex items-center justify-center rounded-md leading-none whitespace-nowrap">
                            Bogota
                        </span>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center gap-3 bg-white h-12 px-4 rounded-2xl border shadow-sm w-fit">
                    <span className="text-base font-bold text-gray-700 mr-2">Categorias</span>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-[#A7F3D0] text-[#065F46] text-base font-bold rounded-lg hover:opacity-80 transition-opacity">
                        Zona 85
                    </button>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-[#DDD6FE] text-[#5B21B6] text-base font-bold rounded-lg hover:opacity-80 transition-opacity">
                        Restaurantes
                    </button>

                    <button className="h-6 px-3 inline-flex items-center justify-center bg-[#FED7AA] text-[#9A3412] text-base font-bold rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap">
                        Mas Visitados
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button
                        onClick={() => { setEditingSpace(null); setIsCreating(true); }}
                        className="bg-[#FE6535] hover:bg-[#E55A28] text-white shadow-md rounded-xl px-8 h-10 font-medium"
                    >
                        Crear Espacio
                    </Button>
                </div>

                {/* Search */}
                <div>
                    <p className="text-base font-medium text-gray-700 mb-2">Selecciona cualquier espacio</p>
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FE6535]" />
                        <Input
                            placeholder="Busca tu espacio"
                            className="pl-10 border-[#FE6535]/30 focus:border-[#FE6535] rounded-full bg-white h-10 shadow-sm"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex flex-wrap gap-[10.5px]">
                    {spaces.map((space) => (
                        <SpaceCard
                            key={space.id}
                            space={space}
                            className="w-[185px] h-[242px] aspect-auto"
                            onClick={(s) => {
                                setEditingSpace(s);
                                setIsCreating(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

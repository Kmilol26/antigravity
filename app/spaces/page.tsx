import { getSpaces } from "@/app/actions";
import { SpaceCard } from "@/components/spaces/SpaceCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function SpacesPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q;
    const spaces = await getSpaces(query);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Tus espacios</h1>
                    <p className="text-base text-gray-500">Gestiona la informacion de cada espacio</p>
                </div>

                {/* Metrics Pills - Red/Orange Theme */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center justify-between px-4 h-12 bg-white border border-gray-200 rounded-xl shadow-sm min-w-[140px]">
                        <span className="text-sm font-semibold text-gray-700">Espacios</span>
                        <span className="bg-[#A7F3D0] text-[#065F46] text-xs font-bold px-2 h-6 inline-flex items-center rounded-md">14</span>
                    </div>
                    <div className="flex items-center justify-between px-4 h-12 bg-white border border-gray-200 rounded-xl shadow-sm min-w-[140px]">
                        <span className="text-sm font-semibold text-gray-700">Eventos</span>
                        <span className="bg-[#DDD6FE] text-[#5B21B6] text-xs font-bold px-2 h-6 inline-flex items-center rounded-md">8</span>
                    </div>
                    <div className="flex items-center justify-between px-4 h-12 bg-white border border-gray-200 rounded-xl shadow-sm min-w-[140px]">
                        <span className="text-sm font-semibold text-gray-700">Ubicación</span>
                        <span className="bg-[#FECACA] text-[#991B1B] text-xs font-bold px-2 h-6 inline-flex items-center rounded-md">Bogota</span>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm w-fit">
                    <span className="text-sm font-bold text-gray-700 px-3">Categorias</span>
                    <button className="bg-[#A7F3D0] text-[#065F46] text-xs font-bold px-3 h-6 inline-flex items-center rounded-lg hover:opacity-80 transition-opacity">Zona 85</button>
                    <button className="bg-[#DDD6FE] text-[#5B21B6] text-xs font-bold px-3 h-6 inline-flex items-center rounded-lg hover:opacity-80 transition-opacity">Restaurantes</button>
                    <button className="bg-[#FED7AA] text-[#9A3412] text-xs font-bold px-3 h-6 inline-flex items-center rounded-lg hover:opacity-80 transition-opacity">Mas Visitados</button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Link href="/spaces/new" className={cn(buttonVariants({}), "bg-[#FE6535] hover:bg-[#E55A28] text-white shadow-md rounded-xl px-8")}>
                    Crear Espacio
                </Link>
                <Link href="/events/new" className={cn(buttonVariants({ variant: 'outline' }), "border-[#FE6535] text-[#FE6535] hover:bg-orange-50 rounded-xl px-8")}>
                    Crear Evento
                </Link>
            </div>

            {/* Search - simplified based on Screenshot, actually specific screenshot shows "Busca tu espacio" search bar */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FE6535]" />
                <Input placeholder="Busca tu espacio" className="pl-10 border-[#FE6535]/30 focus:border-[#FE6535] rounded-full bg-white h-10" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {spaces.map((space) => (
                    <SpaceCard key={space.id} space={space} />
                ))}
                {/* Simulated dummy cards to fill grid if empty, to match screenshot density */}
                {spaces.length < 4 && (
                    <>
                        <SpaceCard space={{ id: 'd1', name: 'Tabu Studio Bar', category: 'Electronica', capacity: 200, images: '["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-24' }} />
                        <SpaceCard space={{ id: 'd2', name: 'Toni-k Bar', category: 'Champeta', capacity: 150, images: '["https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cra 27 # 52-36' }} />
                        <SpaceCard space={{ id: 'd3', name: 'Cacao Blunt Bar', category: 'Reggaeton', capacity: 300, images: '["https://images.unsplash.com/photo-1574096079513-d82599692951?auto=format&fit=crop&q=80"]', price: '20.000', location: 'Cr 50 # 12-63' }} />
                        <SpaceCard space={{ id: 'd4', name: 'Octava Club', category: 'House', capacity: 500, images: '["https://images.unsplash.com/photo-1570876050997-2fdefb00c004?auto=format&fit=crop&q=80"]', price: '40.000', location: 'Cra 8 # 63-41' }} />
                    </>
                )}
            </div>
        </div>
    );
}

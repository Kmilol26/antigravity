'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = ['Zona 85', 'Restaurantes', 'Mas Visitados'];
const SERVICES = ['Comida', 'Datáfono', 'Licores', '+9'];
const RANGES = ['20k - 300k', '120k - 1500k', '200k - 2000k'];
const TYPES = ['Bares', 'Discotecas', 'Restaurantes'];

export function CreateEventForm({ onCancel, initialData }: { onCancel?: () => void, initialData?: any }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Form State - Initialize with initialData if present
    const [name, setName] = useState(initialData?.name || "");
    const [requiresApproval, setRequiresApproval] = useState(false); // Default false based on screenshot (orange toggle off?) no wait, screenshot shows off but orange implies maybe on or colored when on. Let's say off.

    // Parse initial image for preview if available
    let initialImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"; // Eventy image
    if (initialData?.image) {
        initialImage = initialData.image;
    }
    const [previewImage] = useState(initialImage);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            if (onCancel) {
                onCancel();
            } else {
                router.push('/events/123'); // Or refresh
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 animate-in fade-in duration-500 max-w-[820px] mx-auto bg-white rounded-xl">

            {/* Left Column: Form */}
            <div className="space-y-8">
                <div>
                    {onCancel && (
                        <button onClick={onCancel} className="flex items-center text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a eventos
                        </button>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900">{initialData ? 'Editar Evento' : 'Crear Evento'}</h1>
                    <p className="text-xs text-gray-500">Llena la mejor informacion de tu espacio</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xl font-bold text-[#FE6535] placeholder:text-opacity-50">Nombre del evento ✎</label>
                            <div className="flex gap-2 text-[10px] font-bold">
                                <span className="bg-[#FFEDD5] text-[#9A3412] px-2 py-0.5 rounded border border-[#FE6535]">Publico</span>
                                <span className="text-gray-400 px-2 py-0.5">| Oculto</span>
                            </div>
                        </div>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-lg border-none border-b border-gray-200 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#FE6535] placeholder:text-gray-300"
                            placeholder="Escribe el nombre aquí..."
                        />
                    </div>

                    {/* Date and Time Range */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        {/* Inicio */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FE6535]"></div>
                                <label className="text-xs text-gray-600">Inicio</label>
                            </div>
                            <div className="flex gap-2">
                                <Input defaultValue="vie, 30 may" className="bg-white border-[#FE6535] text-center text-xs font-medium h-9 rounded-lg text-gray-700 flex-1" />
                                <Input defaultValue="03:00 p.m." className="bg-white border-[#FE6535] text-center text-xs font-medium h-9 rounded-lg text-gray-700 w-24" />
                            </div>
                        </div>

                        {/* GMT Info (Right side top row) */}
                        <div className="sm:col-span-1 sm:row-span-2 flex items-center justify-end h-full pl-4 border-l border-dashed border-gray-100">
                            <div className="flex flex-col justify-center bg-white border border-gray-200 rounded-lg p-3 w-full max-w-[120px]">
                                <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">🌐 GMT-05:00</span>
                                <span className="text-[9px] text-gray-500">Bogotá</span>
                            </div>
                        </div>

                        {/* Fin */}
                        <div className="space-y-2 col-span-2 sm:col-span-1 -mt-2"> {/* Negative margin to pull up if single column, handle carefully */}
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <label className="text-xs text-gray-600">Fin</label>
                            </div>
                            <div className="flex gap-2">
                                <Input defaultValue="vie, 30 may" className="bg-white border-[#FE6535] text-center text-xs font-medium h-9 rounded-lg text-gray-700 flex-1" />
                                <Input defaultValue="04:00 p.m." className="bg-white border-[#FE6535] text-center text-xs font-medium h-9 rounded-lg text-gray-700 w-24" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2 border-dashed border-gray-100">
                        <Button type="button" variant="outline" className="w-full justify-start text-xs font-medium text-gray-500 border-orange-300 hover:bg-orange-50 hover:text-orange-600 h-10 rounded-lg">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-orange-400" /> Agregar ubicación del evento
                        </Button>
                        <Button type="button" variant="outline" className="w-full justify-start text-xs font-medium text-gray-500 border-orange-300 hover:bg-orange-50 hover:text-orange-600 h-10 rounded-lg">
                            <Search className="w-3.5 h-3.5 mr-2 text-orange-400" /> Agregar descripción
                        </Button>
                        <p className="text-[10px] text-[#FE6535] px-1 pointer-events-none pt-2">Opciones del evento</p>
                    </div>

                    {/* Detailed Options Inputs */}
                    <div className="space-y-3 pt-0">
                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Entradas</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium cursor-pointer">Gratis ✎</span>
                        </div>

                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Requiere aprobación</span>
                            </div>
                            <Switch checked={requiresApproval} onCheckedChange={setRequiresApproval} className="data-[state=checked]:bg-[#FE6535] scale-75" />
                        </div>

                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Cupo</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium cursor-pointer">Ilimitado ✎</span>
                        </div>

                        {/* Types */}
                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Tipo de espacio</span>
                            </div>
                            <div className="flex gap-1">
                                {TYPES.map(t => (
                                    <span key={t} className={`text-[9px] px-2 py-0.5 rounded border ${t === 'Bares' ? 'bg-red-100 text-red-600 border-red-200' : (t === 'Discotecas' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200')}`}>{t}</span>
                                ))}
                                <span className="text-xs text-gray-400 ml-1 cursor-pointer">✎</span>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Categorias</span>
                            </div>
                            <div className="flex gap-1">
                                {CATEGORIES.map(t => (
                                    <span key={t} className={`text-[9px] px-2 h-6 inline-flex items-center rounded border ${t === 'Zona 85' ? 'bg-green-100 text-green-600 border-green-200' : (t === 'Restaurantes' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-orange-100 text-orange-600 border-[#FE6535]')}`}>{t}</span>
                                ))}
                                <span className="text-xs text-gray-400 ml-1 cursor-pointer">✎</span>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Servicios</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                {SERVICES.map(t => (
                                    <span key={t} className={`text-[9px] px-2 py-0.5 rounded border ${t.startsWith('+') ? 'bg-white text-gray-500 border-gray-200 font-bold' : (t === 'Comida' ? 'bg-orange-100 text-orange-600 border-[#FE6535]' : (t === 'Datáfono' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200'))}`}>{t}</span>
                                ))}
                                <span className="text-xs text-gray-400 ml-1 cursor-pointer">✎</span>
                            </div>
                        </div>

                        {/* Ranges */}
                        <div className="flex items-center justify-between border border-[#FE6535] rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Rangos</span>
                            </div>
                            <div className="flex gap-1">
                                {RANGES.map(t => (
                                    <span key={t} className={`text-[9px] px-2 py-0.5 rounded border ${t === '20k - 300k' ? 'bg-orange-100 text-orange-600 border-[#FE6535]' : (t === '120k - 1500k' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200')}`}>{t}</span>
                                ))}
                                <span className="text-xs text-gray-400 ml-1 cursor-pointer">✎</span>
                            </div>
                        </div>
                    </div>

                    {/* Aprobación invitados */}
                    <div className="space-y-4 pt-4">
                        <h3 className="font-bold text-sm text-gray-800">Aprobacion invitados</h3>
                        <p className="text-xs text-gray-500">Selecciona si debes aprobar a tus invitados en cada espacio/evento</p>
                        <div className="flex gap-4">
                            <Button type="button" className="bg-[#FE6535] text-white hover:bg-[#E55A28] h-8 px-6 text-xs font-bold rounded-lg shadow-md shadow-orange-200">SI</Button>
                            <Button type="button" variant="outline" className="border-[#FE6535] text-gray-500 hover:text-orange-500 h-8 px-6 text-xs font-bold rounded-lg">NO</Button>
                        </div>
                    </div>


                    <div className="space-y-6 pt-6">
                        <div className="flex flex-col mb-2">
                            <h3 className="font-bold text-sm text-gray-800">Preguntas de registro</h3>
                            <p className="text-xs text-gray-500 mt-1">Le haremos las siguientes preguntas a tus invitados</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] text-[#FE6535]">Informacion personal</p>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Nombre
                                </div>
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Correo
                                </div>
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Celular
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <p className="text-[10px] text-[#FE6535]">Informacion de facturacion - (Cuando es pago)</p>
                            <div className="grid grid-cols-2 gap-3 max-w-[70%]">
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Identificacion
                                </div>
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Direccion
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <p className="text-[10px] text-[#FE6535]">Preguntas personalizadas</p>
                            <div className="grid grid-cols-2 gap-3 max-w-[70%]">
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Empresa
                                </div>
                                <div className="border border-[#FE6535] rounded-lg p-2 flex items-center gap-2 text-xs text-gray-600 bg-white shadow-sm">
                                    <Search className="w-3 h-3 text-gray-400" /> Fecha de Nacimiento
                                </div>
                            </div>
                            <Button variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-200 text-xs h-7 px-3 rounded-lg font-bold shadow-none mt-2">+ Agregar</Button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#FE6535] hover:bg-[#E55A28] text-white font-bold h-10 rounded-xl mt-8 shadow-lg shadow-orange-200"
                    >
                        {isPending ? 'Guardando...' : (initialData ? 'Guardar Cambios' : 'Crear espacio')}
                    </Button>
                </form>
            </div>


            {/* Right Column: Preview */}
            <div className="hidden lg:block relative pl-12 border-l border-gray-100">
                <div className="sticky top-24 space-y-4">
                    <span className="bg-[#FEF9C3] text-[#854D0E] text-[10px] font-bold px-3 py-1 rounded-full absolute top-0 right-0 z-10 shadow-sm">Vista previa ↗</span>

                    {/* Preview Card (Exact copy of CreateSpaceForm for now, can be customized for Events if needed) */}
                    <div className="w-full max-w-sm mx-auto bg-[#FDFBF7] rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-white transform rotate-1">
                        <div className="relative aspect-square bg-[#F5E6D3]">
                            {/* Artistic Cover Image */}
                            <img src={previewImage} className="w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Artistic Preview" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                                <h2 className="text-4xl font-black text-[#1F2937] leading-[0.8] tracking-tighter mix-blend-multiply opacity-90">
                                    {name || 'ATERCIO\nPELADOS'}
                                </h2>
                                <p className="text-[8px] font-bold tracking-[0.2em] text-[#1F2937] mt-2 uppercase">Julio Victoria • Mnkybsnss</p>
                            </div>

                            {/* Pill Button Top Right */}
                            <div className="absolute top-4 right-4">
                                <div className="bg-[#FE6535] text-white p-1.5 rounded-full shadow-lg">
                                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex gap-3 bg-[#FDFBF7]">
                            {/* Mini cards below */}
                            <div className="w-16 h-16 rounded-xl bg-purple-600 overflow-hidden relative border-2 border-white shadow-md">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Sun</span>
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-green-500 overflow-hidden relative border-2 border-white shadow-md">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold text-center">Tierra<br />2024</span>
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden relative border-2 border-white shadow-md">
                                <img src="https://images.unsplash.com/photo-1533228122036-6a1ef8129c3e?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-yellow-200 overflow-hidden relative border-2 border-white shadow-md">
                                <div className="grid grid-cols-1 divide-y divide-yellow-300 text-[6px] p-1 font-bold text-yellow-800">
                                    <span>Line Up</span>
                                    <span>Tickets</span>
                                    <span>Info</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

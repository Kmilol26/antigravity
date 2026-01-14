'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { createSpace } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Search, ChevronRight } from "lucide-react";

const DAYS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const CATEGORIES = ['Zona 85', 'Restaurantes', 'Mas Visitados'];
const SERVICES = ['Comida', 'Datáfono', 'Licores', '+3'];
const RANGES = ['20k - 300k', '120k - 1500k', '200k - 2000k'];
const TYPES = ['Bares', 'Discotecas', 'Restaurantes'];

export default function CreateSpacePage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Form State
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>(['J', 'V', 'S']);
    const [requiresApproval, setRequiresApproval] = useState(true);
    const [previewImage] = useState("https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80"); // Static for matching screenshot

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            await createSpace(formData);
            router.push('/spaces');
        });
    };

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 animate-in fade-in duration-500 max-w-7xl mx-auto">

            {/* Left Column: Form */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#FE6535]">Crear Espacio</h1>
                    <p className="text-xs text-gray-500">Llena la mejor informacion de tu espacio</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    {/* Name Input with specific style */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xl font-bold text-[#FE6535] placeholder:text-opacity-50">Nombre del espacio</label>
                            <div className="flex gap-2 text-[10px] font-bold">
                                <span className="bg-[#FFEDD5] text-[#9A3412] px-2 py-0.5 rounded border border-orange-200">Publico</span>
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

                    {/* Days Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">Dias de la semana</label>
                        <p className="text-[10px] text-gray-400">Selecciona los dias de operación</p>
                        <div className="flex gap-3 pt-1">
                            {DAYS.map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={cn(
                                        "w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-colors border",
                                        selectedDays.includes(day)
                                            ? "bg-[#FE6535] text-white border-[#FE6535] shadow-md"
                                            : "bg-gray-100 text-gray-400 border-transparent hover:bg-gray-200"
                                    )}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Inicio
                            </label>
                            <div className="relative">
                                <Input defaultValue="03:00 p.m." className="bg-white border-orange-100 text-center text-sm font-medium h-10" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Fin
                            </label>
                            <div className="relative">
                                <Input defaultValue="21:00 p.m." className="bg-white border-orange-100 text-center text-sm font-medium h-10" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-gray-100">
                        <Button type="button" variant="outline" className="w-full justify-start text-xs font-medium text-gray-500 border-orange-200 hover:bg-orange-50 hover:text-orange-600 h-10">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-orange-400" /> Agregar ubicación del espacio
                        </Button>
                        <Button type="button" variant="outline" className="w-full justify-start text-xs font-medium text-gray-500 border-orange-200 hover:bg-orange-50 hover:text-orange-600 h-10">
                            <Search className="w-3.5 h-3.5 mr-2 text-orange-400" /> Agregar descripción
                        </Button>
                    </div>

                    {/* Detailed Options Inputs */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border border-orange-100 rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Entradas</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Gratis ↗</span>
                        </div>

                        <div className="flex items-center justify-between border border-orange-100 rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">?</span>
                                <span className="text-xs font-medium text-gray-600">Requiere aprobación</span>
                            </div>
                            <Switch checked={requiresApproval} onCheckedChange={setRequiresApproval} className="data-[state=checked]:bg-[#FE6535] scale-75" />
                        </div>

                        <div className="flex items-center justify-between border border-orange-100 rounded-lg p-2.5 bg-white">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-600">Cupo</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Ilimitado ↗</span>
                            <input type="hidden" name="capacity" value="200" />
                        </div>

                        <div className="flex items-center justify-between border border-orange-100 rounded-lg p-2.5 bg-white">
                            <span className="text-xs font-medium text-gray-600 ml-6">Tipo de espacio</span>
                            <div className="flex gap-1">
                                {TYPES.map(t => (
                                    <span key={t} className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{t}</span>
                                ))}
                                <span className="text-xs text-gray-400 ml-1">↗</span>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6 pt-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-sm text-gray-800">Preguntas de registro</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Nombre" className="placeholder:text-gray-400 border-orange-100 text-xs h-9 bg-white" disabled />
                            <Input placeholder="Correo" className="placeholder:text-gray-400 border-orange-100 text-xs h-9 bg-white" disabled />
                            <Input placeholder="Celular" className="placeholder:text-gray-400 border-orange-100 text-xs h-9 bg-white" disabled />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#FE6535] hover:bg-[#E55A28] text-white font-bold h-12 rounded-xl mt-8 shadow-lg shadow-orange-200"
                    >
                        {isPending ? 'Creando...' : 'Crear espacio'}
                    </Button>
                </form>
            </div>


            {/* Right Column: Preview */}
            <div className="hidden lg:block relative pl-12 border-l border-gray-100">
                <div className="sticky top-24 space-y-4">
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded absolute top-0 right-0 z-10">Vista previa ↗</span>

                    {/* Preview Card */}
                    <div className="w-full max-w-sm mx-auto bg-[#FDFBF7] rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-white">
                        <div className="relative aspect-square bg-slate-900">
                            <img src={previewImage} className="w-full h-full object-cover opacity-90" alt="Preview" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#FE6535] mb-1 block">Concierto</span>
                                <h2 className="text-3xl font-black leading-none mb-1">ATERCIO<br />PELADOS</h2>
                                <p className="text-[10px] opacity-80">MNKYBSNSS • JULIO VICTORIA</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between bg-[#FDFBF7]">
                            <div className="flex gap-2">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <span className="text-xl">🌞</span>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <span className="text-xl">👽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

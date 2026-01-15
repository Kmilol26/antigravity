'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createEvent, updateEvent } from "@/app/actions";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function EventForm({ event, spaces }: { event?: any, spaces: any[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [images, setImages] = useState<string[]>(event?.images ? JSON.parse(event.images) : []);

    // Initialize dates
    const initialDate = event?.date ? new Date(event.date).toISOString().split('T')[0] : '';
    const initialStartTime = event?.startTime ? new Date(event.startTime).toTimeString().substring(0, 5) : '';
    const initialEndTime = event?.endTime ? new Date(event.endTime).toTimeString().substring(0, 5) : '';

    const [formData, setFormData] = useState({
        status: event?.status || 'draft'
    });

    const handleSimulateUpload = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const url = `https://placehold.co/600x400/${randomColor}/white?text=Event+Image`;
        setImages(prev => [...prev, url]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        form.set('images', JSON.stringify(images));

        // Combine date and time for startTime/endTime ISO strings if needed by Prisma
        // Actually, Input type=time returns HH:mm. Input type=date returns YYYY-MM-DD.
        // I need to construct full Date objects for Prisma.
        // The action expects string that can be parsed by new Date().
        // So "2025-01-01T10:00:00" works.
        const dateStr = form.get('date') as string;
        const startStr = form.get('startTime') as string; // HH:mm
        const endStr = form.get('endTime') as string; // HH:mm

        if (dateStr && startStr) {
            form.set('startTime', `${dateStr}T${startStr}:00`);
        }
        if (dateStr && endStr) {
            // Handle next day if end time is before start time? 
            // For simplicity assume same day or user handles date logic.
            // Or if end < start, it's next day.
            let endDateStr = dateStr;
            if (startStr && endStr && endStr < startStr) {
                const d = new Date(dateStr);
                d.setDate(d.getDate() + 1);
                endDateStr = d.toISOString().split('T')[0];
            }
            form.set('endTime', `${endDateStr}T${endStr}:00`);
        }

        startTransition(async () => {
            if (event?.id) {
                await updateEvent(form);
            } else {
                await createEvent(form);
            }
            router.push('/events/123');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto py-8">
            <input type="hidden" name="id" value={event?.id || ''} />
            <input type="hidden" name="status" value={formData.status} />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{event ? 'Editar Evento' : 'Crear Evento'}</h1>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Guardando...' : (event ? 'Actualizar' : 'Crear Evento')}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Título</label>
                    <Input name="title" defaultValue={event?.title} placeholder="Ej. Fiesta de Verano" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Espacio</label>
                    <select
                        name="spaceId"
                        defaultValue={event?.spaceId || ''}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-gray-200"
                    >
                        <option value="">Seleccionar Espacio...</option>
                        {spaces.map(s => (
                            <option key={s.id} value={s.id}>{s.name} ({s.capacity} pax)</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                    name="description"
                    defaultValue={event?.description}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200"
                    placeholder="Descripción del evento..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha</label>
                    <Input type="date" name="date" defaultValue={initialDate} required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hora Inicio</label>
                    <Input type="time" name="startTime" defaultValue={initialStartTime} required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hora Fin</label>
                    <Input type="time" name="endTime" defaultValue={initialEndTime} required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Cupo Total</label>
                    <Input type="number" name="capacity" defaultValue={event?.capacity} placeholder="0" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Precio ($)</label>
                    <Input type="number" step="0.01" name="price" defaultValue={event?.price} placeholder="0.00" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={formData.status === 'published' ? 'default' : 'outline'}
                            onClick={() => setFormData(p => ({ ...p, status: 'published' }))}
                            className="flex-1"
                        >
                            Publicar
                        </Button>
                        <Button
                            type="button"
                            variant={formData.status === 'draft' ? 'default' : 'outline'}
                            onClick={() => setFormData(p => ({ ...p, status: 'draft' }))}
                            className="flex-1"
                        >
                            Borrador
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium block">Imágenes</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                            <img src={img} alt={`Event ${i}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center text-xs">X</button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="h-full min-h-[100px] border-dashed" onClick={handleSimulateUpload}>
                        + Subir Imagen
                    </Button>
                </div>
            </div>

        </form>
    );
}

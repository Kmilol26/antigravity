'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createSpace, updateSpace } from "@/app/actions";
import { SpaceCard } from "./SpaceCard";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SpaceForm({ space }: { space?: any }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [previewMode, setPreviewMode] = useState(false);
    const [images, setImages] = useState<string[]>(space?.images ? JSON.parse(space.images) : []);

    // Local state for preview
    const [formData, setFormData] = useState({
        name: space?.name || '',
        description: space?.description || '',
        capacity: space?.capacity || 0,
        category: space?.category || '',
        status: space?.status || 'active'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSimulateUpload = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const url = `https://placehold.co/600x400/${randomColor}/white?text=${formData.name || 'Space'}`;
        setImages(prev => [...prev, url]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        // Add images manually
        form.set('images', JSON.stringify(images));

        startTransition(async () => {
            if (space?.id) {
                await updateSpace(form);
            } else {
                await createSpace(form);
            }
            router.push('/spaces');
        });
    };

    if (previewMode) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold text-lg">Vista Previa</h2>
                    <Button variant="outline" onClick={() => setPreviewMode(false)}>Volver a editar</Button>
                </div>
                <div className="max-w-md mx-auto">
                    <SpaceCard space={{ ...formData, images: JSON.stringify(images), id: 'preview' }} />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto py-8">
            <input type="hidden" name="id" value={space?.id || ''} />
            <input type="hidden" name="status" value={formData.status} />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{space ? 'Editar Espacio' : 'Crear Espacio'}</h1>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setPreviewMode(true)}>
                        Vista Previa
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Guardando...' : (space ? 'Actualizar' : 'Crear Espacio')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Salón Principal" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-gray-200"
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Bar">Bar</option>
                        <option value="Discoteca">Discoteca</option>
                        <option value="Rooftop">Rooftop</option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Salón">Salón</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200"
                    placeholder="Describe el espacio..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Capacidad (Personas)</label>
                    <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="0" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={formData.status === 'active' ? 'default' : 'outline'}
                            onClick={() => setFormData(p => ({ ...p, status: 'active' }))}
                            className="flex-1"
                        >
                            Publicado
                        </Button>
                        <Button
                            type="button"
                            variant={formData.status === 'inactive' ? 'default' : 'outline'}
                            onClick={() => setFormData(p => ({ ...p, status: 'inactive' }))}
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
                            <img src={img} alt={`Space ${i}`} className="w-full h-full object-cover" />
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

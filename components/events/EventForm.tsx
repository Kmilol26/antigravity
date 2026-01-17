'use client';

import React, { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createEvent, updateEvent } from "@/app/actions";

type Space = { id: string; name: string; capacity: number };

type EventLike = {
  id?: string;
  title?: string;
  description?: string;
  images?: string | string[] | null;
  date?: string | Date | null;
  startTime?: string | Date | null;
  endTime?: string | Date | null;
  capacity?: number | null;
  price?: number | null;
  status?: "draft" | "published" | string;
  spaceId?: string | null;
};

function safeParseImages(images: EventLike["images"]): string[] {
  if (!images) return [];
  if (Array.isArray(images)) return images.filter(Boolean);

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  return [];
}

function toDateInputValue(value?: string | Date | null) {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function toTimeInputValue(value?: string | Date | null) {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  return d.toTimeString().substring(0, 5); // HH:mm
}

export function EventForm({ event, spaces }: { event?: EventLike; spaces: Space[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [images, setImages] = useState<string[]>(() => safeParseImages(event?.images));

  const [status, setStatus] = useState<"draft" | "published">(
    event?.status === "published" ? "published" : "draft"
  );

  const initialDate = useMemo(() => toDateInputValue(event?.date ?? null), [event?.date ?? null]);
  const initialStartTime = useMemo(() => toTimeInputValue(event?.startTime ?? null), [event?.startTime ?? null]);
  const initialEndTime = useMemo(() => toTimeInputValue(event?.endTime ?? null), [event?.endTime ?? null]);

  const handleSimulateUpload = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

    const url = `https://placehold.co/600x400/${randomColor}/white?text=Event+Image`;
    setImages((prev) => [...prev, url]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    form.set("images", JSON.stringify(images));
    form.set("status", status);

    const dateStr = String(form.get("date") || "");
    const startStr = String(form.get("startTime") || "");
    const endStr = String(form.get("endTime") || "");

    // Convierte date + time a ISO-like string: YYYY-MM-DDTHH:mm:00
    if (dateStr && startStr) form.set("startTime", `${dateStr}T${startStr}:00`);

    if (dateStr && endStr) {
      let endDateStr = dateStr;

      // Si end < start => asume que termina al día siguiente
      if (startStr && endStr && endStr < startStr) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + 1);
        endDateStr = d.toISOString().split("T")[0];
      }

      form.set("endTime", `${endDateStr}T${endStr}:00`);
    }

    startTransition(async () => {
      if (event?.id) {
        await updateEvent(form);
      } else {
        await createEvent(form);
      }

      // Hoy lo quieres fijo:
      router.push("/events/123");
    });
  };

  const capacityDefault =
    typeof event?.capacity === "number" ? String(event.capacity) : undefined;

  const priceDefault =
    typeof event?.price === "number" ? String(event.price) : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto py-8">
      <input type="hidden" name="id" value={event?.id || ""} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">{event?.id ? "Editar Evento" : "Crear Evento"}</h1>
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Guardando..." : event?.id ? "Actualizar" : "Crear Evento"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            name="title"
            defaultValue={event?.title || ""}
            placeholder="Ej. Fiesta de Verano"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Espacio</label>
          <select
            name="spaceId"
            defaultValue={event?.spaceId || ""}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-gray-200"
          >
            <option value="">Seleccionar Espacio...</option>
            {spaces.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.capacity} pax)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          defaultValue={event?.description || ""}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200"
          placeholder="Descripción del evento..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Cupo Total</label>
          <Input
            type="number"
            name="capacity"
            defaultValue={capacityDefault}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Precio ($)</label>
          <Input
            type="number"
            step="0.01"
            name="price"
            defaultValue={priceDefault}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={status === "published" ? "default" : "outline"}
              onClick={() => setStatus("published")}
              className="flex-1"
            >
              Publicar
            </Button>
            <Button
              type="button"
              variant={status === "draft" ? "default" : "outline"}
              onClick={() => setStatus("draft")}
              className="flex-1"
            >
              Borrador
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium block">Imágenes</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Event ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center text-xs"
              >
                X
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="h-full min-h-[100px] border-dashed"
            onClick={handleSimulateUpload}
          >
            + Subir Imagen
          </Button>
        </div>
      </div>
    </form>
  );
}

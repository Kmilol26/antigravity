'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EventGeneralForm() {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleSimulateUpload = (field: "logo" | "banner") => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const url = `https://placehold.co/${field === "logo" ? "200x200" : "1200x400"
            }/${randomColor}/white?text=${field === "logo" ? "New Event Logo" : "New Event Banner"
            }`;

        if (field === "logo") setLogoPreview(url);
        else setBannerPreview(url);
    };

    return (
        <form className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Información de tu negocio</h2>
                <p className="text-base text-gray-500 mt-1">
                    ¡Gracias por ser parte de Tikipal! aqui encontraras toda tu informacion
                </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <Input
                    name="name"
                    defaultValue="TikiFest"
                    placeholder="Nombre del evento"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="organizer"
                    placeholder="Organizador"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="phone"
                    placeholder="Teléfono de contacto"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="website"
                    placeholder="Sitio Web"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="instagram"
                    placeholder="Instagram"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="location"
                    placeholder="Ubicación"
                    className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
            </div>

            {/* Logo Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Logo</h3>
                    <p className="text-base text-gray-500 mt-1">Sube el logo para identificar tu evento.</p>
                </div>

                <div className="space-y-6">
                    {/* BOTÓN REAL (como Guardar cambios) */}
                    <Button
                        type="button"
                        onClick={() => handleSimulateUpload("logo")}
                        className="h-12 px-6 rounded-[8px] bg-[#FE6535] text-white hover:bg-[#e85a2f] shadow-md"
                    >
                        Subir Logo
                    </Button>

                    <div className="h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xs overflow-hidden shadow-sm">
                        {logoPreview ? (
                            <img src={logoPreview} className="h-full w-full object-cover" alt="Logo" />
                        ) : (
                            <span className="text-2xl">✨</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Portada Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Portada</h3>
                    <p className="text-base text-gray-500 mt-1">Esta será la portada para tu categoría en Tikipal.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* BOTÓN REAL */}
                    <Button
                        type="button"
                        onClick={() => handleSimulateUpload("banner")}
                        className="h-12 px-6 rounded-[8px] bg-[#FE6535] text-white hover:bg-[#e85a2f] shadow-md"
                    >
                        Subir Portada
                    </Button>


                    <Input
                        name="bannerText"
                        placeholder="Mensaje Banner"
                        className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                    />
                    <Input
                        name="categoryMessage"
                        placeholder="Mensaje Categoría"
                        className="border-[#FE6535] focus:border-[#FE6535] rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                    />
                </div>

                {/* PREVIEW SIEMPRE VISIBLE */}
                <div className="relative w-full h-48 rounded-[12px] overflow-hidden mt-6 shadow-md group">
                    {bannerPreview ? (
                        <img
                            src={bannerPreview}
                            alt="Banner"
                            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            ¡Evento <br /> Increíble!
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex justify-start pt-4">
                <Button type="submit" className="h-12 px-8 rounded-[8px] bg-[#FE6535] text-white hover:bg-[#e85a2f] shadow-md">
                    Guardar cambios
                </Button>
            </div>
        </form>
    );
}

'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateBusiness } from "@/app/actions";

export function EventGeneralForm({ initialData }: { initialData: any }) {
    const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logo || null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(initialData?.banner || null);
    const [isPending, startTransition] = useTransition();

    const handleSimulateUpload = (field: "logo" | "banner") => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const url = `https://placehold.co/${field === "logo" ? "200x200" : "1200x400"
            }/${randomColor}/white?text=${field === "logo" ? "New Event Logo" : "New Event Banner"
            }`;

        if (field === "logo") setLogoPreview(url);
        else setBannerPreview(url);
    };

    const handleSubmit = async (formData: FormData) => {
        if (!initialData?.id && !formData.get('id')) return; // Safety check

        startTransition(async () => {
            // Ensure logo/banner are part of formData if not changed but previews exist
            if (logoPreview) formData.set('logo', logoPreview);
            if (bannerPreview) formData.set('banner', bannerPreview);

            await updateBusiness(formData);
        });
    };

    return (
        <form action={handleSubmit} className="space-y-6 animate-in fade-in duration-500 max-w-[820px] mx-auto pb-20">
            <input type="hidden" name="id" value={initialData?.id} />

            {/* Header Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Información de tu negocio</h2>
                <p className="text-base text-gray-500 mt-1">
                    ¡Gracias por ser parte de Tikipal! aqui encontraras toda tu informacion
                </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    name="name"
                    defaultValue={initialData?.name}
                    placeholder="Nombre del negocio"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
                <Input
                    name="contact"
                    defaultValue={initialData?.contact}
                    placeholder="Contacto"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
                <Input
                    name="phone"
                    defaultValue={initialData?.phone}
                    placeholder="Teléfono de contacto"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
                <Input
                    name="website"
                    defaultValue={initialData?.website}
                    placeholder="Sitio Web"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
                <Input
                    name="instagram"
                    defaultValue={initialData?.instagram}
                    placeholder="Instagram"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
                <Input
                    name="address"
                    defaultValue={initialData?.address}
                    placeholder="Ubicación"
                    className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                />
            </div>

            {/* Logo Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Logo</h3>
                    <p className="text-base text-gray-500 mt-1">Sube el logo para identificar tu evento.</p>
                </div>

                <div className="space-y-6">
                    <input type="hidden" name="logo" value={logoPreview || ''} />
                    <Button
                        type="button"
                        onClick={() => handleSimulateUpload("logo")}
                        className="h-12 px-6 rounded-xl bg-[#FE6535] text-white hover:bg-[#FF7A50] hover:scale-105 shadow-lg shadow-orange-500/20 transition-all duration-200 border-none"
                    >
                        Subir Logo
                    </Button>

                    <div className="h-24 w-24 rounded-full glass-panel flex items-center justify-center text-pink-600 text-xs overflow-hidden shadow-sm bg-pink-50">
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
                    <input type="hidden" name="banner" value={bannerPreview || ''} />
                    <Button
                        type="button"
                        onClick={() => handleSimulateUpload("banner")}
                        className="h-12 px-6 rounded-xl bg-[#FE6535] text-white hover:bg-[#FF7A50] hover:scale-105 shadow-lg shadow-orange-500/20 transition-all duration-200 border-none"
                    >
                        Subir Portada
                    </Button>


                    <Input
                        name="bannerText"
                        placeholder="Mensaje Banner"
                        className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                    />
                    <Input
                        name="categoryMessage"
                        defaultValue={initialData?.categoryMessage}
                        placeholder="Mensaje Categoría"
                        className="glass-input h-12 text-gray-700 placeholder:text-gray-500"
                    />
                </div>

                {/* PREVIEW SIEMPRE VISIBLE */}
                <div className="relative w-full h-48 rounded-[12px] overflow-hidden mt-6 shadow-md group glass-panel">
                    {bannerPreview ? (
                        <img
                            src={bannerPreview}
                            alt="Banner"
                            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100" />
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            ¡Evento <br /> Increíble!
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex justify-start pt-4">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-12 px-8 rounded-xl bg-[#FE6535] text-white hover:bg-[#FF7A50] hover:scale-105 shadow-lg shadow-orange-500/30 transition-all duration-200 border-none disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isPending ? "Guardando..." : "Guardar cambios"}
                </Button>
            </div>
        </form>
    );
}

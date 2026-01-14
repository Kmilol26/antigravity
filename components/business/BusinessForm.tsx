"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateBusiness } from "@/app/actions";

type Business = {
    logo?: string;
    banner?: string;
    name?: string;
    contact?: string;
    phone?: string;
    website?: string;
    instagram?: string;
    address?: string;
    bannerText?: string;
    categoryMessage?: string;
};

export function BusinessForm({ business }: { business: Business }) {
    const [isPending, startTransition] = useTransition();

    const [logoPreview, setLogoPreview] = useState<string>(business?.logo ?? "");
    const [bannerPreview, setBannerPreview] = useState<string>(business?.banner ?? "");

    const handleSimulateUpload = (field: "logo" | "banner") => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const url = `https://placehold.co/${field === "logo" ? "200x200" : "1200x400"
            }/${randomColor}/white?text=${field === "logo" ? "New Logo" : "New Banner"}`;

        if (field === "logo") setLogoPreview(url);
        else setBannerPreview(url);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        form.set("logo", logoPreview || "");
        form.set("banner", bannerPreview || "");

        startTransition(async () => {
            await updateBusiness(form);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto"
        >
            {/* Header Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Información de tu negocio</h2>
                <p className="text-base text-gray-500 mt-1">
                    ¡Gracias por ser parte de Tikipal! acá encontrarás toda tu información
                </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <Input
                    name="name"
                    defaultValue={business?.name}
                    placeholder="Nombre del grupo"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="contact"
                    defaultValue={business?.contact}
                    placeholder="Contacto"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="phone"
                    defaultValue={business?.phone}
                    placeholder="Teléfono"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="website"
                    defaultValue={business?.website}
                    placeholder="Página web"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="instagram"
                    defaultValue={business?.instagram}
                    placeholder="Instagram"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
                <Input
                    name="address"
                    defaultValue={business?.address}
                    placeholder="Dirección"
                    className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                />
            </div>

            {/* Logo Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Logo</h3>
                    <p className="text-base text-gray-500 mt-1">
                        Sube tu logo para identificar tu comunidad
                    </p>
                </div>

                <div className="space-y-6">
                    <Button
                        type="button"
                        variant="default"
                        onClick={() => handleSimulateUpload("logo")}
                        className="h-12 px-6 rounded-[8px] bg-[#FE6535] text-white hover:bg-[#FE6535]/90 shadow-sm"
                    >
                        Subir logo
                    </Button>

                    <div className="h-24 w-24 rounded-full bg-[#E85D45] overflow-hidden shadow-sm flex items-center justify-center">
                        {logoPreview ? (
                            <img src={logoPreview} className="h-full w-full object-cover" alt="Logo" />
                        ) : (
                            <span className="font-serif italic text-white/90 text-xs">FABULOSO</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Portada Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Portada</h3>
                    <p className="text-base text-gray-500 mt-1">
                        Esta será la portada para tu categoría en Tikipal
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ✅ Botón sólido (ya no outline/placeholder) */}
                    <Button
                        type="button"
                        variant="default"
                        onClick={() => handleSimulateUpload("banner")}
                        className="h-12 px-6 rounded-[8px] bg-[#FE6535] text-white hover:bg-[#FE6535]/90 shadow-sm"
                    >
                        Subir portada
                    </Button>

                    <Input
                        name="bannerText"
                        defaultValue={business?.bannerText}
                        placeholder="Mensaje Banner"
                        className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                    />

                    <Input
                        name="categoryMessage"
                        defaultValue={business?.categoryMessage}
                        placeholder="Mensaje Categoría"
                        className="border-[#FE6535] focus:border-orange-400 rounded-[8px] h-12 text-gray-600 placeholder:text-gray-400 bg-white shadow-none"
                    />
                </div>

                {/* Preview SIEMPRE visible */}
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
                            ¡Una Sola <br /> Experiencia!
                        </h2>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-start">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-12 rounded-[8px] px-6 bg-black text-white hover:bg-black/90"
                >
                    {isPending ? "Guardando..." : "Guardar cambios"}
                </Button>
            </div>
        </form>
    );
}

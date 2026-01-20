'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        window.location.href = '/dashboard';
    };

    return (
        <div className="min-h-screen flex items-start justify-center pt-20 p-4">
            <div className="w-full max-w-md glass-panel p-8 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100/50 mb-4 ring-4 ring-pink-50/50">
                        <span className="text-2xl">✨</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido de nuevo</h1>
                    <p className="text-gray-500">Ingresa a tu cuenta para gestionar tus eventos</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <Input
                                placeholder="tu@email.com"
                                type="email"
                                required
                                className="glass-input h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Contraseña</label>
                            <Input
                                placeholder="••••••••"
                                type="password"
                                required
                                className="glass-input h-12 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-[#FE6535] focus:ring-[#FE6535]" />
                            <span className="text-gray-600">Recordarme</span>
                        </label>
                        <Link href="#" className="text-[#FE6535] hover:text-[#e85c30] font-medium hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-[#FE6535] hover:bg-[#FF7A50] text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>Iniciando sesión...</span>
                            </div>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" className="text-[#FE6535] hover:text-[#e85c30] font-bold hover:underline">
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}

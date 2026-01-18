'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { createPaymentMethod } from "@/app/actions";
import { CreditCard } from "lucide-react";

export function CreditCardForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess: () => void }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            formData.set('type', 'credit_card');
            await createPaymentMethod(formData);
            onSuccess();
        });
    };

    return (
        <div className="border border-[#FE6535] rounded-xl p-6 bg-white animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FE6535]" />
                    Agregar Tarjeta
                </h3>
                <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 text-gray-500">Cancelar</Button>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Nombre en la tarjeta</label>
                    <Input name="accountName" placeholder="Como aparece en la tarjeta" required className="border-gray-200" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Número de tarjeta</label>
                    <Input name="last4" placeholder="0000 0000 0000 0000" required className="border-gray-200" maxLength={19} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">Fecha expiración</label>
                        <Input placeholder="MM/YY" required className="border-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">CVC</label>
                        <Input placeholder="123" required className="border-gray-200" maxLength={4} />
                    </div>
                </div>

                <div className="pt-2">
                    <Button type="submit" disabled={isPending} className="w-full bg-[#FE6535] hover:bg-[#e85a2f] text-white">
                        {isPending ? 'Guardando...' : 'Guardar Tarjeta'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

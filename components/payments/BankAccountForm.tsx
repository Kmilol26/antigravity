'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useTransition } from "react";
import { createPaymentMethod } from "@/app/actions";
import { Building2 } from "lucide-react";

export function BankAccountForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess: () => void }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            formData.set('type', 'bank_account');
            await createPaymentMethod(formData);
            onSuccess();
        });
    };

    return (
        <div className="border border-[#FE6535] rounded-xl p-6 bg-white animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#FE6535]" />
                    Agregar Cuenta Bancaria
                </h3>
                <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 text-gray-500">Cancelar</Button>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Banco</label>
                    <Select name="bankName" required>
                        <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="Selecciona tu banco" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bancolombia">Bancolombia</SelectItem>
                            <SelectItem value="Davivienda">Davivienda</SelectItem>
                            <SelectItem value="Banco de Bogotá">Banco de Bogotá</SelectItem>
                            <SelectItem value="BBVA">BBVA</SelectItem>
                            <SelectItem value="Nequi">Nequi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Tipo de cuenta</label>
                    <Select name="accountType" required defaultValue="savings">
                        <SelectTrigger className="border-gray-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="savings">Ahorros</SelectItem>
                            <SelectItem value="checking">Corriente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Número de cuenta</label>
                    <Input name="accountNumber" placeholder="000 000 000" required className="border-gray-200" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Titular de la cuenta</label>
                    <Input name="accountName" placeholder="Nombre completo" required className="border-gray-200" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Documento de identidad</label>
                    <Input name="documentId" placeholder="CC / NIT" required className="border-gray-200" />
                </div>

                <div className="pt-2">
                    <Button type="submit" disabled={isPending} className="w-full bg-[#FE6535] hover:bg-[#e85a2f] text-white">
                        {isPending ? 'Guardando...' : 'Guardar Cuenta'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

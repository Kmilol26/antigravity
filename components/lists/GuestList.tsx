'use client';

import { Button } from "@/components/ui/button";
import { updateGuestStatus } from "@/app/actions";
import { Check, X, Mail } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function GuestList({ guests }: { guests: any[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleStatusChange = (id: string, status: string) => {
        startTransition(async () => {
            await updateGuestStatus(id, status);
            if (status === 'approved') {
                // Simulate email
                console.log(`Sending confirmation email to guest ${id}...`);
                alert("Confirmación enviada (Simulación)");
            }
        });
    };

    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-sm text-left min-w-[600px] md:min-w-0">
                    <thead className="bg-gray-50 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 md:px-6 py-3">Nombre</th>
                            <th className="px-4 md:px-6 py-3">Email</th>
                            <th className="px-4 md:px-6 py-3">Evento</th>
                            <th className="px-4 md:px-6 py-3">Estado</th>
                            <th className="px-4 md:px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 md:px-6 py-4 font-medium">{guest.name}</td>
                                <td className="px-4 md:px-6 py-4 text-gray-500">{guest.email}</td>
                                <td className="px-4 md:px-6 py-4">{guest.event.title}</td>
                                <td className="px-4 md:px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase
                                ${guest.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            guest.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'}
                            `}>
                                        {guest.status}
                                    </span>
                                </td>
                                <td className="px-4 md:px-6 py-4">
                                    <div className="flex gap-2">
                                        {guest.status === 'pending' && (
                                            <>
                                                <Button size="sm" className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600" onClick={() => handleStatusChange(guest.id, 'approved')} disabled={isPending}>
                                                    <Check className="h-4 w-4 text-white" />
                                                </Button>
                                                <Button size="sm" className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600" onClick={() => handleStatusChange(guest.id, 'rejected')} disabled={isPending}>
                                                    <X className="h-4 w-4 text-white" />
                                                </Button>
                                            </>
                                        )}
                                        {guest.status === 'approved' && (
                                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs" onClick={() => alert("Simulando reenvío de QR...")}>
                                                <Mail className="h-3 w-3 mr-1" /> Reenviar QR
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {guests.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay invitados en la lista.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
